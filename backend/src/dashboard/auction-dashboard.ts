/**
 * Real Estate Auction Dashboard - MongoDB Atlas Dashboard
 * Real Estate Auction Project - MAS 2025
 * 
 * Dashboard for real-time auction analytics and management
 */

import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

interface DashboardData {
  monthlyAuctionVolume: Array<{ month: string; count: number }>;
  avgHighestBidByState: Array<{ state: string; avgBid: number }>;
  topActiveBidders: Array<{ userId: string; bidCount: number }>;
}

interface Property {
  _id: ObjectId;
  title: string;
  description: string;
  propertyType: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  owner: {
    ownerId: ObjectId;
    name: string;
  };
  auctionStatus: string;
  reservePrice: number;
  marketValue: number;
  lastAuctionDate: Date;
  propertyDocuments: Array<{
    type: string;
    url: string;
  }>;
  compliance: {
    digitalSignature: boolean;
    amlKycVerified: boolean;
    rpgTaxExempt: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface Auction {
  _id: ObjectId;
  propertyId: ObjectId;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  reservePrice: number;
  currentHighestBid: number;
  status: string;
  bids: Array<{
    userId: string;
    amount: number;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

class AuctionDashboard {
  private client: MongoClient;

  constructor(mongoUri: string) {
    this.client = new MongoClient(mongoUri);
  }

  async initialize() {
    await this.client.connect();
    console.log('✅ Dashboard connected to MongoDB');
  }

  async getMonthlyAuctionVolume(): Promise<Array<{ month: string; count: number }>> {
    const db = this.client.db('realestate2025');
    const auctions = db.collection<Auction>('auctions');
    
    const pipeline = [
      {
        $match: {
          startTime: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) // Last 12 months
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$startTime' },
            month: { $month: '$startTime' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $toString: { $substr: [{ $toString: { $toString: '$_id.month' } }, 0, 2] } }
            ]
          },
          count: 1,
          _id: 0
        }
      }
    ];
    
    const results = await auctions.aggregate(pipeline).toArray();
    return results.map(doc => ({
      month: doc.month || '',
      count: doc.count || 0
    }));
  }

  async getAverageHighestBidByState(): Promise<Array<{ state: string; avgBid: number }>> {
    const db = this.client.db('realestate2025');
    const auctions = db.collection<Auction>('auctions');
    const properties = db.collection<Property>('properties');
    
    const pipeline = [
      {
        $match: {
          startTime: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $lookup: {
          from: 'properties',
          localField: 'propertyId',
          foreignField: '_id',
          as: 'property'
        }
      },
      {
        $unwind: '$property'
      },
      {
        $group: {
          _id: '$property.state',
          avgBid: { $avg: '$currentHighestBid' }
        }
      },
      {
        $sort: { avgBid: -1 }
      },
      {
        $project: {
          state: '$_id',
          avgBid: { $round: ['$avgBid', 2] },
          _id: 0
        }
      }
    ];
    
    const results = await auctions.aggregate(pipeline).toArray();
    return results.map(doc => ({
      state: doc.state || '',
      avgBid: doc.avgBid || 0
    }));
  }

  async getTopActiveBidders(): Promise<Array<{ userId: string; bidCount: number }>> {
    const db = this.client.db('realestate2025');
    const auctions = db.collection<Auction>('auctions');
    
    const pipeline = [
      {
        $match: {
          startTime: {
            $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $unwind: '$bids'
      },
      {
        $group: {
          _id: '$bids.userId',
          bidCount: { $sum: 1 }
        }
      },
      {
        $sort: { bidCount: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          userId: { $toString: '$_id' },
          bidCount: 1,
          _id: 0
        }
      }
    ];
    
    const results = await auctions.aggregate(pipeline).toArray();
    return results.map(doc => ({
      userId: doc.userId || '',
      bidCount: doc.bidCount || 0
    }));
  }

  async generateDashboardData(): Promise<DashboardData> {
    const [monthlyAuctionVolume, avgHighestBidByState, topActiveBidders] = await Promise.all([
      this.getMonthlyAuctionVolume(),
      this.getAverageHighestBidByState(),
      this.getTopActiveBidders()
    ]);

    return {
      monthlyAuctionVolume,
      avgHighestBidByState,
      topActiveBidders
    };
  }

  async close() {
    await this.client.close();
  }
}

// Export for use in other modules
export { AuctionDashboard };
