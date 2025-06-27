import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Rating,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import {
  ArrowBack,
  Phone,
  WhatsApp,
  Email,
  LocationOn,
  Star,
  TrendingUp,
  Home,
  Schedule
} from '@mui/icons-material';

interface AgentProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  reviews: number;
  experience: string;
  specialties: string[];
  phone: string;
  whatsapp: string;
  email: string;
  description: string;
  languages: string[];
  serviceAreas: string[];
  achievements: string[];
  recentSales: Array<{
    id: string;
    title: string;
    price: number;
    soldDate: string;
    image: string;
  }>;
  testimonials: Array<{
    id: string;
    client: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const AgentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Mock agent data
    setAgent({
      id: id || '1',
      name: 'Sarah Johnson',
      title: 'Senior Real Estate Agent',
      company: 'MyRealEstate',
      avatar: 'https://source.unsplash.com/200x200/?woman,professional',
      rating: 4.9,
      reviews: 127,
      experience: '8 years',
      specialties: ['Luxury Homes', 'Commercial', 'Investment Properties'],
      phone: '+60 123 456 789',
      whatsapp: '60123456789',
      email: 'sarah.johnson@myrealestate.com',
      description: 'Sarah is a dedicated real estate professional with over 8 years of experience in the Malaysian property market. She specializes in luxury residential properties and has helped hundreds of clients find their dream homes.',
      languages: ['English', 'Bahasa Malaysia', 'Mandarin'],
      serviceAreas: ['Kuala Lumpur', 'Selangor', 'Putrajaya'],
      achievements: [
        'Top Performer 2023',
        'Customer Service Excellence Award',
        'Million Dollar Club Member',
        'Licensed Real Estate Negotiator'
      ],
      recentSales: [
        {
          id: '1',
          title: 'Luxury Condo KLCC',
          price: 1200000,
          soldDate: '2024-01-15',
          image: 'https://source.unsplash.com/300x200/?luxury,condo'
        },
        {
          id: '2',
          title: 'Modern Townhouse',
          price: 850000,
          soldDate: '2024-01-10',
          image: 'https://source.unsplash.com/300x200/?townhouse'
        }
      ],
      testimonials: [
        {
          id: '1',
          client: 'John Doe',
          rating: 5,
          comment: 'Sarah was incredibly helpful throughout the entire process. Her expertise and professionalism made buying our first home a smooth experience.',
          date: '2024-01-20'
        },
        {
          id: '2',
          client: 'Mary Smith',
          rating: 5,
          comment: 'Excellent service! Sarah found us the perfect investment property and negotiated a great deal.',
          date: '2024-01-18'
        }
      ]
    });
  }, [id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!agent) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/agents')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Back to Agents</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Avatar
                src={agent.avatar}
                alt={agent.name}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              
              <Typography variant="h4" gutterBottom>
                {agent.name}
              </Typography>
              
              <Typography variant="h6" color="primary" gutterBottom>
                {agent.title}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {agent.company}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Rating value={agent.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {agent.rating} ({agent.reviews} reviews)
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {agent.experience} experience
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Phone />}
                  href={`tel:${agent.phone}`}
                >
                  Call Now
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<WhatsApp />}
                  href={`https://wa.me/${agent.whatsapp}`}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Email />}
                  href={`mailto:${agent.email}`}
                >
                  Email
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Specialties
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {agent.specialties.map((specialty) => (
                    <Chip key={specialty} label={specialty} size="small" />
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Languages
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {agent.languages.join(', ')}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Service Areas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {agent.serviceAreas.join(', ')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
              <Tab label="About" />
              <Tab label="Recent Sales" />
              <Tab label="Reviews" />
              <Tab label="Achievements" />
            </Tabs>

            <CardContent sx={{ p: 4 }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    About {agent.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {agent.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Why Choose {agent.name}?
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Market Expertise"
                        secondary="Deep knowledge of local market trends and pricing"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Personalized Service"
                        secondary="Tailored approach to meet your specific needs"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Proven Track Record"
                        secondary="Consistent results and satisfied clients"
                      />
                    </ListItem>
                  </List>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Recent Sales
                  </Typography>
                  <Grid container spacing={3}>
                    {agent.recentSales.map((sale) => (
                      <Grid item xs={12} sm={6} key={sale.id}>
                        <Card>
                          <Box
                            component="img"
                            src={sale.image}
                            alt={sale.title}
                            sx={{ width: '100%', height: 150, objectFit: 'cover' }}
                          />
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {sale.title}
                            </Typography>
                            <Typography variant="h5" color="primary" fontWeight="bold">
                              {formatCurrency(sale.price)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Sold on {new Date(sale.soldDate).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Client Reviews
                  </Typography>
                  {agent.testimonials.map((testimonial) => (
                    <Card key={testimonial.id} sx={{ mb: 2 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {testimonial.client}
                            </Typography>
                            <Rating value={testimonial.rating} size="small" readOnly />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(testimonial.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          "{testimonial.comment}"
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Achievements & Certifications
                  </Typography>
                  <List>
                    {agent.achievements.map((achievement, index) => (
                      <ListItem key={index}>
                        <Star color="primary" sx={{ mr: 2 }} />
                        <ListItemText primary={achievement} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgentProfilePage;