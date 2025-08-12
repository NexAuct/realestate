/**
 * MongoDB Database Schema for Real Estate Blockchain + MAS 2025
 * Comprehensive schema design for Malaysian real estate auction system
 */

import mongoose, { Document, Schema } from 'mongoose';

// ============================================
// 1. USERS COLLECTION
// ============================================

export interface IUser extends Document {
  // Basic Information
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  nationalID: string;
  
  // Role & Permissions
  role: 'bidder' | 'admin' | 'auctioneer' | 'agent' | 'compliance_officer';
  permissions: string[];
  
  // KYC & Compliance
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycDocuments: {
    type: string;
    url: string;
    verified: boolean;
  }[];
  
  // Financial
  walletAddress: string;
  bankingDetails: {
    bankName: string;
    accountNumber: string;
    verified: boolean;
  };
  
  // Risk Assessment
  amlRiskLevel: 'low' | 'medium' | 'high';
  amlLastChecked: Date;
  
  // Status
  isActive: boolean;
  lastLogin: Date;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  nationalID: { type: String, required: true, unique: true },
  
  role: { 
    type: String, 
    enum: ['bidder', 'admin', 'auctioneer', 'agent', 'compliance_officer'],
    required: true 
  },
  permissions: [{ type: String }],
  
  kycStatus: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  },
  kycDocuments: [{
    type: { type: String, required: true },
    url: { type: String, required: true },
    verified: { type: Boolean, default: false }
  }],
  
  walletAddress: { type: String, unique: true, sparse: true },
  bankingDetails: {
    bankName: String,
    accountNumber: String,
    verified: { type: Boolean, default: false }
  },
  
  amlRiskLevel: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'low' 
  },
  amlLastChecked: { type: Date, default: Date.now },
  
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ nationalID: 1 });
UserSchema.index({ walletAddress: 1 });
UserSchema.index({ kycStatus: 1 });
UserSchema.index({ amlRiskLevel: 1 });

// ============================================
// 2. PROPERTIES COLLECTION
// ============================================

export interface IProperty extends Document {
  // Basic Information
  title: string;
  titleBM: string;
  description: string;
  descriptionBM: string;
  
