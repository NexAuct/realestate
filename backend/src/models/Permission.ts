import mongoose, { Document, Schema } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  resource: string;
  action: string;
  description: string;
  module: string;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  resource: { type: String, required: true },
  action: { type: String, required: true },
  description: { type: String, required: true },
  module: { type: String, required: true }
}, {
  timestamps: true
});

PermissionSchema.index({ resource: 1, action: 1 });

export default mongoose.model<IPermission>('Permission', PermissionSchema);