import React, { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayArrow, Home, AccountBalance, Gavel, Refresh } from '@mui/icons-material';
import { containerVariants, slideUp } from '../styles/animations';

interface DemoState {
  title: string;
  description: string;
  Icon: React.ElementType;
  color: string;
}

const demoStates: DemoState[] = [
  {
    title: 'Property Listing',
    description: 'Browse and search properties with advanced filtering options',
    Icon: Home,
    color: '#007FFF',
  },
  {
    title: 'Smart Contract Creation',
    description: 'Automated contract generation following Malaysian legal standards',
    Icon: Gavel,
    color: '#FF4B2B',
  },
  {
    title: 'Transaction Processing',
    description: 'Secure blockchain-based property transactions with escrow',
    Icon: AccountBalance,
    color: '#28A745',
  },
];

const Demo: React.FC = () => {
  const [currentDemo, setCurrentDemo] = useState(0);

  const CurrentIcon = demoStates[currentDemo].Icon;

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6 }}
          >
            Platform Demo
          </Typography>

          <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <motion.div variants={slideUp}>
                <Card
                  sx={{
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'background.paper',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDemo}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '2rem',
                      }}
                    >
                      <Box
                        sx={{
                          mb: 3,
                          p: 3,
                          borderRadius: '50%',
                          backgroundColor: `${demoStates[currentDemo].color}15`,
                          color: demoStates[currentDemo].color,
                        }}
                      >
                        <CurrentIcon sx={{ fontSize: 60 }} />
                      </Box>
                      <Typography variant="h4" gutterBottom>
                        {demoStates[currentDemo].title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {demoStates[currentDemo].description}
                      </Typography>
                    </motion.div>
                  </AnimatePresence>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div variants={slideUp}>
                <Typography variant="h4" gutterBottom>
                  Interactive Platform Features
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Experience the power of blockchain technology in Malaysian real estate.
                  Our platform combines cutting-edge technology with local compliance requirements.
                </Typography>

                <Box sx={{ mt: 4 }}>
                  {demoStates.map((demo, index) => {
                    const DemoIcon = demo.Icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        style={{ marginBottom: '1rem' }}
                      >
                        <Card
                          sx={{
                            cursor: 'pointer',
                            border: currentDemo === index ? 2 : 1,
                            borderColor: currentDemo === index ? 'primary.main' : 'divider',
                            backgroundColor: currentDemo === index ? 'primary.main' + '08' : 'background.paper',
                          }}
                          onClick={() => setCurrentDemo(index)}
                        >
                          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                mr: 2,
                                p: 1,
                                borderRadius: '50%',
                                backgroundColor: `${demo.color}15`,
                                color: demo.color,
                              }}
                            >
                              <DemoIcon />
                            </Box>
                            <Box>
                              <Typography variant="h6">{demo.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {demo.description}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    size="large"
                    onClick={() => window.open('/demo', '_blank')}
                  >
                    Try Live Demo
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    size="large"
                    onClick={() => setCurrentDemo(0)}
                  >
                    Reset Demo
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Demo;
