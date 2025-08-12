/**
 * MongoDB Configuration for Real Estate Blockchain + MAS 2025
 * Production-ready MongoDB setup with connection pooling and monitoring
 */

import mongoose from 'mongoose';
import { connectMongoDB, createIndexes } from '../models/mongodb-schemas';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate2025';

// MongoDB connection options
const mongoOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority', // Write concern
  readPreference: 'primaryPreferred', // Read preference
};

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

// Initialize MongoDB connection
export const initializeMongoDB = async () => {
  try {
    await connectMongoDB(MONGODB_URI);
    await createIndexes();
    
    // Set mongoose debug mode for development
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
    
    console.log('🚀 MongoDB initialization complete');
  } catch (error) {
    console.error('❌ Failed to initialize MongoDB:', error);
    process.exit(1);
  }
};

// Health check function
export const checkMongoHealth = async () => {
  try {
    const admin = mongoose.connection.db.admin();
    const result = await admin.ping();
    return result.ok === 1;
  } catch (error) {
    console.error('MongoDB health check failed:', error);
    return false;
  }
};

// Get connection stats
export const getMongoStats = async () => {
  try {
    const admin = mongoose.connection.db.admin();
    const stats = await admin.serverStatus();
    return {
      connections: stats.connections,
      network: stats.network,
      opcounters: stats.opcounters,
      mem: stats.mem,
    };
  } catch (error) {
    console.error('Error getting MongoDB stats:', error);
    return null;
  }
};

// Export mongoose instance
export { mongoose };
export default mongoose;
