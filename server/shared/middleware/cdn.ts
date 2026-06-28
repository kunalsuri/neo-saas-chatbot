/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import { Request, Response, NextFunction } from 'express';
import { getCDNUrl, getCacheControl, shouldUseCDN, cdnConfig } from '../config/cdn';
import { config } from '../config/environment';

/**
 * Middleware to add CDN headers and optimize static asset delivery
 */
export function cdnMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip if CDN is not enabled
  if (!cdnConfig.enabled) {
    return next();
  }

  const originalSend = res.send;
  const originalJson = res.json;

  // Override res.send to modify HTML responses
  res.send = function(body: any) {
    if (typeof body === 'string' && body.includes('<!DOCTYPE html>')) {
      // Replace asset URLs with CDN URLs in HTML
      body = replaceAssetUrls(body);
      
      // Add preload headers for critical assets
      addPreloadHeaders(res);
    }
    
    return originalSend.call(this, body);
  };

  // Override res.json to add CDN URLs to API responses
  res.json = function(obj: any) {
    if (obj && typeof obj === 'object') {
      obj = transformApiResponse(obj);
    }
    
    return originalJson.call(this, obj);
  };

  next();
}

/**
 * Middleware to set cache headers for static assets
 */
export function staticCacheMiddleware(req: Request, res: Response, next: NextFunction) {
  const assetPath = req.path;
  
  if (shouldUseCDN(assetPath)) {
    // Set cache control headers
    const cacheControl = getCacheControl('static');
    res.setHeader('Cache-Control', cacheControl);
    
    // Add CDN headers
    res.setHeader('X-CDN-Cache', 'HIT');
    res.setHeader('X-CDN-Region', 'auto');
    
    // Add compression headers
    if (cdnConfig.compression.enabled) {
      res.setHeader('Vary', 'Accept-Encoding');
    }
    
    // Add security headers
    if (cdnConfig.security.cors) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    }
  }
  
  next();
}

/**
 * Replace asset URLs in HTML with CDN URLs
 */
function replaceAssetUrls(html: string): string {
  if (!cdnConfig.enabled) return html;
  
  // Replace script src attributes
  html = html.replace(
    /(<script[^>]+src=["'])([^"']+)(["'][^>]*>)/g,
    (match, prefix, url, suffix) => {
      if (shouldUseCDN(url)) {
        return `${prefix}${getCDNUrl(url)}${suffix}`;
      }
      return match;
    }
  );
  
  // Replace link href attributes (CSS, fonts, etc.)
  html = html.replace(
    /(<link[^>]+href=["'])([^"']+)(["'][^>]*>)/g,
    (match, prefix, url, suffix) => {
      if (shouldUseCDN(url)) {
        return `${prefix}${getCDNUrl(url)}${suffix}`;
      }
      return match;
    }
  );
  
  // Replace img src attributes
  html = html.replace(
    /(<img[^>]+src=["'])([^"']+)(["'][^>]*>)/g,
    (match, prefix, url, suffix) => {
      if (shouldUseCDN(url)) {
        return `${prefix}${getCDNUrl(url)}${suffix}`;
      }
      return match;
    }
  );
  
  return html;
}

/**
 * Transform API responses to include CDN URLs
 */
function transformApiResponse(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => transformApiResponse(item));
  }
  
  if (obj && typeof obj === 'object') {
    const transformed = { ...obj };
    
    // Transform common image/asset fields
    const assetFields = ['imageUrl', 'avatarUrl', 'thumbnailUrl', 'iconUrl', 'backgroundUrl'];
    
    for (const field of assetFields) {
      if (transformed[field] && typeof transformed[field] === 'string') {
        if (shouldUseCDN(transformed[field])) {
          transformed[field] = getCDNUrl(transformed[field]);
        }
      }
    }
    
    // Recursively transform nested objects
    for (const key in transformed) {
      if (transformed[key] && typeof transformed[key] === 'object') {
        transformed[key] = transformApiResponse(transformed[key]);
      }
    }
    
    return transformed;
  }
  
  return obj;
}

/**
 * Add preload headers for critical assets
 */
function addPreloadHeaders(res: Response) {
  const criticalAssets = [
    '/assets/index.css',
    '/assets/vendor.js',
    '/assets/index.js'
  ];
  
  const preloadLinks = criticalAssets
    .map(asset => `<${getCDNUrl(asset)}>; rel=preload; as=script`)
    .join(', ');
  
  if (preloadLinks) {
    res.setHeader('Link', preloadLinks);
  }
}

/**
 * Middleware to handle CDN health checks
 */
export function cdnHealthCheck(req: Request, res: Response, next: NextFunction) {
  if (req.path === '/cdn-health') {
    res.json({
      status: 'healthy',
      cdn: {
        enabled: cdnConfig.enabled,
        baseUrl: cdnConfig.baseUrl,
        regions: cdnConfig.regions,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }
  
  next();
}

/**
 * Generate CSP header with CDN domains
 */
export function generateCSPHeader(): string {
  const cdnDomain = cdnConfig.baseUrl ? new URL(cdnConfig.baseUrl).hostname : '';
  
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cdnDomain}`,
    `style-src 'self' 'unsafe-inline' ${cdnDomain}`,
    `img-src 'self' data: blob: ${cdnDomain}`,
    `font-src 'self' ${cdnDomain}`,
    `connect-src 'self' ${cdnDomain}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ];
  
  return csp.join('; ');
}