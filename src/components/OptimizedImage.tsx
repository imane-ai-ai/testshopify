import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority) return;

    const currentImg = imgRef.current;
    if (!currentImg) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    observerRef.current.observe(currentImg);

    return () => {
      if (observerRef.current && currentImg) {
        observerRef.current.unobserve(currentImg);
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const getImageUrl = (url: string, format?: 'webp' | 'avif') => {
    if (format && (url.includes('supabase.co') || url.includes('imgur.com') || url.includes('pexels.com'))) {
      return url;
    }
    return url;
  };

  const generateSrcSet = (url: string, format?: 'webp' | 'avif') => {
    const baseUrl = getImageUrl(url, format);
    return `${baseUrl} 1x, ${baseUrl} 2x`;
  };

  return (
    <div className="aspect-[3/4] w-full bg-gray-50 flex items-center justify-center relative overflow-hidden" ref={imgRef}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shimmer"></div>
        </div>
      )}

      {isInView && !hasError && (
        <picture>
          <source
            type="image/avif"
            srcSet={generateSrcSet(src, 'avif')}
            sizes={sizes}
          />
          <source
            type="image/webp"
            srcSet={generateSrcSet(src, 'webp')}
            sizes={sizes}
          />
          <img
            src={src}
            alt={alt}
            className={`object-contain w-full h-full transition-opacity duration-500 ${className} ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding={priority ? 'sync' : 'async'}
            sizes={sizes}
          />
        </picture>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};
