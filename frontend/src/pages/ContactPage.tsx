import React from 'react';
import { Box, Typography, Container, Grid, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    console.log('Form submitted:', data);
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon fontSize="large" color="primary" />,
      title: 'Our Location',
      details: '123, Jalan Real Estate, Kuala Lumpur, Malaysia',
    },
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      title: 'Phone Number',
      details: '+60 3-1234 5678',
    },
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      title: 'Email Address',
      details: 'info@myrealestate.my',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="message"
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
