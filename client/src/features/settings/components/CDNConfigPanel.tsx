/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { Badge } from '@/shared/components/ui/badge';
import { useToast } from '@/shared/hooks/use-toast';
import { checkCDNHealth, measureAssetLoadTime, cdnConfig } from '@/lib/cdn';
import { OptimizedImage } from '@/shared/components/ui/optimized-image';
import { Globe, Zap, Shield, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';

export function CDNConfigPanel() {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [loadTimes, setLoadTimes] = useState<Record<string, number>>({});
  const [isTestingPerformance, setIsTestingPerformance] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const healthy = await checkCDNHealth();
      setIsHealthy(healthy);
    } catch {
      setIsHealthy(false);
    }
  };

  const testPerformance = async () => {
    setIsTestingPerformance(true);
    
    const testAssets = [
      '/assets/test-image-small.jpg',
      '/assets/test-image-medium.jpg',
      '/assets/test-image-large.jpg',
      '/assets/vendor.js',
      '/assets/index.css'
    ];

    const results: Record<string, number> = {};
    
    for (const asset of testAssets) {
      try {
        const time = await measureAssetLoadTime(asset);
        results[asset] = time;
      } catch {
        results[asset] = -1;
      }
    }
    
    setLoadTimes(results);
    setIsTestingPerformance(false);
    
    toast({
      title: 'Performance Test Complete',
      description: 'CDN performance metrics have been updated.',
    });
  };

  const getStatusColor = (time: number) => {
    if (time < 0) return 'destructive';
    if (time < 200) return 'default';
    if (time < 500) return 'secondary';
    return 'destructive';
  };

  const getStatusText = (time: number) => {
    if (time < 0) return 'Failed';
    if (time < 200) return 'Excellent';
    if (time < 500) return 'Good';
    return 'Slow';
  };

  return (
    <div className="space-y-6">
      {/* CDN Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            CDN Status & Configuration
          </CardTitle>
          <CardDescription>
            Content Delivery Network status and performance monitoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="font-medium">CDN Status</span>
              </div>
              <Badge variant={cdnConfig.enabled ? 'default' : 'secondary'}>
                {cdnConfig.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Health Check</span>
              </div>
              <div className="flex items-center gap-2">
                {isHealthy === null ? (
                  <Clock className="w-4 h-4 text-gray-400" />
                ) : isHealthy ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <Badge variant={isHealthy ? 'default' : 'destructive'}>
                  {isHealthy === null ? 'Checking...' : isHealthy ? 'Healthy' : 'Unhealthy'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="font-medium">Base URL</span>
              </div>
              <Badge variant="outline">
                {cdnConfig.baseUrl || 'Not configured'}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={checkHealth} variant="outline" size="sm">
              Check Health
            </Button>
            <Button 
              onClick={testPerformance} 
              variant="outline" 
              size="sm"
              disabled={isTestingPerformance}
            >
              {isTestingPerformance ? 'Testing...' : 'Test Performance'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      {Object.keys(loadTimes).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Asset loading times and performance analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(loadTimes).map(([asset, time]) => (
                <div key={asset} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-mono text-muted-foreground">
                      {asset.split('/').pop()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(time)}>
                      {getStatusText(time)}
                    </Badge>
                    <span className="text-sm font-mono">
                      {time > 0 ? `${Math.round(time)}ms` : 'Failed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CDN Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>CDN Configuration</CardTitle>
          <CardDescription>
            Configure CDN settings for optimal performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cdn-base-url">CDN Base URL</Label>
              <Input
                id="cdn-base-url"
                value={cdnConfig.baseUrl}
                placeholder="https://cdn.example.com"
                readOnly
              />
              <p className="text-xs text-muted-foreground">
                Configure via VITE_CDN_BASE_URL environment variable
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cdn-enabled">CDN Enabled</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="cdn-enabled"
                  checked={cdnConfig.enabled}
                  disabled
                />
                <span className="text-sm text-muted-foreground">
                  Configure via VITE_CDN_ENABLED environment variable
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              CDN Configuration Guide
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Set VITE_CDN_ENABLED=true to enable CDN</li>
              <li>• Set VITE_CDN_BASE_URL to your CDN domain</li>
              <li>• Configure CDN_ENABLED and CDN_BASE_URL for server-side</li>
              <li>• Restart the application after configuration changes</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Image Optimization Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Image Optimization Demo</CardTitle>
          <CardDescription>
            See how CDN optimization improves image loading
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Original (No optimization)</Label>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Demo Image</span>
              </div>
              <p className="text-xs text-muted-foreground">Full size, no compression</p>
            </div>
            
            <div className="space-y-2">
              <Label>WebP Optimized</Label>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-sm text-muted-foreground">WebP Demo</span>
              </div>
              <p className="text-xs text-muted-foreground">WebP format, 85% quality</p>
            </div>
            
            <div className="space-y-2">
              <Label>Responsive + CDN</Label>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Responsive Demo</span>
              </div>
              <p className="text-xs text-muted-foreground">Multiple sizes, CDN cached</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Overview */}
      <Card>
        <CardHeader>
          <CardTitle>CDN Benefits</CardTitle>
          <CardDescription>
            How CDN integration improves your application performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Performance Improvements</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  Faster asset loading from global edge locations
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  Automatic image optimization and compression
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  Browser caching with optimal cache headers
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  Reduced server load and bandwidth usage
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">User Experience</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Improved page load times globally
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Better mobile performance on slow networks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Responsive images for different screen sizes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Reduced bounce rates and improved SEO
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}