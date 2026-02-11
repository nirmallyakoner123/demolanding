'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowSmallRight } from 'react-icons/hi2';
import { trackTidyCalEvents } from '@/utils/facebookPixel';
import { trackGTMEvents } from '@/utils/googleTagManager';

export default function Banner() {
  const [showControls, setShowControls] = useState(false);
  const [showTidyCalModal, setShowTidyCalModal] = useState(false);
  const [modalOpenTime, setModalOpenTime] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowControls(true);
    }
  };

  const handleEnded = () => {
    setShowControls(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  };

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (
        event.origin.includes('tidycal.com') &&
        event.data?.step === 'confirm'
      ) {
        const tidycalBody = document.querySelector('.tidycal-body');
        if (tidycalBody) {
          tidycalBody.scrollTop = 9999;
        }

        // Track booking confirmation (Facebook Pixel + GTM)
        trackTidyCalEvents.bookingConfirmed('banner');
        trackGTMEvents.demoBookingConfirmed('banner');
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Handle modal open
  const handleOpenModal = () => {
    setShowTidyCalModal(true);
    setModalOpenTime(Date.now());

    // Track modal opened (Facebook Pixel + GTM)
    trackTidyCalEvents.modalOpened('banner');
    trackGTMEvents.demoModalOpened('banner');
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowTidyCalModal(false);

    // Calculate time spent if modal was opened
    if (modalOpenTime) {
      const timeSpent = Math.round((Date.now() - modalOpenTime) / 1000);

      // Track modal closed (Facebook Pixel + GTM)
      trackTidyCalEvents.modalClosed('banner', timeSpent);
      trackGTMEvents.demoModalClosed('banner', timeSpent);
      setModalOpenTime(null);
    }
  };

  return (
    <section id="waitlist" className="relative z-0 pt-[120px] pb-[50px] sm:pt-[120px] sm:pb-[50px] w-full overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 z-[-2]"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 160, 226, 0.00) 24.86%, rgba(51, 136, 255, 0.20) 100%)',
          backgroundBlendMode: 'multiply, normal'
        }}
      />

      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full z-[-1]">
        <Image
          src="/banner_grid.png"
          alt="Decorative grid background"
          width={3840}
          height={2604}
          className="w-full h-full object-cover opacity-60"
          priority
        />
      </div>

      <div className="container mx-auto px-4 lg:px-5 max-w-[1500px]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          
          {/* Text Content */}
          <div className="w-full lg:w-10/12">
            <div className="flex flex-col justify-center items-center text-center mb-10 lg:mb-12 max-w-[780px] mx-auto relative">
              <h1 className="text-[#1E1E1E] text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px] 2xl:text-[70px] font-medium leading-[1.2] -tracking-[2.1px] mb-0">
                Hire Smarter, <span className="text-primary">Faster,</span> and without the Hassle
              </h1>
              
              <div className="mt-5 mb-5 text-[#1E1E1E] text-[19px] xl:text-[16px] lg:text-[14px] opacity-70 font-medium max-w-[600px] mx-auto">
                <p className="mb-0">Let AI handle resume filtering, interviews, and candidate ranking,</p>
                <p className="mt-0">So you can focus on hiring the best, faster.</p>
              </div>

              {/* Buttons */}
              <div className="mt-3 w-full">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/pricing"
                    className="
                      min-w-[120px] sm:min-w-[180px] h-[48px] whitespace-nowrap flex items-center justify-center 
                      text-[0.95rem] sm:text-[1rem] px-[12px] sm:px-[20px] font-semibold rounded-[8.256px] 
                      text-white transition-all duration-200
                      shadow-[0_-1.651px_1.651px_0_rgba(0,0,0,0.10)_inset,0_1.651px_3.303px_0_rgba(198,198,198,0.15)]
                    "
                    style={{
                      background: 'linear-gradient(0deg, #38F 0%, #38F 100%), linear-gradient(180deg, #3AB2E4 0%, #00A0E2 100%)'
                    }}
                  >
                    Get Started <span className="ms-2"><HiArrowSmallRight /></span>
                  </Link>
                  
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="
                      min-w-[120px] sm:min-w-[180px] h-[48px] whitespace-nowrap flex items-center justify-center 
                      text-[0.95rem] sm:text-[1rem] px-[12px] sm:px-[20px] font-semibold rounded-[8.256px] 
                      bg-white text-dark border-white transition-all duration-200
                      shadow-[0_-1.651px_1.651px_0_rgba(0,0,0,0.10)_inset,0_1.651px_3.303px_0_rgba(198,198,198,0.15)]
                    "
                  >
                    Get a Demo <span className="ms-2"><HiArrowSmallRight /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              className="w-full h-full object-cover"
              disablePictureInPicture
              playsInline
              controls={showControls}
              onEnded={handleEnded}
              poster="/image (20).webphjuh.webp"
              preload="none"
              aria-label="Interview Screener product demonstration video"
            >
              <source src="/video/interview_screener_2.mp4" type="video/mp4" />
              <track kind="captions" srcLang="en" label="English" />
            </video>

            {!showControls && (
               <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 w-[32px] h-[44px] p-[18px_20px_18px_28px] box-content block rounded-full"
                onClick={handlePlay}
              >
                {/* Pulse Animation Background */}
                <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-[80px] h-[80px] bg-primary rounded-full animate-pulse-border"></div>
                
                {/* Button Background */}
                <div className="absolute z-[1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-[80px] h-[80px] bg-primary rounded-full transition-colors duration-200 hover:bg-[#1d4ed8]"></div>
                
                {/* Play Triangle */}
                <span className="block relative z-[3] w-0 h-0 border-l-[32px] border-l-white border-t-[22px] border-t-transparent border-b-[22px] border-b-transparent"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TidyCal Modal */}
      {showTidyCalModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={handleCloseModal}>
          <div 
            className="bg-white w-full max-w-5xl h-[80vh] rounded-lg shadow-2xl relative overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-2 border-b">
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold px-2"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto tidycal-body">
              <iframe
                src="https://tidycal.com/team/interview-screener/walkthrough-demo"
                className="w-full h-full min-h-[600px] border-0"
                title="Book a Demo"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
