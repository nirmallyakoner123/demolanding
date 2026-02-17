"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (isHomePage) {
        // Landing page behavior: hide briefly between 100-1500px, then show sticky
        setIsHide(scrollY > 100 && scrollY < 1500);
        setIsSticky(scrollY > 1500);
      } else {
        // Other pages: always show sticky after small scroll
        setIsHide(false);
        setIsSticky(scrollY > 100);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Handle navigation to sections
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isHomePage) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`/${sectionId}`);
    }
  };

  const navLinks = [
    { label: "How It Works", href: "#how-it-works", isSection: true },
    { label: "Features", href: "#features", isSection: true },
    { label: "Savings", href: "#savings", isSection: true },
    { label: "Pricing", href: "/pricing", isSection: false },
    { label: "Articles", href: "/articles", isSection: false },
    { label: "FAQ", href: "#faq", isSection: true },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isHide ? -100 : 0,
          opacity: isHide ? 0 : 1,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className={`
          fixed z-50 transition-all duration-300 ease-in-out
          ${
            isSticky
              ? "bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
              : "bg-white/80 backdrop-blur-[15px]"
          }
          
          /* Mobile styles (Base) */
          top-0 left-0 w-full rounded-none px-4 py-3
          
          /* Desktop styles (XL+) - Floating Container */
          xl:top-5 xl:left-1/2 xl:-translate-x-1/2 xl:w-[90%] xl:max-w-[1080px] xl:rounded-xl xl:px-5 xl:py-4
        `}
      >
        <nav className="flex items-center justify-between max-w-full">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Image
                src="/IS Logo 100X33.png"
                alt="Interview Screener Logo"
                width={100}
                height={33}
                className="w-[100px] h-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-3 flex-1 justify-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {link.isSection ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link.href)}
                    className="relative px-3 py-2 text-font-base font-normal text-custom transition-colors hover:text-primary group whitespace-nowrap"
                  >
                    {link.label}
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-[5%] h-[2px] bg-primary w-0 transition-all duration-300 opacity-0 group-hover:w-[90%] group-hover:opacity-100"
                    />
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`
                        relative px-3 py-2 text-font-base font-medium transition-colors hover:text-primary group whitespace-nowrap
                        ${pathname === link.href ? "text-primary" : "text-custom"}
                      `}
                  >
                    {link.label}
                    <motion.span
                      layoutId="nav-underline"
                      className={`
                          absolute bottom-0 left-[5%] h-[2px] bg-primary transition-all duration-300
                          ${pathname === link.href ? "w-[90%] opacity-100" : "w-0 opacity-0 group-hover:w-[90%] group-hover:opacity-100"}
                        `}
                    />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{
                y: -2,
                filter: "drop-shadow(0 4px 6px rgba(51, 136, 255, 0.2))",
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="https://app.interviewscreener.com/login"
                className="px-6 py-2 text-small rounded-md border border-primary text-primary font-normal hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
              >
                Log In
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                y: -2,
                filter: "drop-shadow(0 8px 12px rgba(51, 136, 255, 0.3))",
              }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="https://app.interviewscreener.com/sign-up"
                className="bg-primary-gradient px-6 py-2 text-small rounded-md border border-primary text-white font-normal hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-custom relative z-1001"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-999 xl:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-1000 xl:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 pb-2">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/IS Logo 100X33.png"
                    alt="Interview Screener Logo"
                    width={100}
                    height={33}
                    className="w-[100px] h-auto"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-custom hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <HiX size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6 p-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.isSection ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleSectionClick(e, link.href)}
                        className="text-lg font-medium text-custom hover:text-primary transition-colors block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`text-lg font-medium transition-colors block ${pathname === link.href ? "text-primary" : "text-custom hover:text-primary"}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-100"
                >
                  <Link
                    href="https://app.interviewscreener.com/login"
                    className="w-full px-5 py-3 text-center rounded-lg border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    href="https://app.interviewscreener.com/sign-up"
                    className="bg-primary-gradient w-full px-5 py-3 text-center rounded-lg text-white font-medium hover:opacity-90 transition-all shadow-md"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
