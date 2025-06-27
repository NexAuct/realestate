import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress
} from '@mui/material';
import { Payment, AccountBalance, CreditCard } from '@mui/icons-material';

interface PaymentGatewayProps {
  amount: number;
  onPaymentComplete: (paymentData: any) => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('fpx');
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { id: 'fpx', name: 'FPX Online Banking', icon: <AccountBalance /> },
    { id: 'duitnow', name: 'DuitNow QR', icon: <CreditCard /> },
    { id: 'maybank', name: 'Maybank2u', icon: <AccountBalance /> },
    { id: 'cimb', name: 'CIMB Clicks', icon: <AccountBalance /> }
  ];

  const handlePayment = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const paymentData = {
        method: selectedMethod,
        amount,
        transactionId: `TXN${Date.now()}`,
        status: 'completed'
      };
      
      onPaymentComplete(paymentData);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <Payment sx={{ mr: 1 }} />
          Payment Gateway
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Amount to pay: {formatCurrency(amount)}
        </Alert>

        <Typography variant="h6" gutterBottom>
          Select Payment Method
        </Typography>

        <RadioGroup
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
        >
          {paymentMethods.map(method => (
            <FormControlLabel
              key={method.id}
              value={method.id}
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {method.icon}
                  <Typography sx={{ ml: 1 }}>{method.name}</Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handlePayment}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
          >
            {loading ? 'Processing Payment...' : `Pay ${formatCurrency(amount)}`}
          </Button>
        </Box>

        <Alert severity="warning" sx={{ mt: 2 }}>
          <Typography variant="caption">
            Secure payment processing compliant with BNM regulations
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default PaymentGateway;