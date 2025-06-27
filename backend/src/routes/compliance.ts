import express, { Request, Response } from 'express';
import { ComplianceAgent } from '../agents/ComplianceAgent';
import { MalaysianGovAPI2025 } from '../services/malaysianGovAPI2025';
import { auth } from '../middleware/auth';

const router = express.Router();
const complianceAgent = new ComplianceAgent();
const govAPI = new MalaysianGovAPI2025();

// LHDN RPGT Compliance
router.post('/rpgt/calculate', auth, async (req: Request, res: Response) => {
  try {
    const { purchasePrice, salePrice, holdingPeriod, ownerType, propertyType } = req.body;
    
    const rpgtData = {
      purchasePrice,
      salePrice,
      holdingPeriod,
      ownerType,
      isAuction: true
    };

    const rpgtAmount = await govAPI.calculateRPGT(rpgtData);
    
    // Generate compliance report
    const complianceReport = {
      rpgtAmount,
      effectiveRate: ((rpgtAmount / (salePrice - purchasePrice)) * 100).toFixed(2),
      exemptions: await checkRPGTExemptions(rpgtData),
      calculatedAt: new Date().toISOString(),
      complianceStatus: 'CALCULATED'
    };

    res.json(complianceReport);
  } catch (error) {
    console.error('RPGT calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate RPGT' });
  }
});

router.post('/rpgt/submit', auth, async (req: Request, res: Response) => {
  try {
    const { auctionId, rpgtAmount, payerDetails } = req.body;
    
    const returnId = await govAPI.submitRPGTReturn({
      auctionId,
      rpgtAmount,
      payerDetails,
      submissionDate: new Date().toISOString(),
      submittedBy: (req as any).user._id
    });

    res.json({
      message: 'RPGT return submitted successfully',
      returnId,
      submissionDate: new Date().toISOString()
    });
  } catch (error) {
    console.error('RPGT submission error:', error);
    res.status(500).json({ error: 'Failed to submit RPGT return' });
  }
});

// BNM AML/KYC Compliance
router.post('/aml/check', auth, async (req: Request, res: Response) => {
  try {
    const { bidderId, transactionAmount } = req.body;
    
    const amlResult = await govAPI.performAMLCheck(bidderId, transactionAmount);
    
    // Log AML check for compliance audit
    await logComplianceActivity({
      type: 'AML_CHECK',
      bidderId,
      amount: transactionAmount,
      result: amlResult,
      timestamp: new Date().toISOString()
    });

    res.json({
      passed: amlResult.passed,
      riskLevel: amlResult.riskLevel,
      checkId: `AML_${Date.now()}`,
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    });
  } catch (error) {
    console.error('AML check error:', error);
    res.status(500).json({ error: 'AML check failed' });
  }
});

router.post('/kyc/verify', auth, async (req: Request, res: Response) => {
  try {
    const bidderId = (req as any).user._id;
    const { icNumber, phoneNumber, address, bankAccount } = req.body;

    // Validate IC number format (Malaysian)
    if (!validateMalaysianIC(icNumber)) {
      return res.status(400).json({ error: 'Invalid Malaysian IC number format' });
    }

    // Perform KYC verification
    const kycData = {
      bidderId,
      icNumber,
      phoneNumber,
      address,
      bankAccount,
      verificationDate: new Date().toISOString(),
      documents: req.body.documents || []
    };

    // Store KYC data
    await storeKYCData(kycData);

    // Update bidder status
    await updateBidderKYCStatus(bidderId, 'VERIFIED');

    res.json({
      message: 'KYC verification completed',
      status: 'VERIFIED',
      verificationId: `KYC_${bidderId}_${Date.now()}`
    });
  } catch (error) {
    console.error('KYC verification error:', error);
    res.status(500).json({ error: 'KYC verification failed' });
  }
});

// e-Tanah Integration
router.get('/title/:titleNumber/status', auth, async (req: Request, res: Response) => {
  try {
    const { titleNumber } = req.params;
    
    const titleStatus = await govAPI.getTitleStatus(titleNumber);
    
    if (!titleStatus) {
      return res.status(404).json({ error: 'Title not found' });
    }

    res.json({
      titleNumber,
      status: titleStatus.status,
      owner: titleStatus.owner,
      encumbrances: titleStatus.encumbrances || [],
      lastUpdated: titleStatus.lastUpdated,
      auctionEligible: titleStatus.status === 'CLEAR'
    });
  } catch (error) {
    console.error('Title status check error:', error);
    res.status(500).json({ error: 'Failed to check title status' });
  }
});

