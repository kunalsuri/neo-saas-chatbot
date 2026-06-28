/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

interface CDNConfig {
  enabled: boolean;
  baseUrl: string;
}

// Get CDN configuration from environment variables
const cdnConfig: CDNConfig = {
  enabled: import.meta.env.VITE_CDN_ENABLED === 'true',
  baseUrl: import.meta.env.VITE_CDN_BASE_URL || '',
};

/**
 * Get CDN URL for a given asset path
 */
export function getCDNUrl(assetPath: string): string {
  if (!cdnConfig.enabled || !cdnConfig.baseUrl) {
    return assetPath;
  }
  
  // Handle absolute URLs
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }
  
  // Remove leading slash if present
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  // Ensure CDN base URL ends with slash
  const baseUrl = cdnConfig.baseUrl.endsWith('/') 
    ? cdnConfig.baseUrl 
    : `${cdnConfig.baseUrl}/`;
  
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  imagePath: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
    fit?: 'cover' | 'contain' | 'fill';
  } = {}
): string {
  if (!cdnConfig.enabled) {
    return imagePath;
  }
  
  const baseUrl = getCDNUrl(imagePath);
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('f', options.format);
  if (options.fit) params.set('fit', options.fit);
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Preload critical assets
 */
export function preloadAssets(assets: string[]): void {
  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = getCDNUrl(asset);
    
    // Determine asset type
    const ext = asset.split('.').pop()?.toLowerCase();
    if (ext === 'css') {
      link.as = 'style';
    } else if (['js', 'mjs'].includes(ext || '')) {
      link.as = 'script';
    } else if (['woff', 'woff2', 'ttf'].includes(ext || '')) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(ext || '')) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with CDN optimization
 */
export function createLazyImage(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
    alt?: string;
    className?: string;
    loading?: 'lazy' | 'eager';
  } = {}
): HTMLImageElement {
  const img = document.createElement('img');
  
  // Set optimized source
  img.src = getOptimizedImageUrl(src, options);
  
  // Set attributes
  if (options.alt) img.alt = options.alt;
  if (options.className) img.className = options.className;
  if (options.loading) img.loading = options.loading;
  if (options.width) img.width = options.width;
  if (options.height) img.height = options.height;
  
  return img;
}

/**
 * Check if CDN is available
 */
export async function checkCDNHealth(): Promise<boolean> {
  if (!cdnConfig.enabled || !cdnConfig.baseUrl) {
    return false;
  }
  
  try {
    const response = await fetch(`${cdnConfig.baseUrl}/health`, {
      method: 'HEAD',
      mode: 'no-cors',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get responsive image srcset for different screen sizes
 */
export function getResponsiveImageSrcSet(
  imagePath: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  if (!cdnConfig.enabled) {
    return imagePath;
  }
  
  return sizes
    .map(size => `${getOptimizedImageUrl(imagePath, { width: size, format: 'webp' })} ${size}w`)
    .join(', ');
}

/**
 * React hook for CDN-optimized images
 */
export function useCDNImage(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  } = {}
) {
  const optimizedSrc = getOptimizedImageUrl(src, options);
  const srcSet = getResponsiveImageSrcSet(src);
  
  return {
    src: optimizedSrc,
    srcSet,
    loading: 'lazy' as const,
  };
}

/**
 * Performance monitoring for CDN assets
 */
export function measureAssetLoadTime(assetUrl: string): Promise<number> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    
    img.onerror = () => {
      resolve(-1); // Error loading
    };
    
    img.src = getCDNUrl(assetUrl);
  });
}

export { cdnConfig };