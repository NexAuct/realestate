import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'buyer' | 'seller' | 'agent' | 'admin';
  roles: mongoose.Types.ObjectId[];
  permissions: string[];
  walletAddress?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  hasPermission(permission: string): boolean;
  hasRole(roleName: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'agent', 'admin'],
    default: 'buyer'
  },
  walletAddress: {
    type: String,
    unique: true,
    sparse: true
  },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  permissions: [{ type: String }],
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.hasPermission = function(permission: string): boolean {
  return this.permissions.includes(permission);
};

UserSchema.methods.hasRole = async function(roleName: string): Promise<boolean> {
  await this.populate('roles');
  return this.roles.some((role: any) => role.name === roleName);
};

export default mongoose.model<IUser>('User', UserSchema);
