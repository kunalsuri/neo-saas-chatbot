/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useRef, useEffect } from 'react';
import { Copy, RotateCcw, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useToast } from '@/shared/hooks/use-toast';
import { TemplateSelector } from '@/shared/components/ui/TemplateSelector';
import { copyToClipboard, truncateText, formatTokenCount, estimateReadingTime } from '../lib/utils';
import { UI_CONSTANTS, KEYBOARD_SHORTCUTS } from '../lib/constants';

interface TranslationInterfaceProps {
  readonly sourceText: string;
  readonly translatedText: string;
  readonly onSourceTextChange: (text: string) => void;
  readonly onTranslate: () => void;
  readonly onClear: () => void;
  readonly isTranslating: boolean;
  readonly disabled: boolean;
  readonly tokens?: number;
  readonly confidence?: number;
  readonly isBookmarked?: boolean;
  readonly onToggleBookmark?: () => void;
  readonly className?: string;
}

export function TranslationInterface({
  sourceText,
  translatedText,
  onSourceTextChange,
  onTranslate,
  onClear,
  isTranslating,
  disabled,
  tokens,
  confidence,
  isBookmarked,
  onToggleBookmark,
  className,
}: TranslationInterfaceProps) {
  const { toast } = useToast();
  const sourceTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isCopying, setIsCopying] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = sourceTextareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = Math.min(
        Math.max(UI_CONSTANTS.minTextareaHeight, textarea.scrollHeight),
        UI_CONSTANTS.maxTextareaHeight
      );
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [sourceText]);

  // Keyboard shortcuts
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (!disabled && !isTranslating && sourceText.trim()) {
            onTranslate();
          }
          break;
        case '/':
          event.preventDefault();
          sourceTextareaRef.current?.focus();
          break;
      }
    }
  };

  // Copy to clipboard with animation
  const handleCopy = async (text: string) => {
    if (!text.trim()) return;
    
    setIsCopying(true);
    const success = await copyToClipboard(text);
    
    setTimeout(() => setIsCopying(false), 1000);
    
    if (success) {
      toast({
        title: "Copied to clipboard",
        description: `${truncateText(text, 50)} copied successfully`,
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Unable to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleSelectTemplate = (template: string) => {
    onSourceTextChange(template);
    sourceTextareaRef.current?.focus();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Source Text Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="source-text" className="text-sm font-medium">
            Text to Translate
          </label>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{sourceText.length} characters</span>
            {sourceText.trim() && (
              <span>• {estimateReadingTime(sourceText)}</span>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Textarea
            id="source-text"
            ref={sourceTextareaRef}
            value={sourceText}
            onChange={(e) => onSourceTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text to translate..."
            disabled={disabled}
            className={cn(
              "resize-none transition-all duration-200",
              "focus:ring-2 focus:ring-primary/20",
              disabled && "opacity-50"
            )}
            style={{ minHeight: UI_CONSTANTS.minTextareaHeight }}
          />
          
          {sourceText && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClear}
              disabled={disabled}
              className="absolute top-2 right-2 h-6 w-6 opacity-70 hover:opacity-100"
              title="Clear text"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <TemplateSelector
            category="translate"
            onSelectTemplate={handleSelectTemplate}
            className="flex-1"
          />
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-4">
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">
              {KEYBOARD_SHORTCUTS.translate}
            </kbd>
            <span>to translate</span>
          </div>
        </div>
      </div>

      {/* Translation Button */}
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onTranslate}
            disabled={!sourceText.trim() || disabled || isTranslating}
            size="lg"
            className="px-8 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isTranslating ? (
                <motion.div
                  key="translating"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Translating...
                </motion.div>
              ) : (
                <motion.span
                  key="translate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Translate
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      {/* Translated Text Output */}
      <AnimatePresence>
        {(translatedText || isTranslating) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                Translation
              </div>
              <div className="flex items-center gap-2">
                {confidence && (
                  <Badge variant="outline" className="text-xs">
                    {Math.round(confidence * 100)}% confidence
                  </Badge>
                )}
                {tokens && (
                  <Badge variant="secondary" className="text-xs">
                    {formatTokenCount(tokens)}
                  </Badge>
                )}
              </div>
            </div>
            
            <Card className="relative">
              <CardContent className="p-4">
                <div className="relative">
                  <Textarea
                    value={translatedText}
                    readOnly
                    className="resize-none border-0 bg-transparent p-0 focus-visible:ring-0"
                    style={{ minHeight: UI_CONSTANTS.minTextareaHeight }}
                    placeholder={isTranslating ? "Translating..." : "Translation will appear here..."}
                  />
                  
                  {translatedText && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      {onToggleBookmark && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={onToggleBookmark}
                          className="h-6 w-6 opacity-70 hover:opacity-100"
                          title={isBookmarked ? "Remove bookmark" : "Bookmark translation"}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="h-3 w-3 text-yellow-500" />
                          ) : (
                            <Bookmark className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(translatedText)}
                        className="h-6 w-6 opacity-70 hover:opacity-100"
                        title="Copy translation"
                      >
                        <Copy className={cn(
                          "h-3 w-3 transition-colors",
                          isCopying && "text-green-500"
                        )} />
                      </Button>
                    </div>
                  )}
                </div>
                
                {translatedText && (
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="text-xs text-muted-foreground">
                      {translatedText.length} characters • {estimateReadingTime(translatedText)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(translatedText)}
                        className="h-7 px-2 text-xs"
                      >
                        <Copy className="mr-1 h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}