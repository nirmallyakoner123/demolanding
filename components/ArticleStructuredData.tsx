"use client";

import { Article } from "@/lib/api/articles";

interface ArticleStructuredDataProps {
  article: Article;
  url: string;
}

/**
 * Article Structured Data Component
 * Injects JSON-LD structured data for SEO (BlogPosting + BreadcrumbList)
 */
export default function ArticleStructuredData({
  article,
  url,
}: ArticleStructuredDataProps) {
  // Get absolute image URL
  const ogImage = article.metadata?.ogImage;
  const absoluteImageUrl = ogImage?.startsWith('http') 
    ? ogImage 
    : `https://interviewscreener.com${ogImage}`;

  // BlogPosting Schema with all required fields
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metadata?.metaDescription || article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author?.name || "Interview Screener Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Interview Screener",
      url: "https://interviewscreener.com",
      logo: {
        "@type": "ImageObject",
        url: "https://interviewscreener.com/new_logo.png",
      },
    },
    image: ogImage ? [{
      "@type": "ImageObject",
      url: absoluteImageUrl,
      width: 1200,
      height: 630,
    }] : [],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: article.tags?.join(", ") || article.metadata?.keywords,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://interviewscreener.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "https://interviewscreener.com/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
