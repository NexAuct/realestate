import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'First-time Homebuyer',
    avatar: 'https://source.unsplash.com/100x100/?woman,portrait',
    rating: 5,
    text: 'Working with this real estate team was an absolute pleasure. They made my first home buying experience smooth and stress-free. Their expertise and dedication are unmatched!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Property Investor',
    avatar: 'https://source.unsplash.com/100x100/?man,portrait',
    rating: 5,
    text: 'As a property investor, I appreciate their deep market knowledge and professional approach. They helped me find great investment opportunities and maximize my returns.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Home Seller',
    avatar: 'https://source.unsplash.com/100x100/?woman,professional',
    rating: 5,
    text: 'They sold my house above asking price in just two weeks! Their marketing strategy and negotiation skills are exceptional. I could not be happier with the results.',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Luxury Home Buyer',
    avatar: 'https://source.unsplash.com/100x100/?man,business',
    rating: 5,
    text: 'Their attention to detail and personalized service exceeded my expectations. They found me the perfect luxury home that met all my specific requirements.',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Real Estate Developer',
    avatar: 'https://source.unsplash.com/100x100/?woman,business',
    rating: 5,
    text: 'Outstanding service and market expertise. They understand the complexities of real estate development and provided valuable insights throughout our projects.',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = isMobile ? 1 : 3;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - itemsPerPage : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Client Testimonials
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Hear what our satisfied clients have to say about their experience
            </Typography>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                mb: 4,
              }}
            >
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        maxWidth: 350,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          transition: 'transform 0.2s ease-in-out',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 4 }}>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: 'primary.main',
                            opacity: 0.2,
                          }}
                        >
                          <FormatQuoteIcon sx={{ fontSize: 40 }} />
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                          }}
                        >
                          <Avatar
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            sx={{ width: 64, height: 64, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              {testimonial.name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Box>

                        <Rating
                          value={testimonial.rating}
                          readOnly
                          sx={{ mb: 2 }}
                        />

                        <Typography
                          variant="body1"
                          color="text.secondary"
                          paragraph
                          sx={{
                            fontStyle: 'italic',
                            minHeight: 100,
                          }}
                        >
                          "{testimonial.text}"
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 4,
              }}
            >
              <IconButton
                onClick={handlePrevious}
                sx={{
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'primary.main', color: 'white' },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'primary.main', color: 'white' },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;
