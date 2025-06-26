import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: 'Modern Luxury Villa',
    price: 750000,
    location: 'Beverly Hills, CA',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: 'https://source.unsplash.com/800x600/?luxury,villa',
    featured: true,
  },
  {
    id: 2,
    title: 'Downtown Penthouse',
    price: 950000,
    location: 'Manhattan, NY',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    image: 'https://source.unsplash.com/800x600/?penthouse,city',
    featured: true,
  },
  {
    id: 3,
    title: 'Seaside Cottage',
    price: 650000,
    location: 'Malibu, CA',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: 'https://source.unsplash.com/800x600/?beach,cottage',
    featured: true,
  },
  {
    id: 4,
    title: 'Mountain View Estate',
    price: 1200000,
    location: 'Aspen, CO',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    image: 'https://source.unsplash.com/800x600/?mountain,estate',
    featured: true,
  },
  {
    id: 5,
    title: 'Urban Loft',
    price: 550000,
    location: 'Brooklyn, NY',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    image: 'https://source.unsplash.com/800x600/?loft,urban',
    featured: true,
  },
  {
    id: 6,
    title: 'Garden Paradise',
    price: 850000,
    location: 'Suburbs, CA',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    image: 'https://source.unsplash.com/800x600/?garden,house',
    featured: true,
  },
];

const FeaturedProperties: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = (propertyId: number) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleBrowseAll = () => {
    navigate('/properties');
  };

  return (
    <Box component="section" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Featured Properties
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Discover our handpicked selection of premium properties
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {featuredProperties.map((property, index) => (
              <Grid item key={property.id} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: 4,
                      },
                    }}
                  >
                    {property.featured && (
                      <Chip
                        label="Featured"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          zIndex: 1,
                        }}
                      />
                    )}
                    
                    <CardMedia
                      component="img"
                      height="240"
                      image={property.image}
                      alt={property.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {property.title}
                      </Typography>
                      
                      <Typography variant="h6" color="primary" gutterBottom>
                        ${property.price.toLocaleString()}
                      </Typography>
                      
                      <Typography color="text.secondary" paragraph>
                        {property.location}
                      </Typography>
                      
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 3,
                          pt: 2,
                          borderTop: 1,
                          borderColor: 'divider',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BedIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {property.bedrooms}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BathtubIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {property.bathrooms}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <SquareFootIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {property.sqft} sqft
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleViewDetails(property.id)}
                        sx={{ mt: 'auto' }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleBrowseAll}
              sx={{ px: 4, py: 1.5 }}
            >
              Browse All Properties
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FeaturedProperties;
