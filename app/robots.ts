import { MetadataRoute } from 'next';

/**
 * Generate robots.txt for the website
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        sitemap: 'https://interviewscreener.com/sitemap.xml',
    };
}
