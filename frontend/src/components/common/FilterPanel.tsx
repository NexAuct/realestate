import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Box,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

interface FilterPanelProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <Card sx={{ position: 'sticky', top: 20 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterList sx={{ mr: 1 }} />
          Filters
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Property Type</InputLabel>
          <Select
            value={filters.propertyType || ''}
            onChange={(e) => handleChange('propertyType', e.target.value)}
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
            value={filters.listingType || ''}
            onChange={(e) => handleChange('listingType', e.target.value)}
          >
            <MenuItem value="">All Listings</MenuItem>
            <MenuItem value="SALE">For Sale</MenuItem>
            <MenuItem value="RENT">For Rent</MenuItem>
            <MenuItem value="AUCTION">Auction</MenuItem>
          </Select>
        </FormControl>

        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange || [0, 5000000]}
          onChange={(_, value) => handleChange('priceRange', value)}
          valueLabelDisplay="auto"
          min={0}
          max={5000000}
          step={50000}
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isRizabMelayu || false}
                onChange={(e) => handleChange('isRizabMelayu', e.target.checked)}
              />
            }
            label="Rizab Melayu"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isRumahMampuMilik || false}
                onChange={(e) => handleChange('isRumahMampuMilik', e.target.checked)}
              />
            }
            label="Rumah Mampu Milik"
          />
        </Box>

        <Button fullWidth variant="outlined" onClick={onReset}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;