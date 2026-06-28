/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { FileText, Files } from 'lucide-react';
import { RemoveFormatting } from './RemoveFormatting';
import { CompareFiles } from './CompareFiles';

/**
 * TextManipulation component
 * Main component that provides text manipulation features
 */
export function TextManipulation() {
  const [activeTab, setActiveTab] = useState('remove-formatting');

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Text Manipulation</h1>
          <p className="text-muted-foreground">
            Powerful tools for cleaning text and comparing files
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="remove-formatting" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Remove Formatting
            </TabsTrigger>
            <TabsTrigger value="compare-files" className="flex items-center gap-2">
              <Files className="h-4 w-4" />
              Compare Files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="remove-formatting" className="space-y-6">
            <RemoveFormatting />
          </TabsContent>

          <TabsContent value="compare-files" className="space-y-6">
            <CompareFiles />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