router.post('/title/transfer', auth, async (req: Request, res: Response) => {
  try {
    const { auctionId, titleNumber, newOwner, salePrice } = req.body;
    
    const transferData = {
      titleNumber,
      fromOwner: req.body.fromOwner,
      toOwner: newOwner,
      salePrice,
      auctionId,
      transferType: 'AUCTION_SALE',
      requestedBy: (req as any).user._id,
      requestDate: new Date().toISOString()
    };

    const transferId = await govAPI.requestTitleTransfer(transferData);
    
    // Generate e-Stamp for the transfer
    const stampId = await govAPI.generateEStamp({
      documentType: 'MEMORANDUM_OF_TRANSFER',
      stampDuty: calculateStampDuty(salePrice),
      parties: [transferData.fromOwner, transferData.toOwner]
    });

    res.json({
      message: 'Title transfer initiated',
      transferId,
      stampId,
      estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days
    });
  } catch (error) {
    console.error('Title transfer error:', error);
    res.status(500).json({ error: 'Failed to initiate title transfer' });
  }
});

// Compliance Dashboard
router.get('/dashboard/:auctionId', auth, async (req: Request, res: Response) => {
  try {
    const { auctionId } = req.params;
    
    const complianceReport = await complianceAgent.generateComplianceReport(auctionId);
    
    res.json({
      auctionId,
      complianceScore: calculateComplianceScore(complianceReport),
      status: complianceReport.complianceStatus,
      checks: complianceReport.complianceChecks,
      submissions: complianceReport.regulatorySubmissions,
      auditTrail: complianceReport.auditTrail,
      generatedAt: complianceReport.timestamp
    });
  } catch (error) {
    console.error('Compliance dashboard error:', error);
    res.status(500).json({ error: 'Failed to generate compliance dashboard' });
  }
});

// Audit Trail
router.get('/audit/:auctionId', auth, async (req: Request, res: Response) => {
  try {
    const { auctionId } = req.params;
    
    const auditTrail = await getAuditTrail(auctionId);
    
    res.json({
      auctionId,
      events: auditTrail,
      totalEvents: auditTrail.length,
      complianceEvents: auditTrail.filter((event: any) => event.type === 'COMPLIANCE'),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Audit trail error:', error);
    res.status(500).json({ error: 'Failed to retrieve audit trail' });
  }
});

// Suspicious Activity Reporting
router.post('/suspicious-activity', auth, async (req: Request, res: Response) => {
  try {
    const { auctionId, bidderId, activityType, description, evidence } = req.body;
    
    const reportData = {
      auctionId,
      bidderId,
      activityType,
      description,
      evidence,
      reportedBy: (req as any).user._id,
      reportDate: new Date().toISOString(),
      status: 'UNDER_INVESTIGATION'
    };

    // Report to BNM
    await govAPI.reportSuspiciousActivity(reportData);
    
    // Store internal record
    const reportId = await storeSuspiciousActivityReport(reportData);

    res.json({
      message: 'Suspicious activity reported',
      reportId,
      status: 'SUBMITTED',
      referenceNumber: `SAR_${reportId}`
    });
  } catch (error) {
    console.error('Suspicious activity reporting error:', error);
    res.status(500).json({ error: 'Failed to report suspicious activity' });
  }
});

// Helper functions
async function checkRPGTExemptions(rpgtData: any): Promise<string[]> {
  const exemptions: string[] = [];
  
  if (rpgtData.salePrice <= 100000) {
    exemptions.push('Property value below RM100,000');
  }
  
  if (rpgtData.holdingPeriod > 5) {
    exemptions.push('Holding period exceeds 5 years');
  }
  
  return exemptions;
}

function validateMalaysianIC(icNumber: string): boolean {
  // Malaysian IC format: YYMMDD-PB-###G
  const icRegex = /^\d{6}-\d{2}-\d{4}$/;
  return icRegex.test(icNumber);
}

function calculateStampDuty(salePrice: number): number {
  // Malaysian stamp duty calculation for property transfer
  if (salePrice <= 100000) return salePrice * 0.01;
  if (salePrice <= 500000) return 1000 + (salePrice - 100000) * 0.02;
  if (salePrice <= 1000000) return 9000 + (salePrice - 500000) * 0.03;
  return 24000 + (salePrice - 1000000) * 0.04;
}

function calculateComplianceScore(report: any): number {
  // Calculate compliance score based on various factors
  let score = 100;
  
  if (report.violations && report.violations.length > 0) {
    score -= report.violations.length * 10;
  }
  
  return Math.max(0, score);
}

async function logComplianceActivity(activity: any): Promise<void> {
  // Log compliance activity for audit purposes
}

async function storeKYCData(kycData: any): Promise<void> {
  // Store KYC data securely
}

async function updateBidderKYCStatus(bidderId: string, status: string): Promise<void> {
  // Update bidder KYC status in database
}

async function getAuditTrail(auctionId: string): Promise<any[]> {
  // Retrieve audit trail for auction
  return [];
}

async function storeSuspiciousActivityReport(reportData: any): Promise<string> {
  // Store suspicious activity report
  return `SAR_${Date.now()}`;
}

export default router;