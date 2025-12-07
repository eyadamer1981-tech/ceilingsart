import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog, InternalLinkMapping, SEOConfig } from '../../../lib/models';
import multer from 'multer';
import { generateSEOMetadata } from '../../../lib/seo-utils';
import { generateInternalLinks } from '../../../lib/generateInternalLinks';

// Use memory storage and store as data URL in MongoDB
const upload = multer({ storage: multer.memoryStorage() });

function bufferToDataUrl(file: Express.Multer.File) {
  const mime = file.mimetype || 'application/octet-stream';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'PUT') {
    // Handle file uploads (image and gallery)
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'gallery', maxCount: 20 }
    ])(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error' });
      }

      try {
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
          existingGallery,
        } = req.body;

        // Get existing blog
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
          return res.status(404).json({ message: 'Blog not found' });
        }

        // Get global config
        let config = await SEOConfig.findOne({ configKey: 'global' });
        if (!config) {
          config = new SEOConfig({ configKey: 'global' });
          await config.save();
        }

        // Determine if we should use auto features
        const useAutoSEO = (autoSEO !== undefined ? autoSEO === 'true' : existingBlog.autoSEO) && config.globalAutoSEO;
        const useAutoLinks = (autoInternalLinks !== undefined ? autoInternalLinks === 'true' : existingBlog.autoInternalLinks) && config.globalAutoInternalLinks;

        // Generate SEO metadata (only if auto is enabled)
        let slug = existingBlog.slug;
        let metaTitle = existingBlog.metaTitle;
        let metaDescription = existingBlog.metaDescription;
        let metaKeywords = existingBlog.metaKeywords;

        if (useAutoSEO) {
          const seoMetadata = generateSEOMetadata(title, content, excerpt);

          // Only update slug if title changed
          if (title !== existingBlog.title) {
            slug = seoMetadata.slug;
            let slugCounter = 1;
            while (await Blog.findOne({ slug, _id: { $ne: id } })) {
              slug = `${seoMetadata.slug}-${slugCounter}`;
              slugCounter++;
            }
          }

          metaTitle = seoMetadata.metaTitle;
          metaDescription = seoMetadata.metaDescription;
          metaKeywords = seoMetadata.metaKeywords;
        }

        // Parse manual links if provided
        let parsedManualLinks = existingBlog.manualLinks || [];
        if (manualLinks) {
          try {
            parsedManualLinks = typeof manualLinks === 'string' ? JSON.parse(manualLinks) : manualLinks;
          } catch (e) {
            console.error('Failed to parse manualLinks:', e);
          }
        }

        // Generate internal links
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

        // Parse manual SEO if provided
        let parsedManualSEO = existingBlog.manualSEO || {};
        if (manualSEO) {
          try {
            parsedManualSEO = typeof manualSEO === 'string' ? JSON.parse(manualSEO) : manualSEO;
          } catch (e) {
            console.error('Failed to parse manualSEO:', e);
          }
        }

        // Process gallery images
        let gallery: string[] = [];
        
        // Keep existing gallery images if provided
        if (existingGallery) {
          const existing = Array.isArray(existingGallery) ? existingGallery : [existingGallery];
          gallery = existing.filter((url: string) => 
            url && (url.startsWith('data:') || url.startsWith('http') || url.startsWith('/'))
          );
        } else if (existingBlog.gallery) {
          // Keep existing gallery if no new images and no explicit existingGallery array
          gallery = existingBlog.gallery;
        }

        // Add new gallery images
        const galleryFiles = (req as any).files?.gallery || [];
        galleryFiles.forEach((file: Express.Multer.File) => {
          gallery.push(bufferToDataUrl(file));
        });

        const updateData: any = {
          title,
          content,
          excerpt,
          author,
          featured: featured === 'true',
          autoSEO: useAutoSEO,
          autoInternalLinks: useAutoLinks,
          slug,
          metaTitle,
          metaDescription,
          metaKeywords,
          manualSEO: parsedManualSEO,
          manualLinks: parsedManualLinks,
          processedContent,
          internalLinksApplied,
          gallery,
          updatedAt: new Date(),
        };

        if ((req as any).files?.image?.[0]) {
          updateData.image = bufferToDataUrl((req as any).files.image[0]);
        }

        const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        res.json(blog);
      } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      await Blog.findByIdAndDelete(id);
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
