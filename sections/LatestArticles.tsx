import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { Article } from "@/lib/api/articles";

interface LatestArticlesProps {
  articles: Article[];
}

/**
 * Latest Articles Section
 * Displays the 3 most recent articles
 * Converted from SCSS to Tailwind CSS
 */
export default function LatestArticles({ articles }: LatestArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="articles_section relative my-0">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-t from-[#2e2e2e]/45 via-[#2e2e2e]/12 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-t from-[#2e2e2e]/45 via-[#2e2e2e]/12 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="relative z-0 py-12 lg:py-24 px-8 lg:px-14">
          {/* Box Vertical Borders */}
          <div className="absolute top-0 left-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          <div className="absolute top-0 right-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          {/* Corner Circles */}
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -top-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -top-[9px] -right-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -right-[9px]" />

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-lexend text-4xl font-bold text-text mb-2">
              Latest Articles
            </h2>
            <p className="font-nunito text-base text-text-light max-w-2xl mx-auto">
              Stay updated with our latest insights and tips
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-nunito font-semibold text-base rounded-btn tracking-btn transition-all duration-300 hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
