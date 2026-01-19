import mongoose from 'mongoose';
import { config } from 'dotenv';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    featured: { type: Boolean, default: false },
    autoSEO: { type: Boolean, default: true },
    autoInternalLinks: { type: Boolean, default: true },
    slug: { type: String, unique: true, sparse: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: [String], default: [] },
    manualSEO: { type: Object, default: {} },
    manualLinks: { type: Array, default: [] },
    processedContent: { type: String },
    internalLinksApplied: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

async function seedBlogs() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI not found in environment');
        }

        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Read content files
        const enContent = fs.readFileSync(join(__dirname, 'blog-content-en.html'), 'utf-8');
        const arContent = fs.readFileSync(join(__dirname, 'blog-content-ar.html'), 'utf-8');

        const blogs = [
            {
                title: "European-Grade Parasol Roofs in Saudi Arabia",
                excerpt: "Parasol Across All Cities in Saudi Arabia by Ceilings Art for French Ceilings & Acoustic Panels. Supply & Installation across Riyadh, Jeddah, Dammam, and all cities.",
                author: "Ceilings Art",
                featured: true,
                slug: "european-grade-parasol-roofs-saudi-arabia",
                image: "/blogbanner.jpg",
                content: enContent
            },
            {
                title: "سقف باريسول بخامات اوروبية اصلية داخل السعودية",
                excerpt: "تركيب سقف باريسول في السعودية من سيلنجز ارت للأسقف الفرنسية وألواح العزل الصوتي. توريد وتركيب في جميع مدن المملكة.",
                author: "سيلنجز ارت",
                featured: true,
                slug: "parasol-european-materials-saudi-arabia-ar",
                image: "/blogbanner.jpg",
                content: arContent
            }
        ];

        for (const blogData of blogs) {
            // Delete existing blog with same slug if exists
            await Blog.deleteOne({ slug: blogData.slug });

            const blog = new Blog({
                ...blogData,
                processedContent: blogData.content,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await blog.save();
            console.log(`Created blog: ${blogData.title}`);
        }

        const count = await Blog.countDocuments();
        console.log(`Total blogs now: ${count}`);
        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding blogs:', error);
        process.exit(1);
    }
}

seedBlogs();
