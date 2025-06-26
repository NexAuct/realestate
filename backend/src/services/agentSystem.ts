/**
 * Multi-Agent System Service for Malaysian Real Estate Platform
 * Enhanced with AI capabilities for 2025 Malaysian market
 */

import { IUser } from '../models/User';
import { IProperty } from '../models/Property';
import malaysianGovAPI from './malaysianGovAPI';

export interface NegotiationScript {
  opening: string;
  keyPoints: string[];
  counterOffers: string[];
  closing: string;
}

export interface FraudDetectionResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  flags: string[];
  recommendations: string[];
}

export interface BuyerBehaviorPrediction {
  likelyToBuy: number;
  preferredProperties: string[];
  suggestedProperties: IProperty[];
}

export interface MarketAnalysis {
  priceGrowth: number;
  demandLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendations: string[];
}

export class AgentSystemService {
  // AI-Enhanced Buyer Agent
  async buyerSearchProperties(criteria: {
    location: {
      state: string;
      district?: string;
      mukim?: string;
    };
    priceRange: {
      min: number;
      max: number;
    };
    propertyType: string;
    preferences: string[];
    language: 'EN' | 'BM';
  }): Promise<IProperty[]> {
    try {
      // Implement AI-powered property search with Malaysian-specific filters
      console.log('Searching properties with AI enhancement:', criteria);
      
      // TODO: Implement actual search with ML recommendations
      const searchResults: IProperty[] = [];
      return searchResults;
    } catch (error) {
      console.error('Error in buyer search:', error);
      return [];
    }
  }

  async generateNegotiationScript(
    propertyDetails: IProperty,
    buyerPreferences: any,
    language: 'EN' | 'BM'
  ): Promise<NegotiationScript> {
    try {
      if (language === 'BM') {
        return {
          opening: `Assalamualaikum/Selamat sejahtera. Saya berminat dengan hartanah ${propertyDetails.titleBM} ini.`,
          keyPoints: [
            'Boleh saya tahu sejarah hartanah ini?',
            'Adakah terdapat sebarang isu dengan geran tanah?',
            'Bolehkah kita bincang mengenai harga?'
          ],
          counterOffers: [
            'Saya cadangkan harga RM X berdasarkan penilaian pasaran',
            'Bolehkah kita pertimbangkan terma pembayaran yang fleksibel?',
            'Saya sanggup bayar deposit segera jika harga dapat diselaraskan'
          ],
          closing: 'Terima kasih atas masa anda. Saya akan pertimbangkan dan maklumkan keputusan saya.'
        };
      } else {
        return {
          opening: `Good day. I'm interested in this property: ${propertyDetails.title}.`,
          keyPoints: [
            'Could you share the property history?',
            'Are there any issues with the land title?',
            'Can we discuss the pricing?'
          ],
          counterOffers: [
            'I propose RM X based on market valuation',
            'Could we consider flexible payment terms?',
            'I can pay deposit immediately if price is adjusted'
          ],
          closing: 'Thank you for your time. I will consider and get back to you with my decision.'
        };
      }
    } catch (error) {
      console.error('Error generating negotiation script:', error);
      throw error;
    }
  }

  // AI-Enhanced Property Valuation
  async predictPropertyValue(
    property: IProperty,
    marketData: any
  ): Promise<{ 
    predictedValue: number;
    confidence: number;
    factors: string[];
  }> {
    try {
      // Get JPPH valuation for comparison
      const jpphValuation = await malaysianGovAPI.getJPPHValuation(
        property._id.toString(),
        property.landTitleNumber
      );

      // Implement ML-based valuation factors
      const factors = [
        'Location desirability',
        'Property condition',
        'Market trends',
        'Infrastructure development',
        'Comparable sales'
      ];

      // Add Malaysian-specific factors
      if (property.isRizabMelayu) {
        factors.push('Rizab Melayu status');
      }
      
      if (property.isRumahMampuMilik) {
        factors.push('Rumah Mampu Milik program');
      }

      const baseValue = jpphValuation?.marketValue || property.price;
      const adjustmentFactor = this.calculateMarketAdjustment(property, marketData);
      
      return {
        predictedValue: Math.round(baseValue * adjustmentFactor),
        confidence: 0.85,
        factors
      };
    } catch (error) {
      console.error('Error predicting property value:', error);
      throw error;
    }
  }

