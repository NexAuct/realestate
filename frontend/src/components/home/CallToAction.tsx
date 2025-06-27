import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const handleScheduleConsultation = () => {
    navigate('/contact#form');
  };

  const handleGetInTouch = () => {
    navigate('/contact');
  };

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'url("https://source.unsplash.com/1920x1080/?real-estate,building")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                Ready to Make a Move?
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Whether you're buying, selling, or investing, our expert team is here to guide you every step of the way.
              </Typography>
              <Typography variant="body1" paragraph>
                Get personalized advice, market insights, and professional support tailored to your unique real estate needs. Let's turn your property dreams into reality.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CalendarTodayIcon />}
                  onClick={handleScheduleConsultation}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    borderRadius: '50px',
                  }}
                >
                  Schedule a Consultation
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PhoneIcon />}
                  onClick={handleGetInTouch}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    borderRadius: '50px',
                  }}
                >
                  Get in Touch
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Quick Contact
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Reach out to us directly for immediate assistance
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PhoneIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2">Call Us</Typography>
                        <Typography variant="body2" color="text.secondary">
                          +60 123 456 789
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <EmailIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2">Email Us</Typography>
                        <Typography variant="body2" color="text.secondary">
                          contact@myrealestate.com
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarTodayIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2">Office Hours</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mon - Fri: 9:00 AM - 6:00 PM
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sat - Sun: 10:00 AM - 4:00 PM
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CallToAction;
