import { BaseAgent } from './BaseAgent';
import { BidEvent } from '../types/auction';

export class FraudDetectionAgent extends BaseAgent {
  private suspiciousPatterns: Map<string, any> = new Map();
  private bidderProfiles: Map<string, any> = new Map();
  private alertThresholds: any;

  constructor() {
    super('FraudDetectionAgent', 'AI-powered fraud detection for auction bidding');
    this.initializeDetectionRules();
  }

  private initializeDetectionRules(): void {
    this.alertThresholds = {
      rapidBidding: 5, // 5 bids within 1 minute
      bidJumping: 0.5, // 50% increase in bid amount
      suspiciousTimings: 3, // 3 bids in last 10 seconds
      newBidderHighValue: 500000, // RM 500K for new bidders
      multipleDevices: 3, // Same bidder from 3+ devices
      geolocationAnomaly: true // Bidding from unusual locations
    };
  }

  async analyzeBiddingPattern(auctionId: string, bidEvent: BidEvent): Promise<{
    riskScore: number;
    alerts: string[];
    recommendations: string[];
  }> {
    const alerts: string[] = [];
    const recommendations: string[] = [];
    let riskScore = 0;

    // Check rapid bidding pattern
    const rapidBiddingRisk = await this.detectRapidBidding(auctionId, bidEvent.bidderId);
    if (rapidBiddingRisk.detected) {
      alerts.push('Rapid bidding pattern detected');
      riskScore += 30;
    }

    // Check bid jumping (unusual bid increases)
    const bidJumpingRisk = await this.detectBidJumping(auctionId, bidEvent.amount);
    if (bidJumpingRisk.detected) {
      alerts.push(`Unusual bid jump: ${bidJumpingRisk.percentage}% increase`);
      riskScore += 25;
    }

    // Check shill bidding patterns
    const shillBiddingRisk = await this.detectShillBidding(auctionId, bidEvent.bidderId);
    if (shillBiddingRisk.detected) {
      alerts.push('Potential shill bidding detected');
      riskScore += 40;
      recommendations.push('Investigate bidder relationships');
    }

    // Check new bidder high-value pattern
    const newBidderRisk = await this.detectNewBidderAnomaly(bidEvent.bidderId, bidEvent.amount);
    if (newBidderRisk.detected) {
      alerts.push('New bidder with unusually high bid');
      riskScore += 20;
      recommendations.push('Enhanced KYC verification required');
    }

    // Check device/location anomalies
    const deviceRisk = await this.detectDeviceAnomalies(bidEvent.bidderId);
    if (deviceRisk.detected) {
      alerts.push('Multiple devices or suspicious locations');
      riskScore += 15;
    }

    // Check timing manipulation
    const timingRisk = await this.detectTimingManipulation(auctionId, bidEvent);
    if (timingRisk.detected) {
      alerts.push('Suspicious bidding timing pattern');
      riskScore += 35;
    }

    return { riskScore, alerts, recommendations };
  }

  async detectCollusion(auctionId: string, bidders: string[]): Promise<{
    detected: boolean;
    collusionGroups: string[][];
    evidence: string[];
  }> {
    const evidence: string[] = [];
    const collusionGroups: string[][] = [];

    // Analyze bidding patterns between bidders
    for (let i = 0; i < bidders.length; i++) {
      for (let j = i + 1; j < bidders.length; j++) {
        const bidderA = bidders[i];
        const bidderB = bidders[j];

        // Check coordinated bidding patterns
        const coordination = await this.analyzeCoordination(auctionId, bidderA, bidderB);
        if (coordination.suspicious) {
          evidence.push(`Coordinated bidding between ${bidderA} and ${bidderB}`);
          collusionGroups.push([bidderA, bidderB]);
        }

        // Check shared characteristics
        const sharedProfile = await this.checkSharedCharacteristics(bidderA, bidderB);
        if (sharedProfile.suspicious) {
          evidence.push(`Shared characteristics: ${sharedProfile.details}`);
        }
      }
    }

    return {
      detected: evidence.length > 0,
      collusionGroups,
      evidence
    };
  }

  async generateFraudReport(auctionId: string): Promise<any> {
    const report = {
      auctionId,
      timestamp: new Date().toISOString(),
      overallRiskScore: 0,
      detectedPatterns: [],
      suspiciousBidders: [],
      recommendations: [],
      aiAnalysis: {
        biddingPatterns: await this.analyzeBiddingPatterns(auctionId),
        networkAnalysis: await this.performNetworkAnalysis(auctionId),
        temporalAnalysis: await this.performTemporalAnalysis(auctionId)
      }
    };

    // Store fraud analysis results
    await this.storeFraudAnalysis(report);
    
    // Alert relevant authorities if high risk
    if (report.overallRiskScore > 70) {
      await this.alertAuthorities(auctionId, report);
    }

    return report;
  }

  private async detectRapidBidding(auctionId: string, bidderId: string): Promise<{
    detected: boolean;
    count: number;
  }> {
    // Analyze bidding frequency in the last minute
    const recentBids = await this.getRecentBids(auctionId, bidderId, 60); // 60 seconds
    return {
      detected: recentBids.length >= this.alertThresholds.rapidBidding,
      count: recentBids.length
    };
  }

  private async detectBidJumping(auctionId: string, currentBid: number): Promise<{
    detected: boolean;
    percentage: number;
  }> {
    const previousBid = await this.getPreviousBid(auctionId);
    if (!previousBid) return { detected: false, percentage: 0 };

    const increase = (currentBid - previousBid) / previousBid;
    return {
      detected: increase > this.alertThresholds.bidJumping,
      percentage: Math.round(increase * 100)
    };
  }

