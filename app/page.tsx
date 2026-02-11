import { fetchLatestArticles } from '@/lib/api/articles';
import LatestArticles from '@/sections/LatestArticles';
import Banner from '@/components/Banner';
import Brands from '@/sections/Brands';
import WhoWeAre from '@/sections/WhoWeAre';
import HireSmarter from '@/sections/HireSmarter';
import NextLevel from '@/sections/NextLevel';
import HiringQuote from '@/sections/HiringQuote';
import PricingCalculator from '@/components/PricingCalculator';
import FAQ from '@/sections/FAQ';
import StartHiring from '@/sections/StartHiring';
import { generateSEOMetadata } from '@/lib/seo';
import { Metadata } from 'next';

/**
 * Home Page Metadata
 * Using Next.js native metadata instead of SEO component
 */
export const metadata: Metadata = generateSEOMetadata({
  title: 'Interview Screener – AI-Powered HR Tool to Save Time & Money',
  description: 'Interview Screener is an AI-powered hiring tool that automates resume screening, candidate ranking, and interviews – saving you time, money, and effort.',
  keywords: 'Interview Screener, AI HR tool, resume screening, automated interviews, AI hiring software, candidate assessment, HR automation, recruitment tool',
});

/**
 * Home Page
 * Main landing page with all sections
 * 
 * TODO: Migrate remaining sections:
 * - Header
 * - Banner
 * - Brands
 * - WhoWeAre
 * - HireSmarter
 * - NextLevel
 * - HiringQuote
 * - PricingCalculator
 * - FAQ
 * - StartHiring
 * - Footer
 */
export default async function Home() {
  // Fetch latest articles on the server
  const latestArticles = await fetchLatestArticles(3);

  return (
    <main>
      <Banner />

      <Brands />
      
      <WhoWeAre />

      <HireSmarter />
      
      <NextLevel />
      
      <HiringQuote />
      
      <PricingCalculator />
      
      <FAQ />
      
      <StartHiring />
      
      {/* Latest Articles Section */}
      <LatestArticles articles={latestArticles} />
    </main>
  );
}
