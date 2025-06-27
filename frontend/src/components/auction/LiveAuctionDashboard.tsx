import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Alert
} from '@mui/material';
import { Gavel, Timer, TrendingUp, Security } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface AuctionData {
  id: string;
  propertyTitle: string;
  currentBid: number;
  reservePrice: number;
  timeRemaining: number;
  totalBidders: number;
  bidHistory: BidEvent[];
  status: 'ACTIVE' | 'CLOSED' | 'PENDING';
}

interface BidEvent {
  bidderId: string;
  amount: number;
  timestamp: Date;
  verified: boolean;
}

const LiveAuctionDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'bm' ? 'ms-MY' : 'en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlaceBid = async () => {
    if (!bidAmount || !auctionData) return;

    const amount = parseFloat(bidAmount);
    if (amount <= auctionData.currentBid) {
      alert('Bid amount must be higher than current bid');
      return;
    }

    try {
      const response = await fetch('/api/auction/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auctionId: auctionData.id,
          amount
        })
      });

      if (response.ok) {
        setBidAmount('');
      }
    } catch (error) {
      console.error('Bid placement error:', error);
    }
  };

  if (!auctionData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Loading auction data...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Alert 
        severity={isConnected ? 'success' : 'warning'} 
        sx={{ mb: 2 }}
        icon={<Security />}
      >
        {isConnected ? 'Connected to live auction' : 'Connection lost'}
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Gavel sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h1">
                  {auctionData.propertyTitle}
                </Typography>
                <Chip 
                  label={auctionData.status} 
                  color={auctionData.status === 'ACTIVE' ? 'success' : 'default'}
                  sx={{ ml: 2 }}
                />
              </Box>

              <Box sx={{ textAlign: 'center', mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                <Typography variant="h3" color="primary.contrastText" fontWeight="bold">
                  {formatCurrency(auctionData.currentBid)}
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Current Bid
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Timer sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Time Remaining: {formatTime(auctionData.timeRemaining)}
                </Typography>
              </Box>

              {auctionData.status === 'ACTIVE' && (
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Bid Amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    type="number"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>RM</Typography>
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handlePlaceBid}
                    disabled={!bidAmount || parseFloat(bidAmount) <= auctionData.currentBid}
                    sx={{ minWidth: 120 }}
                  >
                    Place Bid
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1 }} />
                <Typography variant="h6">Bid History</Typography>
              </Box>
              
              <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {auctionData.bidHistory.slice(-10).reverse().map((bid, index) => (
                  <ListItem key={index} divider>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {bid.bidderId.charAt(0)}
                    </Avatar>
                    <ListItemText
                      primary={formatCurrency(bid.amount)}
                      secondary={new Date(bid.timestamp).toLocaleTimeString()}
                    />
                    {bid.verified && (
                      <Chip size="small" label="Verified" color="success" />
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LiveAuctionDashboard;