/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState } from 'react';
import { FileText, Copy, Trash2, Sparkles } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/hooks/use-toast';
import { securePost } from '@/features/auth/utils/secureApi';

/**
 * RemoveFormatting component
 * Allows users to paste or upload text and remove all formatting
 */
export function RemoveFormatting() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [cleanedText, setCleanedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handle file upload
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputText(content);
    };
    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to read file',
        variant: 'destructive',
      });
    };
    reader.readAsText(file);
  };

  /**
   * Remove formatting from text
   */
  const handleRemoveFormatting = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some text first',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await securePost('/api/text/strip-formatting', {
        text: inputText,
      });

      if (response.success && response.data) {
        setCleanedText(response.data.cleanedText);
        toast({
          title: 'Success',
          description: `Formatting removed. Reduced from ${response.data.originalLength} to ${response.data.cleanedLength} characters.`,
        });
      }
    } catch (error) {
      console.error('Error removing formatting:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove formatting. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Copy cleaned text to clipboard
   */
  const handleCopyCleanText = async () => {
    if (!cleanedText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(cleanedText);
      toast({
        title: 'Copied',
        description: 'Clean text copied to clipboard',
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  /**
   * Clear all text
   */
  const handleClear = () => {
    setInputText('');
    setCleanedText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Remove Formatting</h2>
            <p className="text-sm text-muted-foreground">
              Clean text by removing HTML, markdown, and other formatting
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!inputText && !cleanedText}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      {/* Input Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Input Text</h3>
          <div className="flex gap-2">
            <label htmlFor="file-upload">
              <Button variant="outline" size="sm" asChild>
                <span className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload File
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".txt,.html,.md,.rtf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your text here or upload a file..."
          className="min-h-[300px] font-mono text-sm"
        />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {inputText.length} characters
          </p>
          <Button
            onClick={handleRemoveFormatting}
            disabled={!inputText.trim() || isProcessing}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Remove Formatting'}
          </Button>
        </div>
      </Card>

      {/* Output Section */}
      {cleanedText && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Clean Text</h3>
            <Button variant="outline" size="sm" onClick={handleCopyCleanText}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Clean Text
            </Button>
          </div>

          <Textarea
            value={cleanedText}
            onChange={(e) => setCleanedText(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />

          <p className="text-sm text-muted-foreground">
            {cleanedText.length} characters
          </p>
        </Card>
      )}
    </div>
  );
}