  // Fraud Detection using Malaysian historical data
  async detectFraudRisks(
    property: IProperty,
    transaction: any
  ): Promise<FraudDetectionResult> {
    try {
      const flags: string[] = [];
      const recommendations: string[] = [];

      // Check for price manipulation
      const marketValue = await malaysianGovAPI.getJPPHValuation(
        property._id.toString(),
        property.landTitleNumber
      );
      
      if (marketValue && Math.abs(property.price - marketValue.marketValue) / marketValue.marketValue > 0.2) {
        flags.push('Significant price deviation from JPPH valuation');
        recommendations.push('Request detailed valuation report');
      }

      // Check title history
      const titleStatus = await malaysianGovAPI.searchETanahTitle(property.landTitleNumber);
      if (titleStatus?.status === 'DISPUTED') {
        flags.push('Property title under dispute');
        recommendations.push('Conduct thorough legal due diligence');
      }

      // Check for multiple rapid transactions
      if (property.rpgtDetails && property.rpgtDetails.acquisitionDate) {
        const daysSinceAcquisition = (Date.now() - property.rpgtDetails.acquisitionDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceAcquisition < 90) {
          flags.push('Property acquired recently - potential flipping');
          recommendations.push('Verify seller motivation and property improvements');
        }
      }

      // Check for unusual payment methods
      if (transaction.paymentMethod === 'CASH' && property.price > 500000) {
        flags.push('Large cash transaction - AML concern');
        recommendations.push('Enhanced KYC verification required');
      }

      // Determine risk level
      let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
      if (flags.length > 2) {
        riskLevel = 'HIGH';
      } else if (flags.length > 0) {
        riskLevel = 'MEDIUM';
      }

      return { riskLevel, flags, recommendations };
    } catch (error) {
      console.error('Error detecting fraud risks:', error);
      throw error;
    }
  }

  // Buyer Behavior Prediction
  async predictBuyerBehavior(
    buyerProfile: any,
    propertyViews: any[]
  ): Promise<BuyerBehaviorPrediction> {
    try {
      // Analyze viewing patterns
      const viewingPatterns = this.analyzeViewingPatterns(propertyViews);
      
      // Calculate likelihood based on engagement
      let likelyToBuy = 0.5; // Base probability
      
      if (viewingPatterns.averageTimeSpent > 300) { // 5 minutes
        likelyToBuy += 0.2;
      }
      
      if (viewingPatterns.returnVisits > 1) {
        likelyToBuy += 0.15;
      }
      
      if (viewingPatterns.documentsDownloaded > 0) {
        likelyToBuy += 0.1;
      }

      // Determine preferred property types
      const preferredProperties = this.extractPreferences(propertyViews);
      
      return {
        likelyToBuy: Math.min(likelyToBuy, 0.95),
        preferredProperties,
        suggestedProperties: [] // TODO: Implement property suggestions
      };
    } catch (error) {
      console.error('Error predicting buyer behavior:', error);
      throw error;
    }
  }

