import mongoose, { Document, Schema } from 'mongoose';
import { 
  LandTitleType, 
  PropertyCategory, 
  PropertyStatus, 
  MalaysianLocation, 
  PropertyValuation, 
  RPGTDetails, 
  StampDutyDetails 
} from '../types/malaysianProperty';

export interface IBid {
  bidder: mongoose.Types.ObjectId;
  amount: number;
  timestamp: Date;
  bidderKYCStatus: boolean;
  bidderAMLClearance: boolean;
}

export interface IProperty extends Document {
  title: string;
  titleBM: string; // Bahasa Melayu title
  description: string;
  descriptionBM: string; // Bahasa Melayu description
  
  // Malaysian-specific property details
  landTitleType: LandTitleType;
  landTitleNumber: string;
  category: PropertyCategory;
  status: PropertyStatus;
  location: MalaysianLocation;
  
  // Property specifications
  builtUpArea?: number; // in sq ft
  landArea?: number; // in sq ft
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  furnishing?: 'FULLY_FURNISHED' | 'PARTIALLY_FURNISHED' | 'UNFURNISHED';
  
  // Financial details
  price: number;
  pricePerSqFt?: number;
  maintenanceFee?: number;
  assessmentTax?: number;
  quitRent?: number;
  
  // Valuation and tax information
  valuation: PropertyValuation;
  rpgtDetails?: RPGTDetails;
  stampDutyDetails?: StampDutyDetails;
  
  // Legal and compliance
  caveats: string[];
  encumbrances: string[];
  restrictions: string[];
  isRizabMelayu: boolean;
  isRumahMampuMilik: boolean;
  
  // Government integration references
  jpphPropertyId?: string;
  eTanahReference?: string;
  eConsentReference?: string;
  
  // Auction specific fields
  isAuction: boolean;
  auctionDetails?: {
    auctionDate: Date;
    reservePrice: number;
    auctioneer: string;
    courtOrder?: string;
    bankReference?: string;
  };

  // Blockchain references
  tokenId?: string;
  smartContractAddress?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const bidSchema = new Schema<IBid>({
  bidder: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  bidderKYCStatus: { type: Boolean, default: false },
  bidderAMLClearance: { type: Boolean, default: false }
});

const propertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  titleBM: { type: String, required: true },
  description: { type: String, required: true },
  descriptionBM: { type: String, required: true },

  // Malaysian-specific property details
  landTitleType: { 
    type: String, 
    enum: Object.values(LandTitleType),
    required: true 
  },
  landTitleNumber: { type: String, required: true },
  category: { 
    type: String, 
    enum: Object.values(PropertyCategory),
    required: true 
  },
  status: { 
    type: String, 
    enum: Object.values(PropertyStatus),
    required: true 
  },
  location: {
    state: { type: String, required: true },
    district: { type: String, required: true },
    mukim: { type: String, required: true },
    postalCode: { type: String, required: true },
    lot: { type: String, required: true },
    section: String,
    townArea: String
  },

  // Property specifications
  builtUpArea: Number,
  landArea: Number,
  bedrooms: Number,
  bathrooms: Number,
  parkingSpaces: Number,
  furnishing: {
    type: String,
    enum: ['FULLY_FURNISHED', 'PARTIALLY_FURNISHED', 'UNFURNISHED']
  },

  // Financial details
  price: { type: Number, required: true },
  pricePerSqFt: Number,
  maintenanceFee: Number,
  assessmentTax: Number,
  quitRent: Number,

  // Valuation and tax information
  valuation: {
    marketValue: { type: Number, required: true },
    valuationDate: { type: Date, required: true },
    jpphReference: String,
    valuationType: {
      type: String,
      enum: ['JPPH', 'INDEPENDENT', 'BANK'],
      required: true
    }
  },
  rpgtDetails: {
    acquisitionDate: Date,
    acquisitionPrice: Number,
    disposalPrice: Number,
    exemptionCategory: String,
    calculatedTax: Number
  },
  stampDutyDetails: {
    calculatedDuty: Number,
    dutyCategory: String,
    exemptionStatus: String,
    eStampingReference: String
  },

  // Legal and compliance
  caveats: [String],
  encumbrances: [String],
  restrictions: [String],
  isRizabMelayu: { type: Boolean, default: false },
  isRumahMampuMilik: { type: Boolean, default: false },

  // Government integration references
  jpphPropertyId: String,
  eTanahReference: String,
  eConsentReference: String,

  // Auction specific fields
  isAuction: { type: Boolean, default: false },
  auctionDetails: {
    auctionDate: Date,
    reservePrice: Number,
    auctioneer: String,
    courtOrder: String,
    bankReference: String
  },

  // Blockchain references
  tokenId: String,
  smartContractAddress: String
}, {
  timestamps: true
});

// Indexes for efficient querying
propertySchema.index({ 'location.state': 1, 'location.district': 1, 'location.mukim': 1 });
propertySchema.index({ landTitleType: 1, category: 1, status: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ isRizabMelayu: 1 });
propertySchema.index({ isRumahMampuMilik: 1 });
propertySchema.index({ isAuction: 1 });

export default mongoose.model<IProperty>('Property', propertySchema);
