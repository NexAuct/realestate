export interface AuctionProperty {
  id: string;
  titleNumber: string;
  address: string;
  propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL';
  landTitleType: 'GERAN' | 'HAKMILIK_SEMENTARA' | 'PAJAKAN' | 'RIZAB_MELAYU';
  reservePrice: number;
  currentBid: number;
  currentOwner: string;
  leadingBidderId?: string;
  status: 'PENDING' | 'ACTIVE' | 'CLOSED' | 'CANCELLED';
  startTime?: Date;
  endTime?: Date;
  isRizabMelayu: boolean;
  isRumahMampuMilik: boolean;
  state: string;
  district: string;
  mukim: string;
}

export interface BidEvent {
  bidderId: string;
  amount: number;
  timestamp: Date;
  auctionId: string;
  verified: boolean;
}

export interface ComplianceCheck {
  passed: boolean;
  issues: string[];
}

export interface AuctionBidder {
  id: string;
  name: string;
  icNumber: string;
  phoneNumber: string;
  email: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  amlRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  preApprovedAmount: number;
  bankingPartner?: string;
}

export interface PaymentMethod {
  type: 'DUITNOW_QR' | 'FPX' | 'MAYBANK2U' | 'CIMB_CLICKS';
  accountNumber?: string;
  bankCode?: string;
}

export interface AuctionResult {
  auctionId: string;
  winnerId: string;
  finalPrice: number;
  totalBids: number;
  duration: number;
  complianceStatus: 'COMPLIANT' | 'UNDER_REVIEW' | 'NON_COMPLIANT';
}