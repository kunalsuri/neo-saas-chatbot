/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, getResponsiveImageSrcSet, measureAssetLoadTime } from '@/lib/cdn';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
    fit?: 'cover' | 'contain' | 'fill';
    responsive?: boolean;
    lazy?: boolean;
    fallback?: string;
    onLoadTime?: (time: number) => void;
    className?: string;
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    quality = 85,
    format = 'webp',
    fit = 'cover',
    responsive = true,
    lazy = true,
    fallback,
    onLoadTime,
    className,
    ...props
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [loadTime, setLoadTime] = useState<number | null>(null);

    // Get optimized image URL
    const optimizedSrc = getOptimizedImageUrl(src, {
        ...(width && { width }),
        ...(height && { height }),
        quality,
        format,
        fit,
    });

    // Get responsive srcSet if enabled
    const srcSet = responsive ? getResponsiveImageSrcSet(src) : undefined;

    // Measure load time
    useEffect(() => {
        if (onLoadTime) {
            measureAssetLoadTime(src).then((time) => {
                setLoadTime(time);
                onLoadTime(time);
            });
        }
    }, [src, onLoadTime]);

    const handleLoad = () => {
        setIsLoaded(true);
        setHasError(false);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(false);
    };

    // Fallback image or placeholder
    const displaySrc = hasError && fallback ? fallback : optimizedSrc;

    return (
        <div className={cn('relative overflow-hidden', className)}>
            <img
                {...props}
                src={displaySrc}
                srcSet={srcSet}
                alt={alt}
                width={width}
                height={height}
                loading={lazy ? 'lazy' : 'eager'}
                onLoad={handleLoad}
                onError={handleError}
                className={cn(
                    'transition-opacity duration-300',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                    hasError && 'opacity-50'
                )}
            />

            {/* Loading placeholder */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                </div>
            )}

            {/* Error placeholder */}
            {hasError && !fallback && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-400 text-sm">Failed to load image</div>
                </div>
            )}

            {/* Performance indicator (development only) */}
            {import.meta.env.VITE_ENVIRONMENT === 'development' && loadTime !== null && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {loadTime > 0 ? `${Math.round(loadTime)}ms` : 'Error'}
                </div>
            )}
        </div>
    );
}

/**
 * Avatar component with CDN optimization
 */
interface OptimizedAvatarProps {
    src?: string;
    alt: string;
    size?: number;
    fallback?: string;
    className?: string;
}

export function OptimizedAvatar({
    src,
    alt,
    size = 40,
    fallback,
    className,
}: OptimizedAvatarProps) {
    const initials = alt
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    if (!src) {
        return (
            <div
                className={cn(
                    'flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded-full',
                    className
                )}
                style={{ width: size, height: size, fontSize: size * 0.4 }}
            >
                {initials}
            </div>
        );
    }

    return (
        <OptimizedImage
            src={src}
            alt={alt}
            width={size}
            height={size}
            quality={90}
            format="webp"
            fit="cover"
            responsive={false}
            {...(fallback && { fallback })}
            className={cn('rounded-full', className)}
            style={{ width: size, height: size }}
        />
    );
}

/**
 * Background image component with CDN optimization
 */
interface OptimizedBackgroundProps {
    src: string;
    alt?: string;
    children?: React.ReactNode;
    overlay?: boolean;
    overlayOpacity?: number;
    className?: string;
}

export function OptimizedBackground({
    src,
    alt = '',
    children,
    overlay = false,
    overlayOpacity = 0.5,
    className,
}: OptimizedBackgroundProps) {
    const optimizedSrc = getOptimizedImageUrl(src, {
        width: 1920,
        quality: 80,
        format: 'webp',
        fit: 'cover',
    });

    return (
        <div className={cn('relative', className)}>
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${optimizedSrc})` }}
                role="img"
                aria-label={alt}
            />

            {overlay && (
                <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: overlayOpacity }}
                />
            )}

            {children && (
                <div className="relative z-10">
                    {children}
                </div>
            )}
        </div>
    );
}