import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Home,
  Search,
  Gavel,
  People,
  Info,
  ContactMail,
  Dashboard
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Properties', icon: <Search />, path: '/properties' },
    { text: 'Auctions', icon: <Gavel />, path: '/auctions' },
    { text: 'Agents', icon: <People />, path: '/agents' },
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'About', icon: <Info />, path: '/about' },
    { text: 'Contact', icon: <ContactMail />, path: '/contact' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280, pt: 2 }}>
        <Box sx={{ px: 2, mb: 2 }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            MyRealEstate
          </Typography>
        </Box>
        
        <Divider />
        
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;