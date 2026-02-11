'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowSmallRight } from 'react-icons/hi2';

export default function StartHiring() {
  useEffect(() => {
    // This effect is for the "Get Started" button scrolling to the waitlist form if it exists
    // In the legacy code, it scrolled to an element with id "waitlist".
    // In the new code, this might be handled differently (e.g., standard anchor link or different page).
    // The current implementation uses a Link to /pricing, so this might be redundant if we want to follow the link behavior.
    // However, if the user wanted the smooth scroll behavior on a "Join Waitlist" button, we'd add it here.
    // For now, I'll stick to the "Get Started" link functionality as seen in the JSX: <Button ... as={Link} to="/pricing" ...>
    // The legacy useEffect attached a click listener to "waitlist-btn".
    // If we want to restore "scroll to waitlist", we can, but the code shows it linking to /pricing.
    // I will preserve the Link to /pricing as it seems to be the intended action in the newer version of the legacy file.
  }, []);

  return (
    <div className="relative z-0 mb-[100px] lg:mb-[50px]">
      {/* Bottom Gradient Border */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[2px] opacity-20 z-[-1]"
        style={{
          background: 'linear-gradient(90deg, rgba(46, 46, 46, 0) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0) 100%)'
        }}
      />

      <div className="container mx-auto px-4">
        <div className="relative z-0 p-[30px]">
          <div className="relative border border-[#e9e9e9] rounded-[12px] min-h-[300px] text-white overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <Image
              src="/start_hiring_banner.png"
              alt="Start Hiring Banner"
              fill
              className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            />
            
            <div className="w-full justify-center">
              <div className="col-span-12 lg:col-span-10 xl:col-span-6 mx-auto">
                 <div className="text-center p-8 lg:p-12">
                  <h2 className="text-[32px] font-bold mb-4">Start Hiring Smarter Today!</h2>
                  <p className="text-[18px] opacity-90 mb-6">
                    Say goodbye to manual screening and slow hiring.
                  </p>
                  
                  <Link 
                    href="/pricing"
                    className="d-inline-flex inline-flex items-center justify-center gap-2 bg-[#3388FF] hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Get Started <HiArrowSmallRight className="w-5 h-5" />
                  </Link>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
