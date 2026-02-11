import { Metadata } from 'next';

const SITE_URL = 'https://interviewscreener.com';
const SITE_NAME = 'Interview Screener';
const DEFAULT_OG_IMAGE = '/new_meta_og.jpg';

interface SEOConfig {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    article?: {
        publishedTime?: string;
        modifiedTime?: string;
        author?: string;
        tags?: string[];
    };
}

/**
 * Generate Next.js metadata for pages
 * This replaces the old SEO.jsx component with Next.js native metadata
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
    const {
        title,
        description,
        keywords,
        image = DEFAULT_OG_IMAGE,
        url,
        type = 'website',
        noIndex = false,
        article
    } = config;

    const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
    const canonicalUrl = url || SITE_URL;

    const metadata: Metadata = {
        title,
        description,
        keywords: keywords?.split(',').map(k => k.trim()),

        // Canonical URL
        alternates: {
            canonical: canonicalUrl,
        },

        // Open Graph
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            images: [
                {
                    url: fullImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: type,
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [fullImageUrl],
            site: '@InterviewScreener',
        },

        // Robots
        robots: noIndex ? {
            index: false,
            follow: false,
        } : {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Icons
        icons: {
            icon: '/is_favicon.png',
            shortcut: '/is_favicon.png',
            apple: '/is_favicon.png',
        },
    };

    // Add article-specific metadata
    if (type === 'article' && article) {
        metadata.openGraph = {
            ...metadata.openGraph,
            type: 'article',
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.author ? [article.author] : undefined,
            tags: article.tags,
        };
    }

    return metadata;
}

/**
 * Generate structured data (JSON-LD) for articles
 */
export function generateArticleStructuredData(article: {
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedTime: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image: article.image || DEFAULT_OG_IMAGE,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        author: {
            '@type': 'Person',
            name: article.author || 'Interview Screener Team',
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/new_logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.url,
        },
        keywords: article.tags?.join(', '),
    };
}

/**
 * Generate structured data for the organization
 */
export function generateOrganizationStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/new_logo.png`,
        description: 'AI-powered interview screening platform that saves time and money in your hiring process',
        sameAs: [
            'https://twitter.com/InterviewScreener',
            // Add other social media URLs
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            url: `${SITE_URL}/get-started`,
        },
    };
}

/**
 * Generate structured data for website
 */
export function generateWebsiteStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: 'AI-powered interview screening platform',
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
    };
}

/**
 * Default metadata for the site
 */
export const defaultMetadata: Metadata = generateSEOMetadata({
    title: 'Interview Screener – AI-Powered HR Tool to Save Time & Money',
    description: 'Automate resume screening and interviews with AI. Cut hiring time and costs with our AI-powered interview screening platform.',
    keywords: 'AI interview screening, automated hiring, resume screening, HR automation, recruitment software',
    image: DEFAULT_OG_IMAGE,
});

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
