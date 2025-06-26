# Real Estate Platform Backend

A Node.js/Express backend for a blockchain-enabled real estate platform with NFT tokenization capabilities.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Property Management**: CRUD operations for real estate listings
- **Blockchain Integration**: NFT minting and transfer capabilities for property tokenization
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, and input validation
- **TypeScript**: Full TypeScript support for type safety

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Blockchain**: Ethers.js for Ethereum interaction
- **Security**: Helmet, bcryptjs, CORS
- **Development**: TypeScript, ts-node-dev
- **Logging**: Morgan

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get current user profile
- `PATCH /profile` - Update user profile

### Properties (`/api/properties`)
- `GET /` - Get all properties (with filters)
- `POST /` - Create a new property listing
- `GET /:id` - Get a specific property
- `PATCH /:id` - Update a property
- `DELETE /:id` - Delete a property
- `GET /user/:userId` - Get properties by owner

### Blockchain (`/api/blockchain`)
- `POST /mint/:propertyId` - Mint property as NFT
- `GET /nft/:tokenId` - Get NFT information
- `POST /transfer/:tokenId` - Transfer NFT ownership
- `GET /wallet/:address/balance` - Get wallet balance
- `POST /wallet/generate` - Generate new wallet
- `POST /wallet/validate` - Validate wallet address

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/realestate

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Blockchain Configuration
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your-infura-project-id
PRIVATE_KEY=your-private-key-here
CONTRACT_ADDRESS=your-contract-address-here

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Start production server:
```bash
npm start
```

## Database Models

### User
- Email, password, name, role (buyer/seller/agent/admin)
- Optional wallet address for blockchain integration
- Password hashing with bcrypt

### Property
- Title, description, price, location details
- Property features (bedrooms, bathrooms, area, year built)
- Images, property type, listing type, status
- Owner reference and optional blockchain token information

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- CORS protection
- Helmet security headers
- Input validation and sanitization

## Blockchain Integration

The platform supports Ethereum-based NFT tokenization of real estate properties:

- **NFT Minting**: Convert property listings into NFTs
- **Ownership Transfer**: Transfer property ownership via blockchain
- **Metadata Storage**: Store property details as NFT metadata
- **Wallet Integration**: Support for Ethereum wallets

## Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run test` - Run tests (when implemented)

### Project Structure
```
src/
├── config/          # Database and other configurations
├── middleware/      # Express middleware (auth, validation)
├── models/          # Mongoose models
├── routes/          # API route handlers
├── services/        # Business logic and external services
└── index.ts         # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
