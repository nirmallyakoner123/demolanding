"use client";

import Image from "next/image";
import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
}

/**
 * Lazy loading image component using Next.js Image
 * Replaces react-lazy-load-image-component with Next.js native optimization
 */
export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  onClick,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`
          duration-700 ease-in-out
          ${isLoading ? "scale-110 blur-sm grayscale" : "scale-100 blur-0 grayscale-0"}
        `}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
