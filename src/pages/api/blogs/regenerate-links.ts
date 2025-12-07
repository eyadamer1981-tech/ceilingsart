import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog, InternalLinkMapping, SEOConfig } from '../../../lib/models';
import { generateInternalLinks } from '../../../lib/generateInternalLinks';

/**
 * Regenerate internal links for all blogs
 * This endpoint updates all existing blogs with the latest internal link mappings
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      // Get global config
      let config = await SEOConfig.findOne({ configKey: 'global' });
      if (!config) {
        config = new SEOConfig({ configKey: 'global' });
        await config.save();
      }

      // Check if auto internal links is enabled globally
      if (!config.globalAutoInternalLinks) {
        return res.status(400).json({
          message: 'Auto internal links is disabled globally. Enable it in SEO Config first.',
          updated: 0
        });
      }

      // Get all active link mappings
      const autoLinkMappings = await InternalLinkMapping.find({ isActive: true });

      if (autoLinkMappings.length === 0) {
        return res.status(400).json({
          message: 'No active link mappings found. Create some in the Internal Links manager first.',
          updated: 0
        });
      }

      // Get all blogs
      const blogs = await Blog.find();

      if (blogs.length === 0) {
        return res.json({
          message: 'No blogs found to update.',
          updated: 0
        });
      }

      let updatedCount = 0;
      const updateResults: Array<{
        id: any;
        title: any;
        status: 'skipped' | 'updated' | 'error';
        reason?: string;
        linksApplied?: number;
        keywords?: string[];
      }> = [];

      // Process each blog
      for (const blog of blogs) {
        try {
          // Skip if autoInternalLinks is explicitly disabled for this blog
          if (blog.autoInternalLinks === false) {
            updateResults.push({
              id: blog._id,
              title: blog.title,
              status: 'skipped',
              reason: 'Auto internal links disabled for this blog'
            });
            continue;
          }

          // Get manual links for this blog
          const manualLinks = blog.manualLinks || [];

          // Generate internal links
          const linkResult = generateInternalLinks({
            content: blog.content,
            autoLinks: autoLinkMappings,
            manualLinks: manualLinks,
            useAutoLinks: true,
            maxLinksPerPost: config.maxInternalLinksPerPost,
          });

          // Update the blog
          await Blog.findByIdAndUpdate(blog._id, {
            processedContent: linkResult.processedContent,
            internalLinksApplied: linkResult.linksApplied,
            updatedAt: new Date(),
          });

          updatedCount++;
          updateResults.push({
            id: blog._id,
            title: blog.title,
            status: 'updated',
            linksApplied: linkResult.linksApplied.length,
            keywords: linkResult.linksApplied
          });
        } catch (error) {
          console.error(`Error updating blog ${blog._id}:`, error);
          updateResults.push({
            id: blog._id,
            title: blog.title,
            status: 'error',
            reason: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      res.json({
        message: `Successfully regenerated internal links for ${updatedCount} blog(s)`,
        updated: updatedCount,
        total: blogs.length,
        results: updateResults
      });
    } catch (error) {
      console.error('Error regenerating links:', error);
      res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
