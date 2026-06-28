/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { config } from './environment';

export interface CDNConfig {
  enabled: boolean;
  baseUrl: string;
  regions: string[];
  cacheControl: {
    static: string;
    images: string;
    api: string;
  };
  compression: {
    enabled: boolean;
    level: number;
  };
  security: {
    cors: boolean;
    hotlinkProtection: boolean;
  };
}

export const cdnConfig: CDNConfig = {
  enabled: config.cdn?.enabled || false,
  baseUrl: config.cdn?.baseUrl || '',
  regions: config.cdn?.regions || ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
  cacheControl: {
    static: 'public, max-age=31536000, immutable', // 1 year for static assets
    images: 'public, max-age=2592000', // 30 days for images
    api: 'no-cache, no-store, must-revalidate', // No cache for API
  },
  compression: {
    enabled: true,
    level: 6, // Balanced compression
  },
  security: {
    cors: true,
    hotlinkProtection: true,
  },
};

/**
 * Get CDN URL for a given asset path
 */
export function getCDNUrl(assetPath: string): string {
  if (!cdnConfig.enabled || !cdnConfig.baseUrl) {
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
 * Get cache control header for different asset types
 */
export function getCacheControl(assetType: 'static' | 'images' | 'api'): string {
  return cdnConfig.cacheControl[assetType];
}

/**
 * Check if asset should be served from CDN
 */
export function shouldUseCDN(assetPath: string): boolean {
  if (!cdnConfig.enabled) return false;
  
  // Static assets that should use CDN
  const cdnAssets = [
    '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif',
    '.woff', '.woff2', '.ttf', '.eot', '.ico', '.pdf', '.zip'
  ];
  
  return cdnAssets.some(ext => assetPath.toLowerCase().endsWith(ext));
}

/**
 * Generate preload links for critical assets
 */
export function generatePreloadLinks(criticalAssets: string[]): string[] {
  return criticalAssets.map(asset => {
    const url = getCDNUrl(asset);
    const ext = asset.split('.').pop()?.toLowerCase();
    
    let as = 'fetch';
    if (ext === 'css') as = 'style';
    else if (['js', 'mjs'].includes(ext || '')) as = 'script';
    else if (['woff', 'woff2', 'ttf'].includes(ext || '')) as = 'font';
    else if (['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(ext || '')) as = 'image';
    
    return `<link rel="preload" href="${url}" as="${as}"${as === 'font' ? ' crossorigin' : ''}>`;
  });
}

export default cdnConfig;