# Button Component Optimization Guide

## Overview
This optimization reduces the number of individual Button imports across the codebase by providing:
1. **Centralized UI exports** via `@/shared/components/ui`
2. **Specialized button variants** for common use cases
3. **Optimized button components** with built-in icons and consistent styling

## Migration Strategy

### Before (60+ individual Button imports):
```tsx
import { Button } from '@/shared/components/ui/button';

// Multiple files each importing Button individually
<Button variant="destructive" onClick={handleDelete}>
  <Trash2 className="w-4 h-4 mr-2" />
  Delete
</Button>
```

### After (Centralized approach):
```tsx
import { DeleteButton, AddButton, EditButton, ButtonGroup } from '@/shared/components/ui';
// OR for multiple components:
import { DeleteButton, AddButton, EditButton } from '@/shared/components/ui/optimized-buttons';

// Cleaner, more semantic components
<ButtonGroup spacing="md">
  <EditButton onClick={handleEdit} />
  <DeleteButton onClick={handleDelete} />
  <AddButton onClick={handleAdd}>Add New</AddButton>
</ButtonGroup>
```

## Available Optimized Components

### Action Buttons
- `PrimaryButton` - Default variant for primary actions
- `SecondaryButton` - Outline variant for secondary actions
- `ConfirmButton` - Green with checkmark icon
- `CancelButton` - Outline with X icon

### Destructive Actions
- `DeleteButton` - Red destructive variant with trash icon

### Edit Actions
- `EditButton` - Outline with edit icon
- `SaveButton` - Primary with save icon

### Navigation
- `BackButton` - Outline with left chevron
- `NextButton` - Primary with right chevron

### Utility Buttons
- `LoadingButton` - Shows spinner when loading prop is true
- `RefreshButton` - Outline with refresh icon
- `SearchButton` - Outline with search icon
- `DownloadButton` - Outline with download icon
- `UploadButton` - Primary with upload icon
- `SettingsButton` - Ghost with settings icon
- `CloseButton` - Ghost icon button with X
- `IconButton` - Generic ghost icon button
- `ViewToggleButton` - Eye/EyeOff toggle button

### Layout
- `ButtonGroup` - Container for organizing multiple buttons

## Benefits

1. **Reduced Bundle Size**: Fewer individual Button imports
2. **Consistency**: Standardized styling and icons for common actions
3. **Developer Experience**: More semantic component names
4. **Maintainability**: Centralized button styling logic
5. **Accessibility**: Built-in proper ARIA labels and keyboard navigation

## Implementation Examples

### Form Actions
```tsx
<ButtonGroup orientation="horizontal" spacing="md">
  <CancelButton onClick={onCancel} />
  <SaveButton onClick={onSave} loading={isSaving} />
</ButtonGroup>
```

### Data Table Actions
```tsx
<ButtonGroup spacing="sm">
  <EditButton onClick={() => onEdit(item.id)} />
  <DeleteButton onClick={() => onDelete(item.id)} />
</ButtonGroup>
```

### Modal Headers
```tsx
<div className="flex justify-between items-center">
  <h2>Modal Title</h2>
  <CloseButton onClick={onClose} />
</div>
```

## Migration Priority

1. **High**: Forms, data tables, modals (most common patterns)
2. **Medium**: Settings pages, dashboards
3. **Low**: One-off components, specialized use cases

## Backward Compatibility

The original `Button` component remains available for custom use cases. The optimization is additive, not replacing existing functionality.