import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/_next/',
                '/api/',
                '/static/',
                '/admin/',
                '/tmp/',
                '/*.php$', // Prevent crawling legacy files if any
            ],
        },
        sitemap: 'https://www.ceilingsart.sa/sitemap.xml',
    };
}
