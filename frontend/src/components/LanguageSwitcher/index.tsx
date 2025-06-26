import React from 'react';
import { 
  Box, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Typography,
  useTheme
} from '@mui/material';
import { Translate as TranslateIcon } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as 'en' | 'bm');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TranslateIcon 
        sx={{ 
          color: theme.palette.text.secondary,
          fontSize: '1.2rem'
        }} 
      />
      <Select
        value={language}
        onChange={handleChange}
        variant="standard"
        sx={{
          minWidth: 100,
          '& .MuiSelect-select': {
            py: 0.5,
            pl: 1,
            pr: 2,
            fontSize: '0.875rem',
          },
          '&:before': {
            borderColor: theme.palette.divider,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderColor: theme.palette.primary.main,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 0.5,
              boxShadow: theme.shadows[2],
            },
          },
        }}
      >
        <MenuItem value="en">
          <Typography variant="body2">English</Typography>
        </MenuItem>
        <MenuItem value="bm">
          <Typography variant="body2">Bahasa Melayu</Typography>
        </MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
