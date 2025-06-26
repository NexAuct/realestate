import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

// Real Estate NFT Contract ABI (simplified)
const REAL_ESTATE_ABI = [
  "function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function transferFrom(address from, address to, uint256 tokenId) public",
  "function approve(address to, uint256 tokenId) public",
  "function getApproved(uint256 tokenId) public view returns (address)",
  "function setApprovalForAll(address operator, bool approved) public",
  "function isApprovedForAll(address owner, address operator) public view returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)"
];

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null = null;
  private contract: ethers.Contract | null = null;

  constructor() {
    // Initialize provider
    const rpcUrl = process.env.ETHEREUM_RPC_URL || 'http://localhost:8545';
    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    // Initialize wallet if private key is provided and valid
    if (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== 'your-private-key-here') {
      try {
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
      } catch (error) {
        console.warn('Invalid private key provided, blockchain features will be limited');
      }
    }

    // Initialize contract if address is provided
    if (process.env.CONTRACT_ADDRESS && process.env.CONTRACT_ADDRESS !== 'your-contract-address-here' && this.wallet) {
      this.contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        REAL_ESTATE_ABI,
        this.wallet
      );
    }
  }

  // Malaysian-specific smart contract functions

  // Execute Sale & Purchase Agreement (S&P) with 2025 compliance
  async executeSalePurchaseAgreement(
    propertyId: string, 
    buyerAddress: string, 
    sellerAddress: string, 
    terms: {
      salePrice: number;
      depositAmount: number;
      completionDate: Date;
      specialConditions: string[];
      eSignatureRequired: boolean;
      stampDutyPaid: boolean;
    }
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      if (!this.contract) {
        throw new Error('Smart contract not initialized');
      }

      // Validate e-signature compliance for 2025
      if (terms.eSignatureRequired && !terms.stampDutyPaid) {
        throw new Error('E-stamping must be completed before S&P execution');
      }

      // Create S&P agreement on blockchain
      const spAgreement = {
        propertyId,
        buyer: buyerAddress,
        seller: sellerAddress,
        salePrice: ethers.parseEther(terms.salePrice.toString()),
        depositAmount: ethers.parseEther(terms.depositAmount.toString()),
        completionDate: Math.floor(terms.completionDate.getTime() / 1000),
        specialConditions: terms.specialConditions.join('|'),
        timestamp: Math.floor(Date.now() / 1000)
      };

      // Execute smart contract function (placeholder for actual implementation)
      console.log('Executing S&P agreement with 2025 compliance:', spAgreement);
      
      // In production, this would call the actual smart contract
      // const tx = await this.contract.executeSPA(spAgreement);
      // const receipt = await tx.wait();
      
      return { 
        success: true, 
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64) 
      };
    } catch (error) {
      console.error('Error executing S&P agreement:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Enhanced stamp duty payment with e-stamping integration
  async payStampDuty(
    propertyId: string, 
    payerAddress: string, 
    amount: number,
    eStampingReference?: string
  ): Promise<{ success: boolean; transactionHash?: string; eStampReference?: string; error?: string }> {
    try {
      if (!this.contract) {
        throw new Error('Smart contract not initialized');
      }

      // Calculate stamp duty based on 2025 rates
      const stampDutyRates = this.calculateStampDutyRates(amount);
      
      // Process e-stamping if reference not provided
      let stampReference = eStampingReference;
      if (!stampReference) {
        stampReference = await this.processEStamping(propertyId, amount);
      }

      // Record stamp duty payment on blockchain
      const stampDutyPayment = {
        propertyId,
        payer: payerAddress,
        amount: ethers.parseEther(amount.toString()),
        eStampReference: stampReference,
        timestamp: Math.floor(Date.now() / 1000)
      };

      console.log('Processing stamp duty payment with e-stamping:', stampDutyPayment);
      
      return { 
        success: true, 
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
        eStampReference: stampReference
      };
    } catch (error) {
      console.error('Error paying stamp duty:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Enhanced RPGT calculation and payment with 2025 updates
  async payRPGT(
    propertyId: string, 
    payerAddress: string, 
    rpgtDetails: {
      acquisitionPrice: number;
      disposalPrice: number;
      acquisitionDate: Date;
      disposalDate: Date;
      ownerCategory: 'CITIZEN' | 'NON_CITIZEN' | 'COMPANY';
      exemptionClaimed?: string;
    }
  ): Promise<{ success: boolean; transactionHash?: string; rpgtAmount?: number; error?: string }> {
    try {
      // Calculate RPGT based on 2025 rates and exemptions
      const rpgtCalculation = this.calculateRPGT2025(rpgtDetails);
      
      if (rpgtCalculation.amount <= 0) {
        return { 
          success: true, 
          rpgtAmount: 0,
          transactionHash: 'EXEMPT_' + Math.random().toString(16).substr(2, 8)
        };
      }

      // Process RPGT payment on blockchain
      const rpgtPayment = {
        propertyId,
        payer: payerAddress,
        amount: ethers.parseEther(rpgtCalculation.amount.toString()),
        calculation: rpgtCalculation,
        timestamp: Math.floor(Date.now() / 1000)
      };

      console.log('Processing RPGT payment with 2025 rates:', rpgtPayment);
      
      return { 
        success: true, 
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
        rpgtAmount: rpgtCalculation.amount
      };
    } catch (error) {
      console.error('Error paying RPGT:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Enhanced DuitNow integration with QR and Transfer support
  async processDuitNowPayment(
    payerAddress: string, 
    payeeAddress: string, 
    amount: number,
    paymentMethod: 'QR' | 'TRANSFER' = 'TRANSFER',
    reference?: string
  ): Promise<{ success: boolean; transactionId?: string; qrCode?: string; error?: string }> {
    try {
      const duitNowPayment = {
        from: payerAddress,
        to: payeeAddress,
        amount,
        method: paymentMethod,
        reference: reference || `PROP_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      // Generate QR code for QR payments
      let qrCode;
      if (paymentMethod === 'QR') {
        qrCode = this.generateDuitNowQR(duitNowPayment);
      }

      // Simulate DuitNow API call
      console.log('Processing DuitNow payment:', duitNowPayment);
      
      // In production, integrate with actual DuitNow API
      const transactionId = 'DN' + Math.random().toString(36).substr(2, 12).toUpperCase();
      
      return { 
        success: true, 
        transactionId,
        qrCode
      };
    } catch (error) {
      console.error('Error processing DuitNow payment:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Enhanced FPX integration with bank selection
  async processFPXPayment(
    payerAddress: string, 
    payeeAddress: string, 
    amount: number,
    bankCode: string,
    reference?: string
  ): Promise<{ success: boolean; transactionId?: string; redirectUrl?: string; error?: string }> {
    try {
      const fpxPayment = {
        from: payerAddress,
        to: payeeAddress,
        amount,
        bankCode,
        reference: reference || `PROP_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      // Generate FPX redirect URL
      const redirectUrl = this.generateFPXRedirectUrl(fpxPayment);

      console.log('Processing FPX payment:', fpxPayment);
      
      // In production, integrate with actual FPX gateway
      const transactionId = 'FPX' + Math.random().toString(36).substr(2, 12).toUpperCase();
      
      return { 
        success: true, 
        transactionId,
        redirectUrl
      };
    } catch (error) {
      console.error('Error processing FPX payment:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Escrow and conditional release of funds
  async createEscrow(propertyId: string, buyerAddress: string, sellerAddress: string, amount: number): Promise<{ success: boolean; escrowId?: string; error?: string }> {
    try {
      // TODO: Implement escrow creation logic
      console.log('Creating escrow for property:', propertyId);
      return { success: true, escrowId: 'escrow123' };
    } catch (error) {
      console.error('Error creating escrow:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async releaseEscrow(escrowId: string): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      // TODO: Implement escrow release logic
      console.log('Releasing escrow:', escrowId);
      return { success: true };
    } catch (error) {
      console.error('Error releasing escrow:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // KYC/AML checks per Bank Negara Malaysia guidelines
  async performKYCAML(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // TODO: Implement KYC/AML logic
      console.log('Performing KYC/AML for user:', userId);
      return { success: true };
    } catch (error) {
      console.error('Error performing KYC/AML:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Mint a new property NFT
  async mintPropertyNFT(
    ownerAddress: string,
    tokenId: string,
    metadata: any
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      // Create metadata URI (in production, this would be stored on IPFS)
      const tokenURI = JSON.stringify(metadata);

      const tx = await this.contract.mint(ownerAddress, tokenId, tokenURI);
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('Error minting NFT:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get NFT owner
  async getNFTOwner(tokenId: string): Promise<string | null> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const owner = await this.contract.ownerOf(tokenId);
      return owner;
    } catch (error) {
      console.error('Error getting NFT owner:', error);
      return null;
    }
  }

  // Get NFT metadata
  async getNFTMetadata(tokenId: string): Promise<any | null> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const tokenURI = await this.contract.tokenURI(tokenId);
      return JSON.parse(tokenURI);
    } catch (error) {
      console.error('Error getting NFT metadata:', error);
      return null;
    }
  }

  // Transfer NFT
  async transferNFT(
    from: string,
    to: string,
    tokenId: string
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const tx = await this.contract.transferFrom(from, to, tokenId);
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash
      };
    } catch (error) {
      console.error('Error transferring NFT:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get wallet balance
  async getWalletBalance(address: string): Promise<string | null> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return null;
    }
  }

  // Validate Ethereum address
  isValidAddress(address: string): boolean {
    try {
      return ethers.isAddress(address);
    } catch {
      return false;
    }
  }

  // Helper methods for Malaysian-specific calculations

  // Calculate stamp duty rates based on 2025 Malaysian rates
  private calculateStampDutyRates(propertyValue: number): { rate: number; amount: number; category: string } {
    let rate = 0;
    let category = '';

    if (propertyValue <= 100000) {
      rate = 0.01; // 1%
      category = 'First RM100,000';
    } else if (propertyValue <= 500000) {
      rate = 0.02; // 2%
      category = 'RM100,001 to RM500,000';
    } else if (propertyValue <= 1000000) {
      rate = 0.03; // 3%
      category = 'RM500,001 to RM1,000,000';
    } else {
      rate = 0.04; // 4%
      category = 'Above RM1,000,000';
    }

    return {
      rate,
      amount: propertyValue * rate,
      category
    };
  }

  // Process e-stamping integration
  private async processEStamping(propertyId: string, amount: number): Promise<string> {
    // Simulate e-stamping API call
    const eStampReference = 'ES' + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase();
    console.log(`Processing e-stamping for property ${propertyId}, amount: RM${amount}, reference: ${eStampReference}`);
    return eStampReference;
  }

  // Calculate RPGT based on 2025 rates and exemptions
  private calculateRPGT2025(details: {
    acquisitionPrice: number;
    disposalPrice: number;
    acquisitionDate: Date;
    disposalDate: Date;
    ownerCategory: 'CITIZEN' | 'NON_CITIZEN' | 'COMPANY';
    exemptionClaimed?: string;
  }): { amount: number; rate: number; exemption: string; calculation: any } {
    const gain = details.disposalPrice - details.acquisitionPrice;
    
    if (gain <= 0) {
      return { amount: 0, rate: 0, exemption: 'No gain', calculation: { gain: 0 } };
    }

    // Calculate holding period in years
    const holdingPeriod = Math.floor((details.disposalDate.getTime() - details.acquisitionDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    
    let rate = 0;
    let exemption = '';

    // 2025 RPGT rates
    if (details.ownerCategory === 'CITIZEN') {
      if (holdingPeriod >= 6) {
        rate = 0; // Exempt after 6 years for citizens
        exemption = 'Citizen exemption (6+ years)';
      } else if (holdingPeriod >= 4) {
        rate = 0.05; // 5%
      } else if (holdingPeriod >= 3) {
        rate = 0.10; // 10%
      } else {
        rate = 0.30; // 30%
      }
    } else if (details.ownerCategory === 'NON_CITIZEN') {
      if (holdingPeriod >= 6) {
        rate = 0.05; // 5%
      } else if (holdingPeriod >= 4) {
        rate = 0.10; // 10%
      } else if (holdingPeriod >= 3) {
        rate = 0.15; // 15%
      } else {
        rate = 0.30; // 30%
      }
    } else { // COMPANY
      rate = 0.10; // 10% for companies
    }

    // Apply exemptions
    if (details.exemptionClaimed === 'PRIMARY_RESIDENCE' && details.ownerCategory === 'CITIZEN') {
      rate = 0;
      exemption = 'Primary residence exemption';
    }

    const calculation = {
      gain,
      holdingPeriod,
      rate,
      amount: gain * rate
    };

    return {
      amount: calculation.amount,
      rate,
      exemption,
      calculation
    };
  }

  // Generate DuitNow QR code
  private generateDuitNowQR(payment: any): string {
    // Simulate QR code generation
    const qrData = {
      merchant: payment.to,
      amount: payment.amount,
      reference: payment.reference,
      timestamp: payment.timestamp
    };
    
    // In production, this would generate actual QR code
    return `data:image/png;base64,${Buffer.from(JSON.stringify(qrData)).toString('base64')}`;
  }

  // Generate FPX redirect URL
  private generateFPXRedirectUrl(payment: any): string {
    const baseUrl = process.env.FPX_GATEWAY_URL || 'https://www.fpx.com.my/fpxonline/fpxui/fpx.jsp';
    const params = new URLSearchParams({
      msgToken: Buffer.from(JSON.stringify(payment)).toString('base64'),
      msgType: 'AR',
      version: '8.0',
      checkSum: this.generateFPXChecksum(payment)
    });
    
    return `${baseUrl}?${params.toString()}`;
  }

  // Generate FPX checksum
  private generateFPXChecksum(payment: any): string {
    // Simulate checksum generation
    return Buffer.from(JSON.stringify(payment) + process.env.FPX_SECRET_KEY || 'default').toString('base64').substr(0, 16);
  }

  // Banking integration for Malaysian banks
  async integrateMalaysianBank(
    bankCode: string,
    accountNumber: string,
    amount: number,
    purpose: 'PROPERTY_PURCHASE' | 'LOAN_DISBURSEMENT' | 'ESCROW_RELEASE'
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    try {
      const bankIntegration = {
        bankCode,
        accountNumber,
        amount,
        purpose,
        timestamp: new Date().toISOString(),
        reference: `BANK_${Date.now()}`
      };

      // Simulate bank API integration
      console.log('Integrating with Malaysian bank:', bankIntegration);
      
      // In production, integrate with actual bank APIs (CIMB, Maybank, etc.)
      const transactionId = `${bankCode}_${Math.random().toString(36).substr(2, 12).toUpperCase()}`;
      
      return { success: true, transactionId };
    } catch (error) {
      console.error('Error integrating with Malaysian bank:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Microfinancing LTV calculation
  calculateLoanToValue(
    propertyValue: number,
    loanAmount: number,
    borrowerCategory: 'FIRST_TIME' | 'SECOND_HOME' | 'INVESTMENT',
    propertyType: 'RESIDENTIAL' | 'COMMERCIAL'
  ): { ltv: number; maxAllowed: number; compliant: boolean; recommendation: string } {
    const ltv = (loanAmount / propertyValue) * 100;
    let maxAllowed = 90; // Default 90%
    
    // 2025 BNM LTV guidelines
    if (propertyType === 'RESIDENTIAL') {
      if (borrowerCategory === 'FIRST_TIME') {
        maxAllowed = 95; // 95% for first-time buyers
      } else if (borrowerCategory === 'SECOND_HOME') {
        maxAllowed = 80; // 80% for second home
      } else {
        maxAllowed = 70; // 70% for investment
      }
    } else { // COMMERCIAL
      maxAllowed = 80; // 80% for commercial properties
    }

    const compliant = ltv <= maxAllowed;
    let recommendation = '';
    
    if (!compliant) {
      recommendation = `LTV of ${ltv.toFixed(2)}% exceeds maximum allowed ${maxAllowed}%. Consider increasing down payment.`;
    } else {
      recommendation = `LTV of ${ltv.toFixed(2)}% is compliant with BNM guidelines.`;
    }

    return {
      ltv: parseFloat(ltv.toFixed(2)),
      maxAllowed,
      compliant,
      recommendation
    };
  }

  // Generate a new wallet
  static generateWallet(): { address: string; privateKey: string; mnemonic: string } {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase || ''
    };
  }
}

export default new BlockchainService();
