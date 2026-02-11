import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { Article } from '@/lib/api/articles';

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
    <section className="py-20 sm:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-10">
          <h2 className="font-lexend text-4xl sm:text-3xl font-bold text-text mb-4">
            Latest Articles
          </h2>
          <p className="font-nunito text-lg sm:text-base text-text-light max-w-2xl mx-auto">
            Stay updated with our latest insights and tips
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 mb-12">
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
    </section>
  );
}
