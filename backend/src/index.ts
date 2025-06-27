import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { seedRBAC } from './utils/seedRBAC';
import authRoutes from './routes/auth';
import propertyRoutes from './routes/property';
import blockchainRoutes from './routes/blockchain';
import auctionRoutes from './routes/auction';
import complianceRoutes from './routes/compliance';
import cmsRoutes from './routes/cms';
import rbacRoutes from './routes/rbac';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB and seed RBAC
connectDB().then(() => {
  seedRBAC();
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Static file serving
app.use('/uploads', express.static('uploads'));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/blockchain', blockchainRoutes);
app.use('/api/auction', auctionRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/rbac', rbacRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`MyRealEstate Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
