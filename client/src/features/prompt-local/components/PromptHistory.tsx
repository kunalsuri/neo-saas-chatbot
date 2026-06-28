/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { Skeleton } from '@/shared/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { 
  Search, 
  Trash2, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  MoreVertical,
  Copy,
  Share2,
  TrendingUp,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/shared/hooks/use-toast';
import { PromptHistoryProps, PromptHistoryItem } from '../types';
import { 
  truncateText, 
  formatRelativeTime, 
  getConfidenceColor,
  copyToClipboard,
  formatTokenCount
} from '../lib/utils';
import { PROMPT_MODES, OUTPUT_FORMATS, EMPTY_STATES } from '../lib/constants';

export function PromptHistory({
  history,
  isLoading,
  searchQuery,
  onSearchChange,
  onSelect,
  onDelete,
  onToggleBookmark,
  selectedItem,
  filter = 'all',
  onFilterChange,
}: Readonly<PromptHistoryProps>) {
  const { toast } = useToast();
  const [deleteItem, setDeleteItem] = useState<PromptHistoryItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Filter and sort history
  const filteredHistory = useMemo(() => {
    let filtered = history;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.original.toLowerCase().includes(query) ||
        item.improved.toLowerCase().includes(query) ||
        item.model.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    switch (filter) {
      case 'bookmarked':
        filtered = filtered.filter(item => item.isBookmarked);
        break;
      case 'recent': {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(item => new Date(item.timestamp) > weekAgo);
        break;
      }
      case 'high-confidence':
        filtered = filtered.filter(item => (item.confidence || 0) >= 0.8);
        break;
    }

    return filtered;
  }, [history, searchQuery, filter]);

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    toast({
      title: success ? 'Copied!' : 'Copy Failed',
      description: success ? `${type} copied to clipboard` : 'Unable to copy to clipboard',
      variant: success ? 'default' : 'destructive',
      duration: 2000,
    });
  };

  const handleDelete = async (item: PromptHistoryItem) => {
    try {
      await onDelete(item.id);
      setDeleteItem(null);
    } catch {
      // Error handling is done in the parent hook
      setDeleteItem(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => `skeleton-${Date.now()}-${i}`).map((key) => (
          <Card key={key} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {onFilterChange && (
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'All', icon: null },
              { value: 'bookmarked', label: 'Bookmarked', icon: Bookmark },
              { value: 'recent', label: 'Recent', icon: Clock },
              { value: 'high-confidence', label: 'High Quality', icon: TrendingUp },
            ].map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                variant={filter === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange(value as typeof filter)}
                className="h-8 gap-2"
              >
                {Icon && <Icon className="w-3 h-3" />}
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* History List */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-3">
          <AnimatePresence>
            {filteredHistory.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-4xl mb-4">
                  {searchQuery ? EMPTY_STATES.noResults.icon : EMPTY_STATES.noHistory.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">
                  {searchQuery ? EMPTY_STATES.noResults.title : EMPTY_STATES.noHistory.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {searchQuery ? EMPTY_STATES.noResults.description : EMPTY_STATES.noHistory.description}
                </p>
              </motion.div>
            ) : (
              filteredHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedItem?.id === item.id && "ring-2 ring-primary bg-primary/5",
                      hoveredItem === item.id && "scale-[1.02]"
                    )}
                    onClick={() => onSelect(item)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              {PROMPT_MODES.find(m => m.value === item.mode)?.icon && (
                                <span className="text-sm">
                                  {PROMPT_MODES.find(m => m.value === item.mode)?.icon}
                                </span>
                              )}
                              <Badge variant="secondary" className="text-xs">
                                {PROMPT_MODES.find(m => m.value === item.mode)?.label || item.mode}
                              </Badge>
                            </div>
                            
                            {item.isBookmarked && (
                              <BookmarkCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(item.timestamp)}
                            </span>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(item.original, 'Original prompt');
                                }}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Original
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(item.improved, 'Improved prompt');
                                }}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Improved
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleBookmark(item.id);
                                }}>
                                  {item.isBookmarked ? (
                                    <Bookmark className="mr-2 h-4 w-4" />
                                  ) : (
                                    <BookmarkCheck className="mr-2 h-4 w-4" />
                                  )}
                                  {item.isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteItem(item);
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Content Preview */}
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-muted-foreground">Original: </span>
                            <span className="text-foreground">
                              {truncateText(item.original, 100)}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-muted-foreground">Improved: </span>
                            <span className="text-foreground">
                              {truncateText(item.improved, 100)}
                            </span>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {item.model}
                            </Badge>
                            <Badge variant="outline" className="text-xs gap-1">
                              <Zap className="w-3 h-3" />
                              {formatTokenCount(item.tokens)}
                            </Badge>
                            {item.confidence && (
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs gap-1", getConfidenceColor(item.confidence))}
                              >
                                <TrendingUp className="w-3 h-3" />
                                {Math.round(item.confidence * 100)}%
                              </Badge>
                            )}
                            {OUTPUT_FORMATS.find(f => f.value === item.outputFormat) && (
                              <Badge variant="secondary" className="text-xs">
                                {OUTPUT_FORMATS.find(f => f.value === item.outputFormat)?.icon}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prompt Improvement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this prompt improvement? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteItem && handleDelete(deleteItem)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}