import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
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
  title: { type: String, required: true },
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


export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export const CustomSlider = mongoose.models.CustomSlider || mongoose.model('CustomSlider', customSliderSchema);
// GalleryImage removed per requirements
