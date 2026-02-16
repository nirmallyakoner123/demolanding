import { Article } from "@/lib/api/articles";

interface ArticleStructuredDataProps {
  article: Article;
  url: string;
}

/**
 * Article Structured Data Component
 * Injects JSON-LD structured data for SEO
 */
export default function ArticleStructuredData({
  article,
  url,
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metadata?.metaDescription || article.excerpt,
    image: article.metadata?.ogImage || "/article-not-found.png",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author?.name || "Interview Screener Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Interview Screener",
      logo: {
        "@type": "ImageObject",
        url: "https://interviewscreener.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
