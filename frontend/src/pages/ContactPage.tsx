import React from 'react';
import { Box, Typography, Container, Grid, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon fontSize="large" color="primary" />,
      title: 'Our Location',
      details: '123 Real Estate Street, City, Country',
    },
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      title: 'Phone Number',
      details: '+1 234 567 8900',
    },
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      title: 'Email Address',
      details: 'contact@realestate.com',
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
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Contact Us
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Get in touch with our team of real estate experts
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {contactInfo.map((info, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      backgroundColor: 'background.default',
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{info.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {info.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {info.details}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: 'background.default',
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Phone"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ContactPage;
