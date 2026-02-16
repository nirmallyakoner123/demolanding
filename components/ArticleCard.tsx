import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuCalendar, LuClock5 } from "react-icons/lu";
import { formatDate, calculateReadingTime } from "@/utils/articleHelpers";
import { Article } from "@/lib/api/articles";

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
        group block h-full overflow-hidden bg-white rounded-lg border
        transition-all duration-300 hover:no-underline
        hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)]
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
        <div className="flex flex-col flex-1 p-6 sm:p-5">
          {/* Title */}
          <h2 className="font-lexend text-xl sm:text-lg font-semibold text-text mb-3 leading-[1.4] line-clamp-2">
            {article.title || article.metadata?.title}
          </h2>

          {/* Excerpt */}
          <p className="font-nunito text-small text-gray-500 leading-[1.6] mb-4 flex-1 line-clamp-3">
            {article.excerpt || article.metadata?.metaDescription}
          </p>

          {/* Meta Info */}
          <div className="flex gap-4 mb-4 pt-4 border-t border-zinc-200">
            <div className="flex items-center gap-1 font-nunito text-xs text-gray-500">
              <LuCalendar className="text-sm" />
              <span>
                {formatDate(article.publishedAt || article.createdAt || "")}
              </span>
            </div>
            <div className="flex items-center gap-1 font-nunito text-xs text-gray-500">
              <LuClock5 className="text-sm" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Read More Link */}
          <div className="flex items-center gap-1.5 font-nunito text-small font-semibold text-text transition-all duration-300 group-hover:text-primary">
            <span>Read Article</span>
            <FaArrowRightLong className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
