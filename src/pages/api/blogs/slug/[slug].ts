import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/mongodb';
import { Blog, InternalLinkMapping, SEOConfig } from '../../../../lib/models';
import { generateInternalLinks } from '../../../../lib/generateInternalLinks';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findOne({ slug });

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // Auto-generate internal links if missing or if auto-links is enabled
      if (!blog.processedContent || blog.autoInternalLinks !== false) {
        // Get global config
        const config = await SEOConfig.findOne({ configKey: 'global' });

        if (config && config.globalAutoInternalLinks && blog.autoInternalLinks !== false) {
          // Get all active link mappings
          const autoLinkMappings = await InternalLinkMapping.find({ isActive: true });

          if (autoLinkMappings.length > 0) {
            // Get manual links for this blog
            const manualLinks = blog.manualLinks || [];

            // Generate internal links
            const linkResult = generateInternalLinks({
              content: blog.content,
              autoLinks: autoLinkMappings,
              manualLinks: manualLinks,
              useAutoLinks: true,
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
