import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema({
  title: { type: String }, // Keep for backward compatibility
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema({
  title: { type: String }, // Keep for backward compatibility
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  author: { type: String, required: true },
  featured: { type: Boolean, default: false },

  // Automation flags
  autoSEO: { type: Boolean, default: true },
  autoInternalLinks: { type: Boolean, default: true },

  // Auto-generated SEO fields
  slug: { type: String, unique: true, sparse: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: { type: [String], default: [] },

  // Manual SEO overrides
  manualSEO: {
    type: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: { type: [String], default: [] },
      ogImage: { type: String, default: '' },
      canonicalUrl: { type: String, default: '' },
    },
    default: {}
  },

  // Manual internal links
  manualLinks: {
    type: [
      new mongoose.Schema({
        keyword: { type: String, required: true },
        url: { type: String, required: true },
        caseSensitive: { type: Boolean, default: false },
        maxOccurrences: { type: Number, default: 1 },
      }, { _id: false })
    ],
    default: []
  },

  // Processed content with internal links
  processedContent: { type: String },
  internalLinksApplied: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const customSliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  projectIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'Project', required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const pageCoverSchema = new mongoose.Schema({
  pageType: { type: String, required: true, enum: ['home', 'aboutus', 'acousticpanel', 'stretchceiling', 'ourwork'] },
  coverType: { type: String, enum: ['hero', 'about', 'services'], default: 'hero' },
  title: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const acousticPanelSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, default: 'Acoustic Panels' },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  featured: { type: Boolean, default: false },
  rightLeftSection: { type: Boolean, default: false },
  // Dynamic content sections rendered on the panel detail page
  sections: {
    type: [
      new mongoose.Schema({
        heading: { type: String, required: true },
        content: { type: String, default: '' },
        bullets: { type: [String], default: [] },
      }, { _id: false })
    ],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
});

const stretchCeilingSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  category: { type: String, default: 'Stretch Ceilings' },
  image: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'images.files' },
  detailImages: { type: [String], default: [] },
  detailImageIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  // New content sections for detailed pages
  features: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  applications: { type: [String], default: [] },
  specifications: {
    type: {
      material: { type: String, default: '' },
      thickness: { type: String, default: '' },
      colors: { type: String, default: '' },
      warranty: { type: String, default: '' },
      installation: { type: String, default: '' },
    },
    default: {}
  },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const internalLinkMappingSchema = new mongoose.Schema({
  keyword: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  priority: { type: Number, default: 0 }, // Higher priority links are applied first
  caseSensitive: { type: Boolean, default: false },
  maxOccurrences: { type: Number, default: 1 }, // Max times this keyword can be linked per post
  isActive: { type: Boolean, default: true },
  description: { type: String, default: '' }, // Admin note
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const seoConfigSchema = new mongoose.Schema({
  configKey: { type: String, required: true, unique: true, default: 'global' },
  // Global automation flags
  globalAutoSEO: { type: Boolean, default: true },
  globalAutoInternalLinks: { type: Boolean, default: true },
  // Default settings
  maxInternalLinksPerPost: { type: Number, default: 5 },
  defaultMetaKeywordsCount: { type: Number, default: 10 },
  // Site-wide SEO defaults
  siteName: { type: String, default: 'CA CEILINGS Art' },
  defaultOGImage: { type: String, default: '' },
  twitterHandle: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});


export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export const CustomSlider = mongoose.models.CustomSlider || mongoose.model('CustomSlider', customSliderSchema);
export const PageCover = mongoose.models.PageCover || mongoose.model('PageCover', pageCoverSchema);
export const AcousticPanel = mongoose.models.AcousticPanel || mongoose.model('AcousticPanel', acousticPanelSchema);
export const StretchCeiling = mongoose.models.StretchCeiling || mongoose.model('StretchCeiling', stretchCeilingSchema);
export const InternalLinkMapping = mongoose.models.InternalLinkMapping || mongoose.model('InternalLinkMapping', internalLinkMappingSchema);
export const SEOConfig = mongoose.models.SEOConfig || mongoose.model('SEOConfig', seoConfigSchema);
// GalleryImage removed per requirements
