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
  createdAt: { type: Date, default: Date.now },
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
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});


export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export const CustomSlider = mongoose.models.CustomSlider || mongoose.model('CustomSlider', customSliderSchema);
export const PageCover = mongoose.models.PageCover || mongoose.model('PageCover', pageCoverSchema);
export const AcousticPanel = mongoose.models.AcousticPanel || mongoose.model('AcousticPanel', acousticPanelSchema);
export const StretchCeiling = mongoose.models.StretchCeiling || mongoose.model('StretchCeiling', stretchCeilingSchema);
// GalleryImage removed per requirements
