import express, { Request, Response } from 'express';
import Role from '../models/Role';
import Permission from '../models/Permission';
import User from '../models/User';
import { auth } from '../middleware/auth';
import { hasPermission, isAdmin } from '../middleware/rbac';

const router = express.Router();

// Roles management
router.get('/roles', auth, hasPermission('rbac:view'), async (req: Request, res: Response) => {
  try {
    const roles = await Role.find({ isActive: true });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

router.post('/roles', auth, hasPermission('rbac:manage'), async (req: Request, res: Response) => {
  try {
    const { name, description, permissions } = req.body;
    const role = new Role({ name, description, permissions });
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create role' });
  }
});

router.patch('/roles/:id', auth, hasPermission('rbac:manage'), async (req: Request, res: Response) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update role' });
  }
});

router.delete('/roles/:id', auth, hasPermission('rbac:manage'), async (req: Request, res: Response) => {
  try {
    await Role.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Role deactivated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to deactivate role' });
  }
});

// Permissions management
router.get('/permissions', auth, hasPermission('rbac:view'), async (req: Request, res: Response) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
});

router.post('/permissions', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const permission = new Permission(req.body);
    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create permission' });
  }
});

// User role assignment
router.post('/users/:userId/roles', auth, hasPermission('rbac:manage'), async (req: Request, res: Response) => {
  try {
    const { roleIds } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { roles: { $each: roleIds } } },
      { new: true }
    ).populate('roles');
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to assign roles' });
  }
});

router.delete('/users/:userId/roles/:roleId', auth, hasPermission('rbac:manage'), async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { roles: req.params.roleId } },
      { new: true }
    ).populate('roles');
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to remove role' });
  }
});

// User permissions
router.post('/users/:userId/permissions', auth, hasPermission('rbac:manage'), async (req: Request, res: Response) => {
  try {
    const { permissions } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { permissions: { $each: permissions } } },
      { new: true }
    );
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to assign permissions' });
  }
});

export default router;