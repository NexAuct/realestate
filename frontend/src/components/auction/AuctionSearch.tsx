import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Chip,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
  Gavel as GavelIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface AuctionSearchFilters {
  location: {
    state: string;
    district: string;
    mukim: string;
  };
  priceRange: [number, number];
  propertyType: string;
  auctionType: string;
  landTitleType: string;
  isRizabMelayu: boolean;
  isRumahMampuMilik: boolean;
  bedrooms: number;
  bathrooms: number;
  auctionStatus: string;
}

interface AuctionProperty {
  id: string;
  title: string;
  address: string;
  state: string;
  district: string;
  propertyType: string;
  auctionType: string;
  currentBid: number;
  reservePrice: number;
  auctionDate: string;
  timeRemaining: string;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  landArea?: number;
  isRizabMelayu: boolean;
  isRumahMampuMilik: boolean;
}

const AuctionSearch: React.FC = () => {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<AuctionSearchFilters>({
    location: { state: '', district: '', mukim: '' },
    priceRange: [100000, 2000000],
    propertyType: '',
    auctionType: '',
    landTitleType: '',
    isRizabMelayu: false,
    isRumahMampuMilik: false,
    bedrooms: 0,
    bathrooms: 0,
    auctionStatus: ''
  });

  const [searchResults, setSearchResults] = useState<AuctionProperty[]>([]);
  const [loading, setLoading] = useState(false);

  const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
    'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
    'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur',
    'Labuan', 'Putrajaya'
  ];

  const propertyTypes = [
    'RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL', 'DEVELOPMENT_LAND'
  ];

  const auctionTypes = [
    'LELONG', 'BANK_AUCTION', 'GOVERNMENT_AUCTION', 'DISTRESSED_PROPERTY'
  ];

  const landTitleTypes = [
    'GERAN', 'HAKMILIK_SEMENTARA', 'PAJAKAN', 'RIZAB_MELAYU'
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'bm' ? 'ms-MY' : 'en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auction/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.auctions || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      location: { state: '', district: '', mukim: '' },
      priceRange: [100000, 2000000],
      propertyType: '',
      auctionType: '',
      landTitleType: '',
      isRizabMelayu: false,
      isRumahMampuMilik: false,
      bedrooms: 0,
      bathrooms: 0,
      auctionStatus: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'error';
      case 'UPCOMING': return 'warning';
      case 'ENDED': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Search Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterIcon sx={{ mr: 1 }} />
            {t('auction.search.title')}
          </Typography>
          
          <Grid container spacing={3}>
            {/* Location Filters */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>{t('location.state')}</InputLabel>
                <Select
                  value={filters.location.state}
                  onChange={(e) => setFilters({
                    ...filters,
                    location: { ...filters.location, state: e.target.value }
                  })}
                >
                  {malaysianStates.map((state) => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('location.district')}
                value={filters.location.district}
                onChange={(e) => setFilters({
                  ...filters,
                  location: { ...filters.location, district: e.target.value }
                })}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>{t('auction.auctionTypes.lelong')}</InputLabel>
                <Select
                  value={filters.auctionType}
                  onChange={(e) => setFilters({ ...filters, auctionType: e.target.value })}
                >
                  {auctionTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {t(`auction.auctionTypes.${type.toLowerCase()}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price Range */}
            <Grid item xs={12}>
              <Typography gutterBottom>
                {t('financial.priceRange')}: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
              </Typography>
              <Slider
                value={filters.priceRange}
                onChange={(_, newValue) => setFilters({
                  ...filters,
                  priceRange: newValue as [number, number]
                })}
                valueLabelDisplay="auto"
                valueLabelFormat={formatCurrency}
                min={50000}
                max={5000000}
                step={50000}
              />
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('property.search.advancedFilters')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('property.type')}</InputLabel>
                    <Select
                      value={filters.propertyType}
                      onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                    >
                      {propertyTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {t(`property.propertyTypes.${type}`)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('property.landTitle')}</InputLabel>
                    <Select
                      value={filters.landTitleType}
                      onChange={(e) => setFilters({ ...filters, landTitleType: e.target.value })}
                    >
                      {landTitleTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {t(`property.landTitleTypes.${type}`)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.isRizabMelayu}
                          onChange={(e) => setFilters({ ...filters, isRizabMelayu: e.target.checked })}
                        />
                      }
                      label={t('property.rizabMelayu')}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filters.isRumahMampuMilik}
                          onChange={(e) => setFilters({ ...filters, isRumahMampuMilik: e.target.checked })}
                        />
                      }
                      label={t('property.rumahMampuMilik')}
                    />
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Action Buttons */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={loading}
              sx={{ minWidth: 150 }}
            >
              {t('common.search')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={resetFilters}
              sx={{ minWidth: 100 }}
            >
              {t('common.reset')}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Typography variant="h6" gutterBottom>
        {t('auction.searchResults')} ({searchResults.length})
      </Typography>

      <Grid container spacing={3}>
        {searchResults.map((property) => (
          <Grid item xs={12} md={6} lg={4} key={property.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ position: 'relative' }}>
                <img
                  src={property.images[0] || '/placeholder-property.jpg'}
                  alt={property.title}
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <Chip
                  label={property.status}
                  color={getStatusColor(property.status)}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                />
                {property.isRizabMelayu && (
                  <Chip
                    label={t('property.rizabMelayu')}
                    color="secondary"
                    size="small"
                    sx={{ position: 'absolute', top: 8, left: 8 }}
                  />
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>
                  {property.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {property.district}, {property.state}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GavelIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
                  <Typography variant="body2" color="primary.main">
                    {t(`auction.auctionTypes.${property.auctionType.toLowerCase()}`)}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('auction.currentBid')}
                  </Typography>
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {formatCurrency(property.currentBid)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('auction.reservePrice')}: {formatCurrency(property.reservePrice)}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t('auction.timeRemaining')}: {property.timeRemaining}
                </Typography>

                {(property.bedrooms || property.bathrooms) && (
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    {property.bedrooms && (
                      <Typography variant="caption">
                        🛏️ {property.bedrooms} {t('property.bedrooms')}
                      </Typography>
                    )}
                    {property.bathrooms && (
                      <Typography variant="caption">
                        🚿 {property.bathrooms} {t('property.bathrooms')}
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>

              <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<GavelIcon />}
                  disabled={property.status === 'ENDED'}
                >
                  {property.status === 'LIVE' ? t('auction.joinAuction') : t('common.view')}
                </Button>
                <Box>
                  <IconButton size="small">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton size="small">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {searchResults.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {t('auction.noResults')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('auction.tryDifferentFilters')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuctionSearch;