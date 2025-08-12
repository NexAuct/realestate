#!/bin/bash
# MongoDB Atlas Free Cluster Setup Script
# Real Estate Auction Project - MAS 2025

set -e

echo "🚀 Setting up MongoDB Atlas Free Cluster for Real Estate Auction Project"
echo "======================================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Atlas CLI is installed
if ! command -v atlas &> /dev/null; then
    echo -e "${RED}❌ MongoDB Atlas CLI not found. Installing...${NC}"
    
    # Detect OS and install
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Ubuntu/Debian
        wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
        sudo apt update
        sudo apt install -y mongodb-atlas-cli
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew tap mongodb/brew
        brew install mongodb-atlas-cli
    else
        echo -e "${RED}Please install MongoDB Atlas CLI manually from: https://www.mongodb.com/docs/atlas/cli/stable/install-atlas-cli/${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Atlas CLI installed${NC}"

# Login to Atlas
echo -e "${YELLOW}🔐 Logging into MongoDB Atlas...${NC}"
atlas auth login

# Create project
echo -e "${YELLOW}📁 Creating project...${NC}"
PROJECT_ID=$(atlas project create RealEstateMAS2025 --output json | jq -r '.id')
echo -e "${GREEN}✅ Project created: $PROJECT_ID${NC}"

# Set project
atlas config set project_id $PROJECT_ID

# Create cluster
echo -e "${YELLOW}🏗️ Creating free cluster...${NC}"
atlas cluster create realestate-auction \
  --provider AWS \
  --region ap-southeast-1 \
  --tier M0 \
  --mdbVersion 6.0 \
  --backup false

# Wait for cluster creation
echo -e "${YELLOW}⏳ Waiting for cluster creation...${NC}"
atlas cluster watch realestate-auction

# Configure network access
echo -e "${YELLOW}🌐 Configuring network access...${NC}"
atlas accessLists create 0.0.0.0/0 --comment "Development access"

# Generate secure password
DB_PASSWORD=$(openssl rand -base64 32)
echo -e "${GREEN}🔑 Generated secure password${NC}"

# Create database user
echo -e "${YELLOW}👤 Creating database user...${NC}"
atlas dbusers create admin \
  --password "$DB_PASSWORD" \
  --role readWriteAnyDatabase

# Get connection string
echo -e "${YELLOW}🔗 Getting connection string...${NC}"
CONNECTION_STRING=$(atlas cluster connectionStrings describe realestate-auction --output json | jq -r '.standardSrv')

# Display results
echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "================================"
echo -e "${YELLOW}Connection String:${NC}"
echo "$CONNECTION_STRING"
echo ""
echo -e "${YELLOW}Database User:${NC} admin"
echo -e "${YELLOW}Password:${NC} $DB_PASSWORD"
echo ""
echo -e "${YELLOW}Add to your .env file:${NC}"
echo "MONGODB_URI=$CONNECTION_STRING"
echo "MONGODB_DB_NAME=realestate2025"

# Save credentials to file
cat > .mongodb-credentials << EOF
# MongoDB Atlas Credentials - Keep this file secure!
MONGODB_URI=$CONNECTION_STRING
DB_USER=admin
DB_PASSWORD=$DB_PASSWORD
EOF

echo ""
echo -e "${GREEN}✅ Credentials saved to .mongodb-credentials${NC}"
echo -e "${YELLOW}⚠️ Remember to add .mongodb-credentials to .gitignore!${NC}"

# Test connection
echo -e "${YELLOW}🧪 Testing connection...${NC}"
npm install mongodb
node -e "
const { MongoClient } = require('mongodb');
const uri = '$CONNECTION_STRING';
const client = new MongoClient(uri);
client.connect()
  .then(() => {
    console.log('✅ Connection successful!');
    return client.close();
  })
  .catch(err => {
    console.error('❌ Connection failed:', err);
    process.exit(1);
  });
"

echo -e "${GREEN}🚀 All done! Your MongoDB cluster is ready.${NC}"
