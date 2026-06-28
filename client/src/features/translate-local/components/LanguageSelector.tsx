/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

import React from 'react';
import { Check, ChevronDown, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { SUPPORTED_LANGUAGES } from '../lib/constants';

interface LanguageSelectorProps {
  readonly value: string;
  readonly onValueChange: (value: string) => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function LanguageSelector({
  value,
  onValueChange,
  placeholder = "Select language...",
  disabled = false,
  className,
}: LanguageSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            !selectedLanguage && "text-muted-foreground",
            className
          )}
        >
          {selectedLanguage ? (
            <span className="flex items-center gap-2">
              <span className="text-lg">{selectedLanguage.flag}</span>
              {selectedLanguage.name}
            </span>
          ) : (
            placeholder
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {SUPPORTED_LANGUAGES.map((language) => (
                <CommandItem
                  key={language.code}
                  value={`${language.name} ${language.code}`}
                  onSelect={() => {
                    onValueChange(language.code);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="flex-1">{language.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === language.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface LanguagePairSelectorProps {
  readonly sourceLang: string;
  readonly targetLang: string;
  readonly onSourceChange: (value: string) => void;
  readonly onTargetChange: (value: string) => void;
  readonly onSwap: () => void;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function LanguagePairSelector({
  sourceLang,
  targetLang,
  onSourceChange,
  onTargetChange,
  onSwap,
  disabled = false,
  className,
}: LanguagePairSelectorProps) {
  const sourceId = 'source-language-selector';
  const targetId = 'target-language-selector';

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1">
        <label htmlFor={sourceId} className="text-sm font-medium mb-2 block">From</label>
        <div id={sourceId}>
          <LanguageSelector
            value={sourceLang}
            onValueChange={onSourceChange}
            placeholder="Source language"
            disabled={disabled}
          />
        </div>
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onSwap}
        disabled={disabled}
        className="mt-6 shrink-0"
        title="Swap languages"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </Button>
      
      <div className="flex-1">
        <label htmlFor={targetId} className="text-sm font-medium mb-2 block">To</label>
        <div id={targetId}>
          <LanguageSelector
            value={targetLang}
            onValueChange={onTargetChange}
            placeholder="Target language"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}