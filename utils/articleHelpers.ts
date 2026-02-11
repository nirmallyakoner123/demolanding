import { Article } from '@/lib/api/articles';

// Categories from original data
const CATEGORIES = [
    {
        "id": "ai-recruitment",
        "name": "AI Recruitment",
        "slug": "ai-recruitment",
        "description": "Articles about AI-powered recruitment and hiring automation"
    },
    {
        "id": "cost-optimization",
        "name": "Cost Optimization",
        "slug": "cost-optimization",
        "description": "Strategies to reduce hiring costs and improve ROI"
    },
    {
        "id": "recruitment-process",
        "name": "Recruitment Process",
        "slug": "recruitment-process",
        "description": "Best practices and guides for effective recruitment"
    },
    {
        "id": "interview-technology",
        "name": "Interview Technology",
        "slug": "interview-technology",
        "description": "Technologies and tools for modern interviews"
    },
    {
        "id": "hr-technology",
        "name": "HR Technology",
        "slug": "hr-technology",
        "description": "Latest trends and innovations in HR tech"
    }
];


/**
 * Get related articles based on tags and category
 * Now accepts the list of articles as a second argument
 */
export const getRelatedArticles = (article: Article, count = 3, allArticles: Article[] = []): Article[] => {
    if (!article || !allArticles.length) return [];

    const relatedArticles = allArticles
        .filter(a => a._id !== article._id) // Filter out current article
        .map(a => {
            let score = 0;

            // Same category gets higher score
            if (a.category === article.category) score += 3;

            // Count matching tags
            // Ensure tags is an array
            const aTags = a.tags || a.metadata?.tags || [];
            const articleTags = article.tags || article.metadata?.tags || [];

            const matchingTags = aTags.filter(tag => articleTags.includes(tag));
            score += matchingTags.length;

            return { article: a, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, count)
        .map(item => item.article);

    return relatedArticles;
};

/**
 * Search articles by query (searches title, excerpt, tags)
 * Now accepts the list of articles to search
 */
export const searchArticles = (query: string, articles: Article[] = []): Article[] => {
    if (!query || query.trim() === '') return articles;

    const searchTerm = query.toLowerCase().trim();

    return articles.filter(article => {
        const title = (article.metadata?.title || article.title || '').toLowerCase();
        const excerpt = (article.metadata?.metaDescription || article.excerpt || '').toLowerCase();
        const tags = article.tags || article.metadata?.tags || [];
        const category = (article.category || '').toLowerCase();

        return title.includes(searchTerm) ||
            excerpt.includes(searchTerm) ||
            tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            category.includes(searchTerm);
    });
};

/**
 * Get all categories
 */
export const getAllCategories = () => {
    return CATEGORIES;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Format date for SEO (ISO format)
 */
export const formatDateISO = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString();
};

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export const calculateReadingTime = (content: any): number => {
    if (!content) return 1;

    // If content is array of blocks (from API)
    let text = '';
    if (Array.isArray(content)) {
        text = content.map(b => b.content || '').join(' ');
    } else {
        text = String(content);
    }

    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return readingTime;
};

/**
 * Paginate articles
 */
export const paginateArticles = (articles: Article[], page = 1, perPage = 9) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    return {
        articles: articles.slice(startIndex, endIndex),
        currentPage: page,
        totalPages: Math.ceil(articles.length / perPage),
        totalArticles: articles.length,
        hasNextPage: endIndex < articles.length,
        hasPrevPage: page > 1
    };
};
