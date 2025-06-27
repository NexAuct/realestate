import mongoose, { Document, Schema } from 'mongoose';

export interface ICMSPage extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  author: mongoose.Types.ObjectId;
  category: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  language: 'en' | 'bm';
  publishedAt?: Date;
  viewCount: number;
  isHomepage: boolean;
  template: 'default' | 'landing' | 'property' | 'auction';
  customFields: Map<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const CMSPageSchema = new Schema<ICMSPage>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 300 },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, default: 'general' },
  tags: [{ type: String, trim: true }],
  seoTitle: { type: String, maxlength: 60 },
  seoDescription: { type: String, maxlength: 160 },
  featuredImage: { type: String },
  language: { type: String, enum: ['en', 'bm'], default: 'en' },
  publishedAt: { type: Date },
  viewCount: { type: Number, default: 0 },
  isHomepage: { type: Boolean, default: false },
  template: { type: String, enum: ['default', 'landing', 'property', 'auction'], default: 'default' },
  customFields: { type: Map, of: Schema.Types.Mixed, default: {} }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

CMSPageSchema.index({ slug: 1, language: 1 });
CMSPageSchema.index({ status: 1, publishedAt: -1 });
CMSPageSchema.index({ category: 1, status: 1 });

CMSPageSchema.pre('save', function(next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model<ICMSPage>('CMSPage', CMSPageSchema);