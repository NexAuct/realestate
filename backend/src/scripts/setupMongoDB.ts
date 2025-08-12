/**
 * MongoDB Setup and Seeding Script for Real Estate Blockchain + MAS 2025
 * This script sets up the database with sample data for testing
 */

import { initializeMongoDB } from '../config/mongodb';
import { 
  User, 
  Property, 
  Auction, 
  Transaction, 
  Agent, 
  ComplianceLog, 
  GovApiCache,
  Notification 
} from '../models/mongodb-schemas';
import mongoose from 'mongoose';

// Sample data for seeding
const sampleUsers = [
  {
    email: 'admin@realestate2025.my',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'System Administrator',
    phoneNumber: '+60123456789',
    nationalID: '880101145678',
    role: 'admin',
    permissions: ['all'],
    kycStatus: 'verified',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4e6D3b6e8d3e8A0',
    amlRiskLevel: 'low',
    isActive: true
  },
  {
    email: 'auctioneer@realestate2025.my',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Professional Auctioneer',
    phoneNumber: '+60129876543',
    nationalID: '850202123456',
    role: 'auctioneer',
    permissions: ['create_auction', 'manage_auction', 'view_analytics'],
    kycStatus: 'verified',
    walletAddress: '0x8ba1f109551bD432803012645Hac136c82c3e8C9',
    amlRiskLevel: 'low',
    isActive: true
  },
  {
    email: 'bidder1@realestate2025.my',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Ahmad Bin Abdullah',
    phoneNumber: '+60162233445',
    nationalID: '900303987654',
    role: 'bidder',
    permissions: ['place_bid', 'view_auctions', 'manage_profile'],
    kycStatus: 'verified',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    amlRiskLevel: 'low',
    bankingDetails: {
      bankName: 'Maybank',
      accountNumber: '1234567890',
      verified: true
    },
    isActive: true
  },
  {
    email: 'bidder2@realestate2025.my',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    name: 'Siti Nurhaliza',
    phoneNumber: '+60175566778',
    nationalID: '910404876543',
    role: 'bidder',
    permissions: ['place_bid', 'view_auctions', 'manage_profile'],
    kycStatus: 'verified',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    amlRiskLevel: 'medium',
    bankingDetails: {
      bankName: 'CIMB',
      accountNumber: '9876543210',
      verified: true
    },
    isActive: true
  }
];

const sampleProperties = [
  {
    title: 'Luxury Condominium in KLCC',
    titleBM: 'Kondominium Mewah di KLCC',
    description: 'Stunning 3-bedroom luxury condo with panoramic city views',
    descriptionBM: 'Kondominium mewah 3 bilik tidur dengan pemandangan bandar yang menakjubkan',
    type: 'condo',
    landTitleType: 'PAJAKAN',
    landTitleNumber: 'PN12345/2024',
    category: 'RESIDENTIAL',
    status: 'AVAILABLE',
    location: {
      address: 'Jalan Ampang, KLCC, 50450 Kuala Lumpur',
      state: 'Kuala Lumpur',
      district: 'KLCC',
      mukim: 'KLCC',
      postalCode: '50450',
      coordinates: { lat: 3.1587, lng: 101.7124 }
    },
    builtUpArea: 1800,
    landArea: 0,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 2,
    furnishing: 'FULLY_FURNISHED',
    yearBuilt: 2020,
    price: 1200000,
    valuation: {
      marketValue: 1200000,
      jpphValue: 1150000,
      valuationDate: new Date('2024-01-15'),
      valuationType: 'JPPH'
    },
    legalStatus: {
      strataCompliant: true,
      reservedLand: false,
      ownershipVerified: true,
      caveats: [],
      encumbrances: [],
      restrictions: []
    },
    ownership: {
      ownerName: 'Tan Sri Lim Kok Thay',
      titleNo: 'PN12345/2024',
      eTanahVerified: true,
      eTanahReference: 'ETA2024001234'
    },
    governmentRefs: {
      jpphPropertyId: 'JPPH2024005678',
      eTanahReference: 'ETA2024001234'
    },
    isAuctioned: true,
    auctionDetails: {
      reservePrice: 1000000,
      auctionDate: new Date('2024-02-15'),
      auctioneer: 'Professional Auctioneer',
      bankReference: 'MAYBANK/AUC/2024/001'
    },
    complianceStatus: {
      aml: true,
      rpgt: true,
      strata: true,
      stampDuty: true
    }
  },
  {
    title: 'Terrace House in Bangsar',
    titleBM: 'Rumah Teres di Bangsar',
    description: 'Beautiful 4-bedroom terrace house with garden',
    descriptionBM: 'Rumah teres 4 bilik tidur yang indah dengan taman',
    type: 'terrace',
    landTitleType: 'GERAN',
    landTitleNumber: 'GRN67890/2023',
    category: 'RESIDENTIAL',
    status: 'AVAILABLE',
    location: {
      address: 'Jalan Maarof, Bangsar, 59000 Kuala Lumpur',
      state: 'Kuala Lumpur',
      district: 'Bangsar',
      mukim: 'Bangsar',
      postalCode: '59000',
      coordinates: { lat: 3.1309, lng: 101.6717 }
    },
    builtUpArea: 2200,
    landArea: 2400,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpaces: 2,
    furnishing: 'PARTIALLY_FURNISHED',
    yearBuilt: 2018,
    price: 850000,
    valuation: {
      marketValue: 850000,
      jpphValue: 820000,
      valuationDate: new Date('2024-01-10'),
      valuationType: 'INDEPENDENT'
    },
    legalStatus: {
      strataCompliant: false,
      reservedLand: false,
      ownershipVerified: true,
      caveats: [],
      encumbrances: [],
      restrictions: []
    },
    ownership: {
      ownerName: 'Dato Sri Vincent Tan',
      titleNo: 'GRN67890/2023',
      eTanahVerified: true,
      eTanahReference: 'ETA2024005678'
    },
    isAuctioned: false
  }
];

