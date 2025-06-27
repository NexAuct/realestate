import { BaseAgent } from './BaseAgent';
import { AuctionProperty, BidEvent, ComplianceCheck } from '../types/auction';

export class AuctioneerAgent extends BaseAgent {
  private currentAuctions: Map<string, AuctionProperty> = new Map();
  private bidHistory: Map<string, BidEvent[]> = new Map();

  constructor() {
    super('AuctioneerAgent', 'Manages auction processes and compliance');
  }

  async startAuction(property: AuctionProperty): Promise<string> {
    const auctionId = this.generateAuctionId();
    
    const complianceResult = await this.performComplianceChecks(property);
    if (!complianceResult.passed) {
      throw new Error(`Compliance failed: ${complianceResult.issues.join(', ')}`);
    }

    this.currentAuctions.set(auctionId, {
      ...property,
      status: 'ACTIVE',
      startTime: new Date(),
      currentBid: property.reservePrice
    });

    this.bidHistory.set(auctionId, []);
    await this.notifyStakeholders(auctionId, 'AUCTION_STARTED');
    return auctionId;
  }

  async processBid(auctionId: string, bidderId: string, amount: number): Promise<boolean> {
    const auction = this.currentAuctions.get(auctionId);
    if (!auction || auction.status !== 'ACTIVE' || amount <= auction.currentBid) {
      return false;
    }

    const kycResult = await this.verifyBidder(bidderId, amount);
    if (!kycResult.approved) {
      await this.flagSuspiciousActivity(bidderId, amount, kycResult.reason || 'KYC_FAILED');
      return false;
    }

    const bidEvent: BidEvent = {
      bidderId,
      amount,
      timestamp: new Date(),
      auctionId,
      verified: true
    };

    auction.currentBid = amount;
    auction.leadingBidderId = bidderId;
    this.bidHistory.get(auctionId)?.push(bidEvent);
    
    await this.broadcastBidUpdate(auctionId, bidEvent);
    return true;
  }

  async closeAuction(auctionId: string): Promise<void> {
    const auction = this.currentAuctions.get(auctionId);
    if (!auction) return;

    auction.status = 'CLOSED';
    auction.endTime = new Date();

    if (auction.leadingBidderId) {
      await this.initiateTransfer(auctionId, auction.leadingBidderId);
    }

    await this.generateComplianceReport(auctionId);
  }

  private async performComplianceChecks(property: AuctionProperty): Promise<ComplianceCheck> {
    const checks = [
      await this.checkLandTitleStatus(property.titleNumber),
      await this.verifyAuctioneerLicense(),
      await this.validateReservePrice(property.reservePrice),
      await this.checkRizabMelayuStatus(property)
    ];

    const failed = checks.filter(check => !check.passed);
    return {
      passed: failed.length === 0,
      issues: failed.map(check => check.issue).filter(Boolean) as string[]
    };
  }

  private async verifyBidder(bidderId: string, amount: number): Promise<{approved: boolean, reason?: string}> {
    if (amount > 1000000) {
      const amlCheck = await this.performAMLCheck(bidderId);
      if (!amlCheck.passed) {
        return { approved: false, reason: 'AML_FAILED' };
      }
    }

    const kycStatus = await this.checkKYCStatus(bidderId);
    return { approved: kycStatus.verified, reason: kycStatus.reason };
  }

  private generateAuctionId(): string {
    return `AUC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async notifyStakeholders(auctionId: string, event: string): Promise<void> {
    await this.emitBlockchainEvent('AuctionEvent', {
      auctionId,
      event,
      timestamp: new Date().toISOString()
    });
  }

  private async broadcastBidUpdate(auctionId: string, bidEvent: BidEvent): Promise<void> {
    await this.broadcastToClients('bidUpdate', {
      auctionId,
      currentBid: bidEvent.amount,
      timestamp: bidEvent.timestamp
    });
  }

  private async initiateTransfer(auctionId: string, winnerId: string): Promise<void> {
    const auction = this.currentAuctions.get(auctionId);
    if (!auction) return;

    await this.requestTitleTransfer({
      titleNumber: auction.titleNumber,
      fromOwner: auction.currentOwner,
      toOwner: winnerId,
      salePrice: auction.currentBid,
      auctionId
    });
  }

  private async generateComplianceReport(auctionId: string): Promise<void> {
    const auction = this.currentAuctions.get(auctionId);
    const bids = this.bidHistory.get(auctionId) || [];

    const report = {
      auctionId,
      property: auction,
      totalBids: bids.length,
      finalPrice: auction?.currentBid,
      winner: auction?.leadingBidderId,
      complianceStatus: 'COMPLIANT',
      generatedAt: new Date().toISOString()
    };

    await this.storeComplianceRecord(report);
  }
}