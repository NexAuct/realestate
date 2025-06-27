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
  IconButton,
  Avatar,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Tab,
  Tabs,
  ImageList,
  ImageListItem,
  Fab
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  Bed,
  Bathtub,
  SquareFoot,
  DirectionsCar,
  Phone,
  WhatsApp,
  Email,
  Schedule,
  Security,
  Pool,
  FitnessCenter,
  LocalParking,
  Balcony,
  AcUnit,
  School,
  LocalHospital,
  ShoppingCart,
  Train,
  Map,
  Calculate
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface PropertyDetailsProps {
  propertyId: string;
  onBack: () => void;
}

interface PropertyDetail {
  id: string;
  title: string;
  price: number;
  address: string;
  state: string;
  district: string;
  propertyType: string;
  listingType: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft: number;
  parking?: number;
  images: string[];
  description: string;
  features: string[];
  nearbyAmenities: string[];
  agent: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    phone: string;
    whatsapp: string;
    company: string;
  };
  coordinates: { lat: number; lng: number };
  isRizabMelayu: boolean;
  isRumahMampuMilik: boolean;
  views: number;
  listedDate: string;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ propertyId, onBack }) => {
  const { t, language } = useLanguage();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [calculatorDialogOpen, setCalculatorDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Mock property data
    setProperty({
      id: propertyId,
      title: "Luxury Condominium in KLCC",
      price: 1200000,
      address: "Jalan Ampang",
      state: "Kuala Lumpur",
      district: "KLCC",
      propertyType: "RESIDENTIAL",
      listingType: "SALE",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1200,
      parking: 2,
      images: ["/placeholder-property.jpg", "/placeholder-property.jpg"],
      description: "Beautiful luxury condominium with stunning city views",
      features: ["Swimming Pool", "Gym", "Security", "Parking"],
      nearbyAmenities: ["Shopping Mall", "LRT Station", "Hospital"],
      agent: {
        id: "agent1",
        name: "John Doe",
        avatar: "/placeholder-avatar.jpg",
        rating: 4.5,
        phone: "+60123456789",
        whatsapp: "60123456789",
        company: "MyRealEstate"
      },
      coordinates: { lat: 3.1569, lng: 101.7123 },
      isRizabMelayu: false,
      isRumahMampuMilik: false,
      views: 150,
      listedDate: "2024-01-15"
    });
  }, [propertyId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'bm' ? 'ms-MY' : 'en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getFeatureIcon = (feature: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      'Swimming Pool': <Pool />,
      'Gym': <FitnessCenter />,
      'Security': <Security />,
      'Parking': <LocalParking />,
      'Balcony': <Balcony />,
      'Air Conditioning': <AcUnit />,
      'School Nearby': <School />,
      'Hospital Nearby': <LocalHospital />,
      'Shopping Mall': <ShoppingCart />,
      'Near LRT': <Train />
    };
    return iconMap[feature] || <LocationOn />;
  };

  if (!property) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {property.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOn color="action" />
            <Typography variant="body1" color="text.secondary">
              {property.address}, {property.district}, {property.state}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={property.images[selectedImage]}
                alt={property.title}
                style={{ width: '100%', height: 400, objectFit: 'cover' }}
              />
              <Chip
                label={property.listingType}
                color="primary"
                sx={{ position: 'absolute', top: 16, left: 16 }}
              />
            </Box>
          </Card>

          <Card>
            <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
              <Tab label="Overview" />
              <Tab label="Features" />
              <Tab label="Location" />
            </Tabs>

            <CardContent>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Property Details</Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Bed color="primary" />
                        <Typography variant="h6">{property.bedrooms || 'N/A'}</Typography>
                        <Typography variant="caption">Bedrooms</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <Bathtub color="primary" />
                        <Typography variant="h6">{property.bathrooms || 'N/A'}</Typography>
                        <Typography variant="caption">Bathrooms</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <SquareFoot color="primary" />
                        <Typography variant="h6">{property.sqft.toLocaleString()}</Typography>
                        <Typography variant="caption">Sqft</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <DirectionsCar color="primary" />
                        <Typography variant="h6">{property.parking || 'N/A'}</Typography>
                        <Typography variant="caption">Parking</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" gutterBottom>Description</Typography>
                  <Typography variant="body1" paragraph>
                    {property.description}
                  </Typography>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Property Features</Typography>
                  <List>
                    {property.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getFeatureIcon(feature)}
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>Location & Nearby</Typography>
                  <Box sx={{ height: 300, bgcolor: 'grey.100', mb: 2, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Interactive Map</Typography>
                  </Box>
                  <List>
                    {property.nearbyAmenities.map((amenity, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getFeatureIcon(amenity)}
                        </ListItemIcon>
                        <ListItemText primary={amenity} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                {formatCurrency(property.price)}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Phone />}
                  onClick={() => setContactDialogOpen(true)}
                >
                  Contact Agent
                </Button>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<Calculate />}
                onClick={() => setCalculatorDialogOpen(true)}
                sx={{ mb: 2 }}
              >
                Loan Calculator
              </Button>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={property.agent.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {property.agent.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {property.agent.company}
                  </Typography>
                  <Rating value={property.agent.rating} size="small" readOnly />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Phone />}
                  href={`tel:${property.agent.phone}`}
                >
                  Call
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<WhatsApp />}
                  href={`https://wa.me/${property.agent.whatsapp}`}
                >
                  WhatsApp
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => window.open(`https://maps.google.com/?q=${property.coordinates.lat},${property.coordinates.lng}`, '_blank')}
      >
        <Map />
      </Fab>

      <Dialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Agent</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Your Name" sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone Number" sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" sx={{ mb: 2 }} />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            defaultValue={`I'm interested in ${property.title}`}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth startIcon={<Email />}>
            Send Message
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={calculatorDialogOpen} onClose={() => setCalculatorDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Loan Calculator</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Property Price"
            value={formatCurrency(property.price)}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField fullWidth label="Down Payment %" defaultValue="10" sx={{ mb: 2 }} />
          <TextField fullWidth label="Interest Rate %" defaultValue="4.5" sx={{ mb: 2 }} />
          <TextField fullWidth label="Loan Period (Years)" defaultValue="30" sx={{ mb: 2 }} />
          
          <Card sx={{ p: 2, bgcolor: 'primary.light', mb: 2 }}>
            <Typography variant="h6" color="primary.contrastText">
              Estimated Monthly Payment: RM 2,850
            </Typography>
          </Card>
          
          <Button variant="contained" fullWidth>
            Get Pre-Approval
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PropertyDetails;