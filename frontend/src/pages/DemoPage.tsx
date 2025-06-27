import React from 'react';
import { Container, Box } from '@mui/material';
import Demo from '../components/Demo';
import Features from '../components/Features';

const DemoPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Demo />
        <Features />
      </Box>
    </Container>
  );
};

export default DemoPage;