  // Location
  location: {
    address: string;
    state: string;
    district: string;
    mukim: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  
  // Property Details
  type: 'tanah' | 'condo' | 'apartment' | 'commercial' | 'terrace' | 'bungalow';
  landTitleType: 'GERAN' | 'HAKMILIK_SEMENTARA' | 'PAJAKAN' | 'RIZAB_MELAYU';
  landTitleNumber: string;
  category: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'AGRICULTURAL';
  status: 'AVAILABLE' | 'UNDER_CONTRACT' | 'SOLD' | 'AUCTION';
  
  // Specifications
  builtUpArea?: number;
  landArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  furnishing?: 'FULLY_FURNISHED' | 'PARTIALLY_FURNISHED' | 'UNFURNISHED';
  yearBuilt?: number;
  
  // Valuation
  valuation: {
    marketValue: number;
    jpphValue?: number;
    valuationDate: Date;
    valuationAgentId?: mongoose.Types.ObjectId;
    jpphReference?: string;
  };
  
  // Legal Status
  legalStatus: {
    strataCompliant: boolean;
    reservedLand: boolean;
    ownershipVerified: boolean;
    caveats: string[];
    encumbrances: string[];
    restrictions: string[];
  };
  
  // Ownership
  ownership: {
    ownerName: string;
    ownerId?: mongoose.Types.ObjectId;
    titleNo: string;
    eTanahVerified: boolean;
    eTanahReference?: string;
  };
  
  // Government References
  governmentRefs: {
    jpphPropertyId?: string;
    eTanahReference?: string;
    eConsentReference?: string;
    courtOrderNo?: string;
  };
  
  // Auction Status
  isAuctioned: boolean;
  auctionDetails?: {
    reservePrice: number;
    auctionDate: Date;
    auctioneer: string;
    bankReference?: string;
  };
  
  // Blockchain
  tokenId?: string;
  smartContractAddress?: string;
  
  // Compliance
  complianceStatus: {
    aml: boolean;
    rpgt: boolean;
    strata: boolean;
    stampDuty: boolean;
  };
}

const PropertySchema: Schema = new Schema({
  title: { type: String, required: true },
  titleBM: { type: String, required: true },
  description: { type: String, required: true },
  descriptionBM: { type: String, required: true },
  
  location: {
    address: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    mukim: { type: String, required: true },
    postalCode: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  
  type: { 
    type: String, 
    enum: ['tanah', 'condo', 'apartment', 'commercial', 'terrace', 'bungalow'],
    required: true 
  },
  landTitleType: { 
    type: String, 
    enum: ['GERAN', 'HAKMILIK_SEMENTARA', 'PAJAKAN', 'RIZAB_MELAYU'],
    required: true 
  },
  landTitleNumber: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['AVAILABLE', 'UNDER_CONTRACT', 'SOLD', 'AUCTION'],
    default: 'AVAILABLE' 
  },
  
  builtUpArea: Number,
  landArea: Number,
  bedrooms: Number,
  bathrooms: Number,
  parkingSpaces: Number,
  furnishing: {
    type: String,
    enum: ['FULLY_FURNISHED', 'PARTIALLY_FURNISHED', 'UNFURNISHED']
  },
  yearBuilt: Number,
  
  valuation: {
    marketValue: { type: Number, required: true },
    jpphValue: Number,
    valuationDate: { type: Date, required: true },
    valuationAgentId: { type: Schema.Types.ObjectId, ref: 'User' },
    jpphReference: String
  },
  
  legalStatus: {
    strataCompliant: { type: Boolean, default: false },
    reservedLand: { type: Boolean, default: false },
    ownershipVerified: { type: Boolean, default: false },
    caveats: [String],
    encumbrances: [String],
    restrictions: [String]
  },
  
  ownership: {
    ownerName: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    titleNo: { type: String, required: true },
    eTanahVerified: { type: Boolean, default: false },
    eTanahReference: String
  },
  
  governmentRefs: {
    jpphPropertyId: String,
    eTanahReference: String,
    eConsentReference: String,
    courtOrderNo: String
  },
  
  isAuctioned: { type: Boolean, default: false },
  auctionDetails: {
    reservePrice: Number,
    auctionDate: Date,
    auctioneer: String,
    bankReference: String
  },
  
  tokenId: String,
  smartContractAddress: String,
  
  complianceStatus: {
    aml: { type: Boolean, default: false },
    rpgt: { type: Boolean, default: false },
    strata: { type: Boolean, default: false },
    stampDuty: { type: Boolean, default: false }
  }
}, { timestamps: true });

// Indexes
PropertySchema.index({ 'location.state': 1, 'location.district': 1 });
PropertySchema.index({ landTitleType: 1, category: 1 });
PropertySchema.index({ 'valuation.marketValue': 1 });
PropertySchema.index({ isAuctioned: 1 });
PropertySchema.index({ tokenId: 1 });
PropertySchema.index({ 'governmentRefs.eTanahReference': 1 });

// ============================================
// 3. AUCTIONS COLLECTION
// ============================================

export interface IAuction extends Document {
  propertyId: mongoose.Types.ObjectId;
  auctioneerId: mongoose.Types.ObjectId;
  
  // Timing
  startTime: Date;
  endTime: Date;
  timezone: string;
  
  // Pricing
  minBid: number;
  bidIncrement: number;
  reservePrice: number;
  currentHighestBid: number;
  currentHighestBidder?: mongoose.Types.ObjectId;
  
  // Bids
  bids: [{
    bidderId: mongoose.Types.ObjectId;
    amount: number;
    timestamp: Date;
    isValid: boolean;
    complianceChecked: boolean;
  }];
  
  // Status
  status: 'upcoming' | 'active' | 'ended' | 'cancelled' | 'paused';
  
  // Participants
  registeredBidders: mongoose.Types.ObjectId[];
  blacklistedBidders: mongoose.Types.ObjectId[];
  
  // Compliance
  complianceChecked: boolean;
  complianceChecks: {
    type: string;
    passed: boolean;
    details: any;
    timestamp: Date;
  }[];
  
