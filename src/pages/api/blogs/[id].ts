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

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // Get global config (create with defaults if it doesn't exist)
      let config = await SEOConfig.findOne({ configKey: 'global' });
      if (!config) {
        config = new SEOConfig({ configKey: 'global' });
        await config.save();
      }

      // Get manual links for this blog
      const manualLinks = blog.manualLinks || [];

      // Determine if we should use auto links
      const useAutoLinks = config.globalAutoInternalLinks && blog.autoInternalLinks !== false;

      // Apply links if: auto-links is enabled OR manual links exist
      if (useAutoLinks || manualLinks.length > 0) {
        // Get all active link mappings (empty if auto is disabled)
        const autoLinkMappings = useAutoLinks ? await InternalLinkMapping.find({ isActive: true }) : [];

        // Generate internal links (manual links are always applied if they exist)
        const linkResult = generateInternalLinks({
          content: blog.content,
          autoLinks: autoLinkMappings,
          manualLinks: manualLinks,
          useAutoLinks: useAutoLinks,
          maxLinksPerPost: config.maxInternalLinksPerPost || 5,
        });

        // Update the blog if processedContent changed
        if (linkResult.processedContent !== blog.processedContent) {
          await Blog.findByIdAndUpdate(blog._id, {
            processedContent: linkResult.processedContent,
            internalLinksApplied: linkResult.linksApplied,
            updatedAt: new Date(),
          });

          blog.processedContent = linkResult.processedContent;
          blog.internalLinksApplied = linkResult.linksApplied;
        }
      }

      res.json(blog);
    } catch (error) {
      console.error('Error fetching blog by id:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    // Handle file upload
    upload.single('image')(req as any, res as any, async (err: any) => {
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
          updatedAt: new Date(),
        };

        if ((req as any).file) {
          updateData.image = bufferToDataUrl((req as any).file);
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
