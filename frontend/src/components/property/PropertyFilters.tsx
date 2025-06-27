import React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Slider
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { MALAYSIAN_STATES, PROPERTY_TYPES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

interface PropertyFiltersProps {
  filters: any;
  onFilterChange: (key: string, value: any) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>State</InputLabel>
            <Select
              value={filters.state || ''}
              onChange={(e) => onFilterChange('state', e.target.value)}
            >
              <MenuItem value="">All States</MenuItem>
              {MALAYSIAN_STATES.map(state => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Property Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Property Type</InputLabel>
            <Select
              value={filters.propertyType || ''}
              onChange={(e) => onFilterChange('propertyType', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              {PROPERTY_TYPES.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>
            Price Range: {formatCurrency(filters.priceRange?.[0] || 0)} - {formatCurrency(filters.priceRange?.[1] || 5000000)}
          </Typography>
          <Slider
            value={filters.priceRange || [0, 5000000]}
            onChange={(_, value) => onFilterChange('priceRange', value)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatCurrency(value)}
            min={0}
            max={5000000}
            step={50000}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Special Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isRizabMelayu || false}
                onChange={(e) => onFilterChange('isRizabMelayu', e.target.checked)}
              />
            }
            label="Rizab Melayu"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isRumahMampuMilik || false}
                onChange={(e) => onFilterChange('isRumahMampuMilik', e.target.checked)}
              />
            }
            label="Rumah Mampu Milik"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isAuction || false}
                onChange={(e) => onFilterChange('isAuction', e.target.checked)}
              />
            }
            label="Auction Properties"
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PropertyFilters;