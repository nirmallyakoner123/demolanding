import Link from "next/link";
import Image from "next/image";
import { formatDate, calculateReadingTime } from "@/utils/articleHelpers";
import { Article } from "@/lib/api/articles";
import { FaAngleRight } from "react-icons/fa6";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

/**
 * Article Card Component
 * Converted from SCSS to Tailwind CSS with Next.js optimizations
 */
export default function ArticleCard({
  article,
  featured = false,
}: ArticleCardProps) {
  const readingTime =
    article.readingTime || calculateReadingTime(article.content);
  const featuredImage =
    article.metadata?.ogImage ||
    article.metadata?.thumbnail ||
    "/images/default-article.jpg";

  // Get the slug from either top-level or metadata
  const articleSlug = article.slug || article.metadata?.slug;

  return (
    <Link
      href={`/articles/${articleSlug}`}
      className={`
        group block h-full overflow-hidden bg-white/10 rounded-lg border
        transition-all duration-300 hover:no-underline
        hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] p-4
        ${
          featured
            ? "border-primary/20 bg-linear-to-br from-primary/20 to-primary"
            : "border-zinc-200/80 hover:border-primary/60"
        }
      `}
    >
      <div className="flex flex-col h-full">
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-56 sm:h-52 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
            <Image
              src={featuredImage}
              alt={
                article.title || article.metadata?.title || "Article thumbnail"
              }
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 pointer-events-none" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 py-4">
          {/* Meta Info */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center font-nunito text-sm text-gray-500">
              <span>
                {formatDate(article.publishedAt || article.createdAt || "")}
              </span>
            </div>
            <div className="h-2 w-2 rounded-full bg-gray-400/50"></div>
            <div className="flex items-center font-nunito text-sm text-gray-500">
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-lexend text-xl sm:text-lg font-semibold text-text mb-3 leading-[1.4] line-clamp-2">
            {article.title || article.metadata?.title}
          </h2>

          {/* Excerpt */}
          <p className="font-nunito text-small text-gray-500 leading-[1.6] mb-4 flex-1 line-clamp-3">
            {article.excerpt || article.metadata?.metaDescription}
          </p>

          {/* Read More Link */}
          <div className="w-fit flex items-center gap-1 font-nunito text-small font-semibold text-gray-700 px-4 py-1.5 rounded-md transition-all duration-300 group-hover:text-white group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/20">
            <span>Read Article</span>
            <FaAngleRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
