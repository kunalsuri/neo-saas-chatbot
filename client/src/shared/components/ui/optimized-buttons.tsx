/**
 * Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)
 */

// Optimized Button Components - Common patterns used throughout the app
import React from 'react';
import { Button, ButtonProps } from './button';
import { 
  Check, 
  X, 
  Trash2, 
  Edit, 
  Save, 
  Loader2, 
  RefreshCw,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

// Primary Action Button - most common button type
export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "default", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      {children}
    </Button>
  )
);
PrimaryButton.displayName = "PrimaryButton";

// Secondary Action Button
export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "outline", ...props }, ref) => (
    <Button ref={ref} variant={variant} {...props}>
      {children}
    </Button>
  )
);
SecondaryButton.displayName = "SecondaryButton";

// Confirm Button - Green with checkmark
export const ConfirmButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Confirm", ...props }, ref) => (
    <Button ref={ref} variant="default" {...props}>
      <Check className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
ConfirmButton.displayName = "ConfirmButton";

// Cancel Button - Outline with X
export const CancelButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Cancel", ...props }, ref) => (
    <Button ref={ref} variant="outline" {...props}>
      <X className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
CancelButton.displayName = "CancelButton";

// Delete Button - Destructive with trash icon
export const DeleteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Delete", ...props }, ref) => (
    <Button ref={ref} variant="destructive" {...props}>
      <Trash2 className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
DeleteButton.displayName = "DeleteButton";

// Edit Button - Outline with edit icon
export const EditButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Edit", ...props }, ref) => (
    <Button ref={ref} variant="outline" {...props}>
      <Edit className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
EditButton.displayName = "EditButton";

// Save Button - Primary with save icon
export const SaveButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Save", ...props }, ref) => (
    <Button ref={ref} variant="default" {...props}>
      <Save className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
SaveButton.displayName = "SaveButton";

// Loading Button - Shows spinner when loading
export const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps & { loading?: boolean }>(
  ({ children, loading = false, disabled, ...props }, ref) => (
    <Button ref={ref} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </Button>
  )
);
LoadingButton.displayName = "LoadingButton";

// Refresh Button - Outline with refresh icon
export const RefreshButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Refresh", ...props }, ref) => (
    <Button ref={ref} variant="outline" {...props}>
      <RefreshCw className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
RefreshButton.displayName = "RefreshButton";

// Add Button - Primary with plus icon
export const AddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Add", ...props }, ref) => (
    <Button ref={ref} variant="default" {...props}>
      <Plus className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
AddButton.displayName = "AddButton";

// Close Button - Ghost icon button with X
export const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => (
    <Button ref={ref} variant="ghost" size="icon" {...props}>
      <X className="w-4 h-4" />
    </Button>
  )
);
CloseButton.displayName = "CloseButton";

// Icon Button - Ghost variant for icons
export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "ghost", size = "icon", ...props }, ref) => (
    <Button ref={ref} variant={variant} size={size} {...props} />
  )
);
IconButton.displayName = "IconButton";

// Navigation Buttons
export const BackButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Back", ...props }, ref) => (
    <Button ref={ref} variant="outline" {...props}>
      <ChevronLeft className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
BackButton.displayName = "BackButton";

export const NextButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Next", ...props }, ref) => (
    <Button ref={ref} variant="default" {...props}>
      {children}
      <ChevronRight className="w-4 h-4 ml-2" />
    </Button>
  )
);
NextButton.displayName = "NextButton";

// Search Button
export const SearchButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Search", ...props }, ref) => (
    <Button ref={ref} variant="outline" {...props}>
      <Search className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
SearchButton.displayName = "SearchButton";

// Download Button
export const DownloadButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Download", ...props }, ref) => (
    <Button ref={ref} variant="outline" {...props}>
      <Download className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
DownloadButton.displayName = "DownloadButton";

// Upload Button
export const UploadButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Upload", ...props }, ref) => (
    <Button ref={ref} variant="default" {...props}>
      <Upload className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
UploadButton.displayName = "UploadButton";

// Settings Button
export const SettingsButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children = "Settings", ...props }, ref) => (
    <Button ref={ref} variant="ghost" {...props}>
      <Settings className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
);
SettingsButton.displayName = "SettingsButton";

// View Toggle Button
export const ViewToggleButton = React.forwardRef<HTMLButtonElement, ButtonProps & { isVisible?: boolean }>(
  ({ children, isVisible = true, ...props }, ref) => (
    <Button ref={ref} variant="ghost" size="icon" {...props}>
      {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </Button>
  )
);
ViewToggleButton.displayName = "ViewToggleButton";

// Button Group Component for organizing buttons
export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, orientation = 'horizontal', className = '', spacing = 'md' }, ref) => {
    const spacingClass = {
      sm: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
      md: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2', 
      lg: orientation === 'horizontal' ? 'space-x-3' : 'space-y-3'
    };

    return (
      <div
        ref={ref}
        className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} ${spacingClass[spacing]} ${className}`}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";