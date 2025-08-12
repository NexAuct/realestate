# ⚡ Quick MongoDB Atlas Setup - One Command

## 🎯 **For AI Assistants (Copy-Paste)**

```
Create a free MongoDB Atlas cluster named "realestate-auction" on AWS Singapore region with M0 tier for my real estate auction project. Include connection string for Node.js Mongoose.
```

## 🖥️ **One-Command Setup (CLI)**

```bash
# Install and run setup
curl -sSL https://raw.githubusercontent.com/mongodb/mongodb-atlas-cli/main/installer/install.sh | bash
atlas auth login
atlas cluster create realestate-auction --provider AWS --region ap-southeast-1 --tier M0 --mdbVersion 6.0
```

## 🌐 **Manual Atlas UI (3 minutes)**

1. **Go to**: https://cloud.mongodb.com
2. **Click**: "Build a Cluster" → "Shared" → "AWS Singapore" → "M0 Free"
3. **Name**: `realestate-auction`
4. **Create**: Click "Create Cluster"
5. **Configure**: Add IP `0.0.0.0/0` and create user
6. **Connect**: Copy connection string

## 🔗 **Connection String Template**
```
mongodb+srv://<username>:<password>@realestate-auction.<cluster-id>.mongodb.net/realestate2025?retryWrites=true&w=majority
```

## 📋 **Environment Variables**
```bash
# Add to .env
MONGODB_URI=mongodb+srv://admin:<password>@realestate-auction.<cluster-id>.mongodb.net/realestate2025?retryWrites=true&w=majority
```

## ✅ **Test Connection**
```bash
npm install
npm run dev
```

**Total setup time: 3-5 minutes**
