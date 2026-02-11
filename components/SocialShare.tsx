'use client';

import { useState } from 'react';
import { FaXTwitter, FaLinkedinIn, FaFacebookF, FaLink } from 'react-icons/fa6';
import { toast } from 'react-toastify';

interface SocialShareProps {
  title: string;
  url: string;
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
      toast.success('Link copied to clipboard!', {
        position: 'bottom-center',
        autoClose: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform: string) => {
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-nunito text-sm font-medium text-text-light">Share:</span>
      
      <div className="flex items-center gap-2">
        {/* Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all duration-300"
          aria-label="Share on Twitter"
        >
          <FaXTwitter className="text-base" />
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn className="text-base" />
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300"
          aria-label="Share on Facebook"
        >
          <FaFacebookF className="text-base" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
            copied
              ? 'bg-success text-white'
              : 'bg-text/10 text-text hover:bg-text hover:text-white'
          }`}
          aria-label="Copy link"
        >
          <FaLink className="text-base" />
        </button>
      </div>
    </div>
  );
}
