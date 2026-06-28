/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState } from 'react';
import { Search, Trash2, Bookmark, BookmarkCheck, Clock, Languages } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
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
import { TranslationHistoryItem } from '../types';
import { truncateText, getLanguageDisplay, formatTokenCount } from '../lib/utils';

interface TranslationHistoryProps {
  readonly history: readonly TranslationHistoryItem[];
  readonly isLoading: boolean;
  readonly searchQuery: string;
  readonly onSearchChange: (query: string) => void;
  readonly onSelect: (item: TranslationHistoryItem) => void;
  readonly onDelete?: (id: string) => void;
  readonly onToggleBookmark?: (id: string) => void;
  readonly selectedItem?: TranslationHistoryItem | null;
  readonly className?: string;
}

export function TranslationHistory({
  history,
  isLoading,
  searchQuery,
  onSearchChange,
  onSelect,
  onDelete,
  onToggleBookmark,
  selectedItem,
  className,
}: TranslationHistoryProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    item: TranslationHistoryItem | null;
  }>({ isOpen: false, item: null });

  const handleDeleteClick = (item: TranslationHistoryItem, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteConfirmation({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.item && onDelete) {
      onDelete(deleteConfirmation.item.id);
    }
    setDeleteConfirmation({ isOpen: false, item: null });
  };

  const handleBookmarkClick = (item: TranslationHistoryItem, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onToggleBookmark) {
      onToggleBookmark(item.id);
    }
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Skeleton className="h-9 flex-1" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={`loading-skeleton-${i + 1}`} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search translations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* History List */}
      <ScrollArea className="h-[600px]">
        <AnimatePresence>
          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Languages className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No translations found' : 'No translations yet'}
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                {searchQuery ? 'Try different search terms' : 'Start translating to build your history'}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      "hover:border-primary/20",
                      selectedItem?.id === item.id && "ring-2 ring-primary/20 border-primary/40"
                    )}
                    onClick={() => onSelect(item)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Badge variant="outline" className="text-xs shrink-0">
                              {getLanguageDisplay(item.sourceLang)} → {getLanguageDisplay(item.targetLang)}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(item.timestamp), {
                                addSuffix: true,
                              })}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 shrink-0">
                            {item.isBookmarked && (
                              <BookmarkCheck className="h-3 w-3 text-yellow-500" />
                            )}
                            
                            {onToggleBookmark && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => handleBookmarkClick(item, e)}
                                className="h-6 w-6 opacity-0 group-hover:opacity-70 hover:opacity-100"
                                title={item.isBookmarked ? "Remove bookmark" : "Bookmark"}
                              >
                                {item.isBookmarked ? (
                                  <BookmarkCheck className="h-3 w-3 text-yellow-500" />
                                ) : (
                                  <Bookmark className="h-3 w-3" />
                                )}
                              </Button>
                            )}
                            
                            {onDelete && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => handleDeleteClick(item, e)}
                                className="h-6 w-6 opacity-0 group-hover:opacity-70 hover:opacity-100 hover:text-destructive"
                                title="Delete translation"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Content Preview */}
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Original: </span>
                            <span className="text-foreground">
                              {truncateText(item.original, 80)}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Translation: </span>
                            <span className="text-foreground font-medium">
                              {truncateText(item.translated, 80)}
                            </span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.model}</span>
                          {item.tokens > 0 && (
                            <span>{formatTokenCount(item.tokens)}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteConfirmation({ isOpen: false, item: null });
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Translation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this translation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
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