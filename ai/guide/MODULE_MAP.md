<!-- Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. -->
# Module map — directory → responsibility → entry point

> **Drafted by `/cold-start` on 2026-06-28 — every row is `[inferred]` and every
> Stability value is a GUESS pending human audit.** Find the area here, then open the
> entry file directly. Don't crawl the tree. The directory list can be regenerated;
> **Responsibility** and **Stability** are judgement and must be audited by a human.
> Last drafted: 2026-06-28 @ commit f6c2a30

## Stability legend (the most important column)
- `frozen` — inherited / load-bearing legacy. **DO NOT edit** without explicit instruction.
- `stable` — works; change carefully and with tests.
- `ours`   — active development surface. Safe for agents to modify.
- `?`      — not yet audited. **Treat as `frozen` until a human decides.**

> Not a fork (no `upstream` remote). Single author (kunalsuri). So no inherited
> `frozen` upstream — the split below is **active feature surface (`ours`)** vs.
> **cross-cutting infrastructure (`stable`, change carefully)**. All guesses `[inferred]`.

## Backend — `server/`  (Express + TypeScript, run via `tsx`/esbuild)
| Directory / file | Responsibility (one line) | Entry point | Stability `[inferred]` |
|---|---|---|---|
| `server/` | Express app bootstrap: Sentry init, middleware stack, config validation, listen | `server/index.ts` | stable |
| `server/routes.ts` | Mounts all feature routers under `/api/*`, session + CSRF + static serving | `server/routes.ts` | stable |
| `server/storage.ts` | **Data access layer — JSON-file-backed `IStorage` (`./data/*.json`), NOT the Drizzle DB** ⚠️ | `server/storage.ts` | ? — UNSURE (see audit) |
| `server/config.ts` | Server-side config object | `server/config.ts` | stable |
| `server/vite.ts` | Vite dev-middleware + static serving of `dist/public` | `server/vite.ts` | stable |
| `server/features/auth/` | Passport-local auth, login/session routes, password hashing (bcrypt) | `routes/auth.ts` | ours |
| `server/features/chat/` | Chat endpoint + service (OpenAI-compatible) | `routes/chat.ts` | ours |
| `server/features/translation/` | Translation + translation history | `routes/translation.ts` | ours |
| `server/features/prompt-improver/` | Prompt enhancement + history | `routes/prompt-improver.ts` | ours |
| `server/features/text-manipulation/` | Text transform endpoints | `routes/text-manipulation.ts` | ours |
| `server/features/content/` | Summaries + example templates | `routes/summary.ts` | ours |
| `server/features/model-management/` | AI provider integration: external (OpenAI, Google) + local (Ollama, LM Studio) | `routes/model-management.ts` | ours |
| `server/features/user-management/` | User CRUD + profile | `routes/user-management.ts` | ours |
| `server/features/user-activity/` | User activity tracking | `routes/user-activity.ts` | ours |
| `server/features/monitoring/` | Sentry test routes (dev only) | `routes/test-sentry.ts` | stable |
| `server/shared/` | Cross-cutting: middleware (auth, csrf, logging, errorHandler, session-init, cdn, sentry, validation), config, utils (logger, rbac, errors, response), types | `server/shared/middleware/` | stable |

## Frontend — `client/src/`  (React 18 + Vite + wouter + TanStack Query + shadcn/ui)
| Directory / file | Responsibility (one line) | Entry point | Stability `[inferred]` |
|---|---|---|---|
| `client/src/` | App bootstrap + provider tree (Query, Theme, Auth, User) + wouter routing | `main.tsx` → `App.tsx` | stable |
| `client/src/features/auth/` | Login, AuthContext, route/role guards, CSRF + secure API utils, RBAC | `components/Login.tsx` | ours |
| `client/src/features/chatbot/` | Chat UI (local + external models), history, chat bubbles/input | `components/AIChatBotLocal.tsx` | ours |
| `client/src/features/dashboard/` | Dashboard, Landing, stats/charts, demo components | `components/Dashboard.tsx` | ours |
| `client/src/features/model-management/` | Local + external model management UI, provider config hooks | `components/LocalModelManagement.tsx` | ours |
| `client/src/features/settings/` | Settings + provider config panels (Ollama, LM Studio, CDN, Sentry) | `components/Settings.tsx` | ours |
| `client/src/features/prompt-local/` | Local prompt interface + history + modes | `components/PromptLocalPage.tsx` | ours |
| `client/src/features/summary-local-new/` | Local summary feature (has the only co-located tests) | `index.ts` | ours |
| `client/src/features/translate-local/` · `translation/` | Translation UIs (two feature folders — see audit) | `index.ts` | ours |
| `client/src/features/text-manipulation/` | Text manipulation UI | `index.ts` | ours |
| `client/src/features/content/` · `social/` · `templates/` · `editor/` | Content/social/template/editor surfaces (some may be partial — see audit) | `api/` / `index.ts` | ? — UNSURE |
| `client/src/features/user-management/` | User management UI + UserContext | `index.ts` | ours |
| `client/src/shared/` | Shared UI (shadcn/ui in `components/ui`), api client, hooks, layout, types, utils | `components/ui/` | stable |
| `client/src/lib/` | `queryClient`, Sentry wiring, `utils` (has `utils.test.ts`) | `lib/queryClient.ts` | stable |
| `client/src/config/` · `styles/` · `types/` · `pages/` · `test/` | Env/theme config, global CSS, shared types, `not-found` page, vitest setup | `test/setup.ts` | stable |

## Shared & tooling
| Directory / file | Responsibility (one line) | Entry point | Stability `[inferred]` |
|---|---|---|---|
| `shared/schema.ts` | Drizzle `pgTable` defs + drizzle-zod insert schemas + domain types (`User`, `Post`, `Quote`, `Template`, `Analytics`) — **source of types; DB not wired at runtime** ⚠️ | `shared/schema.ts` | ? — UNSURE (see audit) |
| `shared/validation.ts` · `env-validation.ts` · `types/` | Zod validation, env validation, shared API/domain types (shared by client + server via `@shared`) | `shared/validation.ts` | stable |
| `data/` | **Runtime JSON persistence** (`users.json`, `posts.json`, `chat_history.json`, …) written by `server/storage.ts` ⚠️ | `data/*.json` | ? — UNSURE (see audit) |
| `scripts/` | Build (`build-server.js` = esbuild `[inferred]`), setup, Sentry/CDN setup, manifest validate/sync | `scripts/build-server.js` | stable |
| `docs/` | Project documentation | — | ? |

Detected test locations (from orient + glob): vitest config `setupFiles: ./client/src/test/setup.ts`; tests co-located —
`client/src/features/summary-local-new/__tests__/` (3), `client/src/lib/utils.test.ts`, `client/src/shared/components/ui/button.test.tsx`.
**Coverage config excludes `server/` — backend has no automated tests.** `[inferred]`

## Audit protocol
1. /cold-start fills rows and tags them `[inferred]`.
2. A human sets Stability per row and flips confirmed rows to `[verified] (date)`.
3. Agents treat `?` rows as `frozen`. Agents never flip tags.

Field guide for the human audit (how to decide, evidence bar, worked rows):
https://github.com/kunalsuri/ai-fication-kit/blob/main/docs/AUDIT-GUIDE.md
