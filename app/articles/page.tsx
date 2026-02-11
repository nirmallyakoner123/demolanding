import { Metadata } from 'next';
import Image from 'next/image';
import { fetchArticles } from '@/lib/api/articles';
import ArticlesClient from '@/components/ArticlesClient';
import { generateSEOMetadata } from '@/lib/seo';

// Disable caching to always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Articles Listing Page Metadata
 */
export const metadata: Metadata = generateSEOMetadata({
  title: 'Articles – AI Recruitment Insights & HR Best Practices',
  description: 'Explore expert articles on AI recruitment, hiring automation, cost optimization, and HR technology. Stay updated with the latest trends and best practices.',
  keywords: 'AI recruitment articles, HR technology blog, hiring automation guides, recruitment best practices, interview technology',
});

/**
 * Articles Listing Page
 * Server Component that fetches all articles and passes to client for search/pagination
 */
export default async function ArticlesPage() {
  // Fetch all articles on the server
  const articles = await fetchArticles();

  return (
    <main className="relative pt-32 pb-20 sm:pt-28 sm:pb-16 min-h-screen z-0">
      {/* Background Gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 160, 226, 0.00) 24.86%, rgba(51, 136, 255, 0.10) 100%)'
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
            width: '100%',
            height: 'auto',
            opacity: 0.6,
          }}
          priority
          fetchPriority="high"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-lexend text-5xl sm:text-4xl font-bold text-text mb-6">
            Articles & Insights
          </h1>
          <p className="font-nunito text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
            Discover expert insights on AI-powered recruitment, hiring automation, 
            and best practices to transform your hiring process.
          </p>
        </div>

        {/* Articles with Client-side Search & Pagination */}
        <ArticlesClient articles={articles} />
      </div>
    </main>
  );
}
