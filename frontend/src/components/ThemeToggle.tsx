import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { themeToggleVariants } from '../styles/animations';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  themeMode: ThemeMode;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ themeMode }) => {
  return (
    <Tooltip title={themeMode.isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={themeMode.toggleTheme}
        color="inherit"
        aria-label="toggle theme"
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'background.paper',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 4,
          },
        }}
      >
        <motion.div
          variants={themeToggleVariants}
          animate={themeMode.isDark ? 'dark' : 'light'}
          transition={{ duration: 0.3 }}
        >
          {themeMode.isDark ? <Brightness7 /> : <Brightness4 />}
        </motion.div>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
