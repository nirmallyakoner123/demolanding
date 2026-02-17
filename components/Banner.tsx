"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowSmallRight } from "react-icons/hi2";
import { motion, AnimatePresence } from "motion/react";
import { trackTidyCalEvents } from "@/utils/facebookPixel";
import { trackGTMEvents } from "@/utils/googleTagManager";

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
        event.origin.includes("tidycal.com") &&
        event.data?.step === "confirm"
      ) {
        const tidycalBody = document.querySelector(".tidycal-body");
        if (tidycalBody) {
          tidycalBody.scrollTop = 9999;
        }

        // Track booking confirmation (Facebook Pixel + GTM)
        trackTidyCalEvents.bookingConfirmed("banner");
        trackGTMEvents.demoBookingConfirmed("banner");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // Handle modal open
  const handleOpenModal = () => {
    setShowTidyCalModal(true);
    setModalOpenTime(Date.now());

    // Track modal opened (Facebook Pixel + GTM)
    trackTidyCalEvents.modalOpened("banner");
    trackGTMEvents.demoModalOpened("banner");
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowTidyCalModal(false);

    // Calculate time spent if modal was opened
    if (modalOpenTime) {
      const timeSpent = Math.round((Date.now() - modalOpenTime) / 1000);

      // Track modal closed (Facebook Pixel + GTM)
      trackTidyCalEvents.modalClosed("banner", timeSpent);
      trackGTMEvents.demoModalClosed("banner", timeSpent);
      setModalOpenTime(null);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative z-0 w-full overflow-hidden pt-40 px-0 lg:px-48"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-[-2]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 160, 226, 0.00) 24.86%, rgba(51, 136, 255, 0.22) 100%)",
          backgroundBlendMode: "multiply, normal",
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
          <div className="w-full">
            <div className="flex flex-col justify-center items-center text-center lg:mb-12 max-w-[760px] mx-auto relative py-10 ">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-custom text-4xl lg:text-6xl 2xl:text-7xl font-bold leading-[1.2] -tracking-[2.5px] mb-0"
              >
                Hire Smarter, <span className="text-primary">Faster,</span> and
                without the Hassle
              </motion.h1>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="text-custom text-sm md:text-base xl:text-lg opacity-70 font-medium max-w-[600px] mx-auto mb-4"
              >
                <p className="mt-5 mb-0">
                  Let AI handle resume filtering, interviews, and candidate
                  ranking,
                </p>
                <p className="mt-0 mb-0">
                  So you can focus on hiring the best, faster.
                </p>
              </motion.div>

              {/* Buttons */}
              <div className="mt-4 w-full">
                <div className="flex gap-3 justify-center items-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href="/pricing"
                      className="min-w-40 lg:min-w-44 h-12 whitespace-nowrap flex items-center justify-center 
                        text-base px-3 lg:px-4 font-semibold border-0 rounded-btn 
                        text-white transition-all duration-300
                        inset-shadow-sm inset-shadow-[#c6c6c626] bg-primary-gradient
                        group cursor-pointer
                      "
                    >
                      <motion.span
                        variants={{
                          hover: { scale: 1.03 },
                          tap: { scale: 0.98 },
                        }}
                        className="flex items-center"
                      >
                        Get Started{" "}
                        <motion.span
                          variants={{ hover: { x: 4 } }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                          className="ms-2"
                        >
                          <HiArrowSmallRight />
                        </motion.span>
                      </motion.span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <button
                      type="button"
                      onClick={handleOpenModal}
                      className="min-w-40 lg:min-w-44 h-12 whitespace-nowrap flex items-center justify-center 
                        text-base px-3 lg:px-4 font-semibold border-0 rounded-btn 
                        bg-white text-dark transition-all duration-300
                        inset-shadow-sm inset-shadow-white/50
                        group cursor-pointer
                      "
                    >
                      <motion.span
                        variants={{
                          hover: { scale: 1.03 },
                          tap: { scale: 0.98 },
                        }}
                        className="flex items-center"
                      >
                        Get a Demo{" "}
                        <motion.span
                          variants={{ hover: { x: 4 } }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                          className="ms-2"
                        >
                          <HiArrowSmallRight />
                        </motion.span>
                      </motion.span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="w-full px-8"
        >
          <div className="relative w-full aspect-video overflow-hidden bg-black">
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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 w-20 h-20 flex items-center justify-center rounded-full"
                onClick={handlePlay}
              >
                {/* Pulse Animation Background */}
                <div className="absolute inset-0 z-0 bg-primary rounded-full animate-pulse-border"></div>

                {/* Button Background */}
                <div className="absolute inset-0 z-1 bg-primary rounded-full transition-colors duration-200 hover:bg-[#1d4ed8]"></div>

                {/* Play Triangle - shifted slightly right for visual balance */}
                <span className="block relative z-3 w-0 h-0 border-l-32 border-l-white border-t-22 border-t-transparent border-b-22 border-b-transparent ml-1.5"></span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* TidyCal Modal */}
      <AnimatePresence>
        {showTidyCalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