const sampleAuctions = [
  {
    propertyId: null, // Will be set after property creation
    auctioneerId: null, // Will be set after user creation
    startTime: new Date('2024-02-15T10:00:00+08:00'),
    endTime: new Date('2024-02-15T16:00:00+08:00'),
    minBid: 1000000,
    bidIncrement: 10000,
    reservePrice: 1000000,
    currentHighestBid: 0,
    status: 'upcoming',
    registeredBidders: [],
    blacklistedBidders: [],
    complianceChecked: true,
    complianceChecks: [
      {
        type: 'AML_CHECK',
        passed: true,
        details: { riskLevel: 'low' },
        timestamp: new Date()
      },
      {
        type: 'PROPERTY_VERIFICATION',
        passed: true,
        details: { verifiedBy: 'JPPH' },
        timestamp: new Date()
      }
    ],
    governmentApproval: {
      jpphApproved: true,
      courtOrderReceived: true,
      eTanahVerified: true
    }
  }
];

const sampleAgents = [
  {
    type: 'AuctioneerAgent',
    internalId: 'AUCTIONEER_001',
    name: 'AI Auctioneer Agent Alpha',
    stateSnapshot: {
      currentTask: 'monitoring_auctions',
      decisionHistory: [],
      learningData: { accuracy: 0.95, efficiency: 0.88 },
      performanceMetrics: { accuracy: 0.95, efficiency: 0.88, compliance: 0.92 }
    },
    configuration: {
      riskTolerance: 0.3,
      learningRate: 0.1,
      decisionThreshold: 0.8
    },
    connectedSystems: ['JPPH_API', 'E_TANAH', 'BANK_INTEGRATION'],
    totalTasks: 150,
    successfulTasks: 142,
    failedTasks: 8
  },
  {
    type: 'ComplianceAgent',
    internalId: 'COMPLIANCE_001',
    name: 'AI Compliance Agent Beta',
    stateSnapshot: {
      currentTask: 'monitoring_transactions',
      decisionHistory: [],
      learningData: { fraudDetection: 0.97, amlAccuracy: 0.94 },
      performanceMetrics: { accuracy: 0.97, efficiency: 0.91, compliance: 0.98 }
    },
    configuration: {
      riskTolerance: 0.1,
      learningRate: 0.05,
      decisionThreshold: 0.95
    },
    connectedSystems: ['BNM_API', 'LHDN_API', 'SSM_API'],
    totalTasks: 500,
    successfulTasks: 490,
    failedTasks: 10
  }
];

