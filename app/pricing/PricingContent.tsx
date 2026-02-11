'use client';

import React, { useState } from 'react';
import PlanCardUI from '@/components/PlanCardUI';
import Image from 'next/image';

interface PlanData {
  title: string;
  price: number | string;
  billingSuffix: string;
  isCurrentPlan?: boolean;
  subtitle: string;
  features: string[];
  unavailableFeatures?: string[];
  actionText: string;
  onActionClick: () => void;
  isPopular?: boolean;
  actionVariant?: string;
  originalPrice?: number;
  discount?: string;
}

export default function PricingContent() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const signupUrl = process.env.NEXT_PUBLIC_SIGNUP_URL || 'https://app.interviewscreener.com';

  const handlePlanSelection = () => {
    const url = `${signupUrl}/sign-up`;
    window.open(url, '_blank');
  };

  const data: Record<string, Record<string, PlanData>> = {
    monthly: {
      starter: {
        title: 'Starter',
        price: 49.99,
        billingSuffix: 'month',
        isCurrentPlan: false,
        subtitle: 'For individuals and small teams. Credit rollover included.',
        features: [
          '500 Credits/month',
          '≈300 Candidates',
          '≈200 Interview Minutes',
          'Overage: $0.10 per additional credit',
          'Credits roll over monthly',
          'Email support'
        ],
        unavailableFeatures: [
          'WordPress Plugin Access',
          'Team Credit Sharing',
          'White Labeling',
        ],
        actionText: 'Get Started',
        onActionClick: () => handlePlanSelection(),
      },

      pro: {
        title: 'Pro',
        price: 99.99,
        billingSuffix: 'month',
        isPopular: true,
        subtitle: 'For growing teams. Credit rollover + WordPress Plugin + 5% savings.',
        features: [
          '1100 Credits/month',
          '≈1000 Candidates',
          '≈300 Interview Minutes',
          'Overage: $0.09 per additional credit',
          'WordPress Plugin Access',
          'Credits roll over monthly',
          'Priority email support',
        ],
        unavailableFeatures: ['White labeling', 'Custom domain'],
        actionText: 'Get Started',
        onActionClick: () => handlePlanSelection(),
      },

      scale: {
        title: 'Scale',
        price: 299.99,
        billingSuffix: 'month',
        subtitle: 'For large teams. WordPress Plugin + 10% savings.',
        features: [
          '3500 Credits/month',
          '≈2200 Candidates',
          '≈1200 Interview Minutes',
          'Overage: $0.086 per additional credit',
          'WordPress Plugin Access',
          'Dedicated CSM & priority support',
        ],
        actionText: 'Get Started',
        onActionClick: () => handlePlanSelection(),
      },

      enterprise: {
        title: 'Enterprise',
        price: 999.99,
        billingSuffix: 'month',
        subtitle: 'For organizations at scale. WordPress Plugin + 15% savings.',
        features: [
          '12000 Credits/month',
          '≈5500 Candidates',
          '≈4500 Interview Minutes',
          'Overage: $0.083 per additional credit',
          'WordPress Plugin Access',
          'Dedicated CSM & priority support',
        ],
        actionText: 'Get Started',
        actionVariant: 'primary',
        onActionClick: () => handlePlanSelection(),
      },
    },
  };
  
  const plans = data[billingCycle];

  return (
    <div className="relative pt-[120px] pb-20 lg:pt-[100px] lg:pb-[60px] sm:pt-[80px] sm:pb-10 min-h-screen z-0">
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
            fill
            className="object-cover object-center opacity-100"
            priority
         />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-[1280px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-[#1E1E1E] font-lexend text-[50px] xl:text-[40px] lg:text-[32px] sm:text-[28px] font-normal leading-normal mb-4">
              Get started with Interview Screener today!
            </h1>
            <p className="text-[#1E1E1E] font-nunito text-[19px] lg:text-[16px] sm:text-[14px] font-medium leading-normal opacity-70">
              New users receive <strong className="font-extrabold opacity-100 text-[#1E1E1E]">100 free credits</strong> • Upgrades anytime • Powered by GPT-5
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-center">
              {Object.values(plans).map((plan, i) => (
                <div key={i} className="w-full">
                  <PlanCardUI {...plan} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
