import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Map,
  List as ListIcon,
  FilterList,
  Close,
  LocationOn,
  Home,
  Search
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MapProperty {
  id: string;
  title: string;
  price: number;
  coordinates: { lat: number; lng: number };
  propertyType: string;
  listingType: string;
}

const MapViewPage: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<MapProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    listingType: ''
  });

  useEffect(() => {
    // Mock data for map properties
    setProperties([
      {
        id: '1',
        title: 'Luxury Condo KLCC',
        price: 1200000,
        coordinates: { lat: 3.1569, lng: 101.7123 },
        propertyType: 'RESIDENTIAL',
        listingType: 'SALE'
      },
      {
        id: '2',
        title: 'Modern Apartment',
        price: 850000,
        coordinates: { lat: 3.1478, lng: 101.6953 },
        propertyType: 'RESIDENTIAL',
        listingType: 'SALE'
      }
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Property Map View</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search location..."
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setDrawerOpen(true)}
              >
                Filters
              </Button>
              <Button
                variant="contained"
                startIcon={<ListIcon />}
                onClick={() => navigate('/properties')}
              >
                List View
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Map Container */}
      <Box sx={{ flexGrow: 1, position: 'relative', bgcolor: 'grey.100' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.200'
          }}
        >
          <Typography variant="h4" color="text.secondary">
            Interactive Map Component
          </Typography>
        </Box>

        {/* Property Info Card */}
        {selectedProperty && (
          <Card
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              minWidth: 300,
              zIndex: 1000
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {selectedProperty.title}
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                    {formatCurrency(selectedProperty.price)}
                  </Typography>
                  <Chip
                    label={selectedProperty.listingType}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>
                <IconButton
                  size="small"
                  onClick={() => setSelectedProperty(null)}
                >
                  <Close />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/properties/${selectedProperty.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Map Controls */}
        <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Fab size="small" color="primary">
            <LocationOn />
          </Fab>
          <Fab size="small">
            <Home />
          </Fab>
        </Box>
      </Box>

      {/* Filters Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Map Filters
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Property Type</InputLabel>
            <Select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="RESIDENTIAL">Residential</MenuItem>
              <MenuItem value="COMMERCIAL">Commercial</MenuItem>
              <MenuItem value="INDUSTRIAL">Industrial</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Listing Type</InputLabel>
            <Select
              value={filters.listingType}
              onChange={(e) => setFilters({ ...filters, listingType: e.target.value })}
            >
              <MenuItem value="">All Listings</MenuItem>
              <MenuItem value="SALE">For Sale</MenuItem>
              <MenuItem value="RENT">For Rent</MenuItem>
              <MenuItem value="AUCTION">Auction</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setDrawerOpen(false)}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MapViewPage;