import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  SelectChangeEvent,
  Chip,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Pagination,
  Alert,
  Snackbar,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Add, 
  Visibility, 
  ContentCopy, 
  Publish, 
  Archive, 
  MoreVert,
  Search,
  FilterList,
  Analytics,
  Image,
  Language
} from '@mui/icons-material';

interface CMSPage {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  author: { _id: string; name: string; email: string };
  category: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  language: 'en' | 'bm';
  publishedAt?: string;
  viewCount: number;
  isHomepage: boolean;
  template: 'default' | 'landing' | 'property' | 'auction';
  customFields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface CMSAnalytics {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  archivedPages: number;
  totalViews: number;
  topPages: Array<{ title: string; slug: string; viewCount: number }>;
}

const CMSDashboardPage: React.FC = () => {
  const [cmsPages, setCmsPages] = useState<CMSPage[]>([]);
  const [analytics, setAnalytics] = useState<CMSAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    language: '',
    search: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    category: 'general',
    tags: [] as string[],
    seoTitle: '',
    seoDescription: '',
    language: 'en' as 'en' | 'bm',
    isHomepage: false,
    template: 'default' as 'default' | 'landing' | 'property' | 'auction',
    featuredImage: null as File | null
  });

  useEffect(() => {
    fetchCMSPages();
    fetchAnalytics();
  }, [page, filters]);

  const fetchCMSPages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...filters
      });
      const response = await fetch(`/api/cms?${params}`, {
        credentials: 'include'
      });
      const data = await response.json();
      setCmsPages(data.pages || []);
    } catch (error) {
      console.error('Failed to fetch CMS pages:', error);
      setSnackbar({ open: true, message: 'Failed to fetch pages', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/cms/analytics/stats', {
        credentials: 'include'
      });
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  const handleOpenDialog = async (page?: CMSPage) => {
    if (page) {
      setEditingPage(page);
      // Fetch full page content
      try {
        const response = await fetch(`/api/cms/${page._id}`, { credentials: 'include' });
        const fullPage = await response.json();
        setFormData({
          title: fullPage.title,
          slug: fullPage.slug,
          content: fullPage.content,
          excerpt: fullPage.excerpt || '',
          status: fullPage.status,
          category: fullPage.category,
          tags: fullPage.tags || [],
          seoTitle: fullPage.seoTitle || '',
          seoDescription: fullPage.seoDescription || '',
          language: fullPage.language,
          isHomepage: fullPage.isHomepage,
          template: fullPage.template,
          featuredImage: null
        });
      } catch (error) {
        console.error('Failed to fetch page details:', error);
      }
    } else {
      setEditingPage(null);
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        status: 'draft',
        category: 'general',
        tags: [],
        seoTitle: '',
        seoDescription: '',
        language: 'en',
        isHomepage: false,
        template: 'default',
        featuredImage: null
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value as string
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value as string
    }));
  };

  const handleSave = async () => {
    try {
      const method = editingPage ? 'PATCH' : 'POST';
      const url = editingPage ? `/api/cms/${editingPage._id}` : '/api/cms';
      
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tags') {
          formDataToSend.append(key, (value as string[]).join(','));
        } else if (key === 'featuredImage' && value) {
          formDataToSend.append(key, value as File);
        } else if (value !== null) {
          formDataToSend.append(key, value.toString());
        }
      });
      
      const response = await fetch(url, {
        method,
        credentials: 'include',
        body: formDataToSend
      });
      
      if (!response.ok) {
        throw new Error('Failed to save CMS page');
      }
      
      await fetchCMSPages();
      await fetchAnalytics();
      handleCloseDialog();
      setSnackbar({ open: true, message: 'Page saved successfully', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Failed to save page', severity: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this CMS page?')) return;
    try {
      const response = await fetch(`/api/cms/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to delete CMS page');
      }
      await fetchCMSPages();
      await fetchAnalytics();
      setSnackbar({ open: true, message: 'Page deleted successfully', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Failed to delete page', severity: 'error' });
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedPages.length === 0) return;
    
    try {
      const response = await fetch('/api/cms/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action, ids: selectedPages })
      });
      
      if (!response.ok) throw new Error('Bulk action failed');
      
      await fetchCMSPages();
      await fetchAnalytics();
      setSelectedPages([]);
      setSnackbar({ open: true, message: `Bulk ${action} completed`, severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Bulk ${action} failed`, severity: 'error' });
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const response = await fetch(`/api/cms/${id}/duplicate`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to duplicate page');
      
      await fetchCMSPages();
      setSnackbar({ open: true, message: 'Page duplicated successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to duplicate page', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">MyRealEstate CMS Dashboard</Typography>
        <Box display="flex" gap={2}>
          {selectedPages.length > 0 && (
            <>
              <Button onClick={() => handleBulkAction('publish')}>Publish Selected</Button>
              <Button onClick={() => handleBulkAction('archive')}>Archive Selected</Button>
              <Button onClick={() => handleBulkAction('delete')} color="error">Delete Selected</Button>
            </>
          )}
          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
            New Page
          </Button>
        </Box>
      </Box>

      {/* Analytics Cards */}
      {analytics && (
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Pages</Typography>
                <Typography variant="h4">{analytics.totalPages}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Published</Typography>
                <Typography variant="h4" color="success.main">{analytics.publishedPages}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Drafts</Typography>
                <Typography variant="h4" color="warning.main">{analytics.draftPages}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Views</Typography>
                <Typography variant="h4" color="primary.main">{analytics.totalViews}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Search pages..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={filters.language}
                  onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="bm">Bahasa Melayu</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="property">Property</MenuItem>
                  <MenuItem value="auction">Auction</MenuItem>
                  <MenuItem value="news">News</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPages.length === cmsPages.length && cmsPages.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPages(cmsPages.map(p => p._id));
                      } else {
                        setSelectedPages([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cmsPages.map(page => (
                <TableRow key={page._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPages.includes(page._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPages([...selectedPages, page._id]);
                        } else {
                          setSelectedPages(selectedPages.filter(id => id !== page._id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{page.title}</Typography>
                      <Typography variant="caption" color="textSecondary">/{page.slug}</Typography>
                      {page.isHomepage && <Chip label="Homepage" size="small" color="primary" sx={{ ml: 1 }} />}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={page.status} 
                      color={page.status === 'published' ? 'success' : page.status === 'draft' ? 'warning' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={page.language.toUpperCase()} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{page.category}</TableCell>
                  <TableCell>{page.viewCount}</TableCell>
                  <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(page)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDuplicate(page._id)}><ContentCopy /></IconButton>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}><MoreVert /></IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}
                    >
                      <MenuItem onClick={() => { handleDelete(page._id); setAnchorEl(null); }}>
                        <ListItemIcon><Delete /></ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination 
              count={10} 
              page={page} 
              onChange={(_, value) => setPage(value)} 
            />
          </Box>
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>{editingPage ? 'Edit CMS Page' : 'New CMS Page'}</DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ mb: 2 }}>
            <Tab label="Content" />
            <Tab label="SEO" />
            <Tab label="Settings" />
          </Tabs>
          
          {activeTab === 0 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    margin="normal"
                    label="Title"
                    name="title"
                    fullWidth
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    margin="normal"
                    label="Slug"
                    name="slug"
                    fullWidth
                    value={formData.slug}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Excerpt"
                    name="excerpt"
                    fullWidth
                    multiline
                    rows={2}
                    value={formData.excerpt}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    label="Content"
                    name="content"
                    fullWidth
                    multiline
                    minRows={8}
                    value={formData.content}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.files?.[0] || null })}
                    style={{ marginTop: 16 }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeTab === 1 && (
            <Box>
              <TextField
                margin="normal"
                label="SEO Title"
                name="seoTitle"
                fullWidth
                value={formData.seoTitle}
                onChange={handleInputChange}
                helperText="Recommended: 50-60 characters"
              />
              <TextField
                margin="normal"
                label="SEO Description"
                name="seoDescription"
                fullWidth
                multiline
                rows={3}
                value={formData.seoDescription}
                onChange={handleInputChange}
                helperText="Recommended: 150-160 characters"
              />
              <TextField
                margin="normal"
                label="Tags (comma separated)"
                name="tags"
                fullWidth
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
              />
            </Box>
          )}
          
          {activeTab === 2 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      name="language"
                      value={formData.language}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="bm">Bahasa Melayu</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="general">General</MenuItem>
                      <MenuItem value="property">Property</MenuItem>
                      <MenuItem value="auction">Auction</MenuItem>
                      <MenuItem value="news">News</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel>Template</InputLabel>
                    <Select
                      name="template"
                      value={formData.template}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="default">Default</MenuItem>
                      <MenuItem value="landing">Landing Page</MenuItem>
                      <MenuItem value="property">Property Page</MenuItem>
                      <MenuItem value="auction">Auction Page</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isHomepage}
                        onChange={(e) => setFormData({ ...formData, isHomepage: e.target.checked })}
                      />
                    }
                    label="Set as Homepage"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default CMSDashboardPage;
