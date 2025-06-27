import Role from '../models/Role';
import Permission from '../models/Permission';

export const seedRBAC = async () => {
  try {
    const permissions = [
      { name: 'cms:view', resource: 'cms', action: 'view', description: 'View CMS pages', module: 'cms' },
      { name: 'cms:create', resource: 'cms', action: 'create', description: 'Create CMS pages', module: 'cms' },
      { name: 'cms:edit', resource: 'cms', action: 'edit', description: 'Edit CMS pages', module: 'cms' },
      { name: 'cms:delete', resource: 'cms', action: 'delete', description: 'Delete CMS pages', module: 'cms' },
      { name: 'cms:publish', resource: 'cms', action: 'publish', description: 'Publish CMS pages', module: 'cms' },
      { name: 'cms:manage', resource: 'cms', action: 'manage', description: 'Full CMS management', module: 'cms' },
      { name: 'property:view', resource: 'property', action: 'view', description: 'View properties', module: 'property' },
      { name: 'property:create', resource: 'property', action: 'create', description: 'Create properties', module: 'property' },
      { name: 'property:edit', resource: 'property', action: 'edit', description: 'Edit properties', module: 'property' },
      { name: 'auction:view', resource: 'auction', action: 'view', description: 'View auctions', module: 'auction' },
      { name: 'auction:manage', resource: 'auction', action: 'manage', description: 'Manage auctions', module: 'auction' },
      { name: 'rbac:view', resource: 'rbac', action: 'view', description: 'View roles and permissions', module: 'rbac' },
      { name: 'rbac:manage', resource: 'rbac', action: 'manage', description: 'Manage roles and permissions', module: 'rbac' },
      { name: 'analytics:view', resource: 'analytics', action: 'view', description: 'View analytics', module: 'analytics' }
    ];

    for (const perm of permissions) {
      await Permission.findOneAndUpdate({ name: perm.name }, perm, { upsert: true });
    }

    const roles = [
      { name: 'admin', description: 'Full system administrator', permissions: permissions.map(p => p.name) },
      { name: 'content_manager', description: 'CMS content manager', permissions: ['cms:view', 'cms:create', 'cms:edit', 'cms:publish'] },
      { name: 'property_agent', description: 'Property agent', permissions: ['property:view', 'property:create', 'property:edit', 'auction:view'] },
      { name: 'auctioneer', description: 'Auction manager', permissions: ['auction:view', 'auction:manage', 'property:view'] }
    ];

    for (const role of roles) {
      await Role.findOneAndUpdate({ name: role.name }, role, { upsert: true });
    }

    console.log('RBAC system seeded successfully');
  } catch (error) {
    console.error('Error seeding RBAC:', error);
  }
};