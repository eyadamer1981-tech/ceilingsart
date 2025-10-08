import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog, InternalLinkMapping, SEOConfig } from '../../../lib/models';
import multer from 'multer';
import { generateSEOMetadata } from '../../../lib/seo-utils';
import { generateInternalLinks } from '../../../lib/generateInternalLinks';

// Use memory storage to keep files in RAM and store in MongoDB
const upload = multer({ storage: multer.memoryStorage() });

function bufferToDataUrl(file: Express.Multer.File) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Set cache headers for 10 minutes
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');

      // Return only the latest 8 blogs
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(8);
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'POST') {
    // Handle file upload
    upload.single('image')(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
        // Enforce a maximum of 8 blogs total
        const totalBlogs = await Blog.countDocuments();
        if (totalBlogs >= 8) {
          return res.status(400).json({
            message: 'Maximum of 8 blogs reached. Please delete an old blog to create a new one.',
          });
        }

        const {
          title,
          content,
          excerpt,
          author,
          featured,
          autoSEO,
          autoInternalLinks,
          manualSEO,
          manualLinks,
        } = req.body;

        const image = (req as any).file ? bufferToDataUrl((req as any).file) : '';

        // Get global config
        let config = await SEOConfig.findOne({ configKey: 'global' });
        if (!config) {
          config = new SEOConfig({ configKey: 'global' });
          await config.save();
        }

        // Determine if we should use auto features (global && per-post flags)
        const useAutoSEO = (autoSEO !== undefined ? autoSEO === 'true' : true) && config.globalAutoSEO;
        const useAutoLinks = (autoInternalLinks !== undefined ? autoInternalLinks === 'true' : true) && config.globalAutoInternalLinks;

        // Generate SEO metadata (only if auto is enabled)
        let slug = '';
        let metaTitle = '';
        let metaDescription = '';
        let metaKeywords: string[] = [];

        if (useAutoSEO) {
          const seoMetadata = generateSEOMetadata(title, content, excerpt);
          slug = seoMetadata.slug;
          metaTitle = seoMetadata.metaTitle;
          metaDescription = seoMetadata.metaDescription;
          metaKeywords = seoMetadata.metaKeywords;
        } else {
          // Use manual slug or generate from title
          slug = manualSEO?.slug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
        }

        // Ensure unique slug
        let uniqueSlug = slug;
        let slugCounter = 1;
        while (await Blog.findOne({ slug: uniqueSlug })) {
          uniqueSlug = `${slug}-${slugCounter}`;
          slugCounter++;
        }

        // Parse manual links if provided as JSON string
        let parsedManualLinks = [];
        if (manualLinks) {
          try {
            parsedManualLinks = typeof manualLinks === 'string' ? JSON.parse(manualLinks) : manualLinks;
          } catch (e) {
            console.error('Failed to parse manualLinks:', e);
          }
        }

        // Generate internal links (auto + manual merge or manual only)
        let processedContent = content;
        let internalLinksApplied: string[] = [];

        if (useAutoLinks || parsedManualLinks.length > 0) {
          const autoLinkMappings = useAutoLinks ? await InternalLinkMapping.find({ isActive: true }) : [];

          const linkResult = generateInternalLinks({
            content,
            autoLinks: autoLinkMappings,
            manualLinks: parsedManualLinks,
            useAutoLinks,
            maxLinksPerPost: config.maxInternalLinksPerPost,
          });

          processedContent = linkResult.processedContent;
          internalLinksApplied = linkResult.linksApplied;
        }

        // Parse manual SEO if provided as JSON string
        let parsedManualSEO = {};
        if (manualSEO) {
          try {
            parsedManualSEO = typeof manualSEO === 'string' ? JSON.parse(manualSEO) : manualSEO;
          } catch (e) {
            console.error('Failed to parse manualSEO:', e);
          }
        }

        const blog = new Blog({
          title,
          content,
          excerpt,
          author,
          image,
          featured: featured === 'true',
          autoSEO: useAutoSEO,
          autoInternalLinks: useAutoLinks,
          slug: uniqueSlug,
          metaTitle,
          metaDescription,
          metaKeywords,
          manualSEO: parsedManualSEO,
          manualLinks: parsedManualLinks,
          processedContent,
          internalLinksApplied,
          updatedAt: new Date(),
        });

        await blog.save();
        res.status(201).json(blog);
      } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