  // Government Integration
  governmentApproval: {
    jpphApproved: boolean;
    courtOrderReceived: boolean;
    eTanahVerified: boolean;
  };
  
  // Blockchain
  smartContractAddress?: string;
  escrowContractAddress?: string;
}

const AuctionSchema: Schema = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  auctioneerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  timezone: { type: String, default: 'Asia/Kuala_Lumpur' },
  
  minBid: { type: Number, required: true },
  bidIncrement: { type: Number, required: true },
  reservePrice: { type: Number, required: true },
  currentHighestBid: { type: Number, default: 0 },
  currentHighestBidder: { type: Schema.Types.ObjectId, ref: 'User' },
  
  bids: [{
    bidderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    isValid: { type: Boolean, default: true },
    complianceChecked: { type: Boolean, default: false }
  }],
  
  status: { 
    type: String, 
    enum: ['upcoming', 'active', 'ended', 'cancelled', 'paused'],
    default: 'upcoming' 
  },
  
  registeredBidders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blacklistedBidders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
  complianceChecked: { type: Boolean, default: false },
  complianceChecks: [{
    type: String,
    passed: Boolean,
    details: Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
  }],
  
  governmentApproval: {
    jpphApproved: { type: Boolean, default: false },
    courtOrderReceived: { type: Boolean, default: false },
    eTanahVerified: { type: Boolean, default: false }
  },
  
  smartContractAddress: String,
  escrowContractAddress: String
}, { timestamps: true });

// Indexes
AuctionSchema.index({ propertyId: 1 });
AuctionSchema.index({ auctioneerId: 1 });
AuctionSchema.index({ startTime: 1, endTime: 1 });
AuctionSchema.index({ status: 1 });
AuctionSchema.index({ 'bids.bidderId': 1 });

// ============================================
// 4. TRANSACTIONS COLLECTION
// ============================================

export interface ITransaction extends Document {
  auctionId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  bidderId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  
  // Financial Details
  amount: number;
  currency: string;
  exchangeRate?: number;
  
  // Payment Method
  method: 'duitnow' | 'fpx' | 'maybank2u' | 'cimbclicks' | 'crypto' | 'bank_transfer';
  paymentDetails: {
    bankName?: string;
    accountNumber?: string;
    transactionId?: string;
    cryptoHash?: string;
  };
  
  // Escrow & Smart Contract
  escrowSmartContractHash: string;
  smartContractAddress: string;
  
  // Status Tracking
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  failureReason?: string;
  
  // Compliance
  complianceChecks: {
    aml: boolean;
    kyc: boolean;
    sourceOfFunds: boolean;
  };
  
  // Timeline
  initiatedAt: Date;
  completedAt?: Date;
  
  // Government Integration
  taxCalculations: {
    rpgtAmount: number;
    stampDuty: number;
    legalFees: number;
    totalTax: number;
  };
  
  // Receipts & Documents
  documents: {
    type: string;
    url: string;
    verified: boolean;
  }[];
}

const TransactionSchema: Schema = new Schema({
  auctionId: { type: Schema.Types.ObjectId, ref: 'Auction', required: true },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  bidderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
  amount: { type: Number, required: true },
  currency: { type: String, default: 'MYR' },
  exchangeRate: Number,
  
  method: { 
    type: String, 
    enum: ['duitnow', 'fpx', 'maybank2u', 'cimbclicks', 'crypto', 'bank_transfer'],
    required: true 
  },
  paymentDetails: {
    bankName: String,
    accountNumber: String,
    transactionId: String,
    cryptoHash: String
  },
  
  escrowSmartContractHash: { type: String, required: true },
  smartContractAddress: { type: String, required: true },
  
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending' 
  },
  failureReason: String,
  
  complianceChecks: {
    aml: { type: Boolean, default: false },
    kyc: { type: Boolean, default: false },
    sourceOfFunds: { type: Boolean, default: false }
  },
  
  initiatedAt: { type: Date, default: Date.now },
  completedAt: Date,
  
  taxCalculations: {
    rpgtAmount: { type: Number, default: 0 },
    stampDuty: { type: Number, default: 0 },
    legalFees: { type: Number, default: 0 },
    totalTax: { type: Number, default: 0 }
  },
  
  documents: [{
    type: String,
    url: String,
    verified: { type: Boolean, default: false }
  }]
}, { timestamps: true });

