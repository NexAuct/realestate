import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: 'Modern Luxury Villa',
    price: 750000,
    location: 'Beverly Hills',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: 'https://source.unsplash.com/800x600/?luxury,house',
  },
  {
    id: 2,
    title: 'Downtown Apartment',
    price: 450000,
    location: 'City Center',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: 'https://source.unsplash.com/800x600/?apartment',
  },
  {
    id: 3,
    title: 'Seaside Cottage',
    price: 650000,
    location: 'Malibu',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: 'https://source.unsplash.com/800x600/?beach,house',
  },
  {
    id: 4,
    title: 'Mountain View Estate',
    price: 950000,
    location: 'Aspen',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    image: 'https://source.unsplash.com/800x600/?mountain,house',
  },
  {
    id: 5,
    title: 'Urban Loft',
    price: 550000,
    location: 'Downtown',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 950,
    image: 'https://source.unsplash.com/800x600/?loft',
  },
  {
    id: 6,
    title: 'Garden Paradise',
    price: 850000,
    location: 'Suburbs',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    image: 'https://source.unsplash.com/800x600/?garden,house',
  },
];

const propertyTypes = ['All', 'House', 'Apartment', 'Villa', 'Condo'];
const priceRanges = ['All', '0-250k', '250k-500k', '500k-750k', '750k+'];

const PropertiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Properties
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Find your perfect property from our curated selection
          </Typography>

          {/* Search and Filter Section */}
          <Grid container spacing={2} sx={{ mb: 6, mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                label="Property Type"
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                label="Price Range"
              >
                {priceRanges.map((range) => (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Properties Grid */}
          <Grid container spacing={4}>
            {mockProperties.map((property) => (
              <Grid item key={property.id} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.2s ease-in-out',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={property.image}
                      alt={property.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
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
                          mb: 2,
                        }}
                      >
                        <Typography variant="body2">
                          {property.bedrooms} Beds
                        </Typography>
                        <Typography variant="body2">
                          {property.bathrooms} Baths
                        </Typography>
                        <Typography variant="body2">
                          {property.sqft} sqft
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
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
        </motion.div>
      </Box>
    </Container>
  );
};

export default PropertiesPage;
