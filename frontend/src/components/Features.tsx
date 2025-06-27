import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { AccountBalanceWallet, Security, Speed, AccountTree } from '@mui/icons-material';
import { containerVariants, featureCardVariants } from '../styles/animations';

const features = [
  {
    title: 'Blockchain Integration',
    description: 'Secure property records and transaction data with Malaysian compliance built-in',
    icon: AccountTree,
  },
  {
    title: 'Multi-Agent System',
    description: 'Autonomous agents represent stakeholders: buyers, sellers, agents, and regulators',
    icon: Speed,
  },
  {
    title: 'Smart Contracts',
    description: 'Automated transactions following Malaysian legal norms and banking requirements',
    icon: Security,
  },
  {
    title: 'Digital Payments',
    description: 'Integrated with Malaysian payment systems including DuitNow and FPX',
    icon: AccountBalanceWallet,
  },
];

const Features: React.FC = () => {
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
            Key Features
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <motion.div
                  variants={featureCardVariants}
                  whileHover="hover"
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      backgroundColor: 'background.paper',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: '50%',
                        backgroundColor: (theme) => theme.palette.primary.main + '15',
                        color: 'primary.main',
                      }}
                    >
                      <feature.icon sx={{ fontSize: 40 }} />
                    </Box>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Features;