// Indexes
TransactionSchema.index({ auctionId: 1 });
TransactionSchema.index({ bidderId: 1 });
TransactionSchema.index({ sellerId: 1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ escrowSmartContractHash: 1 });

// ============================================
// 5. AGENTS COLLECTION (AI/MAS PERSISTENCE)
// ============================================

export interface IAgent extends Document {
  type: 'AuctioneerAgent' | 'BidderAgent' | 'ComplianceAgent' | 'ValuationAgent' | 'FraudDetectionAgent';
  internalId: string;
  name: string;
  
  // State Management
  stateSnapshot: {
    currentTask?: string;
    decisionHistory: any[];
    learningData: any;
    performanceMetrics: {
      accuracy: number;
      efficiency: number;
      compliance: number;
    };
  };
  
  // Configuration
  configuration: {
    riskTolerance: number;
    learningRate: number;
    decisionThreshold: number;
  };
  
  // Activity Tracking
  lastActive: Date;
  totalTasks: number;
  successfulTasks: number;
  failedTasks: number;
  
  // Integration
  connectedSystems: string[];
  apiKeys: {
    service: string;
    key: string;
    lastUsed: Date;
  }[];
}

const AgentSchema: Schema = new Schema({
  type: { 
    type: String, 
    enum: ['AuctioneerAgent', 'BidderAgent', 'ComplianceAgent', 'ValuationAgent', 'FraudDetectionAgent'],
    required: true 
  },
  internalId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  
  stateSnapshot: {
    currentTask: String,
    decisionHistory: [Schema.Types.Mixed],
    learningData: Schema.Types.Mixed,
    performanceMetrics: {
      accuracy: { type: Number, default: 0 },
      efficiency: { type: Number, default: 0 },
      compliance: { type: Number, default: 0 }
    }
  },
  
  configuration: {
    riskTolerance: { type: Number, default: 0.5 },
    learningRate: { type: Number, default: 0.1 },
    decisionThreshold: { type: Number, default: 0.7 }
  },
  
  lastActive: { type: Date, default: Date.now },
  totalTasks: { type: Number, default: 0 },
  successfulTasks: { type: Number, default: 0 },
  failedTasks: { type: Number, default: 0 },
  
  connectedSystems: [String],
  apiKeys: [{
    service: String,
    key: String,
    lastUsed: Date
  }]
}, { timestamps: true });

// Indexes
AgentSchema.index({ type: 1 });
AgentSchema.index({ internalId: 1 });
AgentSchema.index({ lastActive: 1 });

// ============================================
// 6. COMPLIANCE LOGS COLLECTION
// ============================================

export interface IComplianceLog extends Document {
  auctionId?: mongoose.Types.ObjectId;
  propertyId?: mongoose.Types.ObjectId;
  transactionId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  
  // Compliance Details
  regulation: 'AML' | 'RPGT' | 'STRATA' | 'DSA' | 'KYC' | 'FRAUD_DETECTION';
  checkType: string;
  message: string;
  details: any;
  
  // Results
  passed: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  issues: string[];
  recommendations: string[];
  
  // References
  agentId?: mongoose.Types.ObjectId;
  governmentApi?: string;
  apiResponse?: any;
  
  // Timestamps
  timestamp: Date;
}

