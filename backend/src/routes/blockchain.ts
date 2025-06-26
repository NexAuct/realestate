import { Router, Response, Request } from 'express';
import { auth, checkRole } from '../middleware/auth';
import { IUser } from '../models/User';
// Additional imports for agent system and enhanced blockchain features
import agentSystemService from '../services/agentSystem';
import blockchainService from '../services/blockchain';

interface AuthRequest extends Request {
  user?: IUser;
}

const router = Router();

// Execute Sale & Purchase Agreement (S&P)
router.post('/execute-sp/:propertyId', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { buyerAddress, sellerAddress, terms } = req.body;

    const result = await blockchainService.executeSalePurchaseAgreement(propertyId, buyerAddress, sellerAddress, terms);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to execute S&P agreement' });
    }

    res.json({ message: 'S&P agreement executed successfully', transactionHash: result.transactionHash });
  } catch (error) {
    console.error('S&P execution error:', error);
    res.status(500).json({ error: 'Failed to execute S&P agreement' });
  }
});

// Pay stamp duty
router.post('/pay-stamp-duty/:propertyId', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { payerAddress, amount, eStampingReference } = req.body;

    const result = await blockchainService.payStampDuty(propertyId, payerAddress, amount, eStampingReference);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to pay stamp duty' });
    }

    res.json({ 
      message: 'Stamp duty paid successfully', 
      transactionHash: result.transactionHash,
      eStampReference: result.eStampReference 
    });
  } catch (error) {
    console.error('Stamp duty payment error:', error);
    res.status(500).json({ error: 'Failed to pay stamp duty' });
  }
});

// Pay RPGT
router.post('/pay-rpgt/:propertyId', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { payerAddress, rpgtDetails } = req.body;

    const result = await blockchainService.payRPGT(propertyId, payerAddress, rpgtDetails);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to pay RPGT' });
    }

    res.json({ 
      message: 'RPGT paid successfully', 
      transactionHash: result.transactionHash,
      rpgtAmount: result.rpgtAmount 
    });
  } catch (error) {
    console.error('RPGT payment error:', error);
    res.status(500).json({ error: 'Failed to pay RPGT' });
  }
});

// Process DuitNow payment
router.post('/payment/duitnow', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { payerAddress, payeeAddress, amount, paymentMethod, reference } = req.body;

    const result = await blockchainService.processDuitNowPayment(
      payerAddress, 
      payeeAddress, 
      amount, 
      paymentMethod || 'TRANSFER',
      reference
    );

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to process DuitNow payment' });
    }

    res.json({ 
      message: 'DuitNow payment processed successfully', 
      transactionId: result.transactionId,
      qrCode: result.qrCode 
    });
  } catch (error) {
    console.error('DuitNow payment error:', error);
    res.status(500).json({ error: 'Failed to process DuitNow payment' });
  }
});

// Process FPX payment
router.post('/payment/fpx', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { payerAddress, payeeAddress, amount, bankCode, reference } = req.body;

    const result = await blockchainService.processFPXPayment(
      payerAddress, 
      payeeAddress, 
      amount, 
      bankCode,
      reference
    );

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to process FPX payment' });
    }

    res.json({ 
      message: 'FPX payment processed successfully', 
      transactionId: result.transactionId,
      redirectUrl: result.redirectUrl 
    });
  } catch (error) {
    console.error('FPX payment error:', error);
    res.status(500).json({ error: 'Failed to process FPX payment' });
  }
});

// Create escrow
router.post('/escrow/create', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId, buyerAddress, sellerAddress, amount } = req.body;

    const result = await blockchainService.createEscrow(propertyId, buyerAddress, sellerAddress, amount);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to create escrow' });
    }

    res.json({ message: 'Escrow created successfully', escrowId: result.escrowId });
  } catch (error) {
    console.error('Escrow creation error:', error);
    res.status(500).json({ error: 'Failed to create escrow' });
  }
});

// Release escrow
router.post('/escrow/release', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { escrowId } = req.body;

    const result = await blockchainService.releaseEscrow(escrowId);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to release escrow' });
    }

    res.json({ message: 'Escrow released successfully', transactionHash: result.transactionHash });
  } catch (error) {
    console.error('Escrow release error:', error);
    res.status(500).json({ error: 'Failed to release escrow' });
  }
});

// Perform KYC/AML
router.post('/kycaml/:userId', auth, checkRole(['buyer', 'seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await blockchainService.performKYCAML(userId);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to perform KYC/AML' });
    }

    res.json({ message: 'KYC/AML check completed successfully' });
  } catch (error) {
    console.error('KYC/AML error:', error);
    res.status(500).json({ error: 'Failed to perform KYC/AML' });
  }
});


export default router;
