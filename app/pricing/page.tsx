import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";

// TODO: Since generateSEOMetadata is client-side here (due to 'use client'), we might need to separate metadata or just use static metadata in layout if possible.
// However, page.tsx allows exporting metadata only from server components.
// This file is marked 'use client' because of useState.
// I will remove 'use client' and make the component async if needed, or split logic.
// But wait, the original Pricing.jsx had logic.
// I will keep logic in a client component `PricingContent` and wrap it in `page.tsx` which is server component for Metadata.

// Let's create `PricingContent` for the client side logic.
// This file `app/pricing/page.tsx` will be the server component.

import PricingContent from "./PricingContent";

export const metadata: Metadata = generateSEOMetadata({
  title: "Interview Screener Pricing Plans – AI-Powered Hiring Solutions",
  description:
    "Choose the perfect Interview Screener plan for your team. From $49.99/month with 500 credits. AI-powered resume screening and automated interviews that save time and money.",
  keywords:
    "Interview Screener pricing, AI hiring plans, recruitment software pricing, HR automation costs, automated interview pricing",
});

export default function PricingPage() {
  return <PricingContent />;
}
