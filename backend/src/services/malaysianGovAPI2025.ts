import axios from 'axios';

export class MalaysianGovAPI2025 {
  private eTanahBaseUrl = process.env.E_TANAH_API_URL || 'https://api.etanah.gov.my';
  private jpphBaseUrl = process.env.JPPH_API_URL || 'https://api.jpph.gov.my';
  private eLelongBaseUrl = process.env.E_LELONG_API_URL || 'https://api.elelongmalaysia.com.my';
  private apiKey = process.env.GOV_API_KEY;

  // e-Tanah Integration
  async getTitleStatus(titleNumber: string): Promise<any> {
    try {
      const response = await axios.get(`${this.eTanahBaseUrl}/title/${titleNumber}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      console.error('e-Tanah API error:', error);
      return null;
    }
  }

  async requestTitleTransfer(transferData: {
    titleNumber: string;
    fromOwner: string;
    toOwner: string;
    salePrice: number;
    auctionId: string;
  }): Promise<string> {
    try {
      const response = await axios.post(`${this.eTanahBaseUrl}/transfer`, {
        ...transferData,
        transferType: 'AUCTION_SALE',
        timestamp: new Date().toISOString()
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data.transferId;
    } catch (error) {
      console.error('Title transfer error:', error);
      throw new Error('Failed to initiate title transfer');
    }
  }

  async submitEConsent(consentData: any): Promise<string> {
    try {
      const response = await axios.post(`${this.eTanahBaseUrl}/consent`, consentData, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data.consentId;
    } catch (error) {
      console.error('e-Consent error:', error);
      throw new Error('Failed to submit e-Consent');
    }
  }

  // JPPH Valuation Integration
  async getPropertyValuation(propertyId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.jpphBaseUrl}/valuation/${propertyId}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      console.error('JPPH API error:', error);
      return null;
    }
  }

  async getMarketTrends(state: string, district: string): Promise<any> {
    try {
      const response = await axios.get(`${this.jpphBaseUrl}/trends`, {
        params: { state, district },
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      console.error('Market trends error:', error);
      return null;
    }
  }

  // e-Lelong Integration
  async getAuctionListings(filters: {
    state?: string;
    propertyType?: string;
    priceRange?: [number, number];
  }): Promise<any[]> {
    try {
      const response = await axios.get(`${this.eLelongBaseUrl}/listings`, {
        params: filters,
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data.listings || [];
    } catch (error) {
      console.error('e-Lelong API error:', error);
      return [];
    }
  }

  async getAuctionResults(auctionId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.eLelongBaseUrl}/results/${auctionId}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      console.error('Auction results error:', error);
      return null;
    }
  }

  // LHDN Integration
  async calculateRPGT(saleData: {
    purchasePrice: number;
    salePrice: number;
    holdingPeriod: number;
    ownerType: 'INDIVIDUAL' | 'COMPANY';
    isAuction: boolean;
  }): Promise<number> {
    try {
      const response = await axios.post(`${process.env.LHDN_API_URL}/rpgt/calculate`, saleData, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data.rpgtAmount;
    } catch (error) {
      console.error('RPGT calculation error:', error);
      return 0;
    }
  }

  async submitRPGTReturn(returnData: any): Promise<string> {
    try {
      const response = await axios.post(`${process.env.LHDN_API_URL}/rpgt/submit`, returnData, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data.returnId;
    } catch (error) {
      console.error('RPGT submission error:', error);
      throw new Error('Failed to submit RPGT return');
    }
  }

  // BNM AML/KYC Integration
  async performAMLCheck(bidderId: string, amount: number): Promise<{
    passed: boolean;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    reason?: string;
  }> {
    try {
      const response = await axios.post(`${process.env.BNM_API_URL}/aml/check`, {
        bidderId,
        transactionAmount: amount,
        transactionType: 'AUCTION_BID'
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      console.error('AML check error:', error);
      return { passed: false, riskLevel: 'HIGH', reason: 'API_ERROR' };
    }
  }

  async reportSuspiciousActivity(activityData: any): Promise<void> {
    try {
      await axios.post(`${process.env.BNM_API_URL}/suspicious-activity`, activityData, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
    } catch (error) {
      console.error('Suspicious activity reporting error:', error);
    }
  }

  // e-Stamp Integration
  async generateEStamp(stampData: {
    documentType: string;
    stampDuty: number;
    parties: string[];
  }): Promise<string> {
    try {
      const response = await axios.post(`${process.env.E_STAMP_API_URL}/generate`, stampData, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` }
      });
      return response.data.stampId;
    } catch (error) {
      console.error('e-Stamp generation error:', error);
      throw new Error('Failed to generate e-Stamp');
    }
  }
}