/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Switch } from '@/shared/components/ui/switch';
import { Separator } from '@/shared/components/ui/separator';
import { Settings2, Sparkles, Zap, ListOrdered, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModesSelectorProps } from '../types';
import { PROMPT_MODES, OUTPUT_FORMATS, MODE_COLORS } from '../lib/constants';

const modeIcons = {
  enhancement: Sparkles,
  optimization: Zap,
  structure: ListOrdered,
  clarity: Target,
};

export function ModesSelector({
  mode,
  outputFormat,
  onModeChange,
  onFormatChange,
  disabled = false,
}: Readonly<ModesSelectorProps>) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          Improvement Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Improvement Mode</h4>
            <Badge variant="secondary" className="text-xs">
              {PROMPT_MODES.find(m => m.value === mode)?.label}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {PROMPT_MODES.map((modeOption) => {
              const Icon = modeIcons[modeOption.value];
              const isSelected = mode === modeOption.value;
              
              return (
                <motion.div
                  key={modeOption.value}
                  whileHover={{ scale: disabled ? 1 : 1.02 }}
                  whileTap={{ scale: disabled ? 1 : 0.98 }}
                >
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-full justify-start gap-2 h-auto p-3 transition-all",
                      isSelected && `bg-gradient-to-r ${MODE_COLORS[modeOption.value]} text-white`,
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !disabled && onModeChange(modeOption.value)}
                    disabled={disabled}
                  >
                    <Icon className="w-4 h-4" />
                    <div className="text-left">
                      <div className="font-medium text-xs">{modeOption.label}</div>
                      <div className="text-xs opacity-80 font-normal">
                        {modeOption.icon}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
          
          <p className="text-xs text-muted-foreground">
            {PROMPT_MODES.find(m => m.value === mode)?.description}
          </p>
        </div>

        <Separator />

        {/* Output Format Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Output Format</h4>
            <Badge variant="outline" className="text-xs">
              {OUTPUT_FORMATS.find(f => f.value === outputFormat)?.label}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {OUTPUT_FORMATS.map((formatOption) => {
              const isSelected = outputFormat === formatOption.value;
              
              return (
                <motion.div
                  key={formatOption.value}
                  whileHover={{ scale: disabled ? 1 : 1.01 }}
                  whileTap={{ scale: disabled ? 1 : 0.99 }}
                >
                  <Button
                    variant={isSelected ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start gap-3 h-auto p-3",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => !disabled && onFormatChange(formatOption.value)}
                    disabled={disabled}
                  >
                    <span className="text-lg">{formatOption.icon}</span>
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{formatOption.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatOption.description}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Compact version for smaller spaces
export function CompactModesSelector({
  mode,
  outputFormat,
  onModeChange,
  onFormatChange,
  disabled = false,
}: Readonly<ModesSelectorProps>) {
  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm font-medium">Mode</div>
          <div className="text-xs text-muted-foreground">
            {PROMPT_MODES.find(m => m.value === mode)?.description}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn(
            "text-sm transition-colors",
            mode === 'enhancement' && "text-foreground font-medium"
          )}>
            ✨
          </span>
          <Switch
            checked={mode !== 'enhancement'}
            onCheckedChange={(checked) => 
              !disabled && onModeChange(checked ? 'optimization' : 'enhancement')
            }
            disabled={disabled}
          />
          <span className={cn(
            "text-sm transition-colors",
            mode === 'optimization' && "text-foreground font-medium"
          )}>
            ⚡
          </span>
        </div>
      </div>

      {/* Format Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm font-medium">Format</div>
          <div className="text-xs text-muted-foreground">
            Choose output format style
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn(
            "text-sm transition-colors",
            outputFormat === 'text' && "text-foreground font-medium"
          )}>
            Text
          </span>
          <Switch
            checked={outputFormat === 'markdown'}
            onCheckedChange={(checked) => 
              !disabled && onFormatChange(checked ? 'markdown' : 'text')
            }
            disabled={disabled}
          />
          <span className={cn(
            "text-sm transition-colors",
            outputFormat === 'markdown' && "text-foreground font-medium"
          )}>
            MD
          </span>
        </div>
      </div>
    </div>
  );
}