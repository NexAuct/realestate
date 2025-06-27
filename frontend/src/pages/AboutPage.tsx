import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: <HomeIcon fontSize="large" />, number: '10,000+', label: 'Properties Sold' },
    { icon: <PeopleIcon fontSize="large" />, number: '5,000+', label: 'Happy Clients' },
    { icon: <TrendingUpIcon fontSize="large" />, number: '15+', label: 'Years Experience' },
    { icon: <StarIcon fontSize="large" />, number: '4.9', label: 'Average Rating' },
  ];

  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://source.unsplash.com/150x150/?businessman,ceo',
      description: 'Visionary leader with 20+ years in real estate.',
    },
    {
      name: 'Jane Doe',
      role: 'Head of Sales',
      image: 'https://source.unsplash.com/150x150/?businesswoman,sales',
      description: 'Expert in luxury property sales and client relations.',
    },
    {
      name: 'Mike Johnson',
      role: 'Operations Manager',
      image: 'https://source.unsplash.com/150x150/?manager,operations',
      description: 'Ensures smooth operations and exceptional service.',
    },
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'We conduct business with the highest ethical standards and transparency.',
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service delivery.',
    },
    {
      title: 'Innovation',
      description: 'We embrace technology and innovative solutions to serve our clients better.',
    },
    {
      title: 'Community',
      description: 'We are committed to giving back and supporting our local communities.',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              About Us
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Your trusted partner in real estate for over 15 years
            </Typography>
          </Box>

          {/* Company Story */}
          <Grid container spacing={6} sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Our Story
              </Typography>
              <Typography paragraph>
                Established in 2025, our real estate company began as a humble family venture and has since evolved
                into a leading and trusted name in property sales and rentals across the region. 
                built on integrity and personalized service, we continue to set the benchmark in the industry.
              </Typography>
              <Typography paragraph>
                We believe that finding the perfect home is more than just a transaction—
                it's about finding a place where memories are made and dreams come true. 
                Our team of experienced professionals is dedicated to making your real 
                estate journey as smooth and successful as possible.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://source.unsplash.com/600x400/?office,real-estate"
                alt="Our Office"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>

          {/* Statistics */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Our Achievements
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: 'background.default',
                        border: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Box sx={{ color: 'primary.main', mb: 1 }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h4" color="primary" gutterBottom>
                        {stat.number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Our Values */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Our Values
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {values.map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        p: 2,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Leadership Team */}
          <Box>
            <Typography variant="h4" align="center" gutterBottom>
              Leadership Team
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                      <CardContent>
                        <Avatar
                          src={member.image}
                          alt={member.name}
                          sx={{
                            width: 100,
                            height: 100,
                            mx: 'auto',
                            mb: 2,
                          }}
                        />
                        <Typography variant="h6" gutterBottom>
                          {member.name}
                        </Typography>
                        <Typography color="primary" gutterBottom>
                          {member.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default AboutPage;
