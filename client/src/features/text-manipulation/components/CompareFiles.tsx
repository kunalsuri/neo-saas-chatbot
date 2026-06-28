/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState } from 'react';
import { Files, Download, Trash2, GitCompare } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { useToast } from '@/shared/hooks/use-toast';
import { securePost } from '@/features/auth/utils/secureApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';

interface FileData {
  name: string;
  content: string;
}

interface ComparisonResult {
  diff: string;
  format: string;
  stats: {
    additions: number;
    deletions: number;
    modifications: number;
  };
}

/**
 * CompareFiles component
 * Allows users to compare two files and view differences
 */
export function CompareFiles() {
  const { toast } = useToast();
  const [fileA, setFileA] = useState<FileData | null>(null);
  const [fileB, setFileB] = useState<FileData | null>(null);
  const [outputFormat, setOutputFormat] = useState<'html' | 'text'>('html');
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  /**
   * Handle file upload for File A
   */
  const handleFileAUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileA({ name: file.name, content });
    };
    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to read File A',
        variant: 'destructive',
      });
    };
    reader.readAsText(file);
  };

  /**
   * Handle file upload for File B
   */
  const handleFileBUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileB({ name: file.name, content });
    };
    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to read File B',
        variant: 'destructive',
      });
    };
    reader.readAsText(file);
  };

  /**
   * Compare the two files
   */
  const handleCompareFiles = async () => {
    if (!fileA || !fileB) {
      toast({
        title: 'Error',
        description: 'Please select both files to compare',
        variant: 'destructive',
      });
      return;
    }

    setIsComparing(true);
    try {
      const response = await securePost('/api/text/compare-files', {
        fileA: fileA.content,
        fileB: fileB.content,
        fileAName: fileA.name,
        fileBName: fileB.name,
        outputFormat,
      });

      if (response.success && response.data) {
        setComparisonResult(response.data);
        toast({
          title: 'Comparison Complete',
          description: `Found ${response.data.stats.additions} additions, ${response.data.stats.deletions} deletions, and ${response.data.stats.modifications} modifications.`,
        });
      }
    } catch (error) {
      console.error('Error comparing files:', error);
      toast({
        title: 'Error',
        description: 'Failed to compare files. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsComparing(false);
    }
  };

  /**
   * Download the diff result
   */
  const handleDownloadDiff = () => {
    if (!comparisonResult) {
      return;
    }

    const blob = new Blob([comparisonResult.diff], {
      type: comparisonResult.format === 'html' ? 'text/html' : 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diff-${Date.now()}.${comparisonResult.format === 'html' ? 'html' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Downloaded',
      description: 'Diff file downloaded successfully',
    });
  };

  /**
   * Clear all files and results
   */
  const handleClear = () => {
    setFileA(null);
    setFileB(null);
    setComparisonResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Files className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Compare Files</h2>
            <p className="text-sm text-muted-foreground">
              Compare two text files and view differences side-by-side
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!fileA && !fileB && !comparisonResult}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      {/* File Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File A */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">File A</h3>
          <div className="space-y-4">
            <label htmlFor="file-a-upload">
              <Button variant="outline" className="w-full" asChild>
                <span className="cursor-pointer">
                  <Files className="h-4 w-4 mr-2" />
                  {fileA ? 'Change File A' : 'Select File A'}
                </span>
              </Button>
            </label>
            <input
              id="file-a-upload"
              type="file"
              accept=".txt,.md,.json,.js,.ts,.tsx,.jsx,.html,.css,.py,.java,.cpp,.c,.h"
              onChange={handleFileAUpload}
              className="hidden"
            />
            {fileA && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground">{fileA.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {fileA.content.length} characters, {fileA.content.split('\n').length} lines
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* File B */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">File B</h3>
          <div className="space-y-4">
            <label htmlFor="file-b-upload">
              <Button variant="outline" className="w-full" asChild>
                <span className="cursor-pointer">
                  <Files className="h-4 w-4 mr-2" />
                  {fileB ? 'Change File B' : 'Select File B'}
                </span>
              </Button>
            </label>
            <input
              id="file-b-upload"
              type="file"
              accept=".txt,.md,.json,.js,.ts,.tsx,.jsx,.html,.css,.py,.java,.cpp,.c,.h"
              onChange={handleFileBUpload}
              className="hidden"
            />
            {fileB && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground">{fileB.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {fileB.content.length} characters, {fileB.content.split('\n').length} lines
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Comparison Options */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Comparison Options</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Output Format
            </label>
            <Select value={outputFormat} onValueChange={(value: 'html' | 'text') => setOutputFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="html">HTML (Visual)</SelectItem>
                <SelectItem value="text">Plain Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleCompareFiles}
              disabled={!fileA || !fileB || isComparing}
              size="lg"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              {isComparing ? 'Comparing...' : 'Compare Files'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Comparison Result */}
      {comparisonResult && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Comparison Result</h3>
            <Button variant="outline" size="sm" onClick={handleDownloadDiff}>
              <Download className="h-4 w-4 mr-2" />
              Download Diff
            </Button>
          </div>

          {/* Statistics */}
          <div className="flex gap-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Additions:</span>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                +{comparisonResult.stats.additions}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Deletions:</span>
              <span className="text-sm font-bold text-red-600 dark:text-red-400">
                -{comparisonResult.stats.deletions}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Modifications:</span>
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                ~{comparisonResult.stats.modifications}
              </span>
            </div>
          </div>

          {/* Diff View */}
          <div className="border rounded-lg overflow-hidden">
            {comparisonResult.format === 'html' ? (
              <iframe
                srcDoc={comparisonResult.diff}
                className="w-full h-[600px] border-0"
                title="Diff View"
              />
            ) : (
              <pre className="p-4 text-sm font-mono overflow-auto max-h-[600px] bg-muted">
                {comparisonResult.diff}
              </pre>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
