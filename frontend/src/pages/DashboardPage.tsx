import React from 'react';
import { Container } from '@mui/material';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <AdminDashboard />
    </Container>
  );
};

export default DashboardPage;