import express, { Request, Response } from 'express';
import Property, { IProperty } from '../models/Property';
import { auth } from '../middleware/auth';
import { checkRole } from '../middleware/auth';
import { IUser } from '../models/User';
import agentSystemService from '../services/agentSystem';

const router = express.Router();

interface AuthRequest extends Request {
  user?: IUser;
}

// Create a new property listing
router.post('/', auth, checkRole(['seller', 'agent', 'admin']), async (req: AuthRequest, res: Response) => {
  try {
    const property = new Property({
      ...req.body,
      owner: req.user?._id
    });

    // Notify seller agent about new listing
    await agentSystemService.sellerListProperty(property, req.user?._id as string);

    await property.save();
    res.status(201).json({ message: 'Property listed successfully', property });
  } catch (error) {
    console.error('Property creation error:', error);
    res.status(400).json({ error: 'Failed to create property listing' });
  }
});

// Get all properties with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    const { 
      minPrice, 
      maxPrice, 
      propertyType, 
      listingType,
      status,
      bedrooms,
      bathrooms,
      city,
      state 
    } = req.query;

    if (minPrice) filters.price = { $gte: Number(minPrice) };
    if (maxPrice) {
      filters.price = { ...filters.price, $lte: Number(maxPrice) };
    }
    if (propertyType) filters.propertyType = propertyType;
    if (listingType) filters.listingType = listingType;
    if (status) filters.status = status;
    if (bedrooms) filters['features.bedrooms'] = Number(bedrooms);
    if (bathrooms) filters['features.bathrooms'] = Number(bathrooms);
    if (city) filters['location.city'] = city;
    if (state) filters['location.state'] = state;

    const properties = await Property.find(filters)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    console.error('Property fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Get a specific property
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email');

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Property fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// Update a property
router.patch('/:id', auth, async (req: AuthRequest, res: Response) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      owner: req.user?._id
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'title', 'description', 'price', 'location', 
      'features', 'images', 'status', 'tokenId', 
      'contractAddress'
    ];
    
    const isValidOperation = updates.every(update => 
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    updates.forEach(update => {
      (property as any)[update] = req.body[update];
    });

    await property.save();
    res.json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error('Property update error:', error);
    res.status(400).json({ error: 'Failed to update property' });
  }
});

// Delete a property
router.delete('/:id', auth, async (req: AuthRequest, res: Response) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      owner: req.user?._id
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully', property });
  } catch (error) {
    console.error('Property deletion error:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

// Get properties by owner
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({ owner: req.params.userId })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    console.error('Property fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

export default router;

