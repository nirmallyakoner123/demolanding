"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiArrowSmallRight } from "react-icons/hi2";

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
    <div className="relative z-0 pb-6">
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-r from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

      <div className="container mx-auto px-4">
        <div className="relative z-0 p-8">
          {/* Box Vertical Borders */}
          <div className="absolute top-0 left-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          <div className="absolute top-0 right-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

          <div className="relative border border-zinc-200 rounded-xl min-h-[300px] text-white overflow-hidden flex items-center justify-center bg-[url('/start_hiring_banner.png')] bg-cover bg-center bg-no-repeat">
            <div className="w-full flex justify-center">
              <div className="max-w-3xl mx-auto">
                <div className="text-center p-4 lg:p-5">
                  <h2 className="text-4xl font-bold mb-2">
                    Start Hiring Smarter Today!
                  </h2>
                  <p className="text-lg opacity-90 mb-4">
                    Say goodbye to manual screening and slow hiring.
                  </p>

                  <Link
                    href="/pricing"
                    className="d-inline-flex inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-lg transition-colors duration-200"
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
