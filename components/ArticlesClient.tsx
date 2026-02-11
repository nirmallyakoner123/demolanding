'use client';

import { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';
import { Article } from '@/lib/api/articles';
import { searchArticles, paginateArticles } from '@/utils/articleHelpers';

interface ArticlesClientProps {
  articles: Article[];
}

/**
 * Articles Client Component
 * Handles client-side search and pagination
 */
export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const articlesPerPage = 9;

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    return searchArticles(searchQuery, articles);
  }, [searchQuery, articles]);

  // Paginate filtered articles
  const paginationData = useMemo(() => {
    return paginateArticles(filteredArticles, currentPage, articlesPerPage);
  }, [filteredArticles, currentPage]);

  const handleSearch = (value: string) => {
    setIsSearching(true);
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page on new search
    
    // Simulate brief loading state
    setTimeout(() => setIsSearching(false), 300);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of articles section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light text-lg" />
          <input
            type="text"
            placeholder="Search articles by title, tags, or category..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#f1f1f1] focus:border-primary focus:outline-none font-nunito text-base transition-colors"
          />
        </div>
        
        {/* Search Results Count */}
        {searchQuery && (
          <p className="text-center mt-4 font-nunito text-sm text-text-light">
            Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Articles Grid */}
      {isSearching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: articlesPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : paginationData.articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginationData.articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          {paginationData.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!paginationData.hasPrevPage}
                className="px-4 py-2 rounded-lg font-nunito font-medium text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary hover:text-white border-2 border-[#f1f1f1] hover:border-primary"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-nunito font-medium text-sm transition-all duration-300 ${
                      page === currentPage
                        ? 'bg-primary text-white border-2 border-primary'
                        : 'border-2 border-[#f1f1f1] hover:border-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!paginationData.hasNextPage}
                className="px-4 py-2 rounded-lg font-nunito font-medium text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary hover:text-white border-2 border-[#f1f1f1] hover:border-primary"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        /* No Results */
        <div className="text-center py-20">
          <div className="mb-6">
            <FaSearch className="text-6xl text-text-light mx-auto opacity-30" />
          </div>
          <h3 className="font-lexend text-2xl font-bold text-text mb-3">
            No articles found
          </h3>
          <p className="font-nunito text-text-light max-w-md mx-auto">
            Try adjusting your search query or browse all articles
          </p>
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="mt-6 px-6 py-3 bg-primary text-white font-nunito font-semibold rounded-btn hover:bg-primary-light transition-all duration-300 cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
