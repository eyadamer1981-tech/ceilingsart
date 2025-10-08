import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { SEOConfig } from '../../../lib/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      let config = await SEOConfig.findOne({ configKey: 'global' });

      // Create default config if it doesn't exist
      if (!config) {
        config = new SEOConfig({ configKey: 'global' });
        await config.save();
      }

      res.json(config);
    } catch (error) {
      console.error('Error fetching SEO config:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        globalAutoSEO,
        globalAutoInternalLinks,
        maxInternalLinksPerPost,
        defaultMetaKeywordsCount,
        siteName,
        defaultOGImage,
        twitterHandle,
      } = req.body;

      let config = await SEOConfig.findOne({ configKey: 'global' });

      if (!config) {
        config = new SEOConfig({ configKey: 'global' });
      }

      // Update only provided fields
      if (globalAutoSEO !== undefined) config.globalAutoSEO = globalAutoSEO;
      if (globalAutoInternalLinks !== undefined) config.globalAutoInternalLinks = globalAutoInternalLinks;
      if (maxInternalLinksPerPost !== undefined) config.maxInternalLinksPerPost = maxInternalLinksPerPost;
      if (defaultMetaKeywordsCount !== undefined) config.defaultMetaKeywordsCount = defaultMetaKeywordsCount;
      if (siteName !== undefined) config.siteName = siteName;
      if (defaultOGImage !== undefined) config.defaultOGImage = defaultOGImage;
      if (twitterHandle !== undefined) config.twitterHandle = twitterHandle;

      config.updatedAt = new Date();
      await config.save();

      res.json(config);
    } catch (error) {
      console.error('Error updating SEO config:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
