# Feature Catalog - saas-chatbot-ai

> Comprehensive feature documentation for migration and development reference

**Generated:** 10/11/2025, 5:05:34 PM
**Version:** 1.0.0

## Table of Contents

- [Metadata](#metadata)
- [Summary](#summary)
- [Pages](#pages)
- [Components](#components)
- [Services](#services)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Types](#types)
- [Modules](#modules)
- [Migration Guide](#migration-guide)
- [Dependency Graph](#dependency-graph)

## Metadata

| Property | Value |
|----------|-------|
| Project Name | saas-chatbot-ai |
| Total Files | 377 |
| Total Features | 377 |
| Generated At | 10/11/2025, 5:05:34 PM |
| Version | 1.0.0 |

## Summary

### Feature Breakdown

| Category | Count |
|----------|-------|
| Pages | 1 |
| Components | 173 |
| Services | 0 |
| Hooks | 37 |
| Utilities | 23 |
| Types | 25 |

### Key Technologies

- Wouter
- React
- TanStack Query
- React Query
- Zod
- Vite
- React Router
- Radix UI
- TypeScript
- Express.js
- Drizzle ORM

### External Dependencies (85)

<details>
<summary>Click to expand</summary>

- `@eslint/js`
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-aspect-ratio`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-icons`
- `@radix-ui/react-label`
- `@radix-ui/react-menubar`
- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-popover`
- `@radix-ui/react-progress`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-select`
- `@radix-ui/react-separator`
- `@radix-ui/react-slider`
- `@radix-ui/react-slot`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `@radix-ui/react-toast`
- `@radix-ui/react-toggle`
- `@radix-ui/react-toggle-group`
- `@radix-ui/react-tooltip`
- `@replit/vite-plugin-runtime-error-modal`
- `@sentry/node`
- `@sentry/react`
- `@tanstack/react-query`
- `@tanstack/react-table`
- `@testing-library/jest-dom`
- `@testing-library/react`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `@vitejs/plugin-react`
- `async_hooks`
- `bcrypt`
- `child_process`
- `class-variance-authority`
- `clsx`
- `cmdk`
- `crypto`
- `csrf`
- `date-fns`
- `dotenv`
- `drizzle-orm`
- `drizzle-zod`
- `esbuild`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `express`
- `express-session`
- `framer-motion`
- `fs`
- `fuse.js`
- `globals`
- `http`
- `input-otp`
- `lucide-react`
- `memorystore`
- `nanoid`
- `path`
- `react`
- `react-day-picker`
- `react-dom`
- `react-error-boundary`
- `react-hook-form`
- `react-hot-toast`
- `react-resizable-panels`
- `react-router-dom`
- `recharts`
- `sonner`
- `tailwind-merge`
- `url`
- `uuid`
- `vaul`
- `vite`
- `vitest`
- `winston`
- `wouter`
- `zod`

</details>

## Pages

Total: 1

### NotFound

**File Path:** `client/src/pages/not-found.tsx`

**Category:** page

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `NotFound` (default function)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/card` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 21
- Dependencies: 2

---



## Components

Total: 173

### App

**File Path:** `client/src/App.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `App` (default const)

**Dependencies:**

*Internal (11):*
- `./lib/queryClient` (utility)
- `@/shared/components/ui/toaster` (component)
- `@/shared/components/ui/tooltip` (component)
- `@/features/auth/components/AuthContext` (component)
- `@/shared/components/ThemeContext` (component)
- `@/features/user-management/components/UserContext` (hook)
- `@/shared/components/layout/AppLayout` (component)
- `@/styles/modern-css-features.css` (component)
- `@/shared/components/error/RouteErrorBoundary` (component)
- `@/shared/components/loading/SuspenseFallback` (component)
- ... and 1 more

*External (2):*
- `wouter`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 217
- Dependencies: 13

**Migration Notes:**
- Uses @tanstack/react-query for state management
- High number of internal dependencies (11) - may be tightly coupled

---

**Used By:** 1 file(s)

### ErrorBoundary

**File Path:** `client/src/components/ErrorBoundary.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ErrorBoundary` (default const)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/alert` (component)
- `@/shared/components/ui/button` (component)
- `@/utils/errorHandler` (utility)

*External (3):*
- `react`
- `react-error-boundary`
- `lucide-react`

**Complexity:**
- Lines of Code: 68
- Dependencies: 6

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables

---

### HistoryList

**File Path:** `client/src/components/HistoryList.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `HistoryItemProps` (named interface)
- `HistoryListProps` (named interface)
- `HistoryList` (named function)

**Dependencies:**

*Internal (4):*
- `./ui/scroll-area` (component)
- `./ui/button` (component)
- `./ui/tooltip` (component)
- `@/shared/hooks/use-toast` (hook)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 117
- Dependencies: 5

---

### AuthContext

**File Path:** `client/src/features/auth/components/AuthContext.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useAuth` (named function)
- `AuthProvider` (named function)

**Dependencies:**

*Internal (6):*
- `@shared/schema` (component)
- `@/features/auth/utils/secureApi` (service)
- `@/features/auth/utils/authFix` (utility)
- `@/shared/hooks/use-toast` (hook)
- `@/features/auth/utils/csrf` (utility)
- `@/lib/errorReporting` (utility)

**Complexity:**
- Lines of Code: 236
- Dependencies: 6

---

**Used By:** 4 file(s)

### Login

**File Path:** `client/src/features/auth/components/Login.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Login` (default function)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/hooks/use-toast` (hook)
- `./AuthContext` (component)

*External (3):*
- `react`
- `wouter`
- `lucide-react`

**Complexity:**
- Lines of Code: 310
- Dependencies: 9

---

### RoleGuard

**File Path:** `client/src/features/auth/components/guards/RoleGuard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `RoleGuard` (named function)
- `AdminOnly` (named function)
- `ProUserOnly` (named function)

**Dependencies:**

*Internal (3):*
- `../AuthContext` (component)
- `@/features/auth/utils/rbac` (utility)
- `@/features/auth` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 51
- Dependencies: 4

---

### RouteGuard

**File Path:** `client/src/features/auth/components/guards/RouteGuard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `RouteGuard` (named function)
- `AdminRoute` (named function)
- `ProUserRoute` (named function)

**Dependencies:**

*Internal (3):*
- `../AuthContext` (component)
- `@/features/auth/utils/rbac` (utility)
- `@/features/auth` (component)

*External (1):*
- `wouter`

**Complexity:**
- Lines of Code: 68
- Dependencies: 4

---

### AIChatBotExternal

**File Path:** `client/src/features/chatbot/components/AIChatBotExternal.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AIChatBotExternal` (default const)

**Dependencies:**

*Internal (15):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/alert` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/lib/utils` (utility)
- `./ai/ExternalAIModelStatus` (component)
- `@/shared/components/ui/delete-confirmation-dialog` (component)
- ... and 5 more

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 568
- Dependencies: 16

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Large file (629 lines) - consider refactoring into smaller modules
- High number of internal dependencies (15) - may be tightly coupled

---

### AIChatBotLocal

**File Path:** `client/src/features/chatbot/components/AIChatBotLocal.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AIChatBotLocal` (default const)

**Dependencies:**

*Internal (19):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/alert` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/hooks/use-toast` (hook)
- ... and 9 more

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 596
- Dependencies: 20

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Large file (674 lines) - consider refactoring into smaller modules
- High number of internal dependencies (19) - may be tightly coupled

---

### ChatHistory

**File Path:** `client/src/features/chatbot/components/ChatHistory.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ChatHistory` (named function)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/HistoryList` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/features/auth/utils/secureApi` (service)
- `@/features/auth/utils/secureApi` (service)
- `../types` (type)

*External (1):*
- `date-fns`

**Complexity:**
- Lines of Code: 129
- Dependencies: 7

---

### ExternalAIModelStatus

**File Path:** `client/src/features/chatbot/components/ai/ExternalAIModelStatus.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ExternalAIModelStatus` (default const)
- `ExternalAIModelStatusProps` (named interface)
- `ExternalAIModelStatus` (named function)

**Dependencies:**

*Internal (7):*
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/alert` (component)
- `@/features/model-management/types` (type)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 264
- Dependencies: 9

---

**Used By:** 1 file(s)

### LocalAIModelStatus

**File Path:** `client/src/features/chatbot/components/ai/LocalAIModelStatus.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `LocalAIModelStatus` (default const)
- `LocalAIModelStatusProps` (named interface)
- `LocalAIModelStatus` (named function)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/alert` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 201
- Dependencies: 8

---

**Used By:** 5 file(s)

### VirtualChatList

**File Path:** `client/src/features/chatbot/components/chat/VirtualChatList.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `VirtualChatList` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/virtual-list` (component)
- `../ui/chat-bubble` (component)

**Complexity:**
- Lines of Code: 47
- Dependencies: 2

---

### ChatBubble

**File Path:** `client/src/features/chatbot/components/ui/chat-bubble.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ChatBubble` (named function)
- `ChatMessageList` (named function)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `date-fns`
- `framer-motion`

**Complexity:**
- Lines of Code: 75
- Dependencies: 4

---

**Used By:** 2 file(s)

### ChatInput

**File Path:** `client/src/features/chatbot/components/ui/chat-input.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ChatInput` (named function)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 80
- Dependencies: 3

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 1 file(s)

### Dashboard

**File Path:** `client/src/features/dashboard/components/Dashboard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Dashboard` (default function)

**Dependencies:**

*Internal (9):*
- `./dashboard/StatsGrid` (component)
- `./dashboard/QuickActions` (component)
- `./dashboard/RecentPosts` (component)
- `./dashboard/PerformanceChart` (component)
- `./dashboard/PopularTemplates` (component)
- `./dashboard/UpcomingSchedule` (component)
- `@/shared/hooks/use-scroll-animation` (hook)
- `@/shared/components/ui/badge` (component)
- `./Dashboard.module.css` (component)

*External (3):*
- `react`
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 178
- Dependencies: 12

---

### Landing

**File Path:** `client/src/features/dashboard/components/Landing.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Landing` (default function)

**Dependencies:**

*Internal (5):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/features/auth` (component)
- `@/shared/components/ui/theme-toggle` (component)
- `@/shared/components/ui/TypewriterText` (type)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 394
- Dependencies: 7

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### TermsOfService

**File Path:** `client/src/features/dashboard/components/TermsOfService.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TermsOfService` (default function)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/button` (component)

*External (2):*
- `lucide-react`
- `wouter`

**Complexity:**
- Lines of Code: 207
- Dependencies: 3

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### PerformanceChart

**File Path:** `client/src/features/dashboard/components/dashboard/PerformanceChart.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PerformanceChart` (named function)

**Dependencies:**

*Internal (3):*
- `@/lib/api` (service)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/skeleton` (component)

*External (2):*
- `@tanstack/react-query`
- `lucide-react`

**Complexity:**
- Lines of Code: 71
- Dependencies: 5

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

**Used By:** 1 file(s)

### PopularTemplates

**File Path:** `client/src/features/dashboard/components/dashboard/PopularTemplates.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PopularTemplates` (named function)

**Dependencies:**

*Internal (4):*
- `@/lib/api` (service)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/skeleton` (component)

*External (2):*
- `@tanstack/react-query`
- `wouter`

**Complexity:**
- Lines of Code: 98
- Dependencies: 6

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Uses @tanstack/react-query for state management

---

**Used By:** 1 file(s)

### QuickActions

**File Path:** `client/src/features/dashboard/components/dashboard/QuickActions.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `QuickActions` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)

*External (3):*
- `wouter`
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 78
- Dependencies: 5

---

**Used By:** 1 file(s)

### RecentPosts

**File Path:** `client/src/features/dashboard/components/dashboard/RecentPosts.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `RecentPosts` (named function)

**Dependencies:**

*Internal (5):*
- `@/lib/api` (service)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/badge` (component)

*External (1):*
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 113
- Dependencies: 6

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

**Used By:** 1 file(s)

### StatsGrid

**File Path:** `client/src/features/dashboard/components/dashboard/StatsGrid.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `StatsGrid` (named function)

**Dependencies:**

*Internal (3):*
- `@/lib/api` (service)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/skeleton` (component)

*External (3):*
- `@tanstack/react-query`
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 127
- Dependencies: 6

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

**Used By:** 1 file(s)

### UpcomingSchedule

**File Path:** `client/src/features/dashboard/components/dashboard/UpcomingSchedule.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UpcomingSchedule` (named function)

**Dependencies:**

*Internal (4):*
- `@/lib/api` (service)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/skeleton` (component)

*External (3):*
- `@tanstack/react-query`
- `wouter`
- `lucide-react`

**Complexity:**
- Lines of Code: 128
- Dependencies: 7

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

**Used By:** 1 file(s)

### ChatDemo

**File Path:** `client/src/features/dashboard/components/demo/ChatDemo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ChatDemo` (default const)

**Dependencies:**

*Internal (5):*
- `@/features/chatbot/components/ui/chat-input` (component)
- `@/features/chatbot/components/ui/chat-bubble` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ThemeContext` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 125
- Dependencies: 6

---

### DataTableDemo

**File Path:** `client/src/features/dashboard/components/demo/data-table-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `columns` (named const)
- `DataTableDemo` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/data-table` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/dropdown-menu` (component)

*External (3):*
- `react`
- `lucide-react`
- `@tanstack/react-table`

**Complexity:**
- Lines of Code: 139
- Dependencies: 7

---

**Used By:** 1 file(s)

### EmptyStateDemo

**File Path:** `client/src/features/dashboard/components/demo/empty-state-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `EmptyStateDemo` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/empty-state` (component)
- `@/shared/components/ui/button` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 76
- Dependencies: 4

---

**Used By:** 1 file(s)

### FormModalDemo

**File Path:** `client/src/features/dashboard/components/demo/form-modal-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `FormModalDemo` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/form-modal` (component)
- `@/shared/hooks/use-toast` (hook)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 31
- Dependencies: 4

---

**Used By:** 1 file(s)

### Index

**File Path:** `client/src/features/dashboard/components/demo/index.ts`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 9
- Dependencies: 0

---

### ProgressiveDisclosureDemo

**File Path:** `client/src/features/dashboard/components/demo/progressive-disclosure-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ProgressiveDisclosureDemo` (named function)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/progressive-disclosure` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/switch` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 150
- Dependencies: 8

---

**Used By:** 1 file(s)

### SkeletonDemo

**File Path:** `client/src/features/dashboard/components/demo/skeleton-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SkeletonDemo` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/tabs` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 257
- Dependencies: 5

---

**Used By:** 1 file(s)

### ToastDemo

**File Path:** `client/src/features/dashboard/components/demo/toast-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ToastDemo` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/button` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/shared/components/ui/toast` (component)

**Complexity:**
- Lines of Code: 88
- Dependencies: 3

---

**Used By:** 1 file(s)

### UiPatternsDemo

**File Path:** `client/src/features/dashboard/components/demo/ui-patterns-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UIPatternsDemo` (default function)

**Dependencies:**

*Internal (8):*
- `@/shared/components/ui/command-palette` (component)
- `./data-table-demo` (component)
- `./toast-demo` (component)
- `./form-modal-demo` (component)
- `./empty-state-demo` (component)
- `./progressive-disclosure-demo` (component)
- `./skeleton-demo` (component)
- `@/shared/components/ui/toaster` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 51
- Dependencies: 9

---

### ExternalModelManagement

**File Path:** `client/src/features/model-management/components/ExternalModelManagement.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ExternalModelManagement` (default function)

**Dependencies:**

*Internal (7):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/badge` (component)
- `@/features/model-management/hooks/useExternalModelManagement` (hook)
- `./external-model-mgmt/ProviderCard` (component)
- `./external-model-mgmt/ModelCard` (component)
- `./external-model-mgmt/ModelTestDialog` (component)

*External (3):*
- `react`
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 294
- Dependencies: 10

---

### LocalModelManagement

**File Path:** `client/src/features/model-management/components/LocalModelManagement.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `LocalModelManagement` (default const)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/tabs` (component)
- `@/shared/components/ui/button` (component)
- `@/features/auth` (component)
- `@/shared/hooks/use-toast` (hook)
- `./local` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 189
- Dependencies: 7

---

### ModelCard

**File Path:** `client/src/features/model-management/components/external-model-mgmt/ModelCard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ModelCard` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/button` (component)
- `../../types` (type)

*External (2):*
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 93
- Dependencies: 6

---

**Used By:** 1 file(s)

### ModelTestDialog

**File Path:** `client/src/features/model-management/components/external-model-mgmt/ModelTestDialog.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ModelTestDialog` (named function)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/dialog` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/card` (component)
- `../../types` (type)

*External (3):*
- `react`
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 195
- Dependencies: 9

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 1 file(s)

### ProviderCard

**File Path:** `client/src/features/model-management/components/external-model-mgmt/ProviderCard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ProviderCard` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/button` (component)
- `../../types` (type)

*External (2):*
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 131
- Dependencies: 6

---

**Used By:** 1 file(s)

### ConfigurationPanel

**File Path:** `client/src/features/model-management/components/local/ConfigurationPanel.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `React` (default const)

**Dependencies:**

*Internal (10):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/slider` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/alert` (component)
- `../../hooks` (hook)
- `../../utils` (utility)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 282
- Dependencies: 11

---

**Used By:** 1 file(s)

### ModelCard

**File Path:** `client/src/features/model-management/components/local/ModelCard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `React` (default const)

**Dependencies:**

*Internal (5):*
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/dropdown-menu` (component)
- `../../utils` (utility)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 221
- Dependencies: 7

---

**Used By:** 1 file(s)

### ModelList

**File Path:** `client/src/features/model-management/components/local/ModelList.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `React` (default const)

**Dependencies:**

*Internal (8):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/select` (component)
- `./ModelCard` (component)
- `../../hooks` (hook)
- `../../utils` (utility)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 222
- Dependencies: 10

---

**Used By:** 1 file(s)

### ProviderPanel

**File Path:** `client/src/features/model-management/components/local/ProviderPanel.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `React` (default const)

**Dependencies:**

*Internal (7):*
- `@/shared/components/ui/separator` (component)
- `@/shared/hooks/use-toast` (hook)
- `./ConfigurationPanel` (component)
- `./ServerStatusCard` (component)
- `./ModelList` (component)
- `../../hooks` (hook)
- `../../utils` (utility)

**Complexity:**
- Lines of Code: 175
- Dependencies: 7

---

### ServerStatusCard

**File Path:** `client/src/features/model-management/components/local/ServerStatusCard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `React` (default const)

**Dependencies:**

*Internal (5):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/alert` (component)
- `../../utils` (utility)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 192
- Dependencies: 7

---

**Used By:** 1 file(s)

### Index

**File Path:** `client/src/features/model-management/components/local/index.ts`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `default` (named const)
- `default` (named const)
- `default` (named const)
- `default` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 7
- Dependencies: 0

---

**Used By:** 1 file(s)

### ModesSelector

**File Path:** `client/src/features/prompt-local/components/ModesSelector.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ModesSelector` (named function)
- `CompactModesSelector` (named function)

**Dependencies:**

*Internal (8):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/separator` (component)
- `@/lib/utils` (utility)
- `../types` (type)
- `../lib/constants` (utility)

*External (3):*
- `react`
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 200
- Dependencies: 11

---

**Used By:** 1 file(s)

### PromptHistory

**File Path:** `client/src/features/prompt-local/components/PromptHistory.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PromptHistory` (named function)

**Dependencies:**

*Internal (13):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/alert-dialog` (component)
- `@/shared/components/ui/dropdown-menu` (component)
- `@/lib/utils` (utility)
- `@/shared/hooks/use-toast` (hook)
- ... and 3 more

*External (2):*
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 357
- Dependencies: 15

**Migration Notes:**
- High number of internal dependencies (13) - may be tightly coupled

---

**Used By:** 1 file(s)

### PromptInterface

**File Path:** `client/src/features/prompt-local/components/PromptInterface.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PromptInterface` (named function)

**Dependencies:**

*Internal (11):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/separator` (component)
- `@/shared/components/ui/progress` (component)
- `@/lib/utils` (utility)
- `@/shared/hooks/use-toast` (hook)
- `../types` (type)
- `../lib/utils` (utility)
- ... and 1 more

*External (2):*
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 309
- Dependencies: 13

**Migration Notes:**
- High number of internal dependencies (11) - may be tightly coupled

---

**Used By:** 1 file(s)

### PromptLocalPage

**File Path:** `client/src/features/prompt-local/components/PromptLocalPage.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PromptLocal` (default function)
- `PromptLocalPage` (named function)

**Dependencies:**

*Internal (14):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/features/chatbot/components/ai/LocalAIModelStatus` (component)
- `./ModesSelector` (component)
- `./PromptInterface` (component)
- `./PromptHistory` (component)
- `../hooks/usePrompt` (hook)
- `../hooks/usePromptHistory` (hook)
- ... and 4 more

*External (2):*
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 419
- Dependencies: 16

**Migration Notes:**
- High number of internal dependencies (14) - may be tightly coupled

---

### CDNConfigPanel

**File Path:** `client/src/features/settings/components/CDNConfigPanel.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `CDNConfigPanel` (named function)

**Dependencies:**

*Internal (9):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/lib/cdn` (utility)
- `@/shared/components/ui/optimized-image` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 311
- Dependencies: 10

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 1 file(s)

### SentryTestPanel

**File Path:** `client/src/features/settings/components/SentryTestPanel.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SentryTestPanel` (named function)

**Dependencies:**

*Internal (7):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/lib/errorReporting` (utility)

**Complexity:**
- Lines of Code: 248
- Dependencies: 7

---

**Used By:** 1 file(s)

### Settings

**File Path:** `client/src/features/settings/components/Settings.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Settings` (default function)

**Dependencies:**

*Internal (15):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/tabs` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/lib/api` (service)
- ... and 5 more

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 555
- Dependencies: 17

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Large file (617 lines) - consider refactoring into smaller modules
- High number of internal dependencies (15) - may be tightly coupled

---

### LMStudioConfigPanel

**File Path:** `client/src/features/settings/components/lmstudio/LMStudioConfigPanel.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `LMStudioConfigPanel` (default const)
- `LMStudioConfigPanel` (named function)

**Dependencies:**

*Internal (12):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/slider` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/alert` (component)
- `@/shared/components/ui/switch` (component)
- `@/lib/api` (service)
- ... and 2 more

*External (2):*
- `@tanstack/react-query`
- `lucide-react`

**Complexity:**
- Lines of Code: 426
- Dependencies: 14

**Migration Notes:**
- Uses @tanstack/react-query for state management
- High number of internal dependencies (12) - may be tightly coupled

---

### OllamaConfigPanel

**File Path:** `client/src/features/settings/components/ollama/OllamaConfigPanel.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `OllamaConfigPanel` (default const)
- `OllamaConfig` (named interface)
- `OllamaConnectionStatus` (named interface)
- `OllamaConfigPanel` (named function)

**Dependencies:**

*Internal (11):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/slider` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/alert` (component)
- `@/lib/api` (service)
- `@/shared/hooks/use-toast` (hook)
- ... and 1 more

*External (2):*
- `@tanstack/react-query`
- `lucide-react`

**Complexity:**
- Lines of Code: 422
- Dependencies: 13

**Migration Notes:**
- Uses @tanstack/react-query for state management
- High number of internal dependencies (11) - may be tightly coupled

---

### SummaryLocalNew

**File Path:** `client/src/features/summary-local-new/SummaryLocalNew.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SummaryLocalNew` (default function)

**Dependencies:**

*Internal (16):*
- `@/features/settings/hooks/useOllamaConfig` (hook)
- `@/features/settings/hooks/useLMStudioConfig` (hook)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/shared/hooks/use-toast` (hook)
- ... and 6 more

*External (2):*
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 501
- Dependencies: 18

**Migration Notes:**
- Large file (547 lines) - consider refactoring into smaller modules
- High number of internal dependencies (16) - may be tightly coupled

---

**Used By:** 1 file(s)

### SummaryLocalNew.test

**File Path:** `client/src/features/summary-local-new/__tests__/SummaryLocalNew.test.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (5):*
- `../SummaryLocalNew` (component)
- `../useSummaryHistory` (hook)
- `@/features/settings/hooks/useOllamaConfig` (hook)
- `@/features/settings/hooks/useLMStudioConfig` (hook)
- `@/features/auth` (component)

*External (3):*
- `vitest`
- `@testing-library/react`
- `react-router-dom`

**Complexity:**
- Lines of Code: 192
- Dependencies: 8

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### TemplateSelector

**File Path:** `client/src/features/templates/components/TemplateSelector.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TemplateSelector` (named function)

**Dependencies:**

*Internal (5):*
- `@/shared/components/ui/button` (component)
- `@/lib/api` (service)
- `@/features/templates/types/example-templates` (type)
- `@/shared/hooks/use-toast` (hook)
- `@/shared/components/ui/alert` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 129
- Dependencies: 6

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### LanguageSelector

**File Path:** `client/src/features/translate-local/components/LanguageSelector.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `LanguageSelector` (named function)
- `LanguagePairSelector` (named function)

**Dependencies:**

*Internal (5):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/command` (component)
- `@/shared/components/ui/popover` (component)
- `../lib/constants` (utility)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 151
- Dependencies: 7

---

**Used By:** 1 file(s)

### TranslateLocalPage

**File Path:** `client/src/features/translate-local/components/TranslateLocalPage.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslateLocal` (default function)
- `TranslateLocalPage` (named function)

**Dependencies:**

*Internal (16):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/features/chatbot/components/ai/LocalAIModelStatus` (component)
- `./LanguageSelector` (component)
- `./TranslationInterface` (component)
- `./TranslationHistory` (component)
- ... and 6 more

*External (2):*
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 416
- Dependencies: 18

**Migration Notes:**
- High number of internal dependencies (16) - may be tightly coupled

---

### TranslationHistory

**File Path:** `client/src/features/translate-local/components/TranslationHistory.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationHistory` (named function)

**Dependencies:**

*Internal (10):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/alert-dialog` (component)
- `../types` (type)
- `../lib/utils` (utility)

*External (3):*
- `lucide-react`
- `date-fns`
- `framer-motion`

**Complexity:**
- Lines of Code: 238
- Dependencies: 13

---

**Used By:** 1 file(s)

### TranslationInterface

**File Path:** `client/src/features/translate-local/components/TranslationInterface.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationInterface` (named function)

**Dependencies:**

*Internal (9):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/hooks/use-toast` (hook)
- `@/shared/components/ui/TemplateSelector` (component)
- `../lib/utils` (utility)
- `../lib/constants` (utility)

*External (2):*
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 286
- Dependencies: 11

---

**Used By:** 1 file(s)

### TranslateLocal

**File Path:** `client/src/features/translation/components/TranslateLocal.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslateLocal` (default function)

**Dependencies:**

*Internal (19):*
- `@/features/settings/hooks/useOllamaConfig` (hook)
- `@/features/settings/hooks/useLMStudioConfig` (hook)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/features/auth/utils/secureApi` (service)
- ... and 9 more

*External (2):*
- `lucide-react`
- `date-fns`

**Complexity:**
- Lines of Code: 432
- Dependencies: 21

**Migration Notes:**
- High number of internal dependencies (19) - may be tightly coupled

---

### TranslationHistory

**File Path:** `client/src/features/translation/components/TranslationHistory.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationHistory` (named function)

**Dependencies:**

*Internal (7):*
- `@/shared/components/ui/HistoryList` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `../types` (type)
- `../hooks/useTranslationHistory` (hook)
- `@/shared/components/ui/translation-delete-confirmation` (component)

*External (3):*
- `react`
- `date-fns`
- `lucide-react`

**Complexity:**
- Lines of Code: 100
- Dependencies: 10

---

**Used By:** 1 file(s)

### AnimalAvatarSelector

**File Path:** `client/src/features/user-management/components/AnimalAvatarSelector.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AnimalAvatarSelector` (named function)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/dialog` (component)
- `@/shared/components/ui/tabs` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/lib/utils` (utility)

*External (2):*
- `lucide-react`
- `framer-motion`

**Complexity:**
- Lines of Code: 142
- Dependencies: 8

---

**Used By:** 1 file(s)

### BulkActionDialog

**File Path:** `client/src/features/user-management/components/BulkActionDialog.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `BulkActionDialog` (named const)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/button` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 50
- Dependencies: 2

---

**Used By:** 2 file(s)

### DeleteConfirmationDialog

**File Path:** `client/src/features/user-management/components/DeleteConfirmationDialog.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `DeleteConfirmationDialog` (named const)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/button` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 46
- Dependencies: 2

---

**Used By:** 2 file(s)

### EnhancedUserFilters

**File Path:** `client/src/features/user-management/components/EnhancedUserFilters.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `EnhancedUserFilters` (named function)

**Dependencies:**

*Internal (12):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/dropdown-menu` (component)
- `@/shared/components/ui/dialog` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/checkbox` (component)
- `../types/user-management` (hook)
- `@/features/auth` (component)
- `../hooks/useDebounce` (hook)
- ... and 2 more

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 396
- Dependencies: 13

**Migration Notes:**
- High number of internal dependencies (12) - may be tightly coupled

---

**Used By:** 2 file(s)

### ErrorBoundary

**File Path:** `client/src/features/user-management/components/ErrorBoundary.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserManagementErrorBoundary` (named class)
- `useErrorHandler` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 109
- Dependencies: 3

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables

---

**Used By:** 2 file(s)

### ModernUserManagement

**File Path:** `client/src/features/user-management/components/ModernUserManagement.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ModernUserManagement` (default const)
- `ModernUserManagement` (named function)

**Dependencies:**

*Internal (22):*
- `@/features/auth` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/tabs` (component)
- `@/shared/utils/modernToast` (utility)
- `./ModernUserManagementHeader` (component)
- `./ModernUserTable` (component)
- `./UserStats` (hook)
- `./UserPagination` (hook)
- `./UserFormDialog` (hook)
- ... and 12 more

*External (1):*
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 427
- Dependencies: 23

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Uses @tanstack/react-query for state management
- Large file (503 lines) - consider refactoring into smaller modules
- High number of internal dependencies (22) - may be tightly coupled

---

### ModernUserManagementHeader

**File Path:** `client/src/features/user-management/components/ModernUserManagementHeader.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ModernUserManagementHeader` (named const)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/separator` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 74
- Dependencies: 5

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 1 file(s)

### ModernUserTable

**File Path:** `client/src/features/user-management/components/ModernUserTable.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ModernUserTable` (default const)
- `ModernUserTable` (named function)

**Dependencies:**

*Internal (11):*
- `@/shared/components/ui/table` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/checkbox` (component)
- `@/shared/components/ui/avatar` (component)
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/dropdown-menu` (component)
- `@/shared/components/ui/command` (component)
- `@/features/user-management` (component)
- `@/features/auth` (component)
- ... and 1 more

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 433
- Dependencies: 13

**Migration Notes:**
- High number of internal dependencies (11) - may be tightly coupled

---

**Used By:** 1 file(s)

### UserActivityDialog

**File Path:** `client/src/features/user-management/components/UserActivityDialog.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ActivityItem` (named interface)
- `transformUserActivityToItems` (named const)
- `UserActivityDialog` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/dialog` (component)
- `@/shared/components/ui/scroll-area` (component)
- `@/shared/components/ui/badge` (component)
- `@shared/types/user-activity` (hook)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 147
- Dependencies: 5

---

**Used By:** 2 file(s)

### UserAnalyticsDashboard

**File Path:** `client/src/features/user-management/components/UserAnalyticsDashboard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserAnalyticsDashboard` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/progress` (component)
- `@/shared/components/ui/badge` (component)
- `../types/user-management` (hook)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 279
- Dependencies: 5

---

**Used By:** 2 file(s)

### UserContext

**File Path:** `client/src/features/user-management/components/UserContext.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserProvider` (named function)
- `useUser` (named function)

**Dependencies:**

*Internal (1):*
- `@/features/auth/utils/secureApi` (service)

*External (1):*
- `sonner`

**Complexity:**
- Lines of Code: 207
- Dependencies: 2

---

**Used By:** 2 file(s)

### UserFilters

**File Path:** `client/src/features/user-management/components/UserFilters.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserFilters` (named function)

**Dependencies:**

*Internal (5):*
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/select` (component)
- `@/features/auth` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 125
- Dependencies: 7

---

**Used By:** 1 file(s)

### UserForm

**File Path:** `client/src/features/user-management/components/UserForm.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserForm` (named function)

**Dependencies:**

*Internal (5):*
- `@/shared/components/ui/optimized-buttons` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/select` (component)
- `@/features/auth` (component)
- `@/features/user-management` (component)

**Complexity:**
- Lines of Code: 120
- Dependencies: 5

---

**Used By:** 1 file(s)

### UserFormDialog

**File Path:** `client/src/features/user-management/components/UserFormDialog.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserFormDialog` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/dialog` (component)
- `./UserForm` (hook)
- `@/features/user-management` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 41
- Dependencies: 4

---

**Used By:** 2 file(s)

### UserManagement

**File Path:** `client/src/features/user-management/components/UserManagement.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserManagement` (default const)
- `UserManagement` (named function)

**Dependencies:**

*Internal (23):*
- `@/features/auth` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `./UserStats` (hook)
- `./UserFilters` (hook)
- `./UserTable` (hook)
- `./UserPagination` (hook)
- `./UserFormDialog` (hook)
- `./UserActivityDialog` (hook)
- `./UserAnalyticsDashboard` (hook)
- ... and 13 more

*External (2):*
- `@tanstack/react-query`
- `react-hot-toast`

**Complexity:**
- Lines of Code: 445
- Dependencies: 25

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Uses @tanstack/react-query for state management
- Large file (547 lines) - consider refactoring into smaller modules
- High number of internal dependencies (23) - may be tightly coupled

---

### UserManagementErrorState

**File Path:** `client/src/features/user-management/components/UserManagementErrorState.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserManagementErrorState` (named const)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/button` (component)
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 45
- Dependencies: 4

---

**Used By:** 2 file(s)

### UserManagementHeader

**File Path:** `client/src/features/user-management/components/UserManagementHeader.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserManagementHeader` (named const)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/button` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 43
- Dependencies: 3

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 1 file(s)

### UserManagementLoadingState

**File Path:** `client/src/features/user-management/components/UserManagementLoadingState.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserManagementLoadingState` (named const)

**Dependencies:**

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 17
- Dependencies: 2

---

**Used By:** 1 file(s)

### UserPagination

**File Path:** `client/src/features/user-management/components/UserPagination.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserPagination` (named function)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/button` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 75
- Dependencies: 2

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 2 file(s)

### UserProfileCard

**File Path:** `client/src/features/user-management/components/UserProfileCard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserProfileCard` (named function)

**Dependencies:**

*Internal (15):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/avatar` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/components/ui/switch` (component)
- `@/shared/components/ui/select` (component)
- `@/shared/components/ui/tabs` (component)
- ... and 5 more

*External (2):*
- `sonner`
- `lucide-react`

**Complexity:**
- Lines of Code: 773
- Dependencies: 17

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Large file (836 lines) - consider refactoring into smaller modules
- High number of internal dependencies (15) - may be tightly coupled

---

**Used By:** 1 file(s)

### UserStats

**File Path:** `client/src/features/user-management/components/UserStats.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserStats` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/progress` (component)
- `@/features/user-management` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 71
- Dependencies: 5

---

**Used By:** 2 file(s)

### UserTable

**File Path:** `client/src/features/user-management/components/UserTable.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserTable` (named function)

**Dependencies:**

*Internal (6):*
- `@/shared/components/ui/table` (component)
- `@/shared/components/ui/badge` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/dropdown-menu` (component)
- `@/features/user-management` (component)
- `@/features/auth` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 258
- Dependencies: 8

---

**Used By:** 1 file(s)

### Main

**File Path:** `client/src/main.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (3):*
- `./lib/sentry` (utility)
- `./App` (component)
- `./index.css` (component)

*External (1):*
- `react-dom`

**Complexity:**
- Lines of Code: 8
- Dependencies: 4

---

### ThemeContext

**File Path:** `client/src/shared/components/ThemeContext.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ThemeProvider` (named function)
- `useTheme` (named function)

**Dependencies:**

**Complexity:**
- Lines of Code: 69
- Dependencies: 0

---

**Used By:** 6 file(s)

### EnhancedButton

**File Path:** `client/src/shared/components/enhanced/enhanced-button.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `EnhancedButton` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)

*External (3):*
- `react`
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 76
- Dependencies: 5

---

### EnhancedDashboard

**File Path:** `client/src/shared/components/enhanced/enhanced-dashboard.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `EnhancedDashboard` (default function)

**Dependencies:**

*Internal (7):*
- `@/components/dashboard/StatsGrid` (component)
- `@/components/dashboard/QuickActions` (component)
- `@/components/dashboard/RecentPosts` (component)
- `@/components/dashboard/PerformanceChart` (component)
- `@/components/dashboard/PopularTemplates` (component)
- `@/components/dashboard/UpcomingSchedule` (component)
- `@/hooks/use-scroll-animation` (hook)

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 154
- Dependencies: 9

---

### RouteErrorBoundary

**File Path:** `client/src/shared/components/error/RouteErrorBoundary.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `RouteErrorBoundary` (named class)
- `useErrorHandler` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/optimized-buttons` (component)
- `@/shared/components/ui/card` (component)
- `@/shared/components/ui/alert` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 103
- Dependencies: 4

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables

---

**Used By:** 1 file(s)

### Index

**File Path:** `client/src/shared/components/index.ts`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AppLayout` (named const)
- `Sidebar` (named const)
- `ModernSidebar` (named const)
- `RouteLoader` (named const)
- `PageSkeleton` (named const)
- `RouteErrorBoundary` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 9
- Dependencies: 0

---

### AppLayout

**File Path:** `client/src/shared/components/layout/AppLayout.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AppLayout` (named function)

**Dependencies:**

*Internal (5):*
- `./ModernSidebar` (component)
- `./TopBar` (component)
- `@/shared/components/ui/button` (component)
- `@/lib/utils` (utility)
- `@/shared/components/ui/sidebar` (component)

*External (1):*
- `wouter`

**Complexity:**
- Lines of Code: 69
- Dependencies: 6

---

**Used By:** 1 file(s)

### ModernSidebar

**File Path:** `client/src/shared/components/layout/ModernSidebar.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ModernSidebar` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/sidebar` (component)
- `@/shared/components/ui/dropdown-menu` (component)
- `@/shared/components/ui/avatar` (component)
- `@/features/auth` (component)

*External (3):*
- `react`
- `wouter`
- `lucide-react`

**Complexity:**
- Lines of Code: 280
- Dependencies: 7

---

**Used By:** 1 file(s)

### TopBar

**File Path:** `client/src/shared/components/layout/TopBar.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TopBar` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/theme-toggle` (component)
- `@/lib/utils` (utility)

*External (2):*
- `wouter`
- `lucide-react`

**Complexity:**
- Lines of Code: 77
- Dependencies: 5

---

**Used By:** 1 file(s)

### PageSkeleton

**File Path:** `client/src/shared/components/loading/PageSkeleton.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PageSkeleton` (named function)
- `DashboardSkeleton` (named function)
- `FormSkeleton` (named function)
- `ListSkeleton` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/card` (component)

**Complexity:**
- Lines of Code: 139
- Dependencies: 2

---

**Used By:** 1 file(s)

### SuspenseFallback

**File Path:** `client/src/shared/components/loading/SuspenseFallback.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SuspenseFallback` (named function)
- `RouteLoader` (named function)

**Dependencies:**

*Internal (1):*
- `./PageSkeleton` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 37
- Dependencies: 2

---

**Used By:** 1 file(s)

### HistoryList

**File Path:** `client/src/shared/components/ui/HistoryList.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `HistoryItemProps` (named interface)
- `HistoryListProps` (named interface)
- `HistoryList` (named function)

**Dependencies:**

*Internal (4):*
- `./scroll-area` (component)
- `./button` (component)
- `./tooltip` (component)
- `@/shared/hooks/use-toast` (hook)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 118
- Dependencies: 5

---

**Used By:** 2 file(s)

### MobileMenuButton

**File Path:** `client/src/shared/components/ui/MobileMenuButton.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `MobileMenuButton` (named function)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/sidebar` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 20
- Dependencies: 3

---

### TemplateSelector

**File Path:** `client/src/shared/components/ui/TemplateSelector.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TemplateSelector` (named function)

**Dependencies:**

*Internal (5):*
- `@/shared/components/ui/button` (component)
- `@/lib/api` (service)
- `@shared/types/api` (service)
- `@/shared/hooks/use-toast` (hook)
- `@/shared/components/ui/alert` (component)

*External (1):*
- `lucide-react`

**Complexity:**
- Lines of Code: 129
- Dependencies: 6

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

**Used By:** 5 file(s)

### TypewriterText

**File Path:** `client/src/shared/components/ui/TypewriterText.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TypewriterText` (default const)
- `TypewriterText` (named function)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

**Complexity:**
- Lines of Code: 77
- Dependencies: 1

---

**Used By:** 1 file(s)

### AccessibleComponents

**File Path:** `client/src/shared/components/ui/accessible-components.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AccessibleButton` (named const)
- `AccessibleModal` (named const)
- `AccessibleFormField` (named const)
- `LiveRegion` (named const)

**Dependencies:**

*Internal (3):*
- `@/lib/utils` (utility)
- `@/shared/types/advanced-types` (type)
- `@/hooks/use-advanced-accessibility` (hook)

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 310
- Dependencies: 5

---

### Accordion

**File Path:** `client/src/shared/components/ui/accordion.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Accordion` (named const)
- `AccordionItem` (named const)
- `AccordionTrigger` (named const)
- `AccordionContent` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-accordion`
- `lucide-react`

**Complexity:**
- Lines of Code: 51
- Dependencies: 4

---

### AdvancedCard

**File Path:** `client/src/shared/components/ui/advanced-card.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AdvancedCard` (named const)
- `AdvancedCardHeader` (named const)
- `AdvancedCardTitle` (named const)
- `AdvancedCardContent` (named const)
- `AnimatedCardList` (named const)

**Dependencies:**

*Internal (3):*
- `@/lib/utils` (utility)
- `@/shared/types/advanced-types` (type)
- `@/hooks/use-advanced-animations` (hook)

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 224
- Dependencies: 5

---

### AlertDialog

**File Path:** `client/src/shared/components/ui/alert-dialog.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AlertDialog` (named const)
- `AlertDialogPortal` (named const)
- `AlertDialogOverlay` (named const)
- `AlertDialogTrigger` (named const)
- `AlertDialogContent` (named const)
- `AlertDialogHeader` (named const)
- `AlertDialogFooter` (named const)
- `AlertDialogTitle` (named const)
- `AlertDialogDescription` (named const)
- `AlertDialogAction` (named const)
- `AlertDialogCancel` (named const)
- `` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)

*External (2):*
- `react`
- `@radix-ui/react-alert-dialog`

**Complexity:**
- Lines of Code: 128
- Dependencies: 4

---

**Used By:** 3 file(s)

### Alert

**File Path:** `client/src/shared/components/ui/alert.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Alert` (named const)
- `AlertTitle` (named const)
- `AlertDescription` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `class-variance-authority`

**Complexity:**
- Lines of Code: 55
- Dependencies: 3

---

**Used By:** 12 file(s)

### AspectRatio

**File Path:** `client/src/shared/components/ui/aspect-ratio.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AspectRatio` (named const)

**Dependencies:**

*External (1):*
- `@radix-ui/react-aspect-ratio`

**Complexity:**
- Lines of Code: 5
- Dependencies: 1

---

### AsyncBoundary

**File Path:** `client/src/shared/components/ui/async-boundary.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AsyncBoundary` (named function)

**Dependencies:**

*Internal (2):*
- `./button` (component)
- `./card` (component)

*External (3):*
- `react-error-boundary`
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 88
- Dependencies: 5

---

### Avatar

**File Path:** `client/src/shared/components/ui/avatar.tsx`

**Category:** component

**Description:** Avatar UI component

**Exports:**
- `Avatar` (named const)
- `AvatarImage` (named const)
- `AvatarFallback` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-avatar`

**Complexity:**
- Lines of Code: 43
- Dependencies: 3

---

**Used By:** 3 file(s)

### Badge

**File Path:** `client/src/shared/components/ui/badge.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `BadgeProps` (named interface)
- `Badge` (named const)
- `badgeVariants` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `class-variance-authority`

**Complexity:**
- Lines of Code: 33
- Dependencies: 3

---

**Used By:** 36 file(s)

### Breadcrumb

**File Path:** `client/src/shared/components/ui/breadcrumb.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Breadcrumb` (named const)
- `BreadcrumbList` (named const)
- `BreadcrumbItem` (named const)
- `BreadcrumbLink` (named const)
- `BreadcrumbPage` (named const)
- `BreadcrumbSeparator` (named const)
- `BreadcrumbEllipsis` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-slot`
- `lucide-react`

**Complexity:**
- Lines of Code: 107
- Dependencies: 4

---

### ButtonOptimizationDemo

**File Path:** `client/src/shared/components/ui/button-optimization-demo.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `OptimizedButtonDemo` (named function)
- `ButtonOptimizationStats` (named function)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/optimized-buttons` (component)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 142
- Dependencies: 2

---

### Button.test

**File Path:** `client/src/shared/components/ui/button.test.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (2):*
- `@/test/utils` (utility)
- `./button` (component)

*External (1):*
- `vitest`

**Complexity:**
- Lines of Code: 43
- Dependencies: 3

---

### Button

**File Path:** `client/src/shared/components/ui/button.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ButtonProps` (named interface)
- `Button` (named const)
- `buttonVariants` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (5):*
- `react`
- `@radix-ui/react-slot`
- `class-variance-authority`
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 119
- Dependencies: 6

---

**Used By:** 78 file(s)

### ButtonGroup

**File Path:** `client/src/shared/components/ui/buttons/button-group.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ButtonGroupProps` (named interface)
- `ButtonGroup` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 44
- Dependencies: 2

---

### Hooks

**File Path:** `client/src/shared/components/ui/buttons/hooks.ts`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ButtonStateOptions` (named interface)
- `AsyncButtonOptions` (named interface)
- `useButtonState` (named function)
- `useAsyncButton` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 59
- Dependencies: 1

---

### Index

**File Path:** `client/src/shared/components/ui/buttons/index.ts`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Button` (named const)
- `ButtonProps` (named const)
- `buttonVariants` (named const)
- `ActionButton` (named const)
- `CancelButton` (named const)
- `ConfirmButton` (named const)
- `DeleteButton` (named const)
- `EditButton` (named const)
- `SaveButton` (named const)
- `SubmitButton` (named const)
- `LoadingButton` (named const)
- `IconButton` (named const)
- `LinkButton` (named const)
- `RefreshButton` (named const)
- `CloseButton` (named const)
- `AddButton` (named const)
- `ButtonGroup` (named const)
- `type ButtonGroupProps` (named const)
- `useButtonState` (named const)
- `useAsyncButton` (named const)
- `type ButtonStateOptions` (named const)
- `type AsyncButtonOptions` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 28
- Dependencies: 0

---

### Variants

**File Path:** `client/src/shared/components/ui/buttons/variants.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ActionButton` (named const)
- `CancelButton` (named const)
- `ConfirmButton` (named const)
- `DeleteButton` (named const)
- `EditButton` (named const)
- `SaveButton` (named const)
- `SubmitButton` (named const)
- `LoadingButton` (named const)
- `IconButton` (named const)
- `LinkButton` (named const)
- `RefreshButton` (named const)
- `CloseButton` (named const)
- `AddButton` (named const)

**Dependencies:**

*Internal (1):*
- `../button` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 126
- Dependencies: 3

---

### Calendar

**File Path:** `client/src/shared/components/ui/calendar.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `CalendarProps` (named type)
- `Calendar` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)

*External (3):*
- `react`
- `lucide-react`
- `react-day-picker`

**Complexity:**
- Lines of Code: 66
- Dependencies: 5

---

### Card

**File Path:** `client/src/shared/components/ui/card.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Card` (named const)
- `CardHeader` (named const)
- `CardFooter` (named const)
- `CardTitle` (named const)
- `CardDescription` (named const)
- `CardContent` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 100
- Dependencies: 3

---

**Used By:** 50 file(s)

### Carousel

**File Path:** `client/src/shared/components/ui/carousel.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `type CarouselApi` (named const)
- `Carousel` (named const)
- `CarouselContent` (named const)
- `CarouselItem` (named const)
- `CarouselPrevious` (named const)
- `CarouselNext` (named const)
- `` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 233
- Dependencies: 4

---

### Chart

**File Path:** `client/src/shared/components/ui/chart.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ChartConfig` (named type)
- `ChartContainer` (named const)
- `ChartTooltip` (named const)
- `ChartTooltipContent` (named const)
- `ChartLegend` (named const)
- `ChartLegendContent` (named const)
- `ChartStyle` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `recharts`

**Complexity:**
- Lines of Code: 329
- Dependencies: 3

---

### Checkbox

**File Path:** `client/src/shared/components/ui/checkbox.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Checkbox` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-checkbox`
- `lucide-react`

**Complexity:**
- Lines of Code: 27
- Dependencies: 4

---

**Used By:** 2 file(s)

### Collapsible

**File Path:** `client/src/shared/components/ui/collapsible.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Collapsible` (named const)
- `CollapsibleTrigger` (named const)
- `CollapsibleContent` (named const)

**Dependencies:**

*External (1):*
- `@radix-ui/react-collapsible`

**Complexity:**
- Lines of Code: 8
- Dependencies: 1

---

### CommandPalette

**File Path:** `client/src/shared/components/ui/command-palette.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `CommandPalette` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/command` (component)
- `@/shared/hooks/use-command-palette` (hook)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 100
- Dependencies: 4

---

**Used By:** 1 file(s)

### Command

**File Path:** `client/src/shared/components/ui/command.tsx`

**Category:** component

**Description:** Command UI component

**Exports:**
- `Command` (named const)
- `CommandDialog` (named const)
- `CommandInput` (named const)
- `CommandList` (named const)
- `CommandEmpty` (named const)
- `CommandGroup` (named const)
- `CommandItem` (named const)
- `CommandShortcut` (named const)
- `CommandSeparator` (named const)
- `` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/dialog` (component)

*External (4):*
- `react`
- `@radix-ui/react-dialog`
- `cmdk`
- `@radix-ui/react-icons`

**Complexity:**
- Lines of Code: 136
- Dependencies: 6

---

**Used By:** 3 file(s)

### ContainerQueryCard

**File Path:** `client/src/shared/components/ui/container-query-card.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ContainerQueryCard` (named const)
- `DashboardGrid` (named const)
- `StatsGrid` (named const)
- `ResponsiveForm` (named const)
- `ResponsiveNav` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/types/advanced-types` (type)

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 165
- Dependencies: 4

---

### ContextMenu

**File Path:** `client/src/shared/components/ui/context-menu.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ContextMenu` (named const)
- `ContextMenuTrigger` (named const)
- `ContextMenuContent` (named const)
- `ContextMenuItem` (named const)
- `ContextMenuCheckboxItem` (named const)
- `ContextMenuRadioItem` (named const)
- `ContextMenuLabel` (named const)
- `ContextMenuSeparator` (named const)
- `ContextMenuShortcut` (named const)
- `ContextMenuGroup` (named const)
- `ContextMenuPortal` (named const)
- `ContextMenuSub` (named const)
- `ContextMenuSubContent` (named const)
- `ContextMenuSubTrigger` (named const)
- `ContextMenuRadioGroup` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-context-menu`
- `lucide-react`

**Complexity:**
- Lines of Code: 183
- Dependencies: 4

---

### DataTable

**File Path:** `client/src/shared/components/ui/data-table.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `DataTable` (named function)
- `DataTableColumnHeader` (named function)
- `DataTableRowActions` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/components/ui/table` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/dropdown-menu` (component)

*External (3):*
- `react`
- `@tanstack/react-table`
- `lucide-react`

**Complexity:**
- Lines of Code: 239
- Dependencies: 7

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 1 file(s)

### DeleteConfirmationDialog

**File Path:** `client/src/shared/components/ui/delete-confirmation-dialog.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `DeleteConfirmationDialog` (named function)
- `ChatDeleteConfirmation` (named function)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ui/alert-dialog` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 120
- Dependencies: 3

---

**Used By:** 3 file(s)

### Dialog

**File Path:** `client/src/shared/components/ui/dialog.tsx`

**Category:** component

**Description:** Dialog UI component

**Exports:**
- `Dialog` (named const)
- `DialogPortal` (named const)
- `DialogOverlay` (named const)
- `DialogTrigger` (named const)
- `DialogClose` (named const)
- `DialogContent` (named const)
- `DialogHeader` (named const)
- `DialogFooter` (named const)
- `DialogTitle` (named const)
- `DialogDescription` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-dialog`
- `@radix-ui/react-icons`

**Complexity:**
- Lines of Code: 108
- Dependencies: 4

---

**Used By:** 7 file(s)

### Drawer

**File Path:** `client/src/shared/components/ui/drawer.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Drawer` (named const)
- `DrawerPortal` (named const)
- `DrawerOverlay` (named const)
- `DrawerTrigger` (named const)
- `DrawerClose` (named const)
- `DrawerContent` (named const)
- `DrawerHeader` (named const)
- `DrawerFooter` (named const)
- `DrawerTitle` (named const)
- `DrawerDescription` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `vaul`

**Complexity:**
- Lines of Code: 107
- Dependencies: 3

---

**Used By:** 1 file(s)

### DropdownMenu

**File Path:** `client/src/shared/components/ui/dropdown-menu.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `DropdownMenu` (named const)
- `DropdownMenuTrigger` (named const)
- `DropdownMenuContent` (named const)
- `DropdownMenuItem` (named const)
- `DropdownMenuCheckboxItem` (named const)
- `DropdownMenuRadioItem` (named const)
- `DropdownMenuLabel` (named const)
- `DropdownMenuSeparator` (named const)
- `DropdownMenuShortcut` (named const)
- `DropdownMenuGroup` (named const)
- `DropdownMenuPortal` (named const)
- `DropdownMenuSub` (named const)
- `DropdownMenuSubContent` (named const)
- `DropdownMenuSubTrigger` (named const)
- `DropdownMenuRadioGroup` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-dropdown-menu`
- `lucide-react`

**Complexity:**
- Lines of Code: 183
- Dependencies: 4

---

**Used By:** 9 file(s)

### EmptyState

**File Path:** `client/src/shared/components/ui/empty-state.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `EmptyState` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ui/button` (component)
- `@/lib/utils` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 49
- Dependencies: 3

---

**Used By:** 1 file(s)

### FormModal

**File Path:** `client/src/shared/components/ui/form-modal.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `FormModal` (named function)

**Dependencies:**

*Internal (7):*
- `@/shared/components/ui/drawer` (component)
- `@/shared/components/ui/dialog` (component)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/label` (component)
- `@/shared/components/ui/textarea` (component)
- `@/shared/hooks/use-media-query` (hook)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 174
- Dependencies: 8

---

**Used By:** 1 file(s)

### Form

**File Path:** `client/src/shared/components/ui/form.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useFormField` (named const)
- `Form` (named const)
- `FormItem` (named const)
- `FormLabel` (named const)
- `FormControl` (named const)
- `FormDescription` (named const)
- `FormMessage` (named const)
- `FormField` (named const)
- `` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/label` (component)

*External (4):*
- `react`
- `@radix-ui/react-label`
- `@radix-ui/react-slot`
- `react-hook-form`

**Complexity:**
- Lines of Code: 155
- Dependencies: 6

---

### HoverCard

**File Path:** `client/src/shared/components/ui/hover-card.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `HoverCard` (named const)
- `HoverCardTrigger` (named const)
- `HoverCardContent` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-hover-card`

**Complexity:**
- Lines of Code: 25
- Dependencies: 3

---

### Index

**File Path:** `client/src/shared/components/ui/index.ts`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 28
- Dependencies: 0

---

### InputOtp

**File Path:** `client/src/shared/components/ui/input-otp.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `InputOTP` (named const)
- `InputOTPGroup` (named const)
- `InputOTPSlot` (named const)
- `InputOTPSeparator` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `input-otp`
- `lucide-react`

**Complexity:**
- Lines of Code: 64
- Dependencies: 4

---

### Input

**File Path:** `client/src/shared/components/ui/input.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `InputProps` (named interface)
- `Input` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 98
- Dependencies: 3

---

**Used By:** 20 file(s)

### InstallPrompt

**File Path:** `client/src/shared/components/ui/install-prompt.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `InstallPrompt` (named function)
- `OfflineIndicator` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/card` (component)
- `@/hooks/use-pwa` (hook)

*External (3):*
- `react`
- `framer-motion`
- `lucide-react`

**Complexity:**
- Lines of Code: 88
- Dependencies: 6

---

### Label

**File Path:** `client/src/shared/components/ui/label.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Label` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-label`
- `class-variance-authority`

**Complexity:**
- Lines of Code: 22
- Dependencies: 4

---

**Used By:** 17 file(s)

### Menubar

**File Path:** `client/src/shared/components/ui/menubar.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Menubar` (named const)
- `MenubarMenu` (named const)
- `MenubarTrigger` (named const)
- `MenubarContent` (named const)
- `MenubarItem` (named const)
- `MenubarSeparator` (named const)
- `MenubarLabel` (named const)
- `MenubarCheckboxItem` (named const)
- `MenubarRadioGroup` (named const)
- `MenubarRadioItem` (named const)
- `MenubarPortal` (named const)
- `MenubarSubContent` (named const)
- `MenubarSubTrigger` (named const)
- `MenubarGroup` (named const)
- `MenubarSub` (named const)
- `MenubarShortcut` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-menubar`
- `lucide-react`

**Complexity:**
- Lines of Code: 239
- Dependencies: 4

---

### NavigationMenu

**File Path:** `client/src/shared/components/ui/navigation-menu.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `navigationMenuTriggerStyle` (named const)
- `NavigationMenu` (named const)
- `NavigationMenuList` (named const)
- `NavigationMenuItem` (named const)
- `NavigationMenuContent` (named const)
- `NavigationMenuTrigger` (named const)
- `NavigationMenuLink` (named const)
- `NavigationMenuIndicator` (named const)
- `NavigationMenuViewport` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (4):*
- `react`
- `@radix-ui/react-navigation-menu`
- `class-variance-authority`
- `lucide-react`

**Complexity:**
- Lines of Code: 119
- Dependencies: 5

---

### OptimizedButtons

**File Path:** `client/src/shared/components/ui/optimized-buttons.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PrimaryButton` (named const)
- `SecondaryButton` (named const)
- `ConfirmButton` (named const)
- `CancelButton` (named const)
- `DeleteButton` (named const)
- `EditButton` (named const)
- `SaveButton` (named const)
- `LoadingButton` (named const)
- `RefreshButton` (named const)
- `AddButton` (named const)
- `CloseButton` (named const)
- `IconButton` (named const)
- `BackButton` (named const)
- `NextButton` (named const)
- `SearchButton` (named const)
- `DownloadButton` (named const)
- `UploadButton` (named const)
- `SettingsButton` (named const)
- `ViewToggleButton` (named const)
- `ButtonGroupProps` (named interface)
- `ButtonGroup` (named const)

**Dependencies:**

*Internal (1):*
- `./button` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 210
- Dependencies: 3

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

**Used By:** 3 file(s)

### OptimizedImage

**File Path:** `client/src/shared/components/ui/optimized-image.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `OptimizedImage` (named function)
- `OptimizedAvatar` (named function)
- `OptimizedBackground` (named function)

**Dependencies:**

*Internal (2):*
- `@/lib/cdn` (utility)
- `@/lib/utils` (utility)

**Complexity:**
- Lines of Code: 198
- Dependencies: 2

---

**Used By:** 1 file(s)

### PageTransition

**File Path:** `client/src/shared/components/ui/page-transition.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PageTransition` (named function)
- `LoadingTransition` (named function)

**Dependencies:**

*External (3):*
- `framer-motion`
- `wouter`
- `react`

**Complexity:**
- Lines of Code: 71
- Dependencies: 3

---

### Pagination

**File Path:** `client/src/shared/components/ui/pagination.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Pagination` (named const)
- `PaginationContent` (named const)
- `PaginationEllipsis` (named const)
- `PaginationItem` (named const)
- `PaginationLink` (named const)
- `PaginationNext` (named const)
- `PaginationPrevious` (named const)
- `` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 109
- Dependencies: 4

---

### Popover

**File Path:** `client/src/shared/components/ui/popover.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Popover` (named const)
- `PopoverTrigger` (named const)
- `PopoverContent` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-popover`

**Complexity:**
- Lines of Code: 26
- Dependencies: 3

---

**Used By:** 1 file(s)

### Progress

**File Path:** `client/src/shared/components/ui/progress.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Progress` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-progress`

**Complexity:**
- Lines of Code: 25
- Dependencies: 3

---

**Used By:** 3 file(s)

### ProgressiveDisclosure

**File Path:** `client/src/shared/components/ui/progressive-disclosure.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ProgressiveDisclosure` (named function)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 37
- Dependencies: 4

---

**Used By:** 1 file(s)

### RadioGroup

**File Path:** `client/src/shared/components/ui/radio-group.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `RadioGroup` (named const)
- `RadioGroupItem` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-radio-group`
- `lucide-react`

**Complexity:**
- Lines of Code: 40
- Dependencies: 4

---

### Resizable

**File Path:** `client/src/shared/components/ui/resizable.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ResizablePanelGroup` (named const)
- `ResizablePanel` (named const)
- `ResizableHandle` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `lucide-react`
- `react-resizable-panels`

**Complexity:**
- Lines of Code: 41
- Dependencies: 3

---

### ScrollArea

**File Path:** `client/src/shared/components/ui/scroll-area.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ScrollArea` (named const)
- `ScrollBar` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-scroll-area`

**Complexity:**
- Lines of Code: 44
- Dependencies: 3

---

**Used By:** 9 file(s)

### Select

**File Path:** `client/src/shared/components/ui/select.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Select` (named const)
- `SelectGroup` (named const)
- `SelectValue` (named const)
- `SelectTrigger` (named const)
- `SelectContent` (named const)
- `SelectLabel` (named const)
- `SelectItem` (named const)
- `SelectSeparator` (named const)
- `SelectScrollUpButton` (named const)
- `SelectScrollDownButton` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-select`
- `lucide-react`

**Complexity:**
- Lines of Code: 148
- Dependencies: 4

---

**Used By:** 12 file(s)

### Separator

**File Path:** `client/src/shared/components/ui/separator.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Separator` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-separator`

**Complexity:**
- Lines of Code: 28
- Dependencies: 3

---

**Used By:** 6 file(s)

### Sheet

**File Path:** `client/src/shared/components/ui/sheet.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Sheet` (named const)
- `SheetPortal` (named const)
- `SheetOverlay` (named const)
- `SheetTrigger` (named const)
- `SheetClose` (named const)
- `SheetContent` (named const)
- `SheetHeader` (named const)
- `SheetFooter` (named const)
- `SheetTitle` (named const)
- `SheetDescription` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (4):*
- `react`
- `@radix-ui/react-dialog`
- `class-variance-authority`
- `lucide-react`

**Complexity:**
- Lines of Code: 127
- Dependencies: 5

---

**Used By:** 1 file(s)

### Sidebar

**File Path:** `client/src/shared/components/ui/sidebar.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Sidebar` (named const)
- `SidebarContent` (named const)
- `SidebarFooter` (named const)
- `SidebarGroup` (named const)
- `SidebarGroupAction` (named const)
- `SidebarGroupContent` (named const)
- `SidebarGroupLabel` (named const)
- `SidebarHeader` (named const)
- `SidebarInput` (named const)
- `SidebarInset` (named const)
- `SidebarMenu` (named const)
- `SidebarMenuAction` (named const)
- `SidebarMenuBadge` (named const)
- `SidebarMenuButton` (named const)
- `SidebarMenuItem` (named const)
- `SidebarMenuSkeleton` (named const)
- `SidebarMenuSub` (named const)
- `SidebarMenuSubButton` (named const)
- `SidebarMenuSubItem` (named const)
- `SidebarProvider` (named const)
- `SidebarRail` (named const)
- `SidebarSeparator` (named const)
- `SidebarTrigger` (named const)
- `useSidebar` (named const)
- `` (named const)

**Dependencies:**

*Internal (8):*
- `@/shared/hooks/use-mobile` (hook)
- `@/lib/utils` (utility)
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/input` (component)
- `@/shared/components/ui/separator` (component)
- `@/shared/components/ui/sheet` (component)
- `@/shared/components/ui/skeleton` (component)
- `@/shared/components/ui/tooltip` (component)

*External (4):*
- `react`
- `@radix-ui/react-slot`
- `class-variance-authority`
- `lucide-react`

**Complexity:**
- Lines of Code: 709
- Dependencies: 12

**Migration Notes:**
- Large file (776 lines) - consider refactoring into smaller modules

---

**Used By:** 3 file(s)

### Skeleton

**File Path:** `client/src/shared/components/ui/skeleton.tsx`

**Category:** component

**Description:** Skeleton UI component

**Exports:**
- `Skeleton` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

**Complexity:**
- Lines of Code: 13
- Dependencies: 1

---

**Used By:** 12 file(s)

### Slider

**File Path:** `client/src/shared/components/ui/slider.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Slider` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-slider`

**Complexity:**
- Lines of Code: 25
- Dependencies: 3

---

**Used By:** 3 file(s)

### Sonner

**File Path:** `client/src/shared/components/ui/sonner.tsx`

**Category:** component

**Description:** Sonner UI component

**Exports:**
- `Toaster` (named const)

**Dependencies:**

*Internal (1):*
- `@/shared/components/ThemeContext` (component)

*External (2):*
- `react`
- `sonner`

**Complexity:**
- Lines of Code: 26
- Dependencies: 3

---

### Switch

**File Path:** `client/src/shared/components/ui/switch.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Switch` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-switch`

**Complexity:**
- Lines of Code: 26
- Dependencies: 3

---

**Used By:** 14 file(s)

### Table

**File Path:** `client/src/shared/components/ui/table.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Table` (named const)
- `TableHeader` (named const)
- `TableBody` (named const)
- `TableFooter` (named const)
- `TableHead` (named const)
- `TableRow` (named const)
- `TableCell` (named const)
- `TableCaption` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 109
- Dependencies: 2

---

**Used By:** 3 file(s)

### Tabs

**File Path:** `client/src/shared/components/ui/tabs.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Tabs` (named const)
- `TabsList` (named const)
- `TabsTrigger` (named const)
- `TabsContent` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-tabs`

**Complexity:**
- Lines of Code: 49
- Dependencies: 3

---

**Used By:** 6 file(s)

### Textarea

**File Path:** `client/src/shared/components/ui/textarea.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Textarea` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 21
- Dependencies: 2

---

**Used By:** 8 file(s)

### ThemeToggle

**File Path:** `client/src/shared/components/ui/theme-toggle.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ThemeToggle` (named function)
- `CompactThemeToggle` (named function)

**Dependencies:**

*Internal (3):*
- `@/shared/components/ui/button` (component)
- `@/shared/components/ui/dropdown-menu` (component)
- `@/shared/components/ThemeContext` (component)

*External (2):*
- `react`
- `lucide-react`

**Complexity:**
- Lines of Code: 81
- Dependencies: 5

---

**Used By:** 2 file(s)

### Toast

**File Path:** `client/src/shared/components/ui/toast.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `type ToastProps` (named const)
- `type ToastActionElement` (named const)
- `ToastProvider` (named const)
- `ToastViewport` (named const)
- `Toast` (named const)
- `ToastTitle` (named const)
- `ToastDescription` (named const)
- `ToastClose` (named const)
- `ToastAction` (named const)
- `` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (4):*
- `react`
- `@radix-ui/react-toast`
- `class-variance-authority`
- `lucide-react`

**Complexity:**
- Lines of Code: 117
- Dependencies: 5

---

**Used By:** 2 file(s)

### Toaster

**File Path:** `client/src/shared/components/ui/toaster.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Toaster` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/hooks/use-toast` (hook)
- `@/shared/components/ui/toast` (component)

**Complexity:**
- Lines of Code: 33
- Dependencies: 2

---

**Used By:** 2 file(s)

### ToggleGroup

**File Path:** `client/src/shared/components/ui/toggle-group.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ToggleGroup` (named const)
- `ToggleGroupItem` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/utils` (utility)
- `@/shared/components/ui/toggle` (component)

*External (3):*
- `react`
- `@radix-ui/react-toggle-group`
- `class-variance-authority`

**Complexity:**
- Lines of Code: 54
- Dependencies: 5

---

### Toggle

**File Path:** `client/src/shared/components/ui/toggle.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Toggle` (named const)
- `toggleVariants` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (3):*
- `react`
- `@radix-ui/react-toggle`
- `class-variance-authority`

**Complexity:**
- Lines of Code: 40
- Dependencies: 4

---

**Used By:** 1 file(s)

### Tooltip

**File Path:** `client/src/shared/components/ui/tooltip.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Tooltip` (named const)
- `TooltipTrigger` (named const)
- `TooltipContent` (named const)
- `TooltipProvider` (named const)

**Dependencies:**

*Internal (1):*
- `@/lib/utils` (utility)

*External (2):*
- `react`
- `@radix-ui/react-tooltip`

**Complexity:**
- Lines of Code: 25
- Dependencies: 3

---

**Used By:** 4 file(s)

### TranslationDeleteConfirmation

**File Path:** `client/src/shared/components/ui/translation-delete-confirmation.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationDeleteConfirmation` (named function)

**Dependencies:**

*Internal (1):*
- `./delete-confirmation-dialog` (component)

*External (2):*
- `react`
- `date-fns`

**Complexity:**
- Lines of Code: 37
- Dependencies: 3

---

**Used By:** 2 file(s)

### VirtualGrid

**File Path:** `client/src/shared/components/ui/virtual-grid.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `VirtualGrid` (named function)
- `useVirtualGrid` (named function)

**Dependencies:**

*External (1):*
- `framer-motion`

**Complexity:**
- Lines of Code: 137
- Dependencies: 1

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### VirtualList

**File Path:** `client/src/shared/components/ui/virtual-list.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `VirtualList` (named function)
- `useVirtualList` (named function)

**Dependencies:**

*External (1):*
- `framer-motion`

**Complexity:**
- Lines of Code: 105
- Dependencies: 1

---

**Used By:** 1 file(s)

### Utils

**File Path:** `client/src/test/utils.tsx`

**Category:** component

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `createTestQueryClient` (named const)
- `mockUser` (named const)
- `customRender` (named const)

**Dependencies:**

*Internal (2):*
- `@/shared/components/ThemeContext` (component)
- `@/shared/components/ui/tooltip` (component)

*External (3):*
- `react`
- `@testing-library/react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 52
- Dependencies: 5

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

**Used By:** 1 file(s)



## Services

No services found.

## Hooks

Total: 37

### UseAuth

**File Path:** `client/src/features/auth/hooks/useAuth.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useAuth` (named function)

**Dependencies:**

*Internal (2):*
- `../api/authApi` (service)
- `../types` (type)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 115
- Dependencies: 3

---

### UseExternalAI

**File Path:** `client/src/features/chatbot/hooks/useExternalAI.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useExternalAI` (named function)

**Dependencies:**

*Internal (3):*
- `@/features/model-management/types` (type)
- `@/features/auth/utils/secureApi` (service)
- `@/shared/hooks/use-toast` (hook)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 141
- Dependencies: 4

---

### UseDashboard

**File Path:** `client/src/features/dashboard/hooks/useDashboard.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useDashboard` (named function)

**Dependencies:**

*Internal (2):*
- `../api/dashboardApi` (service)
- `../types` (type)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 73
- Dependencies: 3

---

### Index

**File Path:** `client/src/features/model-management/hooks/index.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useExternalModelManagement` (named const)
- `useModelSearch` (named const)
- `useProviderConfig` (named const)
- `useProviderConnection` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 6
- Dependencies: 0

---

### UseExternalModelManagement

**File Path:** `client/src/features/model-management/hooks/useExternalModelManagement.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useExternalModelManagement` (named function)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

*External (2):*
- `react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 158
- Dependencies: 3

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### UseModelSearch

**File Path:** `client/src/features/model-management/hooks/useModelSearch.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useModelSearch` (named function)

**Dependencies:**

*Internal (1):*
- `../utils` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 70
- Dependencies: 2

---

### UseProviderConfig

**File Path:** `client/src/features/model-management/hooks/useProviderConfig.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useProviderConfig` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/hooks/use-toast` (hook)
- `../utils` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 142
- Dependencies: 3

---

### UseProviderConnection

**File Path:** `client/src/features/model-management/hooks/useProviderConnection.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useProviderConnection` (named function)

**Dependencies:**

*External (2):*
- `react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 213
- Dependencies: 2

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### UsePrompt

**File Path:** `client/src/features/prompt-local/hooks/usePrompt.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `usePrompt` (named function)
- `usePromptWithAutoSave` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/hooks/use-toast` (hook)
- `../lib/api` (service)
- `../types` (type)
- `../lib/utils` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 135
- Dependencies: 5

---

### UsePromptConfig

**File Path:** `client/src/features/prompt-local/hooks/usePromptConfig.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `usePromptConfig` (named function)
- `usePromptConfigWithUtils` (named function)

**Dependencies:**

*Internal (6):*
- `@/features/settings/hooks/useOllamaConfig` (hook)
- `@/features/settings/hooks/useLMStudioConfig` (hook)
- `@/shared/hooks/use-toast` (hook)
- `../types` (type)
- `../lib/utils` (utility)
- `../lib/constants` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 219
- Dependencies: 7

---

### UsePromptHistory

**File Path:** `client/src/features/prompt-local/hooks/usePromptHistory.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `usePromptHistory` (named function)
- `usePromptHistoryWithFilters` (named function)

**Dependencies:**

*Internal (5):*
- `@/shared/hooks/use-toast` (hook)
- `../lib/api` (service)
- `../types` (type)
- `../lib/utils` (utility)
- `../lib/constants` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 214
- Dependencies: 6

---

### UseLMStudioConfig

**File Path:** `client/src/features/settings/hooks/useLMStudioConfig.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useLMStudioConfig` (default const)
- `LMStudioConfig` (named interface)
- `LMStudioModel` (named interface)
- `LMStudioConnectionStatus` (named interface)
- `useLMStudioConfig` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/api` (service)
- `@/shared/hooks/use-toast` (hook)

*External (2):*
- `react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 296
- Dependencies: 4

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### UseOllamaConfig

**File Path:** `client/src/features/settings/hooks/useOllamaConfig.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useOllamaConfig` (default const)
- `OllamaConfig` (named interface)
- `OllamaConnectionStatus` (named interface)
- `useOllamaConfig` (named const)

**Dependencies:**

*Internal (2):*
- `@/lib/api` (service)
- `@/shared/hooks/use-toast` (hook)

*External (2):*
- `react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 285
- Dependencies: 4

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### UseTranslation

**File Path:** `client/src/features/translate-local/hooks/useTranslation.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useTranslation` (named function)

**Dependencies:**

*Internal (4):*
- `@/shared/hooks/use-toast` (hook)
- `../lib/api` (service)
- `../types` (type)
- `../lib/constants` (utility)

*External (2):*
- `react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 70
- Dependencies: 6

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### UseTranslationConfig

**File Path:** `client/src/features/translate-local/hooks/useTranslationConfig.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useTranslationConfig` (named function)

**Dependencies:**

*Internal (4):*
- `@/features/settings/hooks/useOllamaConfig` (hook)
- `@/features/settings/hooks/useLMStudioConfig` (hook)
- `../types` (type)
- `../lib/constants` (utility)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 157
- Dependencies: 5

---

### UseTranslationHistory

**File Path:** `client/src/features/translate-local/hooks/useTranslationHistory.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useTranslationHistory` (named function)

**Dependencies:**

*Internal (5):*
- `@/shared/hooks/use-toast` (hook)
- `../lib/api` (service)
- `../types` (type)
- `../lib/utils` (utility)
- `../lib/constants` (utility)

*External (2):*
- `react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 174
- Dependencies: 7

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### UseTranslationHistory

**File Path:** `client/src/features/translation/hooks/useTranslationHistory.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useTranslationHistory` (named function)

**Dependencies:**

*Internal (2):*
- `../types` (type)
- `../api/translation-api` (service)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 183
- Dependencies: 3

---

### UseDebounce

**File Path:** `client/src/features/user-management/hooks/useDebounce.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useDebounce` (named function)
- `useDebouncedSearch` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 38
- Dependencies: 1

---

### UseFuzzySearch

**File Path:** `client/src/features/user-management/hooks/useFuzzySearch.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useFuzzySearch` (named function)
- `useSavedSearches` (named function)

**Dependencies:**

*Internal (1):*
- `../types/user-management` (hook)

*External (2):*
- `react`
- `fuse.js`

**Complexity:**
- Lines of Code: 120
- Dependencies: 3

---

### UseUserManagement

**File Path:** `client/src/features/user-management/hooks/useUserManagement.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `userQueryKeys` (named const)
- `useCurrentUser` (named function)
- `useUserList` (named function)
- `useUser` (named function)
- `useUserSearch` (named function)
- `useUserAnalytics` (named function)
- `useUserPreferences` (named function)
- `useUserAvatar` (named function)
- `useUserActivity` (named function)

**Dependencies:**

*Internal (4):*
- `../types/user-management` (hook)
- `../types/user-activity` (hook)
- `../types/user-management` (hook)
- `@/features/auth/utils/secureApi` (service)

*External (3):*
- `react`
- `@tanstack/react-query`
- `sonner`

**Complexity:**
- Lines of Code: 381
- Dependencies: 7

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### UseVirtualizedList

**File Path:** `client/src/features/user-management/hooks/useVirtualizedList.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useVirtualizedList` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 45
- Dependencies: 1

---

### UseWebSocket

**File Path:** `client/src/features/user-management/hooks/useWebSocket.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useWebSocket` (named function)
- `useUserManagementWebSocket` (named function)

**Dependencies:**

*External (2):*
- `react`
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 135
- Dependencies: 2

**Migration Notes:**
- Uses WebSocket connections - verify server configuration
- Uses @tanstack/react-query for state management

---

### Index

**File Path:** `client/src/shared/hooks/index.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useAdvancedA11y` (named const)
- `useFocusManagement` (named const)
- `useARIAAttributes` (named const)
- `useScreenReaderOptimization` (named const)
- `useColorContrast` (named const)
- `useGestureAnimations` (named const)
- `useScrollParallax` (named const)
- `useMorphingAnimation` (named const)
- `useStaggeredAnimation` (named const)
- `usePhysicsAnimation` (named const)
- `useRespectMotionPreferences` (named const)
- `useCommandPalette` (named const)
- `useFormValidation` (named const)
- `useMediaQuery` (named const)
- `useIsMobile` (named const)
- `usePostMutations` (named const)
- `usePerformanceMonitor` (named const)
- `usePWA` (named const)
- `useScrollAnimation` (named const)
- `useParallaxScroll` (named const)
- `useScrollProgress` (named const)
- `useSmartMemo` (named const)
- `useSmartCallback` (named const)
- `useRenderTracker` (named const)
- `useExpensiveComputation` (named const)
- `useToast` (named const)
- `toast` (named const)
- `ConcurrentBoundary` (named const)
- `useTypedEvent` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 16
- Dependencies: 0

---

### UseAdvancedAccessibility

**File Path:** `client/src/shared/hooks/use-advanced-accessibility.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useAdvancedA11y` (named function)
- `useFocusManagement` (named function)
- `useARIAAttributes` (named function)
- `useScreenReaderOptimization` (named function)
- `useColorContrast` (named function)

**Dependencies:**

*Internal (2):*
- `@/shared/types/advanced-types` (type)
- `./use-typed-events` (hook)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 304
- Dependencies: 3

---

### UseAdvancedAnimations

**File Path:** `client/src/shared/hooks/use-advanced-animations.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `animationPresets` (named const)
- `advancedVariants` (named const)
- `useGestureAnimations` (named function)
- `useScrollParallax` (named function)
- `useMorphingAnimation` (named function)
- `useStaggeredAnimation` (named function)
- `usePhysicsAnimation` (named function)
- `useRespectMotionPreferences` (named function)

**Dependencies:**

*Internal (1):*
- `@/shared/types/advanced-types` (type)

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 267
- Dependencies: 3

---

### UseCommandPalette

**File Path:** `client/src/shared/hooks/use-command-palette.tsx`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useCommandPalette` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 25
- Dependencies: 1

---

### UseConcurrentBoundary

**File Path:** `client/src/shared/hooks/use-concurrent-boundary.tsx`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ConcurrentBoundary` (named function)
- `useConcurrentPriority` (named function)

**Dependencies:**

*Internal (2):*
- `@shared/types/advanced-types` (type)
- `./use-typed-events` (hook)

*External (1):*
- `react-error-boundary`

**Complexity:**
- Lines of Code: 159
- Dependencies: 3

---

### UseFormValidation

**File Path:** `client/src/shared/hooks/use-form-validation.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useFormValidation` (named function)
- `validationRules` (named const)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 224
- Dependencies: 1

---

### UseMediaQuery

**File Path:** `client/src/shared/hooks/use-media-query.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useMediaQuery` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 16
- Dependencies: 1

---

### UseMobile

**File Path:** `client/src/shared/hooks/use-mobile.tsx`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useIsMobile` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 17
- Dependencies: 1

---

### UsePerformanceMonitor

**File Path:** `client/src/shared/hooks/use-performance-monitor.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `usePerformanceMonitor` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 148
- Dependencies: 1

---

### UsePwa

**File Path:** `client/src/shared/hooks/use-pwa.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `usePWA` (named function)
- `useOffline` (named function)
- `useNetworkInfo` (named function)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 133
- Dependencies: 1

---

### UseScrollAnimation

**File Path:** `client/src/shared/hooks/use-scroll-animation.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useScrollAnimation` (named function)
- `useParallaxScroll` (named function)
- `useScrollProgress` (named function)

**Dependencies:**

*External (2):*
- `react`
- `framer-motion`

**Complexity:**
- Lines of Code: 45
- Dependencies: 2

---

### UseSmartMemoization

**File Path:** `client/src/shared/hooks/use-smart-memoization.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useSmartMemo` (named function)
- `useSmartCallback` (named function)
- `useRenderTracker` (named function)
- `useExpensiveComputation` (named function)
- `useMemoryMonitor` (named function)
- `PerformanceUtils` (named const)

**Dependencies:**

*Internal (2):*
- `@/shared/types/advanced-types` (type)
- `./use-typed-events` (hook)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 242
- Dependencies: 3

---

### UseToast

**File Path:** `client/src/shared/hooks/use-toast.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `reducer` (named const)
- `useToast` (named const)
- `toast` (named const)

**Dependencies:**

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 161
- Dependencies: 1

---

### UseTypedEvents

**File Path:** `client/src/shared/hooks/use-typed-events.tsx`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useTypedEvent` (named function)
- `useEventEmitter` (named function)
- `useEventHistory` (named function)
- `globalEventEmitter` (named const)

**Dependencies:**

*Internal (1):*
- `@/shared/types/advanced-types` (type)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 73
- Dependencies: 2

---

### UseMutations

**File Path:** `client/src/shared/hooks/useMutations.ts`

**Category:** hook

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useQuoteMutations` (named function)
- `usePostMutations` (named function)
- `useCaptionMutations` (named function)
- `useOllamaMutations` (named function)
- `useImageMutations` (named function)

**Dependencies:**

*Internal (2):*
- `@/lib/api` (service)
- `@/shared/hooks/use-toast` (hook)

*External (1):*
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 237
- Dependencies: 3

**Migration Notes:**
- Uses @tanstack/react-query for state management

---



## Utilities

Total: 23

### AuthFix

**File Path:** `client/src/features/auth/utils/authFix.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `handleAuthError` (named function)

**Dependencies:**

*Internal (2):*
- `./secureApi` (service)
- `./csrf` (utility)

**Complexity:**
- Lines of Code: 82
- Dependencies: 2

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables

---

### Csrf

**File Path:** `client/src/features/auth/utils/csrf.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `clearCsrfToken` (named function)

**Dependencies:**

**Complexity:**
- Lines of Code: 70
- Dependencies: 0

---

### Rbac

**File Path:** `client/src/features/auth/utils/rbac.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `hasPermission` (named function)
- `isAdmin` (named function)
- `isProUser` (named function)
- `hasRoleLevel` (named function)
- `getRolePermissions` (named function)
- `canManageUsers` (named function)
- `canAccessSystemSettings` (named function)
- `canViewAnalytics` (named function)
- `getRoleDisplayName` (named function)
- `validateRole` (named function)

**Dependencies:**

*Internal (1):*
- `../types/rbac` (type)

**Complexity:**
- Lines of Code: 61
- Dependencies: 1

---

### SecureApi

**File Path:** `client/src/features/auth/utils/secureApi.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ApiResponse` (named interface)
- `AuthenticationError` (named class)
- `ServerRestartError` (named class)
- `useApiErrorHandler` (named function)

**Dependencies:**

*Internal (1):*
- `./csrf` (utility)

**Complexity:**
- Lines of Code: 155
- Dependencies: 1

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### Index

**File Path:** `client/src/features/model-management/utils/index.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `cn` (named function)
- `formatFileSize` (named function)
- `formatNumber` (named function)
- `formatDate` (named function)
- `getConnectionState` (named function)
- `getModelStatusVariant` (named function)
- `getConnectionStatusVariant` (named function)
- `getLatencyColor` (named function)
- `filterModels` (named function)
- `sortModels` (named function)
- `validateProviderConfig` (named function)
- `generateModelKey` (named function)
- `debounce` (named function)

**Dependencies:**

*External (2):*
- `clsx`
- `tailwind-merge`

**Complexity:**
- Lines of Code: 213
- Dependencies: 2

---

### Api

**File Path:** `client/src/features/prompt-local/lib/api.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `promptLocalApi` (named const)
- `PromptLocalApiClient` (named class)
- `apiClient` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `../types` (type)

**Complexity:**
- Lines of Code: 156
- Dependencies: 2

---

### Constants

**File Path:** `client/src/features/prompt-local/lib/constants.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PROMPT_MODES` (named const)
- `OUTPUT_FORMATS` (named const)
- `AI_PROVIDERS` (named const)
- `PROMPT_TEMPLATES` (named const)
- `ERROR_MESSAGES` (named const)
- `SUCCESS_MESSAGES` (named const)
- `DEFAULT_CONFIG` (named const)
- `LIMITS` (named const)
- `STORAGE_KEYS` (named const)
- `ANIMATION_VARIANTS` (named const)
- `KEYBOARD_SHORTCUTS` (named const)
- `CONFIDENCE_THRESHOLDS` (named const)
- `MODE_COLORS` (named const)
- `EMPTY_STATES` (named const)

**Dependencies:**

*Internal (1):*
- `../types` (type)

**Complexity:**
- Lines of Code: 197
- Dependencies: 1

---

### Utils

**File Path:** `client/src/features/prompt-local/lib/utils.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `validatePromptText` (named function)
- `estimateTokens` (named function)
- `estimateReadingTime` (named function)
- `formatTokenCount` (named function)
- `truncateText` (named function)
- `generateSearchKeywords` (named function)
- `sortHistory` (named function)
- `filterHistory` (named function)
- `searchHistory` (named function)
- `getModeDescription` (named function)
- `getFormatDescription` (named function)
- `getConfidenceLevel` (named function)
- `getConfidenceColor` (named function)
- `calculateImprovementMetrics` (named function)
- `saveToLocalStorage` (named function)
- `loadFromLocalStorage` (named function)
- `removeFromLocalStorage` (named function)
- `debounce` (named function)
- `throttle` (named function)
- `formatRelativeTime` (named function)
- `formatDateTime` (named function)
- `updateUrlParams` (named function)
- `getUrlParam` (named function)
- `isNetworkError` (named function)
- `getErrorMessage` (named function)

**Dependencies:**

*Internal (2):*
- `../types` (type)
- `./constants` (utility)

**Complexity:**
- Lines of Code: 259
- Dependencies: 2

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### Api

**File Path:** `client/src/features/translate-local/lib/api.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationService` (named class)
- `translationService` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `../types` (type)

**Complexity:**
- Lines of Code: 140
- Dependencies: 2

---

### Constants

**File Path:** `client/src/features/translate-local/lib/constants.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SUPPORTED_LANGUAGES` (named const)
- `DEFAULT_CONFIG` (named const)
- `UI_CONSTANTS` (named const)
- `KEYBOARD_SHORTCUTS` (named const)
- `ERROR_MESSAGES` (named const)

**Dependencies:**

*Internal (1):*
- `../types` (type)

**Complexity:**
- Lines of Code: 57
- Dependencies: 1

---

### Utils

**File Path:** `client/src/features/translate-local/lib/utils.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `findLanguage` (named function)
- `getLanguageDisplay` (named function)
- `isRTLLanguage` (named function)
- `validateTranslationText` (named function)
- `formatTokenCount` (named function)
- `estimateReadingTime` (named function)
- `generateSearchKeywords` (named function)
- `sortTranslations` (named function)
- `detectPotentialLanguage` (named function)
- `truncateText` (named function)

**Dependencies:**

*Internal (2):*
- `../types` (type)
- `./constants` (utility)

**Complexity:**
- Lines of Code: 131
- Dependencies: 2

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### DataExport

**File Path:** `client/src/features/user-management/utils/dataExport.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ExportOptions` (named interface)
- `convertToCSV` (named function)
- `convertToJSON` (named function)
- `downloadFile` (named function)
- `exportToCSV` (named function)
- `exportToJSON` (named function)
- `generateExportStats` (named function)
- `exportWithStats` (named function)
- `validateExportData` (named function)

**Dependencies:**

*Internal (1):*
- `../types/user-management` (hook)

**Complexity:**
- Lines of Code: 145
- Dependencies: 1

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### Api

**File Path:** `client/src/lib/api.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 6
- Dependencies: 0

---

### Cdn

**File Path:** `client/src/lib/cdn.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `getCDNUrl` (named function)
- `getOptimizedImageUrl` (named function)
- `preloadAssets` (named function)
- `createLazyImage` (named function)
- `getResponsiveImageSrcSet` (named function)
- `useCDNImage` (named function)
- `measureAssetLoadTime` (named function)
- `cdnConfig` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 159
- Dependencies: 0

---

### ErrorReporting

**File Path:** `client/src/lib/errorReporting.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `reportError` (named function)
- `reportEvent` (named function)
- `setUserContext` (named function)
- `clearUserContext` (named function)
- `addBreadcrumb` (named function)
- `measurePerformance` (named function)

**Dependencies:**

*Internal (1):*
- `./sentry` (utility)

**Complexity:**
- Lines of Code: 103
- Dependencies: 1

---

### QueryClient

**File Path:** `client/src/lib/queryClient.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `getQueryFn` (named const)
- `queryClient` (named const)

**Dependencies:**

*Internal (1):*
- `@/features/auth/utils/csrf` (utility)

*External (1):*
- `@tanstack/react-query`

**Complexity:**
- Lines of Code: 69
- Dependencies: 2

**Migration Notes:**
- Uses @tanstack/react-query for state management

---

### Sentry

**File Path:** `client/src/lib/sentry.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `initializeSentry` (named function)
- `SentryErrorBoundary` (named const)
- `Sentry` (named const)

**Dependencies:**

*External (1):*
- `@sentry/react`

**Complexity:**
- Lines of Code: 44
- Dependencies: 1

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### Utils.test

**File Path:** `client/src/lib/utils.test.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (1):*
- `./utils` (utility)

*External (1):*
- `vitest`

**Complexity:**
- Lines of Code: 22
- Dependencies: 2

---

### Utils

**File Path:** `client/src/lib/utils.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `cn` (named function)

**Dependencies:**

*External (2):*
- `clsx`
- `tailwind-merge`

**Complexity:**
- Lines of Code: 7
- Dependencies: 2

---

### ErrorHandler

**File Path:** `client/src/shared/utils/errorHandler.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ErrorSeverity` (named type)
- `ClientError` (named interface)
- `errorHandler` (named const)
- `useErrorHandler` (named function)
- `withErrorHandling` (named function)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 160
- Dependencies: 1

---

### Index

**File Path:** `client/src/shared/utils/index.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 2
- Dependencies: 0

---

### ModernToast

**File Path:** `client/src/shared/utils/modernToast.ts`

**Category:** utility

**Description:** Modern Toast Notification Setup with Sonner

**Exports:**
- `modernToast` (named const)

**Dependencies:**

*External (2):*
- `react`
- `sonner`

**Complexity:**
- Lines of Code: 52
- Dependencies: 2

---

### ErrorHandler

**File Path:** `client/src/utils/errorHandler.ts`

**Category:** utility

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ErrorSeverity` (named type)
- `ClientError` (named interface)
- `errorHandler` (named const)
- `useErrorHandler` (named function)
- `withErrorHandling` (named function)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 160
- Dependencies: 1

---



## Types

Total: 25

### Api

**File Path:** `client/src/features/auth/types/api.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AuthUser` (named interface)
- `LoginResponse` (named interface)
- `SignupResponse` (named interface)
- `CsrfTokenData` (named interface)
- `CsrfTokenResponse` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 29
- Dependencies: 0

---

### Rbac

**File Path:** `client/src/features/auth/types/rbac.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `RoleSchema` (named const)
- `Role` (named type)
- `PermissionSchema` (named const)
- `Permission` (named type)
- `ROLE_PERMISSIONS` (named const)
- `ROLE_HIERARCHY` (named const)
- `ROLE_DISPLAY_NAMES` (named const)
- `ROLE_COLORS` (named const)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 50
- Dependencies: 1

---

### DashboardLegacy

**File Path:** `client/src/features/dashboard/types/dashboard-legacy.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Post` (named interface)
- `Template` (named interface)
- `Analytics` (named interface)
- `DashboardStats` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 55
- Dependencies: 0

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### Api

**File Path:** `client/src/features/editor/types/api.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `EditorDesignData` (named interface)
- `SavedDesign` (named interface)
- `EditorResponse` (named interface)
- `SaveDesignResponse` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 19
- Dependencies: 1

---

### ExampleTemplates

**File Path:** `client/src/features/templates/types/example-templates.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TemplateCategory` (named type)
- `ExampleTemplate` (named interface)
- `exampleTemplateSchema` (named const)
- `exampleTemplatesSchema` (named const)
- `ExampleTemplatesResponse` (named interface)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 30
- Dependencies: 1

---

### Api

**File Path:** `client/src/features/translation/types/api.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationResult` (named interface)
- `SupportedLanguage` (named interface)
- `TranslationHistoryItem` (named interface)
- `TranslationResponse` (named interface)
- `LanguagesResponse` (named interface)
- `TranslationHistoryResponse` (named interface)
- `TranslationRequest` (named interface)
- `TranslationServiceError` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 41
- Dependencies: 1

---

### UserActivity

**File Path:** `client/src/features/user-management/types/user-activity.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `WeeklyActivitySchema` (named const)
- `WeeklyActivity` (named type)
- `FeatureUsageSchema` (named const)
- `FeatureUsage` (named type)
- `ApiRequestsSchema` (named const)
- `ApiRequests` (named type)
- `FeaturesUsedSchema` (named const)
- `FeaturesUsed` (named type)
- `UserActivitySchema` (named const)
- `UserActivity` (named type)
- `UserActivityRecordSchema` (named const)
- `UserActivityRecord` (named type)
- `UserActivitiesSchema` (named const)
- `UserActivities` (named type)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 48
- Dependencies: 1

---

### UserLegacy

**File Path:** `client/src/features/user-management/types/user-legacy.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `User` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 9
- Dependencies: 0

---

### UserManagement

**File Path:** `client/src/features/user-management/types/user-management.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserCoreSchema` (named const)
- `UserAuthSchema` (named const)
- `UserProfileSchema` (named const)
- `UserSubscriptionSchema` (named const)
- `UserPreferencesSchema` (named const)
- `UserAnalyticsSchema` (named const)
- `CompleteUserSchema` (named const)
- `PublicUserSchema` (named const)
- `SessionUserSchema` (named const)
- `UserCore` (named type)
- `UserAuth` (named type)
- `UserProfile` (named type)
- `UserSubscription` (named type)
- `UserPreferences` (named type)
- `UserAnalytics` (named type)
- `CompleteUser` (named type)
- `PublicUser` (named type)
- `SessionUser` (named type)
- `CreateUserSchema` (named const)
- `UpdateUserProfileSchema` (named const)
- `UpdateUserPreferencesSchema` (named const)
- `CreateUser` (named type)
- `UpdateUserProfile` (named type)
- `UpdateUserPreferences` (named type)
- `UserQuerySchema` (named const)
- `UserQuery` (named type)
- `UserListResponseSchema` (named const)
- `UserListResponse` (named type)

**Dependencies:**

*Internal (1):*
- `@/features/auth` (component)

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 127
- Dependencies: 2

---

### User

**File Path:** `client/src/features/user-management/types/user.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `User` (named interface)
- `UserProfile` (named interface)
- `UserContextType` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 47
- Dependencies: 0

---

### Index

**File Path:** `client/src/shared/index.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 5
- Dependencies: 0

---

### Branded

**File Path:** `client/src/shared/types/branded.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserId` (named type)
- `UserEmail` (named type)
- `UserRole` (named type)
- `MessageId` (named type)
- `ConversationId` (named type)
- `MessageContent` (named type)
- `TemplateId` (named type)
- `TemplateName` (named type)
- `createUserId` (named function)
- `createUserEmail` (named function)
- `createMessageId` (named function)
- `createConversationId` (named function)
- `AsyncState` (named type)
- `ApiResponse` (named interface)
- `StrictComponentProps` (named interface)
- `EventHandler` (named type)
- `AsyncEventHandler` (named type)
- `ValidationRule` (named interface)
- `FormField` (named interface)
- `FormState` (named type)

**Dependencies:**

**Complexity:**
- Lines of Code: 69
- Dependencies: 0

---

### Index

**File Path:** `client/src/shared/types/index.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 3
- Dependencies: 0

---

### ModelManagement

**File Path:** `client/src/shared/types/model-management.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `OllamaModel` (named interface)
- `OllamaModelsResponse` (named interface)
- `OllamaGenerateRequest` (named interface)
- `OllamaGenerateResponse` (named interface)
- `OllamaHealthCheck` (named interface)
- `OllamaTestResult` (named interface)
- `OllamaChatRequest` (named interface)
- `OllamaChatResponse` (named interface)
- `OllamaErrorResponse` (named interface)
- `LMStudioModel` (named interface)
- `LMStudioModelsResponse` (named interface)
- `LMStudioHealthCheck` (named interface)
- `LMStudioChatRequest` (named interface)
- `LMStudioChatResponse` (named interface)
- `LMStudioTestResponse` (named type)
- `LMStudioError` (named interface)
- `AIModel` (named interface)
- `ModelProvider` (named interface)
- `ModelDownloadProgress` (named interface)
- `ModelTestRequest` (named interface)
- `ModelTestResponse` (named interface)
- `ModelManagementState` (named interface)
- `ExternalProvider` (named type)
- `ExternalAIConfig` (named interface)
- `ExternalAIMessage` (named interface)
- `ExternalAIResponse` (named interface)
- `ExternalAIModel` (named interface)
- `ExternalAIHealthCheck` (named interface)
- `GoogleAIConfig` (named interface)
- `AnthropicConfig` (named interface)
- `MistralConfig` (named interface)
- `OpenAIConfig` (named interface)
- `ExternalProviderConfig` (named type)
- `ExternalAIModelStatusProps` (named interface)
- `ModelInfo` (named interface)
- `ModelStatus` (named interface)
- `LocalModel` (named interface)
- `ServerHealth` (named interface)
- `ServerStatus` (named interface)
- `ProviderConfig` (named interface)
- `ConnectionStatus` (named interface)
- `LocalModelProvider` (named interface)
- `ModelProviderEvents` (named interface)
- `ProviderType` (named type)
- `ModelStatusType` (named type)
- `ConnectionState` (named type)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 332
- Dependencies: 1

---

### Vitest.d

**File Path:** `client/src/test/vitest.d.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 10
- Dependencies: 0

---

### Branded

**File Path:** `client/src/types/branded.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserId` (named type)
- `UserEmail` (named type)
- `UserRole` (named type)
- `MessageId` (named type)
- `ConversationId` (named type)
- `MessageContent` (named type)
- `TemplateId` (named type)
- `TemplateName` (named type)
- `createUserId` (named function)
- `createUserEmail` (named function)
- `createMessageId` (named function)
- `createConversationId` (named function)
- `AsyncState` (named type)
- `ApiResponse` (named interface)
- `StrictComponentProps` (named interface)
- `EventHandler` (named type)
- `AsyncEventHandler` (named type)
- `ValidationRule` (named interface)
- `FormField` (named interface)
- `FormState` (named type)

**Dependencies:**

**Complexity:**
- Lines of Code: 69
- Dependencies: 0

---

### Index

**File Path:** `client/src/types/index.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `User` (named interface)
- `Quote` (named interface)
- `Post` (named interface)
- `Template` (named interface)
- `Analytics` (named interface)
- `DashboardStats` (named interface)
- `PexelsImage` (named interface)
- `ImageSearchResponse` (named interface)
- `GeneratedCaption` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 102
- Dependencies: 0

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### EnvValidation

**File Path:** `shared/env-validation.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `NodeEnvironment` (named const)
- `LogLevel` (named const)
- `getEnvironmentSchema` (named function)
- `BaseEnvironment` (named type)
- `DevelopmentEnvironment` (named type)
- `ProductionEnvironment` (named type)
- `TestEnvironment` (named type)
- `ValidatedEnvironment` (named type)
- `EnvironmentValidationError` (named class)
- `validateEnvironment` (named function)
- `validateEnvironmentWithDetails` (named function)
- `isEnvironmentSecure` (named function)
- `baseEnvironmentSchema` (named const)
- `developmentEnvironmentSchema` (named const)
- `productionEnvironmentSchema` (named const)
- `testEnvironmentSchema` (named const)
- `` (named const)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 190
- Dependencies: 1

---

### Schema

**File Path:** `shared/schema.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `users` (named const)
- `quotes` (named const)
- `posts` (named const)
- `templates` (named const)
- `analytics` (named const)
- `insertUserSchema` (named const)
- `insertQuoteSchema` (named const)
- `insertPostSchema` (named const)
- `insertTemplateSchema` (named const)
- `AuthUserSchema` (named const)
- `UserSchema` (named const)
- `insertAnalyticsSchema` (named const)
- `DbUser` (named type)
- `User` (named type)
- `AuthUser` (named type)
- `InsertUser` (named type)
- `Quote` (named type)
- `InsertQuote` (named type)
- `Post` (named type)
- `InsertPost` (named type)
- `Template` (named type)
- `InsertTemplate` (named type)
- `Analytics` (named type)
- `InsertAnalytics` (named type)

**Dependencies:**

*Internal (1):*
- `./types/rbac` (type)

*External (4):*
- `drizzle-orm`
- `drizzle-orm`
- `drizzle-zod`
- `zod`

**Complexity:**
- Lines of Code: 119
- Dependencies: 5

**Migration Notes:**
- Contains database operations - ensure schema compatibility
- Uses WebSocket connections - verify server configuration

---

### AdvancedTypes

**File Path:** `shared/types/advanced-types.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Brand` (named type)
- `UserId` (named type)
- `MessageId` (named type)
- `SessionId` (named type)
- `ComponentId` (named type)
- `Timestamp` (named type)
- `AppRoutes` (named type)
- `ApiState` (named type)
- `NonEmptyArray` (named type)
- `DeepReadonly` (named type)
- `TypedEventMap` (named interface)
- `TypedEventEmitter` (named interface)
- `ComponentState` (named type)
- `Identifiable` (named interface)
- `Timestamped` (named interface)
- `Versioned` (named interface)
- `createBrand` (named function)
- `isUserId` (named function)
- `isMessageId` (named function)
- `isApiSuccess` (named function)
- `isApiError` (named function)
- `ValidationRules` (named type)
- `ValidationErrors` (named type)
- `TypeSafeConfig` (named interface)
- `Head` (named type)
- `Tail` (named type)
- `Last` (named type)
- `NestedMenuItem` (named interface)
- `TypeSafeQueryBuilder` (named class)
- `TypeUtils` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 158
- Dependencies: 0

---

### Api

**File Path:** `shared/types/api.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ApiResponse` (named interface)
- `ValidationError` (named interface)
- `ErrorResponse` (named interface)
- `GenericError` (named interface)
- `StandardErrorResponse` (named interface)
- `ErrorContext` (named interface)
- `ExternalServiceError` (named interface)
- `JsonExtractionResult` (named interface)
- `TranslationHistoryItem` (named interface)
- `ChatSession` (named interface)
- `ChatMessage` (named interface)
- `UserWithPassword` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 91
- Dependencies: 0

---

### ExampleTemplates

**File Path:** `shared/types/example-templates.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TemplateCategory` (named type)
- `ExampleTemplate` (named interface)
- `exampleTemplateSchema` (named const)
- `exampleTemplatesSchema` (named const)
- `ExampleTemplatesResponse` (named interface)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 30
- Dependencies: 1

---

### ExternalAi

**File Path:** `shared/types/external-ai.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ExternalProvider` (named type)
- `ExternalAIConfig` (named interface)
- `ExternalAIResponse` (named interface)
- `ExternalAIError` (named interface)
- `ExternalAIState` (named interface)
- `ExternalAIMessage` (named interface)
- `ExternalAIModel` (named interface)
- `ExternalAIHealthCheck` (named interface)
- `ProviderConfig` (named interface)
- `GoogleAIConfig` (named interface)
- `AnthropicConfig` (named interface)
- `MistralConfig` (named interface)
- `OpenAIConfig` (named interface)
- `LMStudioModelsResponse` (named interface)
- `LMStudioChatResponse` (named interface)
- `ExternalAIModelStatusProps` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 135
- Dependencies: 0

---

### UserActivity

**File Path:** `shared/types/user-activity.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `WeeklyActivitySchema` (named const)
- `WeeklyActivity` (named type)
- `FeatureUsageSchema` (named const)
- `FeatureUsage` (named type)
- `ApiRequestsSchema` (named const)
- `ApiRequests` (named type)
- `FeaturesUsedSchema` (named const)
- `FeaturesUsed` (named type)
- `UserActivitySchema` (named const)
- `UserActivity` (named type)
- `UserActivityRecordSchema` (named const)
- `UserActivityRecord` (named type)
- `UserActivitiesSchema` (named const)
- `UserActivities` (named type)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 48
- Dependencies: 1

---

### Validation

**File Path:** `shared/validation.ts`

**Category:** type

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `loginSchema` (named const)
- `signupSchema` (named const)
- `chatMessageSchema` (named const)
- `chatSessionSchema` (named const)
- `translationSchema` (named const)
- `promptImprovementSchema` (named const)
- `ollamaTestSchema` (named const)
- `lmStudioTestSchema` (named const)
- `editorSaveSchema` (named const)
- `ollamaGenerateSchema` (named const)
- `ollamaChatSchema` (named const)
- `uuidSchema` (named const)
- `chatSessionIdSchema` (named const)
- `paginationSchema` (named const)
- `LoginRequest` (named type)
- `SignupRequest` (named type)
- `ChatMessageRequest` (named type)
- `ChatSessionData` (named type)
- `TranslationRequest` (named type)
- `PromptImprovementRequest` (named type)
- `OllamaTestRequest` (named type)
- `LMStudioTestRequest` (named type)
- `EditorSaveRequest` (named type)
- `PaginationQuery` (named type)
- `OllamaGenerateRequest` (named type)
- `OllamaChatRequest` (named type)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 107
- Dependencies: 1

---



## Modules

Total: 118

### Environment

**File Path:** `client/src/config/environment.ts`

**Category:** config

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ClientEnvironmentValidationError` (named class)
- `clientConfig` (named const)
- `isFeatureEnabled` (named function)
- `getApiUrl` (named function)
- `isDevelopment` (named function)
- `isProduction` (named function)
- `ClientConfig` (named type)
- `ClientEnvironment` (named type)
- `validatedEnv` (named const)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 119
- Dependencies: 1

---

### Theme

**File Path:** `client/src/config/theme.ts`

**Category:** config

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `chatGPTTheme` (named const)
- `spacing` (named const)
- `borderRadius` (named const)
- `typography` (named const)
- `shadows` (named const)
- `transitions` (named const)
- `accessibility` (named const)
- `ThemeMode` (named type)
- `ThemeColors` (named type)

**Dependencies:**

**Complexity:**
- Lines of Code: 105
- Dependencies: 0

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### AuthApi

**File Path:** `client/src/features/auth/api/authApi.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `authApi` (named const)

**Dependencies:**

*Internal (1):*
- `../types` (type)

**Complexity:**
- Lines of Code: 65
- Dependencies: 1

---

### Index

**File Path:** `client/src/features/auth/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `AuthProvider` (named const)
- `useAuth` (named const)
- `useAuth` (named const)
- `authApi` (named const)
- `secureGet` (named const)
- `securePost` (named const)
- `securePut` (named const)
- `secureDelete` (named const)
- `secureApiCall` (named const)
- `secureApiCallWithRetry` (named const)
- `useApiErrorHandler` (named const)
- `AuthenticationError` (named const)
- `ServerRestartError` (named const)
- `` (named const)
- `hasPermission` (named const)
- `isAdmin` (named const)
- `isProUser` (named const)
- `hasRoleLevel` (named const)
- `getRolePermissions` (named const)
- `canManageUsers` (named const)
- `canAccessSystemSettings` (named const)
- `canViewAnalytics` (named const)
- `getRoleDisplayName` (named const)
- `validateRole` (named const)
- `` (named const)
- `RoleSchema` (named const)
- `PermissionSchema` (named const)
- `ROLE_PERMISSIONS` (named const)
- `ROLE_HIERARCHY` (named const)
- `ROLE_DISPLAY_NAMES` (named const)
- `ROLE_COLORS` (named const)
- `` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 50
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/auth/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AuthUser` (named interface)
- `LoginCredentials` (named interface)
- `SignupCredentials` (named interface)
- `AuthState` (named interface)
- `AuthResponse` (named interface)
- `ResetPasswordRequest` (named interface)
- `ChangePasswordRequest` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 38
- Dependencies: 0

---

### ChatApi

**File Path:** `client/src/features/chatbot/api/chatApi.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `chatApi` (named const)

**Dependencies:**

*Internal (1):*
- `../types` (type)

**Complexity:**
- Lines of Code: 66
- Dependencies: 1

---

### Index

**File Path:** `client/src/features/chatbot/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `default` (named const)
- `LocalAIModelStatus` (named const)
- `useExternalAI` (named const)
- `chatApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 18
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/chatbot/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ChatMessage` (named interface)
- `ChatSession` (named interface)
- `ChatProvider` (named interface)
- `ChatModel` (named interface)
- `ChatRequest` (named interface)
- `ChatResponse` (named interface)
- `ChatState` (named interface)
- `ChatHistoryResponse` (named interface)
- `ChatMessageResponse` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 82
- Dependencies: 0

---

### CaptionsApi

**File Path:** `client/src/features/content/api/captions-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `captionsApi` (named const)

**Dependencies:**

*Internal (1):*
- `@/features/auth` (component)

**Complexity:**
- Lines of Code: 16
- Dependencies: 1

---

### ImagesApi

**File Path:** `client/src/features/content/api/images-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `imagesApi` (named const)

**Dependencies:**

*Internal (1):*
- `@/features/auth` (component)

**Complexity:**
- Lines of Code: 48
- Dependencies: 1

---

### PostsApi

**File Path:** `client/src/features/content/api/posts-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `postsApi` (named const)

**Dependencies:**

*Internal (1):*
- `@/features/auth` (component)

**Complexity:**
- Lines of Code: 24
- Dependencies: 1

---

### QuotesApi

**File Path:** `client/src/features/content/api/quotes-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `quotesApi` (named const)

**Dependencies:**

*Internal (1):*
- `@/features/auth` (component)

**Complexity:**
- Lines of Code: 31
- Dependencies: 1

---

### DashboardApi

**File Path:** `client/src/features/dashboard/api/dashboard-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `dashboardApi` (named const)

**Dependencies:**

*Internal (1):*
- `@/features/auth` (component)

**Complexity:**
- Lines of Code: 14
- Dependencies: 1

---

### DashboardApi

**File Path:** `client/src/features/dashboard/api/dashboardApi.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `dashboardApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `../types` (type)

**Complexity:**
- Lines of Code: 37
- Dependencies: 2

---

### Index

**File Path:** `client/src/features/dashboard/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `default` (named const)
- `useDashboard` (named const)
- `dashboardApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 13
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/dashboard/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `DashboardStats` (named interface)
- `QuickAction` (named interface)
- `RecentActivity` (named interface)
- `SystemHealth` (named interface)
- `DashboardState` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 41
- Dependencies: 0

---

### Index

**File Path:** `client/src/features/model-management/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `default` (named const)
- `useExternalModelManagement` (named const)
- `useModelSearch` (named const)
- `useProviderConfig` (named const)
- `useProviderConnection` (named const)
- `modelManagementApi` (named const)
- `ollamaApi` (named const)
- `lmStudioApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 12
- Dependencies: 0

---

### Index

**File Path:** `client/src/features/prompt-local/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `ModesSelector` (named const)
- `CompactModesSelector` (named const)
- `PromptInterface` (named const)
- `PromptHistory` (named const)
- `usePrompt` (named const)
- `usePromptWithAutoSave` (named const)
- `usePromptHistory` (named const)
- `usePromptHistoryWithFilters` (named const)
- `usePromptConfig` (named const)
- `usePromptConfigWithUtils` (named const)
- `PROMPT_MODES` (named const)
- `OUTPUT_FORMATS` (named const)
- `AI_PROVIDERS` (named const)
- `ERROR_MESSAGES` (named const)
- `SUCCESS_MESSAGES` (named const)
- `DEFAULT_CONFIG` (named const)
- `LIMITS` (named const)
- `KEYBOARD_SHORTCUTS` (named const)
- `` (named const)
- `validatePromptText` (named const)
- `estimateTokens` (named const)
- `estimateReadingTime` (named const)
- `formatTokenCount` (named const)
- `truncateText` (named const)
- `generateSearchKeywords` (named const)
- `sortHistory` (named const)
- `filterHistory` (named const)
- `searchHistory` (named const)
- `getModeDescription` (named const)
- `getFormatDescription` (named const)
- `getConfidenceLevel` (named const)
- `getConfidenceColor` (named const)
- `calculateImprovementMetrics` (named const)
- `copyToClipboard` (named const)
- `formatRelativeTime` (named const)
- `formatDateTime` (named const)
- `` (named const)
- `promptLocalApi` (named const)
- `PromptLocalApiClient` (named const)
- `apiClient` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 57
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/prompt-local/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AIProvider` (named type)
- `PromptMode` (named type)
- `OutputFormat` (named type)
- `ServerHealth` (named interface)
- `PromptConfig` (named interface)
- `PromptRequest` (named interface)
- `PromptResponse` (named interface)
- `PromptHistoryItem` (named interface)
- `MutablePromptHistoryItem` (named interface)
- `PromptState` (named interface)
- `UsePromptReturn` (named interface)
- `UsePromptHistoryReturn` (named interface)
- `UsePromptConfigReturn` (named interface)
- `PromptHistoryFilter` (named type)
- `PromptHistorySort` (named type)
- `PromptValidation` (named interface)
- `PromptApiResponse` (named interface)
- `PromptInterfaceProps` (named interface)
- `PromptHistoryProps` (named interface)
- `ModesSelectorProps` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 144
- Dependencies: 0

---

### SettingsApi

**File Path:** `client/src/features/settings/api/settingsApi.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `settingsApi` (named const)

**Dependencies:**

*Internal (1):*
- `../types` (type)

**Complexity:**
- Lines of Code: 77
- Dependencies: 1

---

### Index

**File Path:** `client/src/features/settings/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `default` (named const)
- `default` (named const)
- `SentryTestPanel` (named const)
- `CDNConfigPanel` (named const)
- `useOllamaConfig` (named const)
- `useLMStudioConfig` (named const)
- `settingsApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 17
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/settings/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AppSettings` (named interface)
- `OllamaConfig` (named interface)
- `LMStudioConfig` (named interface)
- `ExternalAIConfig` (named interface)
- `SettingsState` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 71
- Dependencies: 0

---

### InstagramApi

**File Path:** `client/src/features/social/api/instagram-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `instagramApi` (named const)

**Dependencies:**

*Internal (1):*
- `@/features/auth` (component)

**Complexity:**
- Lines of Code: 9
- Dependencies: 1

---

### Api.test

**File Path:** `client/src/features/summary-local-new/__tests__/api.test.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (2):*
- `../api` (service)
- `@/features/auth/utils/secureApi` (service)

*External (1):*
- `vitest`

**Complexity:**
- Lines of Code: 160
- Dependencies: 3

---

### UseSummaryHistory.test

**File Path:** `client/src/features/summary-local-new/__tests__/useSummaryHistory.test.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (2):*
- `../useSummaryHistory` (hook)
- `../api` (service)

*External (2):*
- `vitest`
- `@testing-library/react`

**Complexity:**
- Lines of Code: 125
- Dependencies: 4

---

### Api

**File Path:** `client/src/features/summary-local-new/api.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `summaryApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `./types` (type)

**Complexity:**
- Lines of Code: 106
- Dependencies: 2

---

### Index

**File Path:** `client/src/features/summary-local-new/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `useSummaryHistory` (named const)
- `summaryApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 6
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/summary-local-new/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SummaryRequest` (named interface)
- `SummaryResponse` (named interface)
- `SummaryHistoryItem` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 22
- Dependencies: 0

---

### UseSummaryHistory

**File Path:** `client/src/features/summary-local-new/useSummaryHistory.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `useSummaryHistory` (named function)

**Dependencies:**

*Internal (2):*
- `./types` (type)
- `./api` (service)

*External (1):*
- `react`

**Complexity:**
- Lines of Code: 112
- Dependencies: 3

---

### TemplatesApi

**File Path:** `client/src/features/templates/api/templates-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `templatesApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth` (component)
- `../types/example-templates` (type)

**Complexity:**
- Lines of Code: 20
- Dependencies: 2

---

### Index

**File Path:** `client/src/features/templates/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TemplateSelector` (named const)
- `templatesApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 5
- Dependencies: 0

---

### Index

**File Path:** `client/src/features/translate-local/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `LanguageSelector` (named const)
- `LanguagePairSelector` (named const)
- `TranslationInterface` (named const)
- `TranslationHistory` (named const)
- `useTranslation` (named const)
- `useTranslationHistory` (named const)
- `useTranslationConfig` (named const)
- `findLanguage` (named const)
- `getLanguageDisplay` (named const)
- `isRTLLanguage` (named const)
- `validateTranslationText` (named const)
- `formatTokenCount` (named const)
- `estimateReadingTime` (named const)
- `generateSearchKeywords` (named const)
- `sortTranslations` (named const)
- `detectPotentialLanguage` (named const)
- `truncateText` (named const)
- `copyToClipboard` (named const)
- `` (named const)
- `SUPPORTED_LANGUAGES` (named const)
- `DEFAULT_CONFIG` (named const)
- `UI_CONSTANTS` (named const)
- `KEYBOARD_SHORTCUTS` (named const)
- `ERROR_MESSAGES` (named const)
- `` (named const)
- `translationService` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 42
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/translate-local/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `Language` (named interface)
- `TranslationRequest` (named interface)
- `TranslationResponse` (named interface)
- `TranslationHistoryItem` (named interface)
- `MutableTranslationHistoryItem` (named interface)
- `AIProvider` (named type)
- `TranslationMode` (named type)
- `ServerHealth` (named interface)
- `TranslationConfig` (named interface)
- `TranslationState` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 72
- Dependencies: 0

---

### TranslationApi

**File Path:** `client/src/features/translation/api/translation-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `translationApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `../types` (type)

**Complexity:**
- Lines of Code: 22
- Dependencies: 2

---

### Index

**File Path:** `client/src/features/translation/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `TranslationHistory` (named const)
- `useTranslationHistory` (named const)
- `translationApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 11
- Dependencies: 0

---

### Types

**File Path:** `client/src/features/translation/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationRequest` (named interface)
- `TranslationResponse` (named interface)
- `TranslationHistoryItem` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 24
- Dependencies: 0

---

### UserApi

**File Path:** `client/src/features/user-management/api/userApi.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `userApi` (named const)

**Dependencies:**

*Internal (1):*
- `../types` (type)

**Complexity:**
- Lines of Code: 51
- Dependencies: 1

---

### Index

**File Path:** `client/src/features/user-management/index.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (named const)
- `UserAnalyticsDashboard` (named const)
- `EnhancedUserFilters` (named const)
- `UserManagementErrorBoundary` (named const)
- `useCurrentUser` (named const)
- `useUserList` (named const)
- `useUser` (named const)
- `useUserSearch` (named const)
- `useUserAnalytics` (named const)
- `useUserPreferences` (named const)
- `useUserAvatar` (named const)
- `useUserActivity` (named const)
- `useDebounce` (named const)
- `useDebouncedSearch` (named const)
- `useVirtualizedList` (named const)
- `useWebSocket` (named const)
- `useUserManagementWebSocket` (named const)
- `useFuzzySearch` (named const)
- `useSavedSearches` (named const)
- `userApi` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 45
- Dependencies: 0

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### Types

**File Path:** `client/src/features/user-management/types.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `User` (named interface)
- `CreateUserRequest` (named interface)
- `UpdateUserRequest` (named interface)
- `UserFilters` (named interface)
- `UserManagementState` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 37
- Dependencies: 0

---

### Index

**File Path:** `client/src/lib/api/index.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `api` (named const)
- `dashboardApi` (named const)
- `quotesApi` (named const)
- `imagesApi` (named const)
- `postsApi` (named const)
- `captionsApi` (named const)
- `templatesApi` (named const)
- `instagramApi` (named const)
- `translationApi` (named const)
- `ollamaApi` (named const)
- `lmStudioApi` (named const)
- `modelManagementApi` (named const)

**Dependencies:**

*Internal (10):*
- `@/features/dashboard/api/dashboard-api` (service)
- `@/features/content/api/quotes-api` (service)
- `@/features/content/api/images-api` (service)
- `@/features/content/api/posts-api` (service)
- `@/features/content/api/captions-api` (service)
- `@/features/templates/api/templates-api` (service)
- `@/features/social/api/instagram-api` (service)
- `@/features/translation/api/translation-api` (service)
- `@/shared/api/ollama-api` (service)
- `@/shared/api/lmstudio-api` (service)

**Complexity:**
- Lines of Code: 57
- Dependencies: 10

---

### LmstudioApi

**File Path:** `client/src/lib/api/lmstudio-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `lmStudioApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `./local-model-types` (service)

**Complexity:**
- Lines of Code: 35
- Dependencies: 2

---

### LocalModelTypes

**File Path:** `client/src/lib/api/local-model-types.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `OllamaHealthCheck` (named interface)
- `OllamaTestResult` (named interface)
- `LMStudioHealthCheck` (named interface)

**Dependencies:**

**Complexity:**
- Lines of Code: 23
- Dependencies: 0

---

### OllamaApi

**File Path:** `client/src/lib/api/ollama-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ollamaApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `./local-model-types` (service)

**Complexity:**
- Lines of Code: 27
- Dependencies: 2

---

### LmstudioApi

**File Path:** `client/src/shared/api/lmstudio-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `lmStudioApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `@/shared/types/model-management` (type)

**Complexity:**
- Lines of Code: 37
- Dependencies: 2

---

### ModelManagementApi

**File Path:** `client/src/shared/api/modelManagementApi.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `modelManagementApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `@/shared/types/model-management` (type)

**Complexity:**
- Lines of Code: 44
- Dependencies: 2

---

### OllamaApi

**File Path:** `client/src/shared/api/ollama-api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ollamaApi` (named const)

**Dependencies:**

*Internal (2):*
- `@/features/auth/utils/secureApi` (service)
- `@/shared/types/model-management` (type)

**Complexity:**
- Lines of Code: 29
- Dependencies: 2

---

### Setup

**File Path:** `client/src/test/setup.ts`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*External (3):*
- `@testing-library/jest-dom`
- `@testing-library/react`
- `vitest`

**Complexity:**
- Lines of Code: 53
- Dependencies: 3

---

### Esbuild.externals

**File Path:** `esbuild.externals.js`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `externals` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 18
- Dependencies: 0

**Migration Notes:**
- Handles authentication - ensure security best practices

---

### Eslint.config

**File Path:** `eslint.config.js`

**Category:** config

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (default const)

**Dependencies:**

*External (6):*
- `@eslint/js`
- `globals`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`

**Complexity:**
- Lines of Code: 62
- Dependencies: 6

**Migration Notes:**
- Uses WebSocket connections - verify server configuration

---

### Postcss.config

**File Path:** `postcss.config.js`

**Category:** config

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (default const)

**Dependencies:**

**Complexity:**
- Lines of Code: 8
- Dependencies: 0

---

### BuildServer

**File Path:** `scripts/build-server.js`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (1):*
- `../esbuild.externals.js` (component)

*External (1):*
- `esbuild`

**Complexity:**
- Lines of Code: 40
- Dependencies: 2

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables

---

### SetupCdn

**File Path:** `scripts/setup-cdn.js`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 123
- Dependencies: 0

**Migration Notes:**
- Performs file system operations - ensure proper permissions
- Uses WebSocket connections - verify server configuration

---

### SetupSentry

**File Path:** `scripts/setup-sentry.js`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

**Complexity:**
- Lines of Code: 75
- Dependencies: 0

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### VerifySentry

**File Path:** `scripts/verify-sentry.js`

**Category:** module

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*External (3):*
- `child_process`
- `fs`
- `path`

**Complexity:**
- Lines of Code: 87
- Dependencies: 3

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### Config

**File Path:** `server/config.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `config` (named const)
- `validateConfiguration` (named const)
- `validatedEnv` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 4
- Dependencies: 0

---

### AuthSession

**File Path:** `server/features/auth/routes/auth-session.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `initializeSession` (named const)
- `checkSessionStatus` (named const)

**Dependencies:**

*Internal (3):*
- `../../../shared/middleware/errorHandler` (component)
- `../../../shared/utils/logger` (utility)
- `../../../shared/types/express` (type)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 42
- Dependencies: 4

**Migration Notes:**
- Uses session management - verify session store configuration

---

### Auth

**File Path:** `server/features/auth/routes/auth.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (10):*
- `../../../storage` (component)
- `../services/password` (service)
- `../../../shared/middleware/validation` (component)
- `../../../shared/middleware/auth` (component)
- `../../../shared/middleware/csrf` (component)
- `../../../shared/middleware/errorHandler` (component)
- `../../../shared/utils/logger` (utility)
- `../../../shared/utils/errors` (utility)
- `@shared/validation` (component)
- `../types/api` (service)

*External (2):*
- `express`
- `zod`

**Complexity:**
- Lines of Code: 117
- Dependencies: 12

**Migration Notes:**
- Uses session management - verify session store configuration

---

### Password

**File Path:** `server/features/auth/services/password.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (2):*
- `../../../shared/utils/logger` (utility)
- `../../../shared/utils/errors` (utility)

*External (1):*
- `bcrypt`

**Complexity:**
- Lines of Code: 36
- Dependencies: 3

**Migration Notes:**
- Handles authentication - ensure security best practices

---

### Api

**File Path:** `server/features/auth/types/api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AuthUser` (named interface)
- `LoginResponse` (named interface)
- `SignupResponse` (named interface)
- `CsrfTokenData` (named interface)
- `CsrfTokenResponse` (named interface)
- `UserWithPassword` (named interface)
- `UserWithProfile` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 33
- Dependencies: 1

---

### Chat

**File Path:** `server/features/chat/routes/chat.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (8):*
- `../../../storage` (component)
- `../services/chat` (service)
- `../../../shared/middleware/validation` (component)
- `../../../shared/middleware/auth` (component)
- `../../../shared/middleware/csrf` (component)
- `../../../shared/middleware/errorHandler` (component)
- `../../../shared/utils/errors` (utility)
- `@shared/validation` (component)

*External (2):*
- `express`
- `zod`

**Complexity:**
- Lines of Code: 69
- Dependencies: 10

---

### Chat

**File Path:** `server/features/chat/services/chat.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (4):*
- `../../../shared/utils/errors.js` (utility)
- `../../../shared/utils/logger.js` (utility)
- `@shared/types/api` (service)
- `@shared/types/external-ai` (type)

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 124
- Dependencies: 5

---

### Api

**File Path:** `server/features/chat/types/api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ChatMessage` (named interface)
- `ChatSession` (named interface)
- `ChatResponse` (named interface)
- `ChatHistoryResponse` (named interface)
- `ChatMessageResponse` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 27
- Dependencies: 1

---

### ExampleTemplates

**File Path:** `server/features/content/routes/example-templates.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `getExampleTemplates` (named const)

**Dependencies:**

*Internal (4):*
- `@shared/types/example-templates` (type)
- `../../../shared/middleware/errorHandler.js` (component)
- `../../../shared/middleware/errorHandler.js` (component)
- `../../../shared/utils/errors.js` (utility)

*External (3):*
- `express`
- `fs`
- `path`

**Complexity:**
- Lines of Code: 37
- Dependencies: 7

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### Summary

**File Path:** `server/features/content/routes/summary.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `getSummaryHistory` (named const)
- `getSummaryById` (named const)
- `saveSummary` (named const)
- `deleteSummary` (named const)
- `generateSummary` (named const)
- `registerSummaryRoutes` (named const)

**Dependencies:**

*Internal (5):*
- `../../../shared/middleware/errorHandler.js` (component)
- `../../../shared/types/auth.js` (type)
- `../../../shared/middleware/auth.js` (component)
- `../../../shared/middleware/csrf.js` (component)
- `../../chat/types/api` (service)

*External (4):*
- `express`
- `path`
- `fs`
- `uuid`

**Complexity:**
- Lines of Code: 193
- Dependencies: 9

**Migration Notes:**
- Performs file system operations - ensure proper permissions
- Uses WebSocket connections - verify server configuration

---

### ExternalAi

**File Path:** `server/features/model-management/routes/external-ai.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (4):*
- `../services/external-ai-service` (service)
- `@shared/types/external-ai` (type)
- `../../../shared/utils/errors.js` (utility)
- `../../../shared/utils/logger.js` (utility)

*External (2):*
- `express`
- `zod`

**Complexity:**
- Lines of Code: 168
- Dependencies: 6

---

### ExternalModelMgmt

**File Path:** `server/features/model-management/routes/external-model-mgmt.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (4):*
- `../services/external-ai-service` (service)
- `../../../shared/types/external-ai` (type)
- `@shared/types/api` (service)
- `../../../shared/utils/logger` (utility)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 164
- Dependencies: 5

---

### Lmstudio

**File Path:** `server/features/model-management/routes/lmstudio.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (3):*
- `../services/lmstudio` (service)
- `../../../shared/utils/logger` (utility)
- `@shared/types/api` (service)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 135
- Dependencies: 4

---

### ModelManagement

**File Path:** `server/features/model-management/routes/model-management.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (2):*
- `@shared/types/api` (service)
- `../../../shared/utils/logger` (utility)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 184
- Dependencies: 3

---

### Ollama

**File Path:** `server/features/model-management/routes/ollama.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (3):*
- `../services/ollama` (service)
- `../../../shared/utils/logger` (utility)
- `@shared/types/api` (service)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 77
- Dependencies: 4

---

### ExternalAiBase

**File Path:** `server/features/model-management/services/external-ai-base.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (1):*
- `@shared/types/external-ai` (type)

**Complexity:**
- Lines of Code: 22
- Dependencies: 1

---

### ExternalAiFactory

**File Path:** `server/features/model-management/services/external-ai-factory.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ExternalAIFactory` (named class)

**Dependencies:**

*Internal (3):*
- `@shared/types/external-ai` (type)
- `./external-ai-base` (service)
- `./google-ai` (service)

**Complexity:**
- Lines of Code: 104
- Dependencies: 3

---

### ExternalAiService

**File Path:** `server/features/model-management/services/external-ai-service.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ExternalAIService` (named class)
- `externalAIService` (named const)

**Dependencies:**

*Internal (3):*
- `../../../shared/types/external-ai` (type)
- `./external-ai-factory` (service)
- `../../../shared/utils/logger` (utility)

**Complexity:**
- Lines of Code: 217
- Dependencies: 3

**Migration Notes:**
- Uses environment variables

---

### GoogleAi

**File Path:** `server/features/model-management/services/google-ai.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `GoogleAIProvider` (named class)

**Dependencies:**

*Internal (3):*
- `@shared/types/external-ai` (type)
- `./external-ai-base` (service)
- `../../../shared/utils/logger` (utility)

**Complexity:**
- Lines of Code: 166
- Dependencies: 3

---

### Lmstudio

**File Path:** `server/features/model-management/services/lmstudio.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (4):*
- `../../../shared/utils/logger` (utility)
- `../../../shared/utils/errors` (utility)
- `../types/api` (service)
- `../../../shared/config/environment` (component)

**Complexity:**
- Lines of Code: 232
- Dependencies: 4

---

### Ollama

**File Path:** `server/features/model-management/services/ollama.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (5):*
- `../../../shared/utils/logger` (utility)
- `../../../shared/utils/errors` (utility)
- `../types/api` (service)
- `@shared/types/api` (service)
- `../../../shared/config/environment` (component)

**Complexity:**
- Lines of Code: 207
- Dependencies: 5

---

### Api

**File Path:** `server/features/model-management/types/api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `OllamaModel` (named interface)
- `OllamaModelsResponse` (named interface)
- `OllamaGenerateRequest` (named interface)
- `OllamaGenerateResponse` (named interface)
- `OllamaHealthCheck` (named interface)
- `OllamaTestResult` (named interface)
- `OllamaChatRequest` (named interface)
- `OllamaChatResponse` (named interface)
- `OllamaErrorResponse` (named interface)
- `LMStudioModel` (named interface)
- `LMStudioModelsResponse` (named interface)
- `LMStudioHealthCheck` (named interface)
- `LMStudioChatRequest` (named interface)
- `LMStudioChatResponse` (named interface)
- `LMStudioTestResponse` (named interface)
- `LMStudioError` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 136
- Dependencies: 1

---

### TestSentry

**File Path:** `server/features/monitoring/routes/test-sentry.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (4):*
- `../../../shared/config/sentry` (component)
- `../../../shared/middleware/sentry` (component)
- `../../../shared/middleware/auth` (component)
- `../../../shared/middleware/errorHandler` (component)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 83
- Dependencies: 5

**Migration Notes:**
- Uses session management - verify session store configuration

---

### PromptImproverHistory

**File Path:** `server/features/prompt-improver/routes/prompt-improver-history.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `getPromptHistory` (named const)
- `getPromptById` (named const)
- `savePromptImprovement` (named const)
- `deletePromptImprovement` (named const)
- `togglePromptBookmark` (named const)

**Dependencies:**

*Internal (1):*
- `../../../shared/middleware/errorHandler` (component)

*External (4):*
- `express`
- `path`
- `fs`
- `uuid`

**Complexity:**
- Lines of Code: 161
- Dependencies: 5

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### PromptImprover

**File Path:** `server/features/prompt-improver/routes/prompt-improver.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (9):*
- `../services/promptEnhancement` (service)
- `../../chat/services/chat` (service)
- `../../../shared/middleware/validation` (component)
- `../../../shared/middleware/auth` (component)
- `../../../shared/middleware/csrf` (component)
- `../../../shared/middleware/errorHandler` (component)
- `../../../shared/utils/errors` (utility)
- `@shared/validation` (component)
- `./prompt-improver-history` (component)

*External (2):*
- `express`
- `zod`

**Complexity:**
- Lines of Code: 53
- Dependencies: 11

---

### PromptEnhancement

**File Path:** `server/features/prompt-improver/services/promptEnhancement.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PROMPT_ENHANCEMENT_SYSTEM` (named const)
- `createEnhancementPrompt` (named function)
- `cleanEnhancedPrompt` (named const)
- `validateEnhancedPrompt` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 130
- Dependencies: 0

---

### Api

**File Path:** `server/features/prompt-improver/types/api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `PromptImprovementRequest` (named interface)
- `PromptImprovementResult` (named interface)
- `PromptImprovementResponse` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 18
- Dependencies: 1

---

### TranslationHistory

**File Path:** `server/features/translation/routes/translation-history.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `getTranslationHistory` (named const)
- `getTranslationById` (named const)
- `deleteTranslation` (named const)
- `saveTranslation` (named const)

**Dependencies:**

*Internal (4):*
- `../services/translationHistory` (service)
- `@shared/types/api` (service)
- `../../../shared/middleware/errorHandler` (component)
- `../../../shared/utils/errors` (utility)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 87
- Dependencies: 5

**Migration Notes:**
- Uses session management - verify session store configuration

---

### Translation

**File Path:** `server/features/translation/routes/translation.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (7):*
- `../services/translation` (service)
- `./translation-history` (component)
- `../../../shared/middleware/validation` (component)
- `../../../shared/middleware/auth` (component)
- `../../../shared/middleware/csrf` (component)
- `../../../shared/middleware/errorHandler` (component)
- `@shared/validation` (component)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 54
- Dependencies: 8

---

### Translation

**File Path:** `server/features/translation/services/translation.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationResponse` (named interface)
- `TranslationService` (named class)

**Dependencies:**

*Internal (4):*
- `../../../shared/utils/errors.js` (utility)
- `../../../shared/utils/logger.js` (utility)
- `../../model-management/services/ollama` (service)
- `../types/api` (service)

**Complexity:**
- Lines of Code: 134
- Dependencies: 4

---

### TranslationHistory

**File Path:** `server/features/translation/services/translationHistory.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `new` (default const)
- `TranslationHistoryService` (named class)

**Dependencies:**

*Internal (1):*
- `../types/api` (service)

*External (3):*
- `fs`
- `path`
- `uuid`

**Complexity:**
- Lines of Code: 95
- Dependencies: 4

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### Api

**File Path:** `server/features/translation/types/api.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `TranslationResult` (named interface)
- `SupportedLanguage` (named interface)
- `TranslationHistoryItem` (named interface)
- `TranslationResponse` (named interface)
- `LanguagesResponse` (named interface)
- `TranslationHistoryResponse` (named interface)
- `TranslationRequest` (named interface)
- `TranslationServiceError` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/types/api` (service)

**Complexity:**
- Lines of Code: 41
- Dependencies: 1

---

### UserActivity

**File Path:** `server/features/user-activity/routes/user-activity.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (default const)

**Dependencies:**

*Internal (4):*
- `../services/user-activity` (hook)
- `../../../shared/middleware/auth` (component)
- `../../../shared/utils/response` (utility)
- `../../auth/types/api` (service)

*External (2):*
- `express`
- `zod`

**Complexity:**
- Lines of Code: 91
- Dependencies: 6

**Migration Notes:**
- Uses session management - verify session store configuration

---

### UserActivity

**File Path:** `server/features/user-activity/services/user-activity.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `UserActivityService` (named class)
- `userActivityService` (named const)

**Dependencies:**

*Internal (1):*
- `../../../../shared/types/user-activity` (hook)

*External (3):*
- `zod`
- `fs`
- `path`

**Complexity:**
- Lines of Code: 173
- Dependencies: 4

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### UserManagement

**File Path:** `server/features/user-management/routes/user-management.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (named const)

**Dependencies:**

*Internal (3):*
- `../../../shared/middleware/auth` (component)
- `../services/user-management-simple` (hook)
- `../../../shared/utils/rbac` (utility)

*External (2):*
- `express`
- `zod`

**Complexity:**
- Lines of Code: 226
- Dependencies: 5

---

### UserProfile

**File Path:** `server/features/user-management/routes/user-profile.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `router` (named const)

**Dependencies:**

*Internal (2):*
- `../../../shared/middleware/auth.js` (component)
- `../services/user-management-simple` (hook)

*External (4):*
- `express`
- `zod`
- `fs`
- `path`

**Complexity:**
- Lines of Code: 203
- Dependencies: 6

---

### UserManagementSimple

**File Path:** `server/features/user-management/services/user-management-simple.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SimpleUser` (named interface)
- `PublicUser` (named interface)
- `UserQuery` (named interface)
- `UserListResponse` (named interface)
- `CreateUserData` (named interface)
- `simpleUserManagementService` (named const)

**Dependencies:**

*Internal (1):*
- `../../../shared/types/rbac` (type)

*External (5):*
- `fs`
- `path`
- `bcrypt`
- `uuid`
- `zod`

**Complexity:**
- Lines of Code: 289
- Dependencies: 6

**Migration Notes:**
- Performs file system operations - ensure proper permissions
- Handles authentication - ensure security best practices

---

### Index

**File Path:** `server/index.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Dependencies:**

*Internal (8):*
- `./shared/config/sentry` (component)
- `./routes` (component)
- `./vite` (component)
- `./shared/middleware/errorHandler` (component)
- `./shared/middleware/logging` (component)
- `./shared/middleware/environment` (component)
- `./shared/utils/logger` (utility)
- `./shared/config/environment` (component)

**Complexity:**
- Lines of Code: 52
- Dependencies: 8

---

### Routes

**File Path:** `server/routes.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `registerRoutes` (named function)

**Dependencies:**

*Internal (21):*
- `./features/auth/routes/auth` (component)
- `./features/auth/routes/auth-session` (component)
- `./features/chat/routes/chat` (component)
- `./features/translation/routes/translation` (component)
- `./features/user-management/routes/user-management` (hook)
- `./features/user-activity/routes/user-activity` (hook)
- `./features/user-management/routes/user-profile` (hook)
- `./features/content/routes/summary` (component)
- `./features/prompt-improver/routes/prompt-improver` (component)
- `./features/model-management/routes/external-ai` (component)
- ... and 11 more

*External (5):*
- `http`
- `path`
- `express`
- `express-session`
- `memorystore`

**Complexity:**
- Lines of Code: 85
- Dependencies: 26

**Migration Notes:**
- Uses session management - verify session store configuration
- High number of internal dependencies (21) - may be tightly coupled

---

### Cdn

**File Path:** `server/shared/config/cdn.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `cdnConfig` (default const)
- `CDNConfig` (named interface)
- `cdnConfig` (named const)
- `getCDNUrl` (named function)
- `getOptimizedImageUrl` (named function)
- `getCacheControl` (named function)
- `shouldUseCDN` (named function)
- `generatePreloadLinks` (named function)

**Dependencies:**

*Internal (1):*
- `./environment` (component)

**Complexity:**
- Lines of Code: 106
- Dependencies: 1

---

### Environment

**File Path:** `server/shared/config/environment.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `config` (named const)
- `validateConfiguration` (named function)
- `AppConfig` (named type)
- `ConfigValidation` (named type)
- `validatedEnv` (named const)

**Dependencies:**

*Internal (2):*
- `@shared/env-validation` (component)
- `../utils/logger` (utility)

*External (2):*
- `dotenv`
- `crypto`

**Complexity:**
- Lines of Code: 195
- Dependencies: 4

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables

---

### Sentry

**File Path:** `server/shared/config/sentry.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `initializeSentry` (named function)
- `Sentry` (named const)

**Dependencies:**

*Internal (1):*
- `./environment` (component)

*External (1):*
- `@sentry/node`

**Complexity:**
- Lines of Code: 34
- Dependencies: 2

**Migration Notes:**
- Uses environment variables

---

### Auth

**File Path:** `server/shared/middleware/auth.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ensureSessionCleanup` (named function)
- `authRateLimit` (named function)
- `clearAuthAttempts` (named function)

**Dependencies:**

*Internal (4):*
- `../../storage` (component)
- `../types/express.d` (type)
- `@shared/schema` (component)
- `../utils/logger.js` (utility)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 168
- Dependencies: 5

**Migration Notes:**
- Uses session management - verify session store configuration

---

### Cdn

**File Path:** `server/shared/middleware/cdn.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `cdnMiddleware` (named function)
- `staticCacheMiddleware` (named function)
- `cdnHealthCheck` (named function)
- `generateCSPHeader` (named function)

**Dependencies:**

*Internal (2):*
- `../config/cdn` (component)
- `../config/environment` (component)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 154
- Dependencies: 3

---

### Csrf

**File Path:** `server/shared/middleware/csrf.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `csrfProtection` (named function)
- `generateCsrfToken` (named function)
- `addCsrfToken` (named function)

**Dependencies:**

*Internal (2):*
- `../types/express` (type)
- `../utils/logger.js` (utility)

*External (2):*
- `express`
- `csrf`

**Complexity:**
- Lines of Code: 67
- Dependencies: 4

**Migration Notes:**
- Uses session management - verify session store configuration

---

### Environment

**File Path:** `server/shared/middleware/environment.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `environmentValidationMiddleware` (named function)
- `featureAvailabilityMiddleware` (named function)
- `environmentSecurityMiddleware` (named function)
- `serviceAvailabilityMiddleware` (named function)
- `createHealthCheckHandler` (named function)

**Dependencies:**

*Internal (2):*
- `../config/environment` (component)
- `../utils/logger` (utility)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 162
- Dependencies: 3

---

### ErrorHandler

**File Path:** `server/shared/middleware/errorHandler.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `generateRequestId` (named function)
- `extractErrorContext` (named function)
- `formatErrorResponse` (named function)
- `globalErrorHandler` (named function)
- `requestIdMiddleware` (named function)
- `asyncHandler` (named function)
- `sendSuccessResponse` (named function)
- `sendErrorResponse` (named function)
- `notFoundHandler` (named function)
- `handleValidationErrors` (named function)

**Dependencies:**

*Internal (5):*
- `../utils/logger` (utility)
- `../utils/errors` (utility)
- `@shared/types/api` (service)
- `../types/express.d` (type)
- `../../config` (component)

*External (4):*
- `express`
- `zod`
- `nanoid`
- `uuid`

**Complexity:**
- Lines of Code: 171
- Dependencies: 9

---

### Logging

**File Path:** `server/shared/middleware/logging.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `requestLoggingMiddleware` (named const)
- `errorLoggingMiddleware` (named const)
- `performanceLoggingMiddleware` (named const)
- `correlationMiddleware` (named const)
- `memoryLoggingMiddleware` (named const)

**Dependencies:**

*Internal (3):*
- `../utils/logger` (utility)
- `../../config` (component)
- `../types/express.d` (type)

*External (5):*
- `express`
- `async_hooks`
- `nanoid`
- `fs`
- `path`

**Complexity:**
- Lines of Code: 172
- Dependencies: 8

**Migration Notes:**
- Uses session management - verify session store configuration
- Performs file system operations - ensure proper permissions

---

### Sentry

**File Path:** `server/shared/middleware/sentry.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `sentryUserContext` (named function)
- `sentryApiErrorHandler` (named function)
- `captureBusinessEvent` (named function)
- `capturePerformanceMetric` (named function)

**Dependencies:**

*Internal (2):*
- `../config/sentry` (component)
- `../config/environment` (component)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 102
- Dependencies: 3

**Migration Notes:**
- Uses session management - verify session store configuration

---

### SessionInit

**File Path:** `server/shared/middleware/session-init.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ensureSessionInit` (named function)

**Dependencies:**

*Internal (3):*
- `../storage` (component)
- `../services/password` (service)
- `../utils/logger` (utility)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 40
- Dependencies: 4

**Migration Notes:**
- Uses session management - verify session store configuration

---

### Validation

**File Path:** `server/shared/middleware/validation.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `validateBody` (named function)
- `validateQuery` (named function)
- `validateParams` (named function)

**Dependencies:**

*Internal (1):*
- `../types/express` (type)

*External (2):*
- `express`
- `zod`

**Complexity:**
- Lines of Code: 89
- Dependencies: 3

---

### Express.d

**File Path:** `server/shared/types/express.d.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AuthenticatedRequest` (named interface)
- `ApiResponse` (named interface)
- `ApiResponseBody` (named interface)
- `ValidationError` (named interface)
- `ApiErrorResponse` (named interface)
- `AsyncRequestHandler` (named type)
- `AuthenticatedRequestHandler` (named type)
- `SessionData` (named interface)

**Dependencies:**

*Internal (1):*
- `@shared/schema` (component)

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 48
- Dependencies: 2

---

### ExternalAi

**File Path:** `server/shared/types/external-ai.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `ExternalProvider` (named type)
- `ExternalAIConfig` (named interface)
- `ExternalAIMessage` (named interface)
- `ExternalAIResponse` (named interface)
- `ExternalAIModel` (named interface)
- `ExternalAIHealthCheck` (named interface)
- `GoogleAIConfig` (named interface)
- `AnthropicConfig` (named interface)
- `MistralConfig` (named interface)
- `OpenAIConfig` (named interface)
- `ProviderConfig` (named type)

**Dependencies:**

**Complexity:**
- Lines of Code: 61
- Dependencies: 0

---

### Rbac

**File Path:** `server/shared/types/rbac.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `RoleSchema` (named const)
- `Role` (named type)
- `PermissionSchema` (named const)
- `Permission` (named type)
- `ROLE_PERMISSIONS` (named const)
- `ROLE_HIERARCHY` (named const)
- `ROLE_DISPLAY_NAMES` (named const)

**Dependencies:**

*External (1):*
- `zod`

**Complexity:**
- Lines of Code: 45
- Dependencies: 1

---

### Session.d

**File Path:** `server/shared/types/session.d.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `SessionData` (named interface)

**Dependencies:**

*External (1):*
- `express-session`

**Complexity:**
- Lines of Code: 9
- Dependencies: 1

**Migration Notes:**
- Uses session management - verify session store configuration

---

### Errors

**File Path:** `server/shared/utils/errors.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `AppError` (named class)
- `ValidationError` (named class)
- `AuthenticationError` (named class)
- `AuthorizationError` (named class)
- `NotFoundError` (named class)
- `ConflictError` (named class)
- `RateLimitError` (named class)
- `ExternalServiceError` (named class)
- `DatabaseError` (named class)
- `isAppError` (named function)
- `isOperationalError` (named function)
- `isExternalServiceError` (named function)
- `getErrorSeverity` (named function)
- `getErrorCategory` (named function)
- `isRetryableError` (named function)
- `createValidationError` (named const)
- `createNotFoundError` (named const)
- `createAuthError` (named const)
- `createExternalServiceError` (named const)
- `createStandardError` (named const)

**Dependencies:**

**Complexity:**
- Lines of Code: 133
- Dependencies: 0

---

### Logger

**File Path:** `server/shared/utils/logger.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `logger` (default const)
- `LogContext` (named interface)
- `LogMetadata` (named interface)
- `StructuredLogEntry` (named interface)
- `SerializedError` (named interface)
- `isError` (named const)
- `isErrorWithCode` (named const)
- `serializeError` (named const)
- `requestContext` (named const)
- `Logger` (named interface)
- `log` (named const)

**Dependencies:**

*External (4):*
- `winston`
- `path`
- `async_hooks`
- `fs`

**Complexity:**
- Lines of Code: 282
- Dependencies: 4

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables
- Performs file system operations - ensure proper permissions

---

### Rbac

**File Path:** `server/shared/utils/rbac.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `hasPermission` (named function)
- `isAdmin` (named function)
- `isProUser` (named function)
- `hasRoleLevel` (named function)
- `getRolePermissions` (named function)
- `canManageUsers` (named function)
- `canAccessSystemSettings` (named function)
- `canViewAnalytics` (named function)
- `getRoleDisplayName` (named function)
- `validateRole` (named function)

**Dependencies:**

*Internal (1):*
- `../types/rbac` (type)

**Complexity:**
- Lines of Code: 61
- Dependencies: 1

---

### Response

**File Path:** `server/shared/utils/response.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `sendSuccessResponse` (named function)
- `sendErrorResponse` (named function)

**Dependencies:**

*External (1):*
- `express`

**Complexity:**
- Lines of Code: 29
- Dependencies: 1

---

### Storage

**File Path:** `server/storage.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `IStorage` (named interface)
- `FileStorage` (named class)
- `storage` (named const)

**Dependencies:**

*Internal (5):*
- `@shared/schema` (component)
- `@shared/types/api` (service)
- `./config` (component)
- `./shared/utils/logger` (utility)
- `./features/auth/services/password` (service)

*External (4):*
- `crypto`
- `fs`
- `path`
- `url`

**Complexity:**
- Lines of Code: 441
- Dependencies: 9

**Migration Notes:**
- Performs file system operations - ensure proper permissions
- Uses WebSocket connections - verify server configuration
- Handles authentication - ensure security best practices
- Large file (524 lines) - consider refactoring into smaller modules

---

### Vite

**File Path:** `server/vite.ts`

**Category:** server

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `logMessage` (named function)
- `serveStatic` (named function)

**Dependencies:**

*Internal (2):*
- `./shared/utils/logger` (utility)
- `../vite.config` (component)

*External (6):*
- `http`
- `vite`
- `vite`
- `nanoid`
- `fs`
- `path`

**Complexity:**
- Lines of Code: 75
- Dependencies: 8

**Migration Notes:**
- Performs file system operations - ensure proper permissions

---

### Tailwind.config

**File Path:** `tailwind.config.ts`

**Category:** config

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `default` (default const)

**Dependencies:**

**Complexity:**
- Lines of Code: 132
- Dependencies: 0

---

### Vite.config

**File Path:** `vite.config.ts`

**Category:** config

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `defineConfig` (default const)

**Dependencies:**

*External (4):*
- `vite`
- `@vitejs/plugin-react`
- `path`
- `@replit/vite-plugin-runtime-error-modal`

**Complexity:**
- Lines of Code: 63
- Dependencies: 4

**Migration Notes:**
- Uses NODE_ENV for environment detection
- Uses environment variables

---

### Vitest.config

**File Path:** `vitest.config.ts`

**Category:** config

**Description:** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file)

**Exports:**
- `defineConfig` (default const)

**Dependencies:**

*External (3):*
- `vite`
- `@vitejs/plugin-react`
- `path`

**Complexity:**
- Lines of Code: 35
- Dependencies: 3

---



## Migration Guide

### Overview

This project contains 377 features across 1 pages, 173 components, 0 services, 37 hooks, 23 utilities, 25 type definitions, and 118 modules. The application follows a modern React architecture.

### Recommendations

1. Start by migrating type definitions and shared utilities first
2. Migrate services and API integrations before UI components
3. Test authentication and session management thoroughly in target environment
4. Verify all environment variables are properly configured
5. Run database migrations before deploying application code
6. Consider refactoring large files before migration to improve maintainability

### Migration Challenges

#### Environment Detection

**Challenge:** 10 files contain environment-specific code

**Recommendation:** Create environment abstraction layer and configuration management system

#### Database Operations

**Challenge:** 1 files perform database operations

**Recommendation:** Verify database schema compatibility and run migrations in target environment

#### Session Management

**Challenge:** 12 files use session management

**Recommendation:** Configure session store (PostgreSQL or Redis) in target environment

#### Code Complexity

**Challenge:** 6 files exceed 500 lines of code

**Recommendation:** Consider refactoring large files into smaller, more maintainable modules

### Suggested Migration Order

Migrate in the following order (least dependent first):

1. `client/src/features/auth/types/api.ts`
2. `client/src/features/auth/types/rbac.ts`
3. `client/src/features/dashboard/types/dashboard-legacy.ts`
4. `client/src/features/templates/types/example-templates.ts`
5. `client/src/features/user-management/types/user-activity.ts`
6. `client/src/features/user-management/types/user-legacy.ts`
7. `client/src/features/user-management/types/user.ts`
8. `client/src/shared/index.ts`
9. `client/src/shared/types/branded.ts`
10. `client/src/shared/types/index.ts`
11. `client/src/test/vitest.d.ts`
12. `client/src/types/branded.ts`
13. `client/src/types/index.ts`
14. `shared/env-validation.ts`
15. `shared/schema.ts`
16. `shared/types/advanced-types.ts`
17. `shared/types/api.ts`
18. `shared/types/example-templates.ts`
19. `shared/types/external-ai.ts`
20. `shared/types/user-activity.ts`



## Dependency Graph

**Total Nodes:** 377
**Total Edges:** 960

### Most Depended Upon Files

1. `client/src/shared/components/ui/button.tsx` - 78 dependents
2. `client/src/lib/utils.ts` - 73 dependents
3. `client/src/shared/components/ui/card.tsx` - 50 dependents
4. `client/src/shared/components/ui/badge.tsx` - 36 dependents
5. `client/src/shared/hooks/use-toast.ts` - 36 dependents
6. `client/src/features/auth/index.ts` - 27 dependents
7. `client/src/features/auth/utils/secureApi.ts` - 22 dependents
8. `shared/types/api.ts` - 21 dependents
9. `client/src/shared/components/ui/input.tsx` - 20 dependents
10. `server/shared/utils/logger.ts` - 19 dependents
