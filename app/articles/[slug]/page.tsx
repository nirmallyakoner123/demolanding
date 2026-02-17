import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchArticleBySlug, fetchArticles } from "@/lib/api/articles";
import {
  formatDate,
  calculateReadingTime,
  getRelatedArticles,
} from "@/utils/articleHelpers";
import Breadcrumb from "@/components/Breadcrumb";
import SocialShare from "@/components/SocialShare";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import ArticleContent from "@/components/ArticleContent";
import ArticleCard from "@/components/ArticleCard";
import { LuCalendar, LuClock5, LuUser } from "react-icons/lu";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate Static Params for all articles
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles
    .map((article) => ({
      slug: article.slug || article.metadata?.slug,
    }))
    .filter((params) => params.slug); // Filter out any undefined slugs
}

/**
 * Generate Dynamic Metadata for each article
 */
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const articleSlug = article.slug || article.metadata?.slug;
  const articleUrl = `https://interviewscreener.com/articles/${articleSlug}`;
  
  // Convert relative image URLs to absolute
  const ogImage = article.metadata?.ogImage;
  const absoluteImageUrl = ogImage?.startsWith('http') 
    ? ogImage 
    : `https://interviewscreener.com${ogImage}`;
  
  // Detect image type from URL extension
  const getImageType = (url: string): string => {
    if (url.endsWith('.webp')) return 'image/webp';
    if (url.endsWith('.png')) return 'image/png';
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image/jpeg';
    return 'image/jpeg'; // default fallback
  };

  return {
    title: article.metadata?.title || article.title,
    description: article.metadata?.metaDescription || article.excerpt,
    keywords: article.metadata?.keywords || article.tags?.join(", "),
    
    // Add canonical URL
    alternates: {
      canonical: articleUrl,
    },
    
    openGraph: {
      title: article.metadata?.title || article.title,
      description: article.metadata?.metaDescription || article.excerpt,
      url: articleUrl, // Add og:url
      siteName: "Interview Screener", // Add og:site_name
      images: ogImage ? [{
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: article.metadata?.title || article.title,
        type: getImageType(absoluteImageUrl),
      }] : [],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.name || "Interview Screener Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metadata?.title || article.title,
      description: article.metadata?.metaDescription || article.excerpt,
      images: ogImage ? [{
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: article.metadata?.title || article.title,
      }] : [],
    },
  };
}

/**
 * Article Detail Page
 * Dynamic route with ISR (Incremental Static Regeneration)
 */
export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  // If article not found, show 404
  if (!article) {
    notFound();
  }

  // Fetch all articles for related articles
  const allArticles = await fetchArticles();
  const relatedArticles = getRelatedArticles(article, 3, allArticles);

  const readingTime =
    article.readingTime || calculateReadingTime(article.content);
  const articleSlug = article.slug || article.metadata.slug;
  const articleUrl = `https://interviewscreener.com/articles/${articleSlug}`;

  // Breadcrumb items - truncate article title to avoid long anchor text SEO warning
  const truncateTitle = (title: string, maxLength: number = 50) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };
  
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Articles", path: "/articles" },
    { label: truncateTitle(article.title || article.metadata.title), path: "" },
  ];

  console.log("article", article);

  return (
    <>
      {/* Structured Data for SEO */}
      <ArticleStructuredData article={article} url={articleUrl} />

      <main className="relative pt-32 pb-12 sm:pt-28 sm:pb-10 min-h-screen z-0">
        {/* Background Gradient */}
        <div
          className="absolute top-0 left-0 w-full h-full z-[-1]"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 160, 226, 0.00) 24.86%, rgba(51, 136, 255, 0.10) 100%)",
          }}
        />

        {/* Bottom Gradient Border */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-r from-transparent via-[#2e2e2e] to-transparent" />

        {/* Background Image Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-[-2]">
          <Image
            src="/banner_grid.png"
            alt="Grid Background"
            width={3840}
            height={2604}
            sizes="100vw"
            className="w-full"
            style={{
              width: "100%",
              height: "auto",
              opacity: 0.6,
            }}
            priority
            fetchPriority="high"
          />
        </div>

        <article className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Article Header */}
          <header className="my-6 max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            {article.category && (
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full font-nunito text-sm font-semibold">
                  {article.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-lexend text-3xl lg:text-5xl font-normal text-text mb-6 leading-tight">
              {article.title || article.metadata.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 mb-6 pb-6 border-b border-zinc-200">
              <div className="flex items-center gap-1 font-nunito text-sm text-text-light">
                <LuUser className="text-primary" />
                <span>{article.author?.name || "Interview Screener Team"}</span>
              </div>
              <div className="flex items-center gap-1 font-nunito text-sm text-text-light">
                <LuCalendar className="text-primary" />
                <span>
                  {formatDate(
                    article.publishedAt ||
                      article.createdAt ||
                      article.updatedAt,
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1 font-nunito text-sm text-text-light">
                <LuClock5 className="text-primary" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.metadata?.ogImage && (
            <div className="rounded-t-xl overflow-hidden max-w-4xl 3xl:max-w-5xl mx-auto">
              <Image
                src={
                  article.metadata.ogImage.startsWith('http')
                    ? article.metadata.ogImage
                    : `https://interviewscreener.com${article.metadata.ogImage}`
                }
                alt={article.title || article.metadata.title}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-4xl 3xl:max-w-5xl mx-auto mb-12 bg-white py-3.5 px-3 lg:px-8 rounded-b-xl">
            <ArticleContent content={article.content} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-12 pb-12 border-b border-zinc-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-nunito text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Again at Bottom */}
          <div className="mb-12 pb-12 border-b border-zinc-200 max-w-4xl 3xl:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <p className="font-nunito text-text mb-2 md:mb-0">
              Found this article helpful?
            </p>
            <SocialShare
              title={article.title || article.metadata.title}
              url={articleUrl}
            />
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="font-lexend text-3xl sm:text-2xl font-bold text-text mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle._id}
                  article={relatedArticle}
                />
              ))}
            </div>

            {/* View All Articles Link */}
            <div className="text-center mt-12">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-nunito font-semibold text-base rounded-btn tracking-btn transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                View All Articles
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export const revalidate = 300; // 5 minutes ISR caching