  // Market Analysis for Different Regions
  async analyzeMarketTrends(
    region: {
      state: string;
      district?: string;
      propertyType?: string;
    }
  ): Promise<MarketAnalysis> {
    try {
      // Implement market analysis based on Malaysian regions
      const stateGrowthRates: { [key: string]: number } = {
        'Selangor': 0.08,
        'Kuala Lumpur': 0.06,
        'Johor': 0.07,
        'Penang': 0.05,
        'Perak': 0.04,
        'Negeri Sembilan': 0.06,
        'Melaka': 0.05
      };

      const priceGrowth = stateGrowthRates[region.state] || 0.04;
      
      let demandLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
      const recommendations: string[] = [];

      // Analyze based on state
      if (['Selangor', 'Kuala Lumpur', 'Johor'].includes(region.state)) {
        demandLevel = 'HIGH';
        recommendations.push('High demand area - act quickly on good properties');
        recommendations.push('Consider upcoming infrastructure projects');
      } else if (['Penang', 'Negeri Sembilan'].includes(region.state)) {
        demandLevel = 'MEDIUM';
        recommendations.push('Stable market - good for long-term investment');
      } else {
        demandLevel = 'LOW';
        recommendations.push('Emerging market - potential for growth');
        recommendations.push('Research government development plans');
      }

      // Add property type specific recommendations
      if (region.propertyType === 'RESIDENTIAL') {
        recommendations.push('Focus on areas with good schools and amenities');
      } else if (region.propertyType === 'COMMERCIAL') {
        recommendations.push('Consider foot traffic and accessibility');
      }

      return {
        priceGrowth,
        demandLevel,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing market trends:', error);
      throw error;
    }
  }

  // Auction Property Analysis
  async analyzeAuctionProperty(
    property: IProperty
  ): Promise<{
    marketValue: number;
    recommendedBid: number;
    risks: string[];
    opportunities: string[];
  }> {
    try {
      if (!property.isAuction) {
        throw new Error('Property is not an auction property');
      }

      // Get JPPH valuation
      const valuation = await malaysianGovAPI.getJPPHValuation(
        property._id.toString(),
        property.landTitleNumber
      );

      const marketValue = valuation?.marketValue || property.price;
      const reservePrice = property.auctionDetails?.reservePrice || property.price;

      // Calculate recommended bid (conservative approach)
      const recommendedBid = Math.min(marketValue * 0.85, reservePrice * 1.05);

      const risks = [
        'Property sold as-is condition',
        'Potential hidden defects',
        'Title verification required',
        'Immediate payment required'
      ];

      const opportunities = [
        'Below market value potential',
        'Quick possession possible',
        'Investment opportunity',
        'No agent commission'
      ];

      // Add specific risks based on auction type
      if (property.auctionDetails?.courtOrder) {
        risks.push('Court-ordered sale - verify legal implications');
      }

      if (property.auctionDetails?.bankReference) {
        risks.push('Bank foreclosure - check outstanding amounts');
      }

      return {
        marketValue,
        recommendedBid,
        risks,
        opportunities
      };
    } catch (error) {
      console.error('Error analyzing auction property:', error);
      throw error;
    }
  }

  // Helper methods
  private calculateMarketAdjustment(property: IProperty, marketData: any): number {
    let adjustment = 1.0;
    
    // Location premium/discount
    if (['Kuala Lumpur', 'Selangor'].includes(property.location.state)) {
      adjustment += 0.1;
    }
    
    // Property age factor
    if (property.valuation.valuationDate) {
      const ageInYears = (Date.now() - property.valuation.valuationDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      if (ageInYears > 2) {
        adjustment -= 0.05;
      }
    }
    
    return adjustment;
  }

  private analyzeViewingPatterns(propertyViews: any[]): {
    averageTimeSpent: number;
    returnVisits: number;
    documentsDownloaded: number;
  } {
    if (!propertyViews.length) {
      return { averageTimeSpent: 0, returnVisits: 0, documentsDownloaded: 0 };
    }

    const totalTime = propertyViews.reduce((sum, view) => sum + (view.timeSpent || 0), 0);
    const uniqueVisits = new Set(propertyViews.map(view => view.sessionId)).size;
    const downloads = propertyViews.filter(view => view.action === 'download').length;

    return {
      averageTimeSpent: totalTime / propertyViews.length,
      returnVisits: propertyViews.length - uniqueVisits,
      documentsDownloaded: downloads
    };
  }

  private extractPreferences(propertyViews: any[]): string[] {
    const preferences: { [key: string]: number } = {};
    
    propertyViews.forEach(view => {
      if (view.propertyType) {
        preferences[view.propertyType] = (preferences[view.propertyType] || 0) + 1;
      }
    });

    return Object.entries(preferences)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type);
  }

  // Seller Agent Methods
  async sellerListProperty(property: IProperty, sellerId: string): Promise<IProperty> {
    try {
      console.log(`Seller agent processing new listing for seller ${sellerId}:`, property.title);
      
      // Perform market analysis for pricing recommendation
      const marketAnalysis = await this.analyzeMarketTrends({
        state: property.location.state,
        district: property.location.district,
        propertyType: property.category
      });

      // Generate pricing recommendations
      const valuationResult = await this.predictPropertyValue(property, marketAnalysis);
      
      console.log(`Market analysis complete. Recommended price range: RM ${valuationResult.predictedValue * 0.95} - RM ${valuationResult.predictedValue * 1.05}`);
      
      return property;
    } catch (error) {
      console.error('Error in seller list property:', error);
      return property;
    }
  }
}

export default new AgentSystemService();
