import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Error,
  HourglassEmpty,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ProgressState, ProgressStep } from '../types/progress';

interface ProgressProps {
  progressState: ProgressState;
  variant?: 'stepper' | 'linear' | 'circular';
  showDetails?: boolean;
}

const getStepIcon = (status: ProgressStep['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle color="success" />;
    case 'in_progress':
      return <HourglassEmpty color="primary" />;
    case 'error':
      return <Error color="error" />;
    default:
      return <RadioButtonUnchecked color="disabled" />;
  }
};

const Progress: React.FC<ProgressProps> = ({
  progressState,
  variant = 'stepper',
  showDetails = true,
}) => {
  const { steps, currentStep, isLoading, error } = progressState;

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalProgress = (completedSteps / steps.length) * 100;

  if (variant === 'linear') {
    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            Progress: {completedSteps}/{steps.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({Math.round(totalProgress)}%)
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={totalProgress}
          sx={{ height: 8, borderRadius: 4 }}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    );
  }

  if (variant === 'circular') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
          <CircularProgress
            variant="determinate"
            value={totalProgress}
            size={80}
            thickness={4}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {Math.round(totalProgress)}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {completedSteps} of {steps.length} completed
        </Typography>
        {isLoading && (
          <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
            Processing...
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Transaction Progress
      </Typography>
      
      <Stepper activeStep={currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.id} completed={step.status === 'completed'}>
            <StepLabel
              icon={getStepIcon(step.status)}
              error={step.status === 'error'}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1">{step.label}</Typography>
                {step.status === 'in_progress' && isLoading && (
                  <CircularProgress size={16} />
                )}
              </Box>
            </StepLabel>
            {showDetails && (
              <StepContent>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
                {step.progress !== undefined && step.status === 'in_progress' && (
                  <Box sx={{ mt: 1, mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={step.progress}
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {step.progress}% complete
                    </Typography>
                  </Box>
                )}
                {step.status === 'error' && (
                  <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
                    An error occurred during this step. Please try again.
                  </Alert>
                )}
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Overall Progress: {completedSteps}/{steps.length} steps completed ({Math.round(totalProgress)}%)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={totalProgress}
            sx={{ mt: 1, height: 6, borderRadius: 3 }}
          />
        </Box>
      </motion.div>
    </Paper>
  );
};

export default Progress;