  private async detectShillBidding(auctionId: string, bidderId: string): Promise<{
    detected: boolean;
    confidence: number;
  }> {
    // AI analysis of bidding patterns to detect shill bidding
    const bidderHistory = await this.getBidderHistory(bidderId);
    const auctionBids = await this.getAuctionBids(auctionId);

    // Check for patterns like:
    // - Bidding only to drive up price without intent to win
    // - Coordinated bidding with seller or other parties
    // - Unusual bidding behavior compared to historical patterns

    let suspicionScore = 0;

    // Pattern 1: Never winning auctions despite high bids
    if (bidderHistory.totalAuctions > 5 && bidderHistory.wins === 0) {
      suspicionScore += 30;
    }

    // Pattern 2: Bidding stops when serious bidder enters
    const competitiveBidding = this.analyzeCompetitiveBidding(auctionBids, bidderId);
    if (competitiveBidding.suspicious) {
      suspicionScore += 40;
    }

    return {
      detected: suspicionScore > 50,
      confidence: suspicionScore
    };
  }

  private async detectNewBidderAnomaly(bidderId: string, bidAmount: number): Promise<{
    detected: boolean;
    riskLevel: string;
  }> {
    const bidderProfile = await this.getBidderProfile(bidderId);
    const isNewBidder = !bidderProfile || bidderProfile.totalBids < 3;
    const isHighValue = bidAmount > this.alertThresholds.newBidderHighValue;

    return {
      detected: isNewBidder && isHighValue,
      riskLevel: isNewBidder && isHighValue ? 'HIGH' : 'LOW'
    };
  }

  private async detectDeviceAnomalies(bidderId: string): Promise<{
    detected: boolean;
    details: string[];
  }> {
    const deviceHistory = await this.getBidderDeviceHistory(bidderId);
    const details: string[] = [];

    if (deviceHistory.uniqueDevices > this.alertThresholds.multipleDevices) {
      details.push(`Multiple devices: ${deviceHistory.uniqueDevices}`);
    }

    if (deviceHistory.suspiciousLocations.length > 0) {
      details.push(`Suspicious locations: ${deviceHistory.suspiciousLocations.join(', ')}`);
    }

    return {
      detected: details.length > 0,
      details
    };
  }

  private async detectTimingManipulation(auctionId: string, bidEvent: BidEvent): Promise<{
    detected: boolean;
    pattern: string;
  }> {
    // Detect last-second bidding patterns that might indicate manipulation
    const auctionEndTime = await this.getAuctionEndTime(auctionId);
    const timeToEnd = auctionEndTime.getTime() - bidEvent.timestamp.getTime();

    if (timeToEnd < 10000) { // Less than 10 seconds
      const recentBids = await this.getRecentBids(auctionId, bidEvent.bidderId, 10);
      if (recentBids.length >= this.alertThresholds.suspiciousTimings) {
        return {
          detected: true,
          pattern: 'Last-second bid sniping'
        };
      }
    }

    return { detected: false, pattern: '' };
  }

  // Helper methods for data retrieval
  private async getRecentBids(auctionId: string, bidderId: string, seconds: number): Promise<any[]> {
    // Implementation to get recent bids from database
    return [];
  }

  private async getPreviousBid(auctionId: string): Promise<number | null> {
    // Implementation to get previous bid amount
    return null;
  }

  private async getBidderHistory(bidderId: string): Promise<any> {
    // Implementation to get bidder's historical data
    return { totalAuctions: 0, wins: 0 };
  }

  private async getAuctionBids(auctionId: string): Promise<any[]> {
    // Implementation to get all bids for an auction
    return [];
  }

  private analyzeCompetitiveBidding(bids: any[], bidderId: string): { suspicious: boolean } {
    // AI analysis of competitive bidding patterns
    return { suspicious: false };
  }

  private async getBidderProfile(bidderId: string): Promise<any> {
    return this.bidderProfiles.get(bidderId);
  }

  private async getBidderDeviceHistory(bidderId: string): Promise<any> {
    // Implementation to get device and location history
    return { uniqueDevices: 1, suspiciousLocations: [] };
  }

  private async getAuctionEndTime(auctionId: string): Promise<Date> {
    // Implementation to get auction end time
    return new Date();
  }

  private async analyzeCoordination(auctionId: string, bidderA: string, bidderB: string): Promise<{
    suspicious: boolean;
    details: string;
  }> {
    // AI analysis of coordination between bidders
    return { suspicious: false, details: '' };
  }

  private async checkSharedCharacteristics(bidderA: string, bidderB: string): Promise<{
    suspicious: boolean;
    details: string;
  }> {
    // Check for shared IP addresses, devices, payment methods, etc.
    return { suspicious: false, details: '' };
  }

  private async analyzeBiddingPatterns(auctionId: string): Promise<any> {
    // AI-powered pattern analysis
    return {};
  }

  private async performNetworkAnalysis(auctionId: string): Promise<any> {
    // Network analysis of bidder relationships
    return {};
  }

  private async performTemporalAnalysis(auctionId: string): Promise<any> {
    // Temporal pattern analysis
    return {};
  }

  private async storeFraudAnalysis(report: any): Promise<void> {
    // Store fraud analysis results
  }

  private async alertAuthorities(auctionId: string, report: any): Promise<void> {
    // Alert relevant authorities about high-risk auction
  }
}