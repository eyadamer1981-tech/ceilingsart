import { MetadataRoute } from 'next';
import connectDB from '../lib/mongodb';
import { Blog, Project, Service, AcousticPanel, StretchCeiling } from '../lib/models';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.ceilingsart.sa';

    try {
        await connectDB();

        // Fetch all dynamic content
        const [blogs, projects, services, acousticPanels, stretchCeilings] = await Promise.all([
            Blog.find({}).select('slug createdAt updatedAt').lean(),
            Project.find({}).select('_id createdAt').lean(),
            Service.find({}).select('_id createdAt').lean(),
            AcousticPanel.find({}).select('_id createdAt').lean(),
            StretchCeiling.find({}).select('_id createdAt').lean(),
        ]);

        // Format blog entries
        const blogEntries = blogs.map((post) => ({
            url: `${baseUrl}/blog/${post.slug || post._id}`,
            lastModified: post.updatedAt || post.createdAt || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        // Static pages
        const staticPages = [
            '',
            '/about',
            '/acoustic-panels',
            '/stretch-ceilings',
            '/our-work',
            '/faqs',
            '/blog',
            '/contact',
        ].map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: (route === '' || route === '/blog') ? 'weekly' as const : 'monthly' as const,
            priority: route === '' ? 1.0 : route === '/blog' ? 0.9 : 0.8,
        }));

        // Add specific categories if they are fixed in the code (as seen in the old sitemap.xml)
        const categoryPages = [
            '/acoustic-panels/floor-insulation',
            '/acoustic-panels/polyester-acoustic',
            '/acoustic-panels/acoustic-fabric-wraps',
            '/stretch-ceilings/glossy',
            '/stretch-ceilings/hidden-lighting',
            '/stretch-ceilings/perforated-acoustic',
            '/stretch-ceilings/3d',
            '/stretch-ceilings/reflective',
            '/stretch-ceilings/matte',
            '/stretch-ceilings/fiber-optic-rose',
            '/stretch-ceilings/printed',
            '/stretch-ceilings/light-transmitting',
            '/stretch-ceilings/paper',
        ].map(route => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

        return [...staticPages, ...categoryPages, ...blogEntries];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 1,
            },
        ];
    }
}
