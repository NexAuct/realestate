import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Code, 
  MenuBook, 
  PlayCircleOutline, 
  Api, 
  Security, 
  AccountTree 
} from '@mui/icons-material';
import { containerVariants, slideUp, linkHoverVariants } from '../styles/animations';
import { DocumentationLink } from '../types';

const documentationLinks: DocumentationLink[] = [
  {
    title: 'API Reference',
    url: '/docs/api',
    category: 'API',
  },
  {
    title: 'Smart Contracts',
    url: '/docs/smart-contracts',
    category: 'API',
  },
  {
    title: 'Blockchain Integration',
    url: '/docs/blockchain',
    category: 'API',
  },
  {
    title: 'Getting Started Guide',
    url: '/docs/getting-started',
    category: 'Guides',
  },
  {
    title: 'Malaysian Compliance',
    url: '/docs/compliance',
    category: 'Guides',
  },
  {
    title: 'Multi-Agent System',
    url: '/docs/mas',
    category: 'Guides',
  },
  {
    title: 'Property Listing Example',
    url: '/examples/property-listing',
    category: 'Examples',
  },
  {
    title: 'Transaction Flow',
    url: '/examples/transaction',
    category: 'Examples',
  },
  {
    title: 'Agent Communication',
    url: '/examples/agents',
    category: 'Examples',
  },
];

const categoryIcons = {
  API: Api,
  Guides: MenuBook,
  Examples: PlayCircleOutline,
};

const categoryColors = {
  API: '#007FFF',
  Guides: '#28A745',
  Examples: '#FF4B2B',
};

const Documentation: React.FC = () => {
  const categories = ['API', 'Guides', 'Examples'] as const;

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
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
            Documentation
          </Typography>

          <Grid container spacing={4}>
            {categories.map((category) => {
              const CategoryIcon = categoryIcons[category];
              const categoryLinks = documentationLinks.filter(
                (link) => link.category === category
              );

              return (
                <Grid key={category} item xs={12} md={4}>
                  <motion.div variants={slideUp}>
                    <Card
                      sx={{
                        height: '100%',
                        backgroundColor: 'background.default',
                        border: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              mr: 2,
                              p: 1,
                              borderRadius: '50%',
                              backgroundColor: `${categoryColors[category]}15`,
                              color: categoryColors[category],
                            }}
                          >
                            <CategoryIcon />
                          </Box>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{ fontWeight: 600 }}
                          >
                            {category}
                          </Typography>
                        </Box>

                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                          {categoryLinks.map((link, index) => (
                            <Box
                              component="li"
                              key={index}
                              sx={{ mb: 2 }}
                            >
                              <motion.div
                                variants={linkHoverVariants}
                                whileHover="hover"
                              >
                                <Link
                                  href={link.url}
                                  underline="none"
                                  sx={{
                                    display: 'block',
                                    p: 2,
                                    borderRadius: 1,
                                    backgroundColor: 'background.paper',
                                    color: 'text.primary',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                      backgroundColor: `${categoryColors[category]}08`,
                                      transform: 'translateX(8px)',
                                    },
                                  }}
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 500 }}
                                  >
                                    {link.title}
                                  </Typography>
                                </Link>
                              </motion.div>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          <motion.div variants={slideUp}>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
              >
                Need help getting started? Check out our comprehensive documentation
                or join our community for support.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                <Link
                  href="/docs"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 3,
                    py: 1.5,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: 2,
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <Code sx={{ mr: 1 }} />
                  View All Docs
                </Link>
                <Link
                  href="/community"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 3,
                    py: 1.5,
                    border: 1,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    borderRadius: 2,
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  Join Community
                </Link>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Documentation;
