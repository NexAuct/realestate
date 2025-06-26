import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface PropertySearchProps {
  onSearch: (criteria: SearchCriteria) => void;
}

interface SearchCriteria {
  location: {
    state: string;
    district: string;
    mukim: string;
  };
  priceRange: [number, number];
  propertyType: string;
  landTitleType: string;
  isRizabMelayu: boolean;
  isRumahMampuMilik: boolean;
  isAuction: boolean;
  bedrooms: number;
  bathrooms: number;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onSearch }) => {
  const { t, language } = useLanguage();
  
  const [criteria, setCriteria] = useState<SearchCriteria>({
    location: {
      state: '',
      district: '',
      mukim: '',
    },
    priceRange: [100000, 2000000],
    propertyType: '',
    landTitleType: '',
    isRizabMelayu: false,
    isRumahMampuMilik: false,
    isAuction: false,
    bedrooms: 0,
    bathrooms: 0,
  });

  const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
    'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
    'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur',
    'Labuan', 'Putrajaya'
  ];

  const propertyTypes = [
    'RESIDENTIAL',
    'COMMERCIAL',
    'INDUSTRIAL',
    'AGRICULTURAL',
    'DEVELOPMENT_LAND'
  ];

  const landTitleTypes = [
    'GERAN',
    'HAKMILIK_SEMENTARA',
    'PAJAKAN',
    'RIZAB_MELAYU'
  ];

  const handleSearch = () => {
    onSearch(criteria);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(language === 'bm' ? 'ms-MY' : 'en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('property.search.title')}
        </Typography>
        
        <Grid container spacing={3}>
          {/* Location Search */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>{t('location.state')}</InputLabel>
              <Select
                value={criteria.location.state}
                onChange={(e) => setCriteria({
                  ...criteria,
                  location: { ...criteria.location, state: e.target.value }
                })}
              >
                {malaysianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={t('location.district')}
              value={criteria.location.district}
              onChange={(e) => setCriteria({
                ...criteria,
                location: { ...criteria.location, district: e.target.value }
              })}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={t('location.mukim')}
              value={criteria.location.mukim}
              onChange={(e) => setCriteria({
                ...criteria,
                location: { ...criteria.location, mukim: e.target.value }
              })}
            />
          </Grid>

          {/* Price Range */}
          <Grid item xs={12}>
            <Typography gutterBottom>
              {t('financial.priceRange')}: {formatPrice(criteria.priceRange[0])} - {formatPrice(criteria.priceRange[1])}
            </Typography>
            <Slider
              value={criteria.priceRange}
              onChange={(_, newValue) => setCriteria({
                ...criteria,
                priceRange: newValue as [number, number]
              })}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={50000}
              max={5000000}
              step={50000}
            />
          </Grid>

          {/* Property Type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>{t('property.type')}</InputLabel>
              <Select
                value={criteria.propertyType}
                onChange={(e) => setCriteria({
                  ...criteria,
                  propertyType: e.target.value
                })}
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(`property.propertyTypes.${type}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Land Title Type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>{t('property.landTitle')}</InputLabel>
              <Select
                value={criteria.landTitleType}
                onChange={(e) => setCriteria({
                  ...criteria,
                  landTitleType: e.target.value
                })}
              >
                {landTitleTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(`property.landTitleTypes.${type}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('property.search.advancedFilters')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {/* Special Property Types */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  {t('property.search.specialTypes')}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={criteria.isRizabMelayu}
                        onChange={(e) => setCriteria({
                          ...criteria,
                          isRizabMelayu: e.target.checked
                        })}
                      />
                    }
                    label={t('property.rizabMelayu')}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={criteria.isRumahMampuMilik}
                        onChange={(e) => setCriteria({
                          ...criteria,
                          isRumahMampuMilik: e.target.checked
                        })}
                      />
                    }
                    label={t('property.rumahMampuMilik')}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={criteria.isAuction}
                        onChange={(e) => setCriteria({
                          ...criteria,
                          isAuction: e.target.checked
                        })}
                      />
                    }
                    label={t('property.auction')}
                  />
                </Box>
              </Grid>

              {/* Bedrooms and Bathrooms */}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('property.bedrooms')}</InputLabel>
                  <Select
                    value={criteria.bedrooms}
                    onChange={(e) => setCriteria({
                      ...criteria,
                      bedrooms: e.target.value as number
                    })}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num === 0 ? t('common.any') : `${num}+`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('property.bathrooms')}</InputLabel>
                  <Select
                    value={criteria.bathrooms}
                    onChange={(e) => setCriteria({
                      ...criteria,
                      bathrooms: e.target.value as number
                    })}
                  >
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num === 0 ? t('common.any') : `${num}+`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Search Button */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{ minWidth: 200 }}
          >
            {t('common.search')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertySearch;
