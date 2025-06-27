import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Box,
  Alert,
  LinearProgress
} from '@mui/material';
import { CheckCircle, Warning } from '@mui/icons-material';

interface KYCVerificationProps {
  onComplete: (data: any) => void;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    icNumber: '',
    address: '',
    phoneNumber: '',
    bankAccount: ''
  });
  const [loading, setLoading] = useState(false);

  const steps = ['Personal Info', 'Identity Verification', 'Bank Details', 'Review'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete(formData);
    } catch (error) {
      console.error('KYC verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="IC Number"
              value={formData.icNumber}
              onChange={(e) => setFormData({ ...formData, icNumber: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <Alert severity="info">
            <Typography>Identity verification will be processed automatically using Malaysian IC validation.</Typography>
          </Alert>
        );
      case 2:
        return (
          <TextField
            fullWidth
            label="Bank Account Number"
            value={formData.bankAccount}
            onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
          />
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Information</Typography>
            <Typography>Name: {formData.fullName}</Typography>
            <Typography>IC: {formData.icNumber}</Typography>
            <Typography>Bank: {formData.bankAccount}</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <CheckCircle sx={{ mr: 1 }} />
          KYC Verification
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Warning sx={{ mr: 1 }} />
          KYC verification is required for auction participation as per BNM regulations.
        </Alert>

        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default KYCVerification;