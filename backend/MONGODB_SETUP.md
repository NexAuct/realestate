# MongoDB Database Setup Guide - Real Estate Blockchain + MAS 2025

This guide provides comprehensive instructions for setting up and using the MongoDB database schema for the Real Estate Blockchain + MAS 2025 project.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Seeding Data](#seeding-data)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This MongoDB implementation provides a comprehensive database schema for the Malaysian Real Estate Blockchain + MAS 2025 project, featuring:

- **Complete Malaysian Property System**: Designed specifically for Malaysian real estate auctions
- **Blockchain Integration**: Ready for Web3 integration with smart contracts
- **MAS 2025 Compliance**: Built for Malaysian government regulatory requirements
- **AI/MAS Agent Support**: Persistent AI agent state management
- **Real-time Auctions**: Live bidding and transaction tracking
- **Government API Integration**: Seamless integration with Malaysian government systems

## 🗄️ Database Schema

### Collections Overview

| Collection | Purpose | Key Features |
|------------|---------|--------------|
| **users** | User management with KYC, AML, and role-based access | Multi-role support, compliance tracking |
| **properties** | Complete Malaysian property details | Government integration, legal status |
| **auctions** | Real-time auction management | Live bidding, compliance monitoring |
| **transactions** | Financial transaction tracking | Escrow support, tax calculations |
| **agents** | AI/MAS agent persistence | State management, performance tracking |
| **compliance_logs** | Regulatory compliance tracking | Audit trails, risk assessment |
| **gov_api_cache** | Government API caching | Performance optimization, data validation |
| **notifications** | User notifications | Real-time alerts, system updates |

### Key Features

#### ✅ Malaysian-Specific Design
- **Land Title Types**: GERAN, HAKMILIK_SEMENTARA, PAJAKAN, RIZAB_MELAYU
- **Government Integration**: JPPH, e-Tanah, e-Consent, court orders
- **Tax Calculations**: RPGT, stamp duty, legal fees
- **Location System**: State, district, mukim, postal code

#### ✅ Blockchain Ready
- **Smart Contract Integration**: Token IDs, contract addresses
- **Escrow Support**: Smart contract hash tracking
- **Web3 Wallet**: Ethereum address support
- **Tokenization**: Property tokenization ready

#### ✅ AI/MAS Support
- **Agent State Management**: Persistent AI agent states
- **Performance Tracking**: Accuracy, efficiency, compliance metrics
- **Learning Systems**: Machine learning integration
- **Decision Making**: Risk assessment, compliance checks

## 🚀 Installation

### Prerequisites
- Node.js 18+ or 20+
- MongoDB 6.0+
- npm or yarn

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Environment Configuration
Create a `.env` file in the backend directory:
```bash
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/realestate2025

# Application Configuration
NODE_ENV=development
PORT=5000

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d

# Blockchain Configuration
WEB3_PROVIDER_URL=https://mainnet.infura.io/v3/your_project_id
```

### Step 3: Database Setup
```bash
# Start MongoDB
mongod --dbpath /path/to/data

# Run setup script
npm run setup:mongodb
```

## ⚙️ Configuration

### Connection Options
The system uses optimized connection settings:
- **Connection Pool**: 10 connections max
- **Timeout**: 5 seconds server selection, 45 seconds socket
- **Write Concern**: Majority write concern
- **Read Preference**: Primary preferred

### Environment Variables
```bash
# Required
MONGODB_URI=mongodb://localhost:27017/realestate2025

# Optional
NODE_ENV=development
MONGODB_MAX_POOL_SIZE=10
MONGODB_SERVER_SELECTION_TIMEOUT=5000
```

## 🎯 Usage

### Basic Connection
```typescript
import { initializeMongoDB } from './config/mongodb';

await initializeMongoDB();
```

### Using Models
```typescript
import { User, Property, Auction } from './models/mongodb-schemas';

// Create a user
const user = await User.create({
  email: 'user@example.com',
  name: 'John Doe',
  role: 'bidder'
});

// Create a property
const property = await Property.create({
  title: 'Luxury Condo',
  type: 'condo',
  price: 1200000,
  location: {
    address: 'KLCC, Kuala Lumpur',
    coordinates: { lat: 3.1587, lng: 101.7124 }
  }
});
```

### Querying Data
```typescript
// Find properties in KLCC
const properties = await Property.find({
  'location.state': 'Kuala Lumpur',
  'location.district': 'KLCC'
});

// Find active auctions
const auctions = await Auction.find({
  status: 'active',
  endTime: { $gt: new Date() }
});
```

## 🌱 Seeding Data

### Automatic Setup
```bash
# Run the setup script
npm run setup:mongodb

# Or run manually
node backend/src/scripts/setupMongoDB.js
```

### Manual Seeding
```typescript
import { setupDatabase } from './scripts/setupMongoDB';
await setupDatabase();
```

### Sample Data
The setup script creates:
- **4 Users**: Admin, auctioneer, and 2 bidders
- **2 Properties**: KLCC condo and Bangsar terrace
- **1 Auction**: KLCC condo auction
- **2 AI Agents**: Auctioneer and compliance agents
- **Compliance logs**: AML and property verification
- **Government API cache**: JPPH valuation data

## 🔧 Maintenance

### Regular Tasks
```bash
# Update indexes
npm run db:update-indexes

# Health check
npm run db:health-check

# Backup data
npm run db:backup

# Clean old data
npm run db:cleanup
```

### Monitoring
```typescript
import { checkMongoHealth, getMongoStats } from './config/mongodb';

// Health check
const isHealthy = await checkMongoHealth();

// Get stats
const stats = await getMongoStats();
```

### Backup & Restore
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/realestate2025" --out=./backup

# Restore
mongorestore --uri="mongodb://localhost:27017/realestate2025" ./backup/realestate2025
```

## 🐛 Troubleshooting

### Common Issues

#### Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check logs
tail -f /var/log/mongodb/mongod.log
```

#### Performance Issues
```bash
# Check indexes
db.users.getIndexes()

# Check connection stats
db.serverStatus().connections

# Check slow queries
db.setProfilingLevel(2)
```

#### Data Issues
```bash
# Validate data
db.users.find().limit(5)

# Check for duplicates
db.users.aggregate([{ $group: { _id: "$email", count: { $sum: 1 } } }])
```

### Error Handling
```typescript
try {
  await User.create(userData);
} catch (error) {
  if (error.code === 11000) {
    console.error('Duplicate email:', error);
  } else {
    console.error('Database error:', error);
  }
}
```

## 📞 Support

For technical support or questions:
- **GitHub Issues**: [Create an issue](https://github.com/your-repo/issues)
- **Documentation**: [Read the docs](https://your-docs-url.com)
- **Community**: [Join our Discord](https://discord.gg/your-server)

## 📄 License

This MongoDB implementation is part of the Real Estate Blockchain + MAS 2025 project and is licensed under the MIT License.
