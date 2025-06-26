import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const features = [
  {
    icon: <PeopleIcon fontSize="large" />,
    title: 'Trusted Agents',
    description: 'Our experienced and certified agents are committed to providing you with the best service and expertise in the real estate market.',
  },
  {
    icon: <VerifiedUserIcon fontSize="large" />,
    title: 'Verified Listings',
    description: 'All our property listings are thoroughly verified and authenticated to ensure you get accurate and reliable information.',
  },
  {
    icon: <AttachMoneyIcon fontSize="large" />,
    title: 'Affordable Pricing',
    description: 'We offer competitive pricing and transparent fees with no hidden costs, making your real estate journey cost-effective.',
  },
  {
    icon: <SupportAgentIcon fontSize="large" />,
    title: '24/7 Customer Support',
    description: 'Our dedicated support team is available round the clock to assist you with any questions or concerns you may have.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Why Choose Us
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              We provide exceptional service and expertise to make your real estate experience seamless
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      backgroundColor: 'background.default',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.2s ease-in-out',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      
                      <Typography variant="h5" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      
                      <Typography color="text.secondary" paragraph>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Statistics Section */}
          <Box sx={{ mt: 8 }}>
            <Grid container spacing={4}>
              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      10K+
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Properties Sold
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      5K+
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Happy Clients
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      15+
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Years Experience
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      4.9
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Average Rating
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
