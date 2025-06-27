import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Tabs,
  Tab,
  Fab,
  Checkbox,
  FormControlLabel,
  IconButton
} from '@mui/material';
import {
  Search,
  FilterList,
  Map,
  ViewList,
  ViewModule
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import PropertyCard from '../components/property/PropertyCard';
import PropertyDetails from '../components/property/PropertyDetails';

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  state: string;
  district: string;
  propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';
  listingType: 'SALE' | 'RENT' | 'AUCTION';
  bedrooms?: number;
  bathrooms?: number;
  sqft: number;
  parking?: number;
  images: string[];
  agent: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    phone: string;
    whatsapp: string;
  };
  features: string[];
  isRizabMelayu: boolean;
  isRumahMampuMilik: boolean;
  isFeatured: boolean;
  views: number;
  listedDate: string;
  priceHistory: { date: string; price: number }[];
}

const PropertiesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    district: '',
    propertyType: '',
    listingType: '',
    priceRange: [0, 5000000] as [number, number],
    bedrooms: 0,
    bathrooms: 0,
    minSqft: 0,
    features: [] as string[],
    isRizabMelayu: false,
    isRumahMampuMilik: false
  });

  const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
    'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
    'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur'
  ];

  const propertyFeatures = [
    'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden',
    'Balcony', 'Air Conditioning', 'Furnished', 'Near LRT',
    'Shopping Mall', 'School Nearby', 'Hospital Nearby'
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = properties.filter(property => {
      const matchesSearch = !filters.search || 
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.address.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesState = !filters.state || property.state === filters.state;
      const matchesDistrict = !filters.district || property.district === filters.district;
      const matchesPropertyType = !filters.propertyType || property.propertyType === filters.propertyType;
      const matchesListingType = !filters.listingType || property.listingType === filters.listingType;
      const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
      const matchesBedrooms = !filters.bedrooms || (property.bedrooms && property.bedrooms >= filters.bedrooms);
      const matchesBathrooms = !filters.bathrooms || (property.bathrooms && property.bathrooms >= filters.bathrooms);
      const matchesSqft = !filters.minSqft || property.sqft >= filters.minSqft;
      const matchesRizab = !filters.isRizabMelayu || property.isRizabMelayu;
      const matchesRMM = !filters.isRumahMampuMilik || property.isRumahMampuMilik;

      return matchesSearch && matchesState && matchesDistrict && matchesPropertyType && 
             matchesListingType && matchesPrice && matchesBedrooms && matchesBathrooms && 
             matchesSqft && matchesRizab && matchesRMM;
    });

    // Sort by featured first, then by date
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
    });

    setFilteredProperties(filtered);
  };

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'bm' ? 'ms-MY' : 'en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getListingTypeColor = (type: string) => {
    switch (type) {
      case 'SALE': return 'primary';
      case 'RENT': return 'secondary';
      case 'AUCTION': return 'error';
      default: return 'default';
    }
  };

  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handleViewDetails = (propertyId: string) => {
    setSelectedProperty(propertyId);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  if (selectedProperty) {
    return (
      <PropertyDetails
        propertyId={selectedProperty}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          MyRealEstate Property Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover your dream property in Malaysia
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ mb: 3 }}>
        <Tab label="All Properties" />
        <Tab label={`For Sale (${filteredProperties.filter(p => p.listingType === 'SALE').length})`} />
        <Tab label={`For Rent (${filteredProperties.filter(p => p.listingType === 'RENT').length})`} />
        <Tab label={`Auctions (${filteredProperties.filter(p => p.listingType === 'AUCTION').length})`} />
      </Tabs>

      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              <FilterList sx={{ mr: 1 }} />
              Filters
            </Typography>

            <TextField
              fullWidth
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>State</InputLabel>
              <Select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              >
                <MenuItem value="">All States</MenuItem>
                {malaysianStates.map(state => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </Select>
            </FormControl>

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

            <Typography gutterBottom>
              Price Range: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={(_, value) => setFilters({ ...filters, priceRange: value as [number, number] })}
              valueLabelDisplay="auto"
              valueLabelFormat={formatCurrency}
              min={0}
              max={5000000}
              step={50000}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setFilters({
                search: '',
                state: '',
                district: '',
                propertyType: '',
                listingType: '',
                priceRange: [0, 5000000],
                bedrooms: 0,
                bathrooms: 0,
                minSqft: 0,
                features: [],
                isRizabMelayu: false,
                isRumahMampuMilik: false
              })}
            >
              Reset Filters
            </Button>
          </Card>
        </Grid>

        {/* Properties Grid */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1">
              {filteredProperties.length} properties found
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => setViewMode('grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
              >
                <ViewModule />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                color={viewMode === 'list' ? 'primary' : 'default'}
              >
                <ViewList />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {filteredProperties.map((property) => (
              <Grid 
                item 
                xs={12} 
                sm={viewMode === 'grid' ? 6 : 12} 
                md={viewMode === 'grid' ? 4 : 12} 
                key={property.id}
              >
                <PropertyCard 
                  property={property}
                  onFavoriteToggle={toggleFavorite}
                  isFavorite={favorites.has(property.id)}
                  onViewDetails={handleViewDetails}
                  viewMode={viewMode}
                />
              </Grid>
            ))}
          </Grid>

          {filteredProperties.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No properties found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters to see more results
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => window.open('/map-view', '_blank')}
      >
        <Map />
      </Fab>
    </Container>
  );
};

export default PropertiesPage;