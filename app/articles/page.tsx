import { Metadata } from 'next';
import Image from 'next/image';
import { fetchArticles } from '@/lib/api/articles';
import ArticlesClient from '@/components/ArticlesClient';
import { generateSEOMetadata } from '@/lib/seo';

// ISR: Rebuild static HTML every 10 minutes in background
export const revalidate = 600;

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
    <main className="relative min-h-screen z-0 py-40">
      {/* Background Gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 160, 226, 0.00) 24.86%, rgba(51, 136, 255, 0.10) 100%)'
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
            width: '100%',
            height: 'auto',
            opacity: 0.6,
          }}
          priority
          fetchPriority="high"
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-custom text-2xl lg:text-4xl xl:text-5xl font-lexend font-normal leading-normal mb-1">
            Articles & Insights
          </h1>
          <p className="text-custom text-base lg:text-lg font-nunito font-medium leading-normal opacity-70">
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
