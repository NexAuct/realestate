import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Translate as TranslateIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';

interface NavbarProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { labelKey: 'Home', path: '/' },
    { labelKey: 'Properties', path: '/properties' },
    { labelKey: 'Auctions', path: '/auctions' },
    { labelKey: 'Agents', path: '/agents' },
    { labelKey: 'About', path: '/about' },
    { labelKey: 'Blog', path: '/blog' },
    { labelKey: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, alignItems: 'center' }}>
        <LanguageSwitcher />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.labelKey}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: isActivePath(item.path) ? 'primary.main' : 'text.primary',
              textDecoration: 'none',
            }}
          >
            <ListItemText primary={item.labelKey} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(10px)',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            MyRealEstate
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, mr: 2, alignItems: 'center' }}>
              {navItems.map((item) => (
                <motion.div
                  key={item.labelKey}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActivePath(item.path) ? 'primary.main' : 'text.primary',
                      fontWeight: isActivePath(item.path) ? 600 : 400,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  >
                    {item.labelKey}
                  </Button>
                </motion.div>
              ))}
              <Box sx={{ mx: 1 }}>
                <LanguageSwitcher />
              </Box>
            </Box>
          )}

          {/* Theme Toggle */}
          {toggleTheme && (
            <IconButton
              onClick={toggleTheme}
              sx={{ color: 'text.primary', mr: isMobile ? 1 : 0 }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
