import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/mongodb';
import { Blog, InternalLinkMapping, SEOConfig } from '../../../../lib/models';
import { generateInternalLinks } from '../../../../lib/internal-linking';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    const { slug } = req.query;

    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // 2️⃣ Find the blog by slug
    let blog = await Blog.findOne({ slug });

    // 2a️⃣ Try encoded slug if original not found
    if (!blog && typeof slug === 'string') {
      blog = await Blog.findOne({ slug: encodeURIComponent(slug) });
    }

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // 3️⃣ Get global SEO/internal link config
    let config = await SEOConfig.findOne({ configKey: 'global' });
    if (!config) {
      config = new SEOConfig({ configKey: 'global' });
      await config.save();
    }

    // 4️⃣ Get manual links from blog
    const manualLinks = blog.manualLinks || [];

    // 5️⃣ Determine whether to use auto internal links
    const useAutoLinks = config.globalAutoInternalLinks && blog.autoInternalLinks !== false;

    if (useAutoLinks || manualLinks.length > 0) {
      // 5a️⃣ Fetch active internal link mappings if auto-links enabled
      const autoLinkMappings = useAutoLinks
        ? await InternalLinkMapping.find({ isActive: true })
        : [];

      // 5b️⃣ Generate internal links
      const linkResult = generateInternalLinks({
        content: blog.content,
        autoLinks: autoLinkMappings,
        manualLinks: manualLinks,
        useAutoLinks: useAutoLinks,
        maxLinksPerPost: config.maxInternalLinksPerPost || 5,
      });

      // 5c️⃣ Update blog if content changed
      if (linkResult.processedContent !== blog.processedContent) {
        await Blog.findByIdAndUpdate(blog._id, {
          processedContent: linkResult.processedContent,
          internalLinksApplied: linkResult.linksApplied,
          updatedAt: new Date(),
        });

        // Update local blog object
        blog.processedContent = linkResult.processedContent;
        blog.internalLinksApplied = linkResult.linksApplied;
      }
    }

    // 6️⃣ Return the blog as JSON
    return res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : undefined });
  }
}
