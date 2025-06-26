import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: '10 Tips for First-Time Home Buyers',
    excerpt: 'Essential advice for navigating your first home purchase successfully.',
    content: 'Buying your first home can be overwhelming, but with the right preparation...',
    author: 'Sarah Johnson',
    authorAvatar: 'https://source.unsplash.com/50x50/?woman,professional',
    date: '2024-01-15',
    category: 'Buying Tips',
    image: 'https://source.unsplash.com/600x400/?house,keys',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Market Trends: What to Expect in 2024',
    excerpt: 'Analysis of current real estate market trends and future predictions.',
    content: 'The real estate market continues to evolve with changing economic conditions...',
    author: 'Michael Chen',
    authorAvatar: 'https://source.unsplash.com/50x50/?man,professional',
    date: '2024-01-12',
    category: 'Market Analysis',
    image: 'https://source.unsplash.com/600x400/?chart,graph',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'How to Stage Your Home for Quick Sale',
    excerpt: 'Professional staging tips to make your property more appealing to buyers.',
    content: 'Home staging is a crucial step in preparing your property for sale...',
    author: 'Emily Rodriguez',
    authorAvatar: 'https://source.unsplash.com/50x50/?woman,business',
    date: '2024-01-10',
    category: 'Selling Tips',
    image: 'https://source.unsplash.com/600x400/?interior,staging',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Investment Properties: A Beginner\'s Guide',
    excerpt: 'Everything you need to know about investing in real estate.',
    content: 'Real estate investment can be a lucrative venture when done correctly...',
    author: 'David Thompson',
    authorAvatar: 'https://source.unsplash.com/50x50/?man,suit',
    date: '2024-01-08',
    category: 'Investment',
    image: 'https://source.unsplash.com/600x400/?investment,property',
    readTime: '10 min read',
  },
  {
    id: 5,
    title: 'Luxury Home Features That Add Value',
    excerpt: 'Discover which luxury features provide the best return on investment.',
    content: 'When it comes to luxury homes, certain features stand out as value-adding...',
    author: 'Lisa Wang',
    authorAvatar: 'https://source.unsplash.com/50x50/?woman,elegant',
    date: '2024-01-05',
    category: 'Luxury',
    image: 'https://source.unsplash.com/600x400/?luxury,home',
    readTime: '7 min read',
  },
  {
    id: 6,
    title: 'Understanding Mortgage Options',
    excerpt: 'A comprehensive guide to different types of mortgages available.',
    content: 'Choosing the right mortgage is crucial for your financial future...',
    author: 'Robert Martinez',
    authorAvatar: 'https://source.unsplash.com/50x50/?man,advisor',
    date: '2024-01-03',
    category: 'Finance',
    image: 'https://source.unsplash.com/600x400/?mortgage,documents',
    readTime: '9 min read',
  },
];

const categories = ['All', 'Buying Tips', 'Selling Tips', 'Market Analysis', 'Investment', 'Luxury', 'Finance'];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? mockBlogPosts 
    : mockBlogPosts.filter(post => post.category === selectedCategory);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Real Estate Blog
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Stay informed with the latest insights, tips, and market trends
          </Typography>

          {/* Category Filter */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 6, mt: 4 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                color={selectedCategory === category ? 'primary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ mb: 6 }}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Chip
                        label={filteredPosts[0].category}
                        size="small"
                        color="primary"
                        sx={{ alignSelf: 'flex-start', mb: 2 }}
                      />
                      <Typography variant="h4" component="h2" gutterBottom>
                        {filteredPosts[0].title}
                      </Typography>
                      <Typography color="text.secondary" paragraph>
                        {filteredPosts[0].excerpt}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar
                          src={filteredPosts[0].authorAvatar}
                          alt={filteredPosts[0].author}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {filteredPosts[0].author}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {new Date(filteredPosts[0].date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              • {filteredPosts[0].readTime}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Button variant="contained" sx={{ mt: 'auto', alignSelf: 'flex-start' }}>
                        Read More
                      </Button>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <Grid container spacing={4}>
            {filteredPosts.slice(1).map((post, index) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.2s ease-in-out',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.image}
                      alt={post.title}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Chip
                        label={post.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ alignSelf: 'flex-start', mb: 2 }}
                      />
                      
                      <Typography variant="h6" component="h3" gutterBottom>
                        {post.title}
                      </Typography>
                      
                      <Typography color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                        {post.excerpt}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Avatar
                          src={post.authorAvatar}
                          alt={post.author}
                          sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {post.author}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(post.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.readTime}
                        </Typography>
                      </Box>
                      
                      <Button variant="outlined" sx={{ mt: 2 }}>
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default BlogPage;
