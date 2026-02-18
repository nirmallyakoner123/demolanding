import { MetadataRoute } from 'next';
import { fetchArticles } from '@/lib/api/articles';

/**
 * Generate sitemap for the website
 * This will be used by search engines to crawl the site
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://interviewscreener.com';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];

    // Fetch dynamic article pages from API
    try {
        const articles = await fetchArticles();
        const articlePages: MetadataRoute.Sitemap = articles
            .filter(article => article.slug || article.metadata?.slug)
            .map((article) => ({
                url: `${baseUrl}/articles/${article.slug || article.metadata?.slug}`,
                lastModified: new Date(article.updatedAt || article.publishedAt || new Date()),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }));

        return [...staticPages, ...articlePages];
    } catch {
        // If API fails, return static pages only
        return staticPages;
    }
}
