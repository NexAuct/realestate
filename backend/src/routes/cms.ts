import express, { Request, Response } from 'express';
import CMSPage, { ICMSPage } from '../models/CMSPage';
import { auth } from '../middleware/auth';
import { hasPermission, canManageCMS, canPublishCMS } from '../middleware/rbac';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cms/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get all CMS pages with filtering and pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      category, 
      language, 
      search,
      template 
    } = req.query;

    const filter: any = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (language) filter.language = language;
    if (template) filter.template = template;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    const pages = await CMSPage.find(filter)
      .populate('author', 'name email')
      .sort({ updatedAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const total = await CMSPage.countDocuments(filter);

    res.json({
      pages,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('Get CMS pages error:', error);
    res.status(500).json({ error: 'Failed to fetch CMS pages' });
  }
});


// Create new CMS page
// Utility to wrap async route handlers and pass errors to next()
function asyncHandler(fn: express.RequestHandler) {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  '/',
  auth,
  hasPermission('cms:create'),
  upload.single('featuredImage'),
  asyncHandler(async (req: Request, res: Response) => {
    const {
      title,
      slug,
      content,
      excerpt,
      status = 'draft',
      category = 'general',
      tags,
      seoTitle,
      seoDescription,
      language = 'en',
      isHomepage = false,
      template = 'default',
      customFields
    } = req.body;

    // Check if slug already exists
    const existingPage = await CMSPage.findOne({ slug, language });
    if (existingPage) {
      res.status(400).json({ error: 'Slug already exists for this language' });
      return;
    }

    // If setting as homepage, unset other homepage pages
    if (isHomepage) {
      await CMSPage.updateMany({ language }, { isHomepage: false });
    }

    const pageData: Partial<ICMSPage> = {
      title,
      slug,
      content,
      excerpt,
      status,
      category,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim())) : [],
      seoTitle,
      seoDescription,
      language,
      isHomepage,
      template,
      author: (req as any).user._id,
      customFields: customFields ? JSON.parse(customFields) : {}
    };

    if (req.file) {
      pageData.featuredImage = `/uploads/cms/${req.file.filename}`;
    }

    const page = new CMSPage(pageData);
    await page.save();
    
    await page.populate('author', 'name email');
    
    res.status(201).json(page);
  })
);

// Update CMS page
router.patch('/:id', auth, hasPermission('cms:edit'), upload.single('featuredImage'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    
    // Handle tags
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map((t: string) => t.trim());
    }

    // Handle custom fields
    if (updates.customFields && typeof updates.customFields === 'string') {
      updates.customFields = JSON.parse(updates.customFields);
    }

    // Handle homepage setting
    if (updates.isHomepage === true || updates.isHomepage === 'true') {
      const page = await CMSPage.findById(id);
      if (page) {
        await CMSPage.updateMany({ language: page.language }, { isHomepage: false });
      }
    }

    if (req.file) {
      updates.featuredImage = `/uploads/cms/${req.file.filename}`;
    }

    const page = await CMSPage.findByIdAndUpdate(id, updates, { 
      new: true, 
      runValidators: true 
    }).populate('author', 'name email');

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    console.error('Update CMS page error:', error);
    res.status(400).json({ error: 'Failed to update CMS page' });
  }
});

// Delete CMS page
router.delete('/:id', auth, hasPermission('cms:delete'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const page = await CMSPage.findByIdAndDelete(id);
    
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Delete CMS page error:', error);
    res.status(500).json({ error: 'Failed to delete CMS page' });
  }
});

// Bulk operations
router.post('/bulk', auth, canManageCMS, async (req: Request, res: Response) => {
  try {
    const { action, ids, data } = req.body;
    
    switch (action) {
      case 'delete':
        await CMSPage.deleteMany({ _id: { $in: ids } });
        res.json({ message: `${ids.length} pages deleted` });
        break;
        
      case 'publish':
        await CMSPage.updateMany(
          { _id: { $in: ids } }, 
          { status: 'published', publishedAt: new Date() }
        );
        res.json({ message: `${ids.length} pages published` });
        break;
        
      case 'archive':
        await CMSPage.updateMany({ _id: { $in: ids } }, { status: 'archived' });
        res.json({ message: `${ids.length} pages archived` });
        break;
        
      case 'update':
        await CMSPage.updateMany({ _id: { $in: ids } }, data);
        res.json({ message: `${ids.length} pages updated` });
        break;
        
      default:
        res.status(400).json({ error: 'Invalid bulk action' });
    }
  } catch (error) {
    console.error('Bulk operation error:', error);
    res.status(500).json({ error: 'Bulk operation failed' });
  }
});

// Get CMS analytics
router.get('/analytics/stats', auth, hasPermission('analytics:view'), async (req: Request, res: Response) => {
  try {
    const [
      totalPages,
      publishedPages,
      draftPages,
      archivedPages,
      totalViews,
      topPages
    ] = await Promise.all([
      CMSPage.countDocuments(),
      CMSPage.countDocuments({ status: 'published' }),
      CMSPage.countDocuments({ status: 'draft' }),
      CMSPage.countDocuments({ status: 'archived' }),
      CMSPage.aggregate([{ $group: { _id: null, total: { $sum: '$viewCount' } } }]),
      CMSPage.find({ status: 'published' })
        .sort({ viewCount: -1 })
        .limit(5)
        .select('title slug viewCount')
    ]);

    res.json({
      totalPages,
      publishedPages,
      draftPages,
      archivedPages,
      totalViews: totalViews[0]?.total || 0,
      topPages
    });
  } catch (error) {
    console.error('CMS analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Duplicate page
router.post(
  '/:id/duplicate',
  auth,
  hasPermission('cms:create'),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const originalPage = await CMSPage.findById(id);
    
    if (!originalPage) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const duplicatedPage = new CMSPage({
      ...(originalPage.toObject() as Record<string, any>),
      _id: undefined,
      title: `${originalPage.title} (Copy)`,
      slug: `${originalPage.slug}-copy-${Date.now()}`,
      status: 'draft',
      publishedAt: undefined,
      viewCount: 0,
      isHomepage: false,
      author: (req as any).user._id
    });

    await duplicatedPage.save();
    await duplicatedPage.populate('author', 'name email');
    
    res.status(201).json(duplicatedPage);
  })
);

// Get single CMS page by ID or slug
router.get(
  '/:identifier',
  asyncHandler(async (req: Request, res: Response) => {
      const { identifier } = req.params;
      const { increment_view } = req.query;
      
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
      const query = isObjectId ? { _id: identifier } : { slug: identifier };
      
      const page = await CMSPage.findOne(query).populate('author', 'name email');
      
      if (!page) {
        res.status(404).json({ error: 'Page not found' });
        return;
      }
  
      // Increment view count if requested
      if (increment_view === 'true') {
        page.viewCount += 1;
        await page.save();
      }
  
      res.json(page);
    })
);

export default router;