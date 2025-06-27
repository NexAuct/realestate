import React from 'react';
import { Container, Box } from '@mui/material';
import Documentation from '../components/Documentation';
import GettingStarted from '../components/GettingStarted';

const DocsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <GettingStarted />
        <Documentation />
      </Box>
    </Container>
  );
};

export default DocsPage;