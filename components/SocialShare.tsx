"use client";

import { useState } from "react";
import { FaXTwitter, FaLinkedinIn, FaFacebookF, FaLink } from "react-icons/fa6";
import { toast } from "react-toastify";

interface SocialShareProps {
  title: string;
  url: string;
}

interface ShareButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className: string;
}

function ShareButton({ onClick, icon, label, className }: ShareButtonProps) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`cursor-pointer flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${className}`}
        aria-label={label}
      >
        {icon}
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-primary text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-10">
        {label}
        {/* Triangle pointer */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
      </div>
    </div>
  );
}

/**
 * Social Share Component
 * Provides buttons to share article on social media platforms
 */
export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!", {
        position: "bottom-center",
        autoClose: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: string) => {
    window.open(
      shareLinks[platform as keyof typeof shareLinks],
      "_blank",
      "width=600,height=400",
    );
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-nunito text-sm font-medium text-text-light">
        Share:
      </span>

      <div className="flex items-center gap-2">
        {/* Twitter */}
        <ShareButton
          onClick={() => handleShare("twitter")}
          icon={<FaXTwitter className="text-base" />}
          label="Share on Twitter"
          className="bg-text/10 text-text hover:bg-text hover:text-white"
        />

        {/* LinkedIn */}
        <ShareButton
          onClick={() => handleShare("linkedin")}
          icon={<FaLinkedinIn className="text-base" />}
          label="Share on LinkedIn"
          className="bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
        />

        {/* Facebook */}
        <ShareButton
          onClick={() => handleShare("facebook")}
          icon={<FaFacebookF className="text-base" />}
          label="Share on Facebook"
          className="bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
        />

        {/* Copy Link */}
        <ShareButton
          onClick={handleCopyLink}
          icon={<FaLink className="text-base" />}
          label={copied ? "Copied!" : "Copy Link"}
          className={
            copied
              ? "bg-success text-white"
              : "bg-text/10 text-text hover:bg-text hover:text-white"
          }
        />
      </div>
    </div>
  );
}
