"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

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
    <header
      className={`
        fixed z-1000 transition-all duration-300 ease-in-out
        ${
          isSticky
            ? "bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] opacity-100 visible"
            : "bg-white/80 backdrop-blur-[15px]"
        }
        ${isHide ? "-top-full opacity-0" : ""}
        
        /* Mobile styles (Base) */
        top-0 left-0 w-full rounded-none px-4 py-3
        
        /* Desktop styles (LG+) - Floating Container */
        lg:top-5 lg:left-1/2 lg:-translate-x-1/2 lg:w-[90%] lg:max-w-[1080px] lg:rounded-[14px] lg:px-5 lg:py-3
      `}
    >
      <nav className="flex items-center justify-between max-w-full">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/IS Logo 100X33.png"
            alt="Interview Screener Logo"
            width={100}
            height={33}
            className="w-[100px] h-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
          {navLinks.map((link) =>
            link.isSection ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
                className="relative px-3 py-2 text-font-base font-normal text-custom transition-colors hover:text-primary group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-[5%] h-[2px] bg-primary w-0 transition-all duration-300 opacity-0 group-hover:w-[90%] group-hover:opacity-100" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`
                    relative px-3 py-2 text-font-base font-medium transition-colors hover:text-primary group whitespace-nowrap
                    ${pathname === link.href ? "text-primary" : "text-custom"}
                  `}
              >
                {link.label}
                <span
                  className={`
                      absolute bottom-0 left-[5%] h-[2px] bg-primary transition-all duration-300
                      ${pathname === link.href ? "w-[90%] opacity-100" : "w-0 opacity-0 group-hover:w-[90%] group-hover:opacity-100"}
                    `}
                />
              </Link>
            ),
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            href="https://app.interviewscreener.com/login"
            className="px-6 py-2 text-small rounded-md border border-primary text-primary font-normal hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
          >
            Log In
          </Link>
          <Link
            href="https://app.interviewscreener.com/sign-up"
            className="bg-primary-gradient px-6 py-2 text-small rounded-md border border-primary text-white font-normal hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-custom"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
          `}
      >
        <div className="flex flex-col gap-4 pb-4">
          {navLinks.map((link) =>
            link.isSection ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSectionClick(e, link.href)}
                className="text-font-base font-medium text-custom hover:text-primary"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`text-font-base font-medium hover:text-primary ${pathname === link.href ? "text-primary" : "text-custom"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}
          <div className="flex flex-col gap-3 mt-2">
            <Link
              href="https://app.interviewscreener.com/login"
              className="w-full px-5 py-2 text-small text-center rounded-md border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              href="https://app.interviewscreener.com/sign-up"
              className="bg-primary-gradient w-full px-5 py-2 text-center rounded-lg text-white font-medium text-small leading-[120%] tracking-[-0.48px] hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
