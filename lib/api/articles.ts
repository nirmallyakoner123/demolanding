const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://article.backend.interviewscreener.com/articles';

export interface Article {
    _id: string;
    slug?: string;
    title?: string;
    excerpt?: string;
    content: any[];
    category?: string;
    tags?: string[];
    metadata: {
        title: string;
        slug: string;
        metaDescription: string;
        keywords?: string;
        ogImage?: string;
        thumbnail?: string;
        imageAlt?: string;
        tags?: string[];
    };
    author?: {
        name: string;
        avatar?: string;
        socials?: {
            twitter?: string;
            linkedin?: string;
            github?: string;
        };
    };
    publishedAt?: string;
    updatedAt: string;
    createdAt: string;
    readingTime?: number;
    featured?: boolean;
    status?: string;
    isArchived?: boolean;
}

/**
 * Fetch all articles from the API
 * Uses /public endpoint which returns { articles: [...], pagination: {...} }
 */
export async function fetchArticles(): Promise<Article[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/public`, {
            next: { revalidate: 300 }, // Cache for 5 minutes
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = await response.json();
        // API returns { articles: [...], pagination: {...} }
        return data.articles || data || [];
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

/**
 * Fetch a single article by slug
 * Uses /:slug endpoint to fetch specific article
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/${slug}`, {
            next: { revalidate: 300 }, // Cache for 5 minutes
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch article: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching article ${slug}:`, error);
        return null;
    }
}

/**
 * Fetch featured articles
 */
export async function fetchFeaturedArticles(limit: number = 3): Promise<Article[]> {
    try {
        const articles = await fetchArticles();

        // Filter featured articles or get the latest ones
        const featuredArticles = articles.filter(article => article.featured);

        if (featuredArticles.length >= limit) {
            return featuredArticles
                .sort((a, b) => {
                    const dateA = new Date(a.publishedAt || a.createdAt || a.updatedAt);
                    const dateB = new Date(b.publishedAt || b.createdAt || b.updatedAt);
                    return dateB.getTime() - dateA.getTime();
                })
                .slice(0, limit);
        }

        // If not enough featured articles, return latest articles
        return articles
            .sort((a, b) => {
                const dateA = new Date(a.publishedAt || a.createdAt || a.updatedAt);
                const dateB = new Date(b.publishedAt || b.createdAt || b.updatedAt);
                return dateB.getTime() - dateA.getTime();
            })
            .slice(0, limit);
    } catch (error) {
        console.error('Error fetching featured articles:', error);
        return [];
    }
}

/**
 * Fetch latest articles
 */
export async function fetchLatestArticles(limit: number = 3): Promise<Article[]> {
    try {
        const articles = await fetchArticles();
        return articles
            .sort((a, b) => {
                const dateA = new Date(a.publishedAt || a.createdAt || a.updatedAt);
                const dateB = new Date(b.publishedAt || b.createdAt || b.updatedAt);
                return dateB.getTime() - dateA.getTime();
            })
            .slice(0, limit);
    } catch (error) {
        console.error('Error fetching latest articles:', error);
        return [];
    }
}

/**
 * Fetch articles by category
 */
export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
    try {
        const articles = await fetchArticles();
        return articles.filter(article => article.category === category);
    } catch (error) {
        console.error(`Error fetching articles for category ${category}:`, error);
        return [];
    }
}
