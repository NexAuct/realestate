import express from 'express';
import { AuctionDashboard } from '../dashboard/auction-dashboard';

const router = express.Router();

// GET /api/dashboard/data
router.get('/dashboard/data', async (req, res) => {
  try {
    const dashboard = new AuctionDashboard(process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate2025');
    await dashboard.initialize();
    
    const data = await dashboard.generateDashboardData();
    
    await dashboard.close();
    
    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load dashboard data'
    });
  }
});

// GET /api/dashboard/charts
router.get('/dashboard/charts', async (req, res) => {
  try {
    const dashboard = new AuctionDashboard(process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate2025');
    await dashboard.initialize();
    
    const data = await dashboard.generateDashboardData();
    
    // Return chart data in format suitable for Chart.js
    const chartData = {
      monthlyAuctionVolume: {
        labels: data.monthlyAuctionVolume.map(item => item.month),
        datasets: [{
          label: 'Monthly Auction Volume',
          data: data.monthlyAuctionVolume.map(item => item.count),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        }]
      },
      avgHighestBidByState: {
        labels: data.avgHighestBidByState.map(item => item.state),
        datasets: [{
          label: 'Average Highest Bid',
          data: data.avgHighestBidByState.map(item => item.avgBid),
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      topActiveBidders: {
        labels: data.topActiveBidders.map(item => item.userId),
        datasets: [{
          data: data.topActiveBidders.map(item => item.bidCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ]
        }]
      }
    };
    
    await dashboard.close();
    
    res.json({
      success: true,
      chartData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard charts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load dashboard charts'
    });
  }
});

export default router;
