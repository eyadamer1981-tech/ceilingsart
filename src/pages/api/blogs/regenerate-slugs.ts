import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import { Blog } from '../../../lib/models';
import { generateSlug } from '../../../lib/seo-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const blogs = await Blog.find({});
        const results: any[] = [];

        for (const blog of blogs) {
            if (!blog.title) continue;

            // Generate new slug from title using the updated logic (supports Arabic)
            const newSlugBase = generateSlug(blog.title);
            let newSlug = newSlugBase;
            let counter = 1;

            // Ensure uniqueness (exclude self)
            while (await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } })) {
                newSlug = `${newSlugBase}-${counter}`;
                counter++;
            }

            // Update if changed
            // Note: We update if the slug is different. 
            // This will fix "-1" slugs or English filtered slugs to be Arabic
            if (newSlug !== blog.slug) {
                await Blog.findByIdAndUpdate(blog._id, { slug: newSlug });
                results.push({
                    id: blog._id,
                    oldSlug: blog.slug,
                    newSlug: newSlug,
                    title: blog.title
                });
            }
        }

        res.json({
            message: `Successfully regenerated slugs for ${results.length} blog(s)`,
            updated: results.length,
            details: results
        });
    } catch (error: any) {
        console.error('Error regenerating slugs:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
}
