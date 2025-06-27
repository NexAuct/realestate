import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Divider,
  Card,
  CardContent,
  Grid,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Share,
  Favorite,
  FavoriteBorder,
  CalendarToday,
  Person,
  AccessTime
} from '@mui/icons-material';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Mock blog post data
    setPost({
      id: id || '1',
      title: '10 Tips for First-Time Home Buyers in Malaysia',
      content: `
        <p>Buying your first home is an exciting milestone, but it can also be overwhelming. Here are 10 essential tips to help you navigate the Malaysian property market successfully.</p>
        
        <h3>1. Understand Your Budget</h3>
        <p>Before you start house hunting, determine how much you can afford. Consider your monthly income, expenses, and the down payment you can make.</p>
        
        <h3>2. Get Pre-Approved for a Loan</h3>
        <p>Getting pre-approved for a home loan gives you a clear picture of your budget and shows sellers you're a serious buyer.</p>
        
        <h3>3. Research the Location</h3>
        <p>Location is crucial in real estate. Consider factors like proximity to work, schools, public transport, and amenities.</p>
        
        <h3>4. Understand Malaysian Property Laws</h3>
        <p>Familiarize yourself with local property laws, including foreign ownership restrictions and state-specific regulations.</p>
        
        <h3>5. Work with a Licensed Agent</h3>
        <p>A good real estate agent can guide you through the process and help you find properties that match your criteria.</p>
        
        <h3>6. Inspect the Property Thoroughly</h3>
        <p>Always conduct a thorough inspection of the property before making an offer. Look for structural issues, water damage, and other potential problems.</p>
        
        <h3>7. Negotiate Wisely</h3>
        <p>Don't be afraid to negotiate the price, but be reasonable. Research comparable properties in the area to support your offer.</p>
        
        <h3>8. Factor in Additional Costs</h3>
        <p>Remember to budget for additional costs like legal fees, stamp duty, and moving expenses.</p>
        
        <h3>9. Consider Future Resale Value</h3>
        <p>Think about the property's potential for appreciation and how easy it would be to sell in the future.</p>
        
        <h3>10. Take Your Time</h3>
        <p>Don't rush into a decision. Take time to consider all factors and make sure you're comfortable with your choice.</p>
      `,
      excerpt: 'Essential advice for navigating your first home purchase successfully in the Malaysian market.',
      author: 'Sarah Johnson',
      authorAvatar: 'https://source.unsplash.com/100x100/?woman,professional',
      date: '2024-01-15',
      category: 'Buying Tips',
      image: 'https://source.unsplash.com/1200x600/?house,keys,malaysia',
      readTime: '8 min read',
      tags: ['First-time buyers', 'Malaysia', 'Property tips', 'Home buying']
    });
  }, [id]);

  if (!post) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/blog')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Back to Blog</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <Box
              component="img"
              src={post.image}
              alt={post.title}
              sx={{ width: '100%', height: 400, objectFit: 'cover' }}
            />
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={post.category} color="primary" size="small" />
                {post.tags.map((tag) => (
                  <Chip key={tag} label={tag} variant="outlined" size="small" />
                ))}
              </Box>

              <Typography variant="h3" component="h1" gutterBottom>
                {post.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={post.authorAvatar} sx={{ width: 32, height: 32 }} />
                  <Typography variant="body2">{post.author}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday sx={{ fontSize: 16 }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(post.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 16 }} />
                  <Typography variant="body2" color="text.secondary">
                    {post.readTime}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box
                sx={{ '& h3': { mt: 3, mb: 2 }, '& p': { mb: 2, lineHeight: 1.7 } }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Share this article
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button variant="outlined" size="small" startIcon={<Share />}>
                  Share
                </Button>
                <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                  {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" gutterBottom>
                About the Author
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src={post.authorAvatar} sx={{ width: 50, height: 50 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Real Estate Expert
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Sarah is a licensed real estate agent with over 10 years of experience 
                helping clients buy and sell properties in Malaysia.
              </Typography>

              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPostPage;