import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Rating,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

// Mock data for agents
const mockAgents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    experience: '8 years',
    rating: 4.9,
    reviews: 127,
    specialties: ['Luxury Homes', 'Commercial', 'Investment'],
    phone: '+1 234 567 8901',
    email: 'sarah.johnson@realestate.com',
    avatar: 'https://source.unsplash.com/150x150/?woman,professional',
    description: 'Specializing in luxury properties with over 8 years of experience in the real estate market.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Property Specialist',
    experience: '6 years',
    rating: 4.8,
    reviews: 89,
    specialties: ['First-time Buyers', 'Condos', 'Urban Properties'],
    phone: '+1 234 567 8902',
    email: 'michael.chen@realestate.com',
    avatar: 'https://source.unsplash.com/150x150/?man,professional',
    description: 'Expert in helping first-time buyers find their perfect home in urban areas.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Residential Agent',
    experience: '5 years',
    rating: 4.7,
    reviews: 156,
    specialties: ['Family Homes', 'Suburbs', 'Schools District'],
    phone: '+1 234 567 8903',
    email: 'emily.rodriguez@realestate.com',
    avatar: 'https://source.unsplash.com/150x150/?woman,business',
    description: 'Passionate about helping families find homes in great school districts.',
  },
  {
    id: 4,
    name: 'David Thompson',
    title: 'Commercial Agent',
    experience: '10 years',
    rating: 4.9,
    reviews: 203,
    specialties: ['Commercial', 'Investment', 'Industrial'],
    phone: '+1 234 567 8904',
    email: 'david.thompson@realestate.com',
    avatar: 'https://source.unsplash.com/150x150/?man,suit',
    description: 'Leading expert in commercial real estate and investment properties.',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    title: 'Luxury Property Agent',
    experience: '7 years',
    rating: 4.8,
    reviews: 94,
    specialties: ['Luxury Homes', 'Waterfront', 'Estates'],
    phone: '+1 234 567 8905',
    email: 'lisa.wang@realestate.com',
    avatar: 'https://source.unsplash.com/150x150/?woman,elegant',
    description: 'Specializing in high-end luxury properties and waterfront estates.',
  },
  {
    id: 6,
    name: 'Robert Martinez',
    title: 'Investment Advisor',
    experience: '12 years',
    rating: 4.9,
    reviews: 178,
    specialties: ['Investment', 'Rental Properties', 'Market Analysis'],
    phone: '+1 234 567 8906',
    email: 'robert.martinez@realestate.com',
    avatar: 'https://source.unsplash.com/150x150/?man,advisor',
    description: 'Expert in real estate investment strategies and rental property management.',
  },
];

const AgentsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Our Expert Agents
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Meet our team of experienced real estate professionals
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {mockAgents.map((agent, index) => (
              <Grid item key={agent.id} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.2s ease-in-out',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Avatar
                        src={agent.avatar}
                        alt={agent.name}
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 2,
                        }}
                      />
                      
                      <Typography variant="h5" component="h2" gutterBottom>
                        {agent.name}
                      </Typography>
                      
                      <Typography color="primary" gutterBottom>
                        {agent.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {agent.experience} experience
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <Rating value={agent.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {agent.rating} ({agent.reviews} reviews)
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" paragraph>
                        {agent.description}
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        {agent.specialties.map((specialty) => (
                          <Chip
                            key={specialty}
                            label={specialty}
                            size="small"
                            sx={{ m: 0.5 }}
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          variant="contained"
                          startIcon={<PhoneIcon />}
                          href={`tel:${agent.phone}`}
                          size="small"
                          onClick={() => window.open(`/agents/${agent.id}`, '_self')}
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<EmailIcon />}
                          href={`mailto:${agent.email}`}
                          size="small"
                        >
                          Contact
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default AgentsPage;
