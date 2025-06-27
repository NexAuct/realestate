import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  IconButton,
  Box,
  Avatar,
  Rating,
  Divider,
  Badge
} from '@mui/material';
import {
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
  Visibility,
  TrendingUp,
  Gavel,
  Schedule
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    address: string;
    state: string;
    district: string;
    propertyType: string;
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
    isRizabMelayu: boolean;
    isRumahMampuMilik: boolean;
    isFeatured: boolean;
    views: number;
    listedDate: string;
    pricePerSqft?: number;
  };
  onFavoriteToggle: (propertyId: string) => void;
  isFavorite: boolean;
  onViewDetails: (propertyId: string) => void;
  viewMode?: 'grid' | 'list';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavoriteToggle,
  isFavorite,
  onViewDetails,
  viewMode = 'grid'
}) => {
  const { t, language } = useLanguage();
  const [imageError, setImageError] = useState(false);

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

  const getListingTypeIcon = (type: string) => {
    switch (type) {
      case 'AUCTION': return <Gavel />;
      case 'RENT': return <Schedule />;
      default: return <TrendingUp />;
    }
  };

  const getDaysListed = () => {
    const listedDate = new Date(property.listedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - listedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (viewMode === 'list') {
    return (
      <Card sx={{ display: 'flex', mb: 2, position: 'relative' }}>
        {property.isFeatured && (
          <Chip
            label="Featured"
            color="warning"
            size="small"
            sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}
          />
        )}
        
        <Box sx={{ position: 'relative', minWidth: 300 }}>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 200 }}
            image={imageError ? '/placeholder-property.jpg' : property.images[0]}
            alt={property.title}
            onError={() => setImageError(true)}
          />
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <IconButton
              size="small"
              onClick={() => onFavoriteToggle(property.id)}
              sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
            >
              {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          <Chip
            label={property.listingType}
            color={getListingTypeColor(property.listingType)}
            size="small"
            sx={{ position: 'absolute', bottom: 8, left: 8 }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" component="h2" noWrap sx={{ maxWidth: '70%' }}>
                {property.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {property.views}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
              {formatCurrency(property.price)}
              {property.listingType === 'RENT' && (
                <Typography component="span" variant="body2" color="text.secondary">
                  /month
                </Typography>
              )}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {property.district}, {property.state}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
              {property.bedrooms && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Bed sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">{property.bedrooms}</Typography>
                </Box>
              )}
              {property.bathrooms && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Bathtub sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">{property.bathrooms}</Typography>
                </Box>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SquareFoot sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">{property.sqft.toLocaleString()} sqft</Typography>
              </Box>
              {property.parking && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsCar sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">{property.parking}</Typography>
                </Box>
              )}
            </Box>

            {property.pricePerSqft && (
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {formatCurrency(property.pricePerSqft)}/sqft
              </Typography>
            )}

            {(property.isRizabMelayu || property.isRumahMampuMilik) && (
              <Box sx={{ mb: 1 }}>
                {property.isRizabMelayu && (
                  <Chip label="Rizab Melayu" size="small" color="secondary" sx={{ mr: 1 }} />
                )}
                {property.isRumahMampuMilik && (
                  <Chip label="Rumah Mampu Milik" size="small" color="info" />
                )}
              </Box>
            )}
          </CardContent>

          <Divider />

          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={property.agent.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
              <Box>
                <Typography variant="caption" display="block">
                  {property.agent.name}
                </Typography>
                <Rating value={property.agent.rating} size="small" readOnly />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" href={`tel:${property.agent.phone}`}>
                <Phone fontSize="small" />
              </IconButton>
              <IconButton size="small" href={`https://wa.me/${property.agent.whatsapp}`}>
                <WhatsApp fontSize="small" />
              </IconButton>
              <Button
                size="small"
                variant="contained"
                startIcon={getListingTypeIcon(property.listingType)}
                onClick={() => onViewDetails(property.id)}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {property.isFeatured && (
        <Badge
          badgeContent="Featured"
          color="warning"
          sx={{
            '& .MuiBadge-badge': {
              top: 16,
              right: 16,
              fontSize: '0.75rem',
              height: 20,
              minWidth: 60
            }
          }}
        >
          <Box sx={{ width: '100%' }} />
        </Badge>
      )}
      
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageError ? '/placeholder-property.jpg' : property.images[0]}
          alt={property.title}
          onError={() => setImageError(true)}
        />
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <IconButton
            size="small"
            onClick={() => onFavoriteToggle(property.id)}
            sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
          >
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        <Chip
          label={property.listingType}
          color={getListingTypeColor(property.listingType)}
          size="small"
          sx={{ position: 'absolute', bottom: 8, left: 8 }}
        />
        <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.6)', borderRadius: 1, px: 1 }}>
          <Visibility sx={{ fontSize: 14, color: 'white', mr: 0.5 }} />
          <Typography variant="caption" color="white">
            {property.views}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom noWrap title={property.title}>
          {property.title}
        </Typography>
        
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          {formatCurrency(property.price)}
          {property.listingType === 'RENT' && (
            <Typography component="span" variant="body2" color="text.secondary">
              /month
            </Typography>
          )}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {property.district}, {property.state}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          {property.bedrooms && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Bed sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">{property.bedrooms}</Typography>
            </Box>
          )}
          {property.bathrooms && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Bathtub sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">{property.bathrooms}</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SquareFoot sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption">{property.sqft.toLocaleString()}</Typography>
          </Box>
          {property.parking && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsCar sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">{property.parking}</Typography>
            </Box>
          )}
        </Box>

        {property.pricePerSqft && (
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            {formatCurrency(property.pricePerSqft)}/sqft
          </Typography>
        )}

        {(property.isRizabMelayu || property.isRumahMampuMilik) && (
          <Box sx={{ mb: 2 }}>
            {property.isRizabMelayu && (
              <Chip label="Rizab Melayu" size="small" color="secondary" sx={{ mr: 1, mb: 1 }} />
            )}
            {property.isRumahMampuMilik && (
              <Chip label="Rumah Mampu Milik" size="small" color="info" sx={{ mb: 1 }} />
            )}
          </Box>
        )}

        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Listed {getDaysListed()} days ago
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={property.agent.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
            <Box>
              <Typography variant="caption" display="block">
                {property.agent.name}
              </Typography>
              <Rating value={property.agent.rating} size="small" readOnly />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" href={`tel:${property.agent.phone}`}>
              <Phone fontSize="small" />
            </IconButton>
            <IconButton size="small" href={`https://wa.me/${property.agent.whatsapp}`}>
              <WhatsApp fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          startIcon={getListingTypeIcon(property.listingType)}
          onClick={() => onViewDetails(property.id)}
        >
          {property.listingType === 'AUCTION' ? 'Join Auction' : 'View Details'}
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyCard;