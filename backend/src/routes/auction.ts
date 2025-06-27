import express, { Request, Response } from 'express';
import { AuctioneerAgent } from '../agents/AuctioneerAgent';
import { MalaysianGovAPI2025 } from '../services/malaysianGovAPI2025';
import { AuctionProperty, AuctionBidder } from '../types/auction';
import { auth } from '../middleware/auth';

const router = express.Router();
const auctioneerAgent = new AuctioneerAgent();
const govAPI = new MalaysianGovAPI2025();

// Get active auctions
router.get('/active', async (req: Request, res: Response) => {
  try {
    const { state, propertyType, priceMin, priceMax } = req.query;
    
    const filters = {
      state: state as string,
      propertyType: propertyType as string,
      priceRange: priceMin && priceMax ? [Number(priceMin), Number(priceMax)] as [number, number] : undefined
    };

    const auctions = await govAPI.getAuctionListings(filters);
    res.json({ auctions });
  } catch (error) {
    console.error('Get auctions error:', error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
});

// Start new auction
router.post('/start', auth, async (req: Request, res: Response) => {
  try {
    const propertyData: AuctionProperty = req.body;
    
    // Validate property data
    if (!propertyData.titleNumber || !propertyData.reservePrice) {
      return res.status(400).json({ error: 'Missing required property data' });
    }

    // Get property valuation from JPPH
    const valuation = await govAPI.getPropertyValuation(propertyData.id);
    if (valuation && propertyData.reservePrice < valuation.minimumValue * 0.7) {
      return res.status(400).json({ 
        error: 'Reserve price too low compared to market valuation',
        suggestedMinimum: valuation.minimumValue * 0.7
      });
    }

    const auctionId = await auctioneerAgent.startAuction(propertyData);
    
    res.status(201).json({
      message: 'Auction started successfully',
      auctionId,
      startTime: new Date().toISOString()
    });
  } catch (error) {
    console.error('Start auction error:', error);
    res.status(400).json({ error: error instanceof Error ? error.message : 'Failed to start auction' });
  }
});

// Place bid
router.post('/bid', auth, async (req: Request, res: Response) => {
  try {
    const { auctionId, amount } = req.body;
    const bidderId = (req as any).user._id;

    if (!auctionId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid bid data' });
    }

    // Check bidder eligibility
    const bidder = await getBidderProfile(bidderId);
    if (!bidder || bidder.kycStatus !== 'VERIFIED') {
      return res.status(403).json({ error: 'KYC verification required' });
    }

    if (amount > bidder.preApprovedAmount) {
      return res.status(403).json({ error: 'Bid exceeds pre-approved amount' });
    }

    // Process bid through agent
    const bidAccepted = await auctioneerAgent.processBid(auctionId, bidderId, amount);
    
    if (bidAccepted) {
      res.json({
        message: 'Bid placed successfully',
        bidAmount: amount,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(400).json({ error: 'Bid rejected' });
    }
  } catch (error) {
    console.error('Place bid error:', error);
    res.status(500).json({ error: 'Failed to place bid' });
  }
});

// Close auction
router.post('/:auctionId/close', auth, async (req: Request, res: Response) => {
  try {
    const { auctionId } = req.params;
    
    await auctioneerAgent.closeAuction(auctionId);
    
    res.json({
      message: 'Auction closed successfully',
      closedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Close auction error:', error);
    res.status(500).json({ error: 'Failed to close auction' });
  }
});

// Get auction results
router.get('/:auctionId/results', async (req: Request, res: Response) => {
  try {
    const { auctionId } = req.params;
    
    const results = await govAPI.getAuctionResults(auctionId);
    if (!results) {
      return res.status(404).json({ error: 'Auction results not found' });
    }

    res.json(results);
  } catch (error) {
    console.error('Get auction results error:', error);
    res.status(500).json({ error: 'Failed to fetch auction results' });
  }
});

// KYC verification for bidders
router.post('/kyc/verify', auth, async (req: Request, res: Response) => {
  try {
    const bidderId = (req as any).user._id;
    const { icNumber, phoneNumber, bankAccount } = req.body;

    // Perform AML check
    const amlResult = await govAPI.performAMLCheck(bidderId, 0);
    
    const kycData = {
      bidderId,
      icNumber,
      phoneNumber,
      bankAccount,
      amlRiskLevel: amlResult.riskLevel,
      verificationDate: new Date().toISOString()
    };

    // Store KYC data and update status
    await updateBidderKYCStatus(bidderId, 'VERIFIED', kycData);

    res.json({
      message: 'KYC verification completed',
      status: 'VERIFIED',
      riskLevel: amlResult.riskLevel
    });
  } catch (error) {
    console.error('KYC verification error:', error);
    res.status(500).json({ error: 'KYC verification failed' });
  }
});

// Calculate RPGT for auction sale
router.post('/rpgt/calculate', auth, async (req: Request, res: Response) => {
  try {
    const { purchasePrice, salePrice, holdingPeriod, ownerType } = req.body;
    
    const rpgtAmount = await govAPI.calculateRPGT({
      purchasePrice,
      salePrice,
      holdingPeriod,
      ownerType,
      isAuction: true
    });

    res.json({
      rpgtAmount,
      effectiveRate: (rpgtAmount / (salePrice - purchasePrice)) * 100,
      calculatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('RPGT calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate RPGT' });
  }
});

// Helper functions
async function getBidderProfile(bidderId: string): Promise<AuctionBidder | null> {
  // Implementation to fetch bidder profile from database
  return null;
}

async function updateBidderKYCStatus(bidderId: string, status: string, kycData: any): Promise<void> {
  // Implementation to update bidder KYC status
}

export default router;