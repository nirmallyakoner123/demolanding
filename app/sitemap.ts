import { Metadata } from 'next';

/**
 * Generate sitemap for the website
 * This will be used by search engines to crawl the site
 */
export default async function sitemap() {
    const baseUrl = 'https://interviewscreener.com';

    // Static pages
    const staticPages = [
        '',
        '/pricing',
        '/get-started',
        '/privacy-policy',
        '/terms-of-service',
        '/articles',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === '' ? 'daily' : 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Fetch dynamic article pages from API
    const { fetchArticles } = await import('@/lib/api/articles');
    const articles = await fetchArticles();
    const articlePages = articles.map((article) => ({
        url: `${baseUrl}/articles/${article.slug || article.metadata?.slug}`,
        lastModified: article.updatedAt || article.publishedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...articlePages];
}