const ComplianceLogSchema: Schema = new Schema({
  auctionId: { type: Schema.Types.ObjectId, ref: 'Auction' },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property' },
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  
  regulation: { 
    type: String, 
    enum: ['AML', 'RPGT', 'STRATA', 'DSA', 'KYC', 'FRAUD_DETECTION'],
    required: true 
  },
  checkType: { type: String, required: true },
  message: { type: String, required: true },
  details: Schema.Types.Mixed,
  
  passed: { type: Boolean, required: true },
  riskLevel: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'],
    required: true 
  },
  issues: [String],
  recommendations: [String],
  
  agentId: { type: Schema.Types.ObjectId, ref: 'Agent' },
  governmentApi: String,
  apiResponse: Schema.Types.Mixed,
  
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes
ComplianceLogSchema.index({ auctionId: 1 });
ComplianceLogSchema.index({ propertyId: 1 });
ComplianceLogSchema.index({ transactionId: 1 });
ComplianceLogSchema.index({ regulation: 1 });
ComplianceLogSchema.index({ passed: 1 });
ComplianceLogSchema.index({ timestamp: 1 });

// ============================================
// 7. GOVERNMENT API CACHE COLLECTION
// ============================================

export interface IGovApiCache extends Document {
  source: 'e-Tanah' | 'JPPH' | 'BNM' | 'LHDN' | 'e-Lelong' | 'SSM' | 'PTG' | 'LandOffice';
  relatedPropertyId?: mongoose.Types.ObjectId;
  relatedUserId?: mongoose.Types.ObjectId;
  
  // Request Details
  endpoint: string;
  method: string;
  requestParams: any;
  
  // Response
  response: any;
  responseHash: string;
  
  // Validation
  isValid: boolean;
  validationErrors: string[];
  
  // Metadata
  timestamp: Date;
  expiresAt: Date;
  cacheHit: boolean;
}

const GovApiCacheSchema: Schema = new Schema({
  source: { 
    type: String, 
    enum: ['e-Tanah', 'JPPH', 'BNM', 'LHDN', 'e-Lelong', 'SSM', 'PTG', 'LandOffice'],
    required: true 
  },
  relatedPropertyId: { type: Schema.Types.ObjectId, ref: 'Property' },
  relatedUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  requestParams: Schema.Types.Mixed,
  
  response: Schema.Types.Mixed,
  responseHash: { type: String, required: true },
  
  isValid: { type: Boolean, default: true },
  validationErrors: [String],
  
  timestamp: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  cacheHit: { type: Boolean, default: false }
}, { timestamps: true });

// Indexes
GovApiCacheSchema.index({ source: 1 });
GovApiCacheSchema.index({ relatedPropertyId: 1 });
GovApiCacheSchema.index({ responseHash: 1 });
GovApiCacheSchema.index({ expiresAt: 1 });
GovApiCacheSchema.index({ timestamp: 1 });

// ============================================
// 8. NOTIFICATIONS COLLECTION
// ============================================

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'auction_start' | 'auction_end' | 'bid_placed' | 'outbid' | 'payment_due' | 'compliance_alert' | 'system_alert';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expiresAt?: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['auction_start', 'auction_end', 'bid_placed', 'outbid', 'payment_due', 'compliance_alert', 'system_alert'],
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  data: Schema.Types.Mixed,
  isRead: { type: Boolean, default: false },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium' 
  },
  expiresAt: Date
}, { timestamps: true });

// Indexes
NotificationSchema.index({ userId: 1 });
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ isRead: 1 });
NotificationSchema.index({ priority: 1 });

// ============================================
// EXPORT MODELS
// ============================================

export const User = mongoose.model<IUser>('User', UserSchema);
export const Property = mongoose.model<IProperty>('Property', PropertySchema);
export const Auction = mongoose.model<IAuction>('Auction', AuctionSchema);
export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export const Agent = mongoose.model<IAgent>('Agent', AgentSchema);
export const ComplianceLog = mongoose.model<IComplianceLog>('ComplianceLog', ComplianceLogSchema);
export const GovApiCache = mongoose.model<IGovApiCache>('GovApiCache', GovApiCacheSchema);
export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

// ============================================
// DATABASE CONNECTION SETUP
// ============================================

export const connectMongoDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// ============================================
// DATABASE INDEXES
// ============================================

export const createIndexes = async () => {
  try {
    // Compound indexes for complex queries
    await Property.collection.createIndex({ 
      'location.state': 1, 
      'location.district': 1, 
      'location.mukim': 1 
    });
    
    await Auction.collection.createIndex({ 
      startTime: 1, 
      endTime: 1, 
      status: 1 
    });
    
    await Transaction.collection.createIndex({ 
      bidderId: 1, 
      status: 1, 
      initiatedAt: -1 
    });
    
    await ComplianceLog.collection.createIndex({ 
      regulation: 1, 
      passed: 1, 
      timestamp: -1 
    });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};
