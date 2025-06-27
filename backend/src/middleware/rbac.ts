import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Role from '../models/Role';

interface AuthRequest extends Request {
  user?: any;
}

export const hasPermission = (permission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const user = await User.findById(req.user._id).populate('roles');
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'User not found or inactive' });
      }

      // Check direct permissions
      if (user.hasPermission(permission)) {
        return next();
      }

      // Check role-based permissions
      const rolePermissions = user.roles.reduce((perms: string[], role: any) => {
        return [...perms, ...role.permissions];
      }, []);

      if (rolePermissions.includes(permission)) {
        return next();
      }

      return res.status(403).json({ error: 'Insufficient permissions' });
    } catch (error) {
      return res.status(500).json({ error: 'Permission check failed' });
    }
  };
};

export const hasRole = (roleName: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const user = await User.findById(req.user._id);
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'User not found or inactive' });
      }

      const hasRequiredRole = await user.hasRole(roleName);
      if (!hasRequiredRole) {
        return res.status(403).json({ error: 'Insufficient role permissions' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Role check failed' });
    }
  };
};

export const hasAnyRole = (roleNames: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const user = await User.findById(req.user._id).populate('roles');
      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'User not found or inactive' });
      }

      const userRoles = user.roles.map((role: any) => role.name);
      const hasAnyRequiredRole = roleNames.some(role => userRoles.includes(role));

      if (!hasAnyRequiredRole) {
        return res.status(403).json({ error: 'Insufficient role permissions' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Role check failed' });
    }
  };
};

export const isAdmin = hasRole('admin');
export const isAgent = hasRole('agent');
export const canManageCMS = hasPermission('cms:manage');
export const canPublishCMS = hasPermission('cms:publish');
export const canViewAnalytics = hasPermission('analytics:view');