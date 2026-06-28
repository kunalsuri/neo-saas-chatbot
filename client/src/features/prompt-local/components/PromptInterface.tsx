/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { Progress } from '@/shared/components/ui/progress';
import { 
  Copy, 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck, 
  Loader2,
  FileText,
  Zap,
  TrendingUp,
  Download,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/shared/hooks/use-toast';
import { PromptInterfaceProps } from '../types';
import { copyToClipboard, formatTokenCount, getConfidenceColor, getConfidenceLevel } from '../lib/utils';
import { KEYBOARD_SHORTCUTS } from '../lib/constants';

export function PromptInterface({
  originalPrompt,
  improvedPrompt,
  onOriginalChange,
  onImprove,
  onClear,
  isImproving,
  disabled = false,
  tokens,
  confidence,
  isBookmarked,
  onToggleBookmark,
}: Readonly<PromptInterfaceProps>) {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<'original' | 'improved' | null>(null);

  const handleCopy = useCallback(async (text: string, field: 'original' | 'improved') => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      toast({
        title: 'Copied!',
        description: 'Text copied to clipboard',
        duration: 2000,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } else {
      toast({
        title: 'Copy Failed',
        description: 'Unable to copy text to clipboard',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!disabled && originalPrompt.trim()) {
          onImprove();
        }
      } else if (e.key === 'k' && e.shiftKey) {
        e.preventDefault();
        onClear();
      }
    }
  }, [disabled, originalPrompt, onImprove, onClear]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Prompt Improvement
          </div>
          {(tokens !== undefined || confidence !== undefined) && (
            <div className="flex items-center gap-2">
              {tokens !== undefined && (
                <Badge variant="secondary" className="gap-1">
                  <Zap className="w-3 h-3" />
                  {formatTokenCount(tokens)}
                </Badge>
              )}
              {confidence !== undefined && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "gap-1",
                    getConfidenceColor(confidence)
                  )}
                >
                  <TrendingUp className="w-3 h-3" />
                  {Math.round(confidence * 100)}% confidence
                </Badge>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Original Prompt */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="original-prompt" className="text-sm font-medium">Original Prompt</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {originalPrompt.length} characters
              </span>
              {originalPrompt && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(originalPrompt, 'original')}
                >
                  {copiedField === 'original' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600"
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>
          </div>
          
          <Textarea
            id="original-prompt"
            value={originalPrompt}
            onChange={(e) => onOriginalChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here for improvement..."
            className="min-h-[120px] resize-y"
            disabled={disabled}
          />
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Press {KEYBOARD_SHORTCUTS.improve} to improve</span>
            <span>
              {originalPrompt.length > 0 && `${Math.ceil(originalPrompt.length / 4)} estimated tokens`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onImprove}
            disabled={!originalPrompt.trim() || disabled || isImproving}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            size="lg"
          >
            {isImproving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Improving...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Improve Prompt
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onClear}
            disabled={(!originalPrompt && !improvedPrompt) || isImproving}
            size="lg"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear
          </Button>
          
          {onToggleBookmark && (
            <Button
              variant="ghost"
              onClick={onToggleBookmark}
              disabled={!improvedPrompt || isImproving}
              size="lg"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-blue-600" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        {isImproving && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <Progress value={75} className="w-full" />
            <p className="text-xs text-center text-muted-foreground">
              Analyzing and improving your prompt...
            </p>
          </motion.div>
        )}

        <Separator />

        {/* Improved Prompt */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="improved-prompt" className="text-sm font-medium">Improved Prompt</label>
            <div className="flex items-center gap-2">
              {improvedPrompt && (
                <>
                  <span className="text-xs text-muted-foreground">
                    {improvedPrompt.length} characters
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleCopy(improvedPrompt, 'improved')}
                    >
                      {copiedField === 'improved' ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-600"
                        >
                          ✓
                        </motion.div>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="relative">
            <Textarea
              id="improved-prompt"
              value={improvedPrompt}
              readOnly
              className={cn(
                "min-h-[120px] resize-y border-dashed",
                !improvedPrompt && "border-muted-foreground/20"
              )}
              placeholder={
                isImproving 
                  ? "Improving your prompt..." 
                  : "Your improved prompt will appear here..."
              }
            />
            
            {!improvedPrompt && !isImproving && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center space-y-2">
                  <FileText className="w-8 h-8 text-muted-foreground/50 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Enter a prompt above and click improve to get started
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {improvedPrompt && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>
                  {Math.ceil(improvedPrompt.length / 4)} estimated tokens
                </span>
                {confidence !== undefined && (
                  <span className={getConfidenceColor(confidence)}>
                    {getConfidenceLevel(confidence).toUpperCase()} quality
                  </span>
                )}
              </div>
              <span>
                {originalPrompt && improvedPrompt && (
                  `${Math.round((improvedPrompt.length / originalPrompt.length) * 100)}% of original length`
                )}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}