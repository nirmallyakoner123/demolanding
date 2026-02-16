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
    };
  }

  return {
    title: article.metadata?.title || article.title,
    description: article.metadata?.metaDescription || article.excerpt,
    keywords: article.metadata?.keywords || article.tags?.join(", "),
    openGraph: {
      title: article.metadata?.title || article.title,
      description: article.metadata?.metaDescription || article.excerpt,
      images: article.metadata?.ogImage ? [article.metadata.ogImage] : [],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.name || "Interview Screener Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metadata?.title || article.title,
      description: article.metadata?.metaDescription || article.excerpt,
      images: article.metadata?.ogImage ? [article.metadata.ogImage] : [],
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

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Articles", path: "/articles" },
    { label: article.title || article.metadata.title, path: "" },
  ];

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
                src={article.metadata.ogImage}
                alt={article.title || article.metadata.title}
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="max-w-4xl 3xl:max-w-5xl mx-auto mb-12 bg-white p-3.5 rounded-b-xl">
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
          <section className="container mx-auto px-4 mt-16 pb-12 border-b border-zinc-200">
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


export const revalidate = 0;
