/**
 * Malaysian Government API Integration Service
 * Integrates with JPPH, e-Tanah, e-Consent, e-Stamp, and other Malaysian government services
 */

import axios, { AxiosResponse } from 'axios';
import { IProperty } from '../models/Property';
import { PropertyValuation, RPGTDetails, StampDutyDetails } from '../types/malaysianProperty';

export interface JPPHValuationResponse {
  propertyId: string;
  marketValue: number;
  valuationDate: string;
  reference: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
}

export interface ETanahTitleResponse {
  titleNumber: string;
  ownerName: string;
  ownerIC: string;
  landArea: number;
  restrictions: string[];
  caveats: string[];
  encumbrances: string[];
  status: 'CLEAR' | 'ENCUMBERED' | 'DISPUTED';
}

export interface EStampResponse {
  stampDuty: number;
  stampReference: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  stampCategory: string;
}

export interface LHDNRPGTResponse {
  rpgtAmount: number;
  exemptionStatus: string;
  calculationBreakdown: {
    acquisitionPrice: number;
    disposalPrice: number;
    gainAmount: number;
    taxRate: number;
  };
}

export class MalaysianGovAPIService {
  private jpphBaseUrl: string;
  private eTanahBaseUrl: string;
  private eStampBaseUrl: string;
  private lhdnBaseUrl: string;
  private apiKey: string;

  constructor() {
    this.jpphBaseUrl = process.env.JPPH_API_URL || 'https://api.jpph.gov.my';
    this.eTanahBaseUrl = process.env.ETANAH_API_URL || 'https://api.etanah.gov.my';
    this.eStampBaseUrl = process.env.ESTAMP_API_URL || 'https://api.hasil.gov.my';
    this.lhdnBaseUrl = process.env.LHDN_API_URL || 'https://api.hasil.gov.my';
    this.apiKey = process.env.GOV_API_KEY || '';
  }

  // JPPH Property Valuation Service
  async getJPPHValuation(propertyId: string, landTitleNumber: string): Promise<JPPHValuationResponse | null> {
    try {
      const response: AxiosResponse<JPPHValuationResponse> = await axios.get(
        `${this.jpphBaseUrl}/valuation/${propertyId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          params: {
            titleNumber: landTitleNumber
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching JPPH valuation:', error);
      return null;
    }
  }

  // e-Tanah Title Search Service
  async searchETanahTitle(titleNumber: string): Promise<ETanahTitleResponse | null> {
    try {
      const response: AxiosResponse<ETanahTitleResponse> = await axios.get(
        `${this.eTanahBaseUrl}/title/search/${titleNumber}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error searching e-Tanah title:', error);
      return null;
    }
  }

  // e-Consent Property Transfer Service
  async submitEConsent(propertyId: string, buyerIC: string, sellerIC: string): Promise<{ success: boolean; reference?: string; error?: string }> {
    try {
      const response = await axios.post(
        `${this.eTanahBaseUrl}/consent/submit`,
        {
          propertyId,
          buyerIC,
          sellerIC,
          transferType: 'SALE'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return { success: true, reference: response.data.reference };
    } catch (error) {
      console.error('Error submitting e-Consent:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // e-Stamp Duty Calculation and Payment
  async calculateStampDuty(propertyValue: number, propertyType: string, buyerCategory: string): Promise<EStampResponse | null> {
    try {
      const response: AxiosResponse<EStampResponse> = await axios.post(
        `${this.eStampBaseUrl}/stamp/calculate`,
        {
          propertyValue,
          propertyType,
          buyerCategory
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error calculating stamp duty:', error);
      return null;
    }
  }

  // LHDN RPGT Calculation Service
  async calculateRPGT(
    acquisitionPrice: number,
    disposalPrice: number,
    acquisitionDate: Date,
    disposalDate: Date,
    ownerCategory: string
  ): Promise<LHDNRPGTResponse | null> {
    try {
      const response: AxiosResponse<LHDNRPGTResponse> = await axios.post(
        `${this.lhdnBaseUrl}/rpgt/calculate`,
        {
          acquisitionPrice,
          disposalPrice,
          acquisitionDate: acquisitionDate.toISOString(),
          disposalDate: disposalDate.toISOString(),
          ownerCategory
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error calculating RPGT:', error);
      return null;
    }
  }

  // MyProperty Integration - Get Property Details
  async getMyPropertyDetails(propertyId: string): Promise<any | null> {
    try {
      const response = await axios.get(
        `${this.jpphBaseUrl}/myproperty/${propertyId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching MyProperty details:', error);
      return null;
    }
  }

  // Land Office Integration - Title Transfer
  async submitTitleTransfer(
    titleNumber: string,
    buyerDetails: any,
    sellerDetails: any,
    salePrice: number
  ): Promise<{ success: boolean; reference?: string; error?: string }> {
    try {
      const response = await axios.post(
        `${this.eTanahBaseUrl}/transfer/submit`,
        {
          titleNumber,
          buyerDetails,
          sellerDetails,
          salePrice,
          transferDate: new Date().toISOString()
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return { success: true, reference: response.data.reference };
    } catch (error) {
      console.error('Error submitting title transfer:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // BNM AML/KYC Verification
  async verifyBNMCompliance(userIC: string, transactionAmount: number): Promise<{ compliant: boolean; riskLevel: string; reference?: string }> {
    try {
      const response = await axios.post(
        `${this.lhdnBaseUrl}/bnm/verify`,
        {
          userIC,
          transactionAmount,
          transactionType: 'PROPERTY_PURCHASE'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error verifying BNM compliance:', error);
      return { compliant: false, riskLevel: 'HIGH' };
    }
  }

  // Comprehensive Property Due Diligence
  async performDueDiligence(property: IProperty): Promise<{
    titleStatus: ETanahTitleResponse | null;
    valuation: JPPHValuationResponse | null;
    stampDuty: EStampResponse | null;
    compliance: { compliant: boolean; riskLevel: string; reference?: string };
    recommendations: string[];
  }> {
    const titleStatus = await this.searchETanahTitle(property.landTitleNumber);
    const valuation = await this.getJPPHValuation(property._id.toString(), property.landTitleNumber);
    const stampDuty = await this.calculateStampDuty(property.price, property.category, 'INDIVIDUAL');
    const compliance = await this.verifyBNMCompliance('', property.price);

    const recommendations: string[] = [];
    
    if (titleStatus?.status === 'ENCUMBERED') {
      recommendations.push('Property has encumbrances - legal review required');
    }
    
    if (titleStatus?.caveats && titleStatus.caveats.length > 0) {
      recommendations.push('Property has active caveats - verify before purchase');
    }
    
    if (compliance.riskLevel === 'HIGH') {
      recommendations.push('High risk transaction - enhanced due diligence required');
    }
    
    if (property.isRizabMelayu) {
      recommendations.push('Rizab Melayu property - buyer eligibility verification required');
    }

    return {
      titleStatus,
      valuation,
      stampDuty,
      compliance,
      recommendations
    };
  }
}

export default new MalaysianGovAPIService();
