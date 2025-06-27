import React from 'react';
import { Container, Box } from '@mui/material';
import AuctionSearch from '../components/auction/AuctionSearch';
import LiveAuctionDashboard from '../components/auction/LiveAuctionDashboard';

const AuctionsPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <AuctionSearch />
      </Box>
      <LiveAuctionDashboard />
    </Container>
  );
};

export default AuctionsPage;