// Main setup function
const setupDatabase = async () => {
  try {
    console.log('🚀 Starting MongoDB setup...');
    
    // Initialize connection
    await initializeMongoDB();
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Property.deleteMany({}),
      Auction.deleteMany({}),
      Transaction.deleteMany({}),
      Agent.deleteMany({}),
      ComplianceLog.deleteMany({}),
      GovApiCache.deleteMany({}),
      Notification.deleteMany({})
    ]);
    
    console.log('✅ Database cleared successfully');
    
    // Insert sample users
    console.log('👥 Creating sample users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ ${createdUsers.length} users created`);
    
    // Insert sample properties
    console.log('🏠 Creating sample properties...');
    const createdProperties = await Property.insertMany(sampleProperties);
    console.log(`✅ ${createdProperties.length} properties created`);
    
    // Insert sample agents
    console.log('🤖 Creating sample AI agents...');
    const createdAgents = await Agent.insertMany(sampleAgents);
    console.log(`✅ ${createdAgents.length} agents created`);
    
    // Create sample auction
    console.log('⚖️ Creating sample auction...');
    const auctionData = {
      ...sampleAuctions[0],
      propertyId: createdProperties[0]._id,
      auctioneerId: createdUsers[1]._id,
      registeredBidders: [createdUsers[2]._id, createdUsers[3]._id]
    };
    const createdAuction = await Auction.create(auctionData);
    console.log('✅ Sample auction created');
    
    // Create sample compliance logs
    console.log('📋 Creating sample compliance logs...');
    const complianceLogs = [
      {
        auctionId: createdAuction._id,
        propertyId: createdProperties[0]._id,
        regulation: 'AML',
        checkType: 'BIDDER_VERIFICATION',
        message: 'All bidders passed AML screening',
        passed: true,
        riskLevel: 'low',
        issues: [],
        recommendations: ['Continue monitoring'],
        agentId: createdAgents[1]._id
      },
      {
        propertyId: createdProperties[0]._id,
        regulation: 'STRATA',
        checkType: 'PROPERTY_COMPLIANCE',
        message: 'Property meets strata compliance requirements',
        passed: true,
        riskLevel: 'low',
        issues: [],
        recommendations: [],
        agentId: createdAgents[1]._id
      }
    ];
    await ComplianceLog.insertMany(complianceLogs);
    console.log('✅ Sample compliance logs created');
    
    // Create sample government API cache
    console.log('🏛️ Creating sample government API cache...');
    const govApiCaches = [
      {
        source: 'JPPH',
        relatedPropertyId: createdProperties[0]._id,
        endpoint: '/api/v1/property/valuation',
        method: 'GET',
        requestParams: { propertyId: 'JPPH2024005678' },
        response: { marketValue: 1200000, confidence: 0.95 },
        responseHash: 'abc123def456',
        isValid: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    ];
    await GovApiCache.insertMany(govApiCaches);
    console.log('✅ Sample government API cache created');
    
    // Create sample notifications
    console.log('🔔 Creating sample notifications...');
    const notifications = [
      {
        userId: createdUsers[2]._id,
        type: 'auction_start',
        title: 'Auction Starting Soon',
        message: 'Your registered auction for KLCC Condo starts in 2 hours',
        priority: 'high'
      },
      {
        userId: createdUsers[3]._id,
        type: 'system_alert',
        title: 'KYC Verification Complete',
        message: 'Your KYC verification has been completed successfully',
        priority: 'medium'
      }
    ];
    await Notification.insertMany(notifications);
    console.log('✅ Sample notifications created');
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Properties: ${createdProperties.length}`);
    console.log(`   Auctions: 1`);
    console.log(`   Agents: ${createdAgents.length}`);
    console.log(`   Compliance Logs: ${complianceLogs.length}`);
    console.log(`   Government API Cache: ${govApiCaches.length}`);
    console.log(`   Notifications: ${notifications.length}`);
    
  } catch (error) {
    console.error('❌ Error during database setup:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📴 Database connection closed');
  }
};

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

export { setupDatabase };
