# 🏗️ MongoDB Atlas Free Cluster Setup Guide
## Real Estate Auction Project - "realestate-auction"

### 📋 Prerequisites
- MongoDB Atlas account (free at https://cloud.mongodb.com)
- Node.js 22+ installed
- GitHub Copilot Chat or similar AI assistant (optional)

---

## 🎯 **Prompt for AI Assistants (GitHub Copilot Chat, MongoDB Chatbot, etc.)**

> 💬 **Copy-paste this exact prompt:**
>
> ```
> Create a free MongoDB Atlas cluster for my project "realestate-auction".
>
> Requirements:
> - Cluster Name: realestate-auction
> - Cloud Provider: AWS
> - Region: Singapore (ap-southeast-1)
> - Cluster Tier: M0 (Free Tier)
> - MongoDB Version: 6.0 or latest
> - Project Name: RealEstateMAS2025
> - Database Name: realestate2025
> - Enable IP allowlist: 0.0.0.0/0 (for development)
> - Create database user: admin with secure password
> - Generate connection string for Node.js Mongoose
> - Include sample dataset option
> ```

---

## 🖥️ **Option 1: MongoDB Atlas CLI Commands**

### Step 1: Install Atlas CLI
```bash
# macOS
brew install mongodb-atlas-cli

# Ubuntu/Debian
sudo apt-get install mongodb-atlas-cli

# Windows (via Chocolatey)
choco install mongodb-atlas-cli
```

### Step 2: Login to Atlas
```bash
atlas auth login
```

### Step 3: Create Free Cluster
```bash
# Create project
atlas project create RealEstateMAS2025

# Set as current project
atlas config set project_id <PROJECT_ID>

# Create cluster
atlas cluster create realestate-auction \
  --provider AWS \
  --region ap-southeast-1 \
  --tier M0 \
  --mdbVersion 6.0 \
  --backup false

# Wait for cluster creation
atlas cluster watch realestate-auction
```

### Step 4: Configure Network Access
```bash
# Add IP allowlist for development
atlas accessLists create 0.0.0.0/0 --comment "Development access"
```

### Step 5: Create Database User
```bash
# Generate secure password
DB_PASSWORD=$(openssl rand -base64 32)

# Create database user
atlas dbusers create admin \
  --password $DB_PASSWORD \
  --role readWriteAnyDatabase
```

### Step 6: Get Connection String
```bash
# Get connection string
atlas cluster connectionStrings describe realestate-auction
```

---

## 🌐 **Option 2: MongoDB Atlas Web UI Steps**

### Step 1: Sign Up/Login
1. Go to https://cloud.mongodb.com
2. Sign up or login with your account

### Step 2: Create Project
1. Click **"New Project"**
2. Project Name: `RealEstateMAS2025`
3. Add members (optional)
4. Click **"Create Project"**

### Step 3: Build Cluster
1. Click **"Build a Cluster"**
2. Choose **"Shared"** (free tier)
3. Configure:
   - **Cloud Provider**: AWS
   - **Region**: Singapore (ap-southeast-1)
   - **Cluster Tier**: M0 Sandbox (Free)
   - **Cluster Name**: realestate-auction
4. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 4: Configure Security
1. Go to **"Database Access"** → **"Add New Database User"**
   - Username: `admin`
   - Password: Generate secure password
   - Database User Privileges: **Read and write to any database**
   - Click **"Add User"**

2. Go to **"Network Access"** → **"Add IP Address"**
   - IP Address: `0.0.0.0/0`
   - Comment: "Development access"
   - Click **"Confirm"**

### Step 5: Get Connection String
1. Go to **"Database"** → **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Version: **4.1 or later**
5. Copy the connection string (replace `<password>` with your actual password)

---

## 🔗 **Connection String Format**

Your connection string will look like:
```
mongodb+srv://admin:<password>@realestate-auction.xxxxx.mongodb.net/realestate2025?retryWrites=true&w=majority
```

---

## 📁 **Environment Variables Setup**

Create or update your `.env` file:
```bash
# MongoDB Atlas
MONGODB_URI=mongodb+srv://admin:<password>@realestate-auction.xxxxx.mongodb.net/realestate2025?retryWrites=true&w=majority
MONGODB_DB_NAME=realestate2025
NODE_ENV=development

# Optional: For production
MONGODB_MAX_POOL_SIZE=10
MONGODB_SERVER_SELECTION_TIMEOUT_MS=5000
```

---

## 🧪 **Test Connection**

### Using MongoDB Compass
1. Download MongoDB Compass
2. Use connection string from Atlas
3. Test connection

### Using Node.js Script
```bash
cd backend
npm install
npm run test:db
```

### Quick Test Script
```javascript
// test-connection.js
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
};

testConnection();
```

---

## 📊 **Sample Dataset (Optional)**

### Enable Sample Dataset
1. In Atlas UI: **"Database"** → **"Load Sample Dataset"**
2. Or use CLI:
```bash
atlas clusters sampleData load realestate-auction
```

### Custom Seed Data
```bash
cd backend
npm run seed:database
```

---

## 🔐 **Security Best Practices**

### For Production
1. **Restrict IP allowlist** to specific IPs
2. **Use VPC peering** for AWS integration
3. **Enable encryption at rest**
4. **Rotate database passwords regularly**
5. **Use environment variables for secrets**

### Development vs Production
```bash
# Development
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/dev

# Production
MONGODB_URI=mongodb+srv://app-user:secure-password@cluster.mongodb.net/prod
```

---

## 🆘 **Troubleshooting**

### Common Issues
1. **Connection timeout**: Check IP allowlist
2. **Authentication failed**: Verify username/password
3. **Cluster not found**: Ensure cluster name is correct
4. **Network issues**: Check firewall settings

### Support Resources
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Connection Troubleshooting](https://docs.atlas.mongodb.com/troubleshoot-connection)
- [Community Forums](https://developer.mongodb.com/community/forums)

---

## 📞 **Next Steps**

1. ✅ Cluster created
2. ✅ Connection string obtained
3. ✅ Environment variables configured
4. ✅ Test connection successful
5. 🔄 Proceed with application deployment

---

**Created for Real Estate Auction Project - MAS 2025**
