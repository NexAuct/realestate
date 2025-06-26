import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { heroTitleVariants, heroTaglineVariants, buttonHoverVariants } from '../styles/animations';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleBrowseProperties = () => {
    navigate('/properties');
  };

  const handleGetInTouch = () => {
    navigate('/contact');
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url("https://source.unsplash.com/1920x1080/?luxury,house,real-estate")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <motion.div
            variants={heroTitleVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Find Your Dream Home Today
            </Typography>
          </motion.div>

          <motion.div
            variants={heroTaglineVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="h4"
              sx={{
                mb: 6,
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                fontWeight: 300,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Explore thousands of listings across your favorite neighborhoods
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBrowseProperties}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.2rem',
                    borderRadius: '50px',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                    },
                    minWidth: '200px',
                  }}
                >
                  Browse Properties
                </Button>
              </motion.div>

              <motion.div
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleGetInTouch}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.2rem',
                    borderRadius: '50px',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    minWidth: '200px',
                  }}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </Stack>
          </motion.div>
        </Box>
      </Container>

      {/* Floating elements for visual appeal */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1,
          zIndex: 1,
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 30 + 20,
              height: Math.random() * 30 + 20,
              borderRadius: '50%',
              backgroundColor: 'white',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero;
