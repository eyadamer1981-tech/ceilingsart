import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/mongodb';
import { Blog, InternalLinkMapping, SEOConfig } from '../../../../lib/models';
import { generateInternalLinks } from '../../../../lib/internal-linking';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findOne({ slug });

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

          // Update the blog object to return the latest data
          blog.processedContent = linkResult.processedContent;
          blog.internalLinksApplied = linkResult.linksApplied;
        }
      }

      res.json(blog);
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
