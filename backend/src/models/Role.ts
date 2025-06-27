import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  permissions: [{ type: String, required: true }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IRole>('Role', RoleSchema);