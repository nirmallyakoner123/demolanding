'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { HiArrowSmallUp } from 'react-icons/hi2';
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { trackEvent } from '@/utils/facebookPixel';
import { trackGTMEvents } from '@/utils/googleTagManager';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // Track "Book a Demo" click
    if (sectionId === '#savings') {
      trackEvent('Lead', {
        content_name: 'Book Demo Link Clicked',
        content_category: 'demo_booking',
        method: 'Footer Navigation',
        source: 'footer',
        step: 'navigate_to_calculator'
      });
      
      trackGTMEvents.navigateToCalculator('footer');
    }

    if (isHomePage) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      router.push(`/${sectionId}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer pt-[30px] pb-10 bg-white">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="footer_content border-b border-[rgba(30,30,30,0.1)] pb-10 lg:pb-12 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20">
            {/* Logo and Socials Column */}
            <div className="flex flex-col gap-4 max-w-[300px]">
              <Link href="/" className="inline-block">
                <Image
                  src="/IS Logo 150X48.png"
                  alt="Interview Screener Logo"
                  width={150}
                  height={48}
                  className="w-[150px] lg:w-[180px] h-auto"
                />
              </Link>
              <p className="font-nunito text-base font-medium text-[#1E1E1E] m-0">
                Built for faster, smarter, bias-free hiring.
              </p>
              
              <div className="mt-2">
                <ul className="flex items-center gap-5 p-0 m-0 list-none">
                  <li>
                    <a href="https://x.com/I_Screener" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)" className="text-[#1E1E1E] opacity-80 hover:opacity-100 transition-opacity">
                      <FaXTwitter size={16} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/interview-screener/" target="_blank" rel="noopener noreferrer" aria-label="Connect with us on LinkedIn" className="text-[#1E1E1E] opacity-80 hover:opacity-100 transition-opacity">
                      <FaLinkedinIn size={18} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/interviewscreener/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="text-[#1E1E1E] opacity-80 hover:opacity-100 transition-opacity">
                      <FaInstagram size={18} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@InterviewScreener" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" className="text-[#1E1E1E] opacity-80 hover:opacity-100 transition-opacity">
                      <FaYoutube size={20} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 w-full justify-items-start lg:justify-items-end">
              {/* Company */}
              <div className="flex flex-col">
                <h3 className="font-nunito text-base font-medium text-[#1E1E1E] mb-4">Company</h3>
                <a href="#who_we_are" onClick={(e) => handleSectionClick(e, '#who_we_are')} className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">What We Do</a>
                <a href="#how-it-works" onClick={(e) => handleSectionClick(e, '#how-it-works')} className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">How It Works</a>
                <a href="#features" onClick={(e) => handleSectionClick(e, '#features')} className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">Features</a>
                <a href="#savings" onClick={(e) => handleSectionClick(e, '#savings')} className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">
                  Savings Calculator 
                  <span className="w-1.5 h-1.5 bg-primary rounded-full ml-1.5 mt-1 block"></span>
                </a>
                <a href="#faq" onClick={(e) => handleSectionClick(e, '#faq')} className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">FAQ</a>
              </div>

              {/* Resources */}
              <div className="flex flex-col">
                <h3 className="font-nunito text-base font-medium text-[#1E1E1E] mb-4">Resources</h3>
                <Link href="/articles" className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">Articles</Link>
                <Link href="/terms-of-service" className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">Terms of Service</Link>
                <Link href="/privacy-policy" className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">Privacy Policy</Link>
                <a href="mailto:support@interviewscreener.com" className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">Contact Support</a>
              </div>

              {/* Product */}
              <div className="flex flex-col">
                <h3 className="font-nunito text-base font-medium text-[#1E1E1E] mb-4">Product</h3>
                <Link href="/pricing" className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">Get Started</Link>
                <a href="#savings" onClick={(e) => handleSectionClick(e, '#savings')} className="font-normal text-[15px] text-[#1E1E1E] opacity-80 hover:opacity-100 mb-2.5 transition-opacity flex items-center">Book a Demo</a>
                
                <button
                  onClick={scrollToTop}
                  className="mt-8 lg:mt-12 w-10 h-10 rounded-full bg-gradient-to-r from-[#1f1f1f] via-[#161616] to-[#1f1f1f] text-white flex items-center justify-center hover:shadow-lg transition-shadow ml-auto"
                  aria-label="Scroll to top"
                >
                  <HiArrowSmallUp size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex justify-center">
          <p className="text-gray-500 text-sm m-0 text-center">
            © 2025 — Copyright |{' '}
            <a
              href="https://klizos.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-gray-500 hover:text-gray-700"
            >
              Klizo Solutions Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
