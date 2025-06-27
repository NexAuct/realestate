import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { Gavel } from '@mui/icons-material';
import { useNotification } from '../../contexts/NotificationContext';
import { formatCurrency } from '../../utils/formatters';

interface BidPanelProps {
  currentBid: number;
  minBidIncrement: number;
  onPlaceBid: (amount: number) => Promise<void>;
  disabled?: boolean;
}

const BidPanel: React.FC<BidPanelProps> = ({ 
  currentBid, 
  minBidIncrement, 
  onPlaceBid, 
  disabled = false 
}) => {
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const minBid = currentBid + minBidIncrement;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(bidAmount);
    
    if (amount < minBid) {
      showNotification(`Minimum bid is ${formatCurrency(minBid)}`, 'error');
      return;
    }

    setLoading(true);
    try {
      await onPlaceBid(amount);
      setBidAmount('');
      showNotification('Bid placed successfully!', 'success');
    } catch (error) {
      showNotification('Failed to place bid', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Gavel sx={{ mr: 1 }} />
          Place Your Bid
        </Typography>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          Current bid: {formatCurrency(currentBid)}
        </Alert>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            type="number"
            inputProps={{ min: minBid, step: 1000 }}
            helperText={`Minimum: ${formatCurrency(minBid)}`}
            sx={{ mb: 2 }}
            disabled={disabled || loading}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={disabled || loading || !bidAmount}
            size="large"
          >
            {loading ? 'Placing Bid...' : 'Place Bid'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BidPanel;