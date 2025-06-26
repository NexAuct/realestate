import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, LinkedIn, Twitter, Email, Phone, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { containerVariants, linkHoverVariants } from '../styles/animations';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { text: 'Buy Properties', href: '/properties' },
        { text: 'Sell Properties', href: '/contact' },
        { text: 'Property Management', href: '/contact' },
        { text: 'Investment Advice', href: '/agents' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Market Reports', href: '/blog' },
        { text: 'Buying Guide', href: '/blog' },
        { text: 'Selling Guide', href: '/blog' },
        { text: 'Investment Tips', href: '/blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Our Agents', href: '/agents' },
        { text: 'Blog', href: '/blog' },
        { text: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Service', href: '/terms' },
        { text: 'Cookie Policy', href: '/cookies' },
        { text: 'Compliance', href: '/compliance' },
      ],
    },
  ];

  const socialLinks = [
    { Icon: Facebook, href: 'https://facebook.com/realestate' },
    { Icon: LinkedIn, href: 'https://linkedin.com/company/realestate' },
    { Icon: Twitter, href: 'https://twitter.com/realestate' },
    { Icon: Email, href: 'mailto:contact@realestate.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                RealEstate
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Your trusted partner in finding the perfect property. We provide exceptional service and expertise to make your real estate journey seamless.
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1, fontSize: 'small' }} />
                <Typography variant="body2" color="text.secondary">
                  123 Real Estate Street, City, Country
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, fontSize: 'small' }} />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, fontSize: 'small' }} />
                <Typography variant="body2" color="text.secondary">
                  contact@realestate.com
                </Typography>
              </Box>
            </Grid>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <Grid key={section.title} item xs={6} sm={4} md={2}>
                <Typography
                  variant="h6"
                  color="text.primary"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {section.links.map((link) => (
                    <Box component="li" key={link.text} sx={{ mb: 1 }}>
                      <motion.div variants={linkHoverVariants} whileHover="hover">
                        <Link
                          href={link.href}
                          color="text.secondary"
                          underline="none"
                          sx={{
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          {link.text}
                        </Link>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 6,
              pt: 3,
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 0 } }}
            >
              © {currentYear} RealEstate. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map(({ Icon, href }, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1 }}>
                  <IconButton
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
