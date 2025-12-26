import { Blog, InternalLinkMapping, SEOConfig } from './models';
import { generateInternalLinks } from './internal-linking';

/**
 * Regenerate internal links for all blogs in the background
 * This is called automatically when link mappings are created/updated/deleted
 */
export async function regenerateAllBlogLinks(): Promise<{
  success: boolean;
  updated: number;
  total: number;
  error?: string;
}> {
  try {
    // Get global config
    const config = await SEOConfig.findOne({ configKey: 'global' });
    if (!config) {
      return { success: false, updated: 0, total: 0, error: 'SEO Config not found' };
    }

    // Check if auto-regeneration is enabled
    if (!config.globalAutoInternalLinks) {
      return { success: false, updated: 0, total: 0, error: 'Auto internal links disabled globally' };
    }

    // Get all active link mappings
    const autoLinkMappings = await InternalLinkMapping.find({ isActive: true });

    if (autoLinkMappings.length === 0) {
      // If no active mappings, clear processedContent for all blogs
      const blogs = await Blog.find();
      for (const blog of blogs) {
        await Blog.findByIdAndUpdate(blog._id, {
          processedContent: blog.content,
          internalLinksApplied: [],
          updatedAt: new Date(),
        });
      }
      return { success: true, updated: blogs.length, total: blogs.length };
    }

    // Get all blogs
    const blogs = await Blog.find();

    if (blogs.length === 0) {
      return { success: true, updated: 0, total: 0 };
    }

    let updatedCount = 0;

    // Process each blog
    for (const blog of blogs) {
      try {
        // Skip if autoInternalLinks is explicitly disabled for this blog
        if (blog.autoInternalLinks === false) {
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
          maxLinksPerPost: config.maxInternalLinksPerPost || 5,
        });

        // Update the blog
        await Blog.findByIdAndUpdate(blog._id, {
          processedContent: linkResult.processedContent,
          internalLinksApplied: linkResult.linksApplied,
          updatedAt: new Date(),
        });

        updatedCount++;
      } catch (error) {
        console.error(`Error updating blog ${blog._id}:`, error);
        // Continue with other blogs even if one fails
      }
    }

    return { success: true, updated: updatedCount, total: blogs.length };
  } catch (error) {
    console.error('Error regenerating blog links:', error);
    return {
      success: false,
      updated: 0,
      total: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Trigger background regeneration (non-blocking)
 * Use this when you want to regenerate links without waiting for the result
 */
export function triggerBackgroundRegeneration(): void {
  // Run in background without blocking
  regenerateAllBlogLinks()
    .then((result) => {
      if (result.success) {
        console.log(`✅ Auto-regenerated internal links for ${result.updated}/${result.total} blogs`);
      } else {
        console.log(`⚠️ Failed to auto-regenerate links: ${result.error}`);
      }
    })
    .catch((error) => {
      console.error('❌ Error in background regeneration:', error);
    });
}
