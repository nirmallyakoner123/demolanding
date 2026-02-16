"use client";

import React, { useState } from "react";
import Image from "next/image";

interface VideoWithFallbackProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  fallbackSrc: string;
  className?: string;
}

const VideoWithFallback: React.FC<VideoWithFallbackProps> = ({
  src,
  fallbackSrc,
  className,
  ...props
}) => {
  const [showImage, setShowImage] = useState(false);

  const handleVideoError = () => {
    setShowImage(true);
  };

  if (showImage || !src) {
    return (
      <div
        className={`relative w-full h-auto ${className}`}
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <Image
          src={fallbackSrc}
          alt="Video fallback"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    );
  }

  return (
    <video
      src={src}
      className={className}
      onError={handleVideoError}
      {...props}
    />
  );
};

export default VideoWithFallback;
