<!-- Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. -->
# Feature map — feature → files, intent, gotchas

> **Drafted by `/cold-start` on 2026-06-28 — all entries `[inferred]`, audit before trusting.**
> Humans think in features; agents should too. This file holds the SHORT version —
> per-feature pointers and non-obvious notes. The full generated catalog lives in
> `ai/analysis/FEATURE_CATALOG.md` (via /create-feature-catalog).

## Cross-cutting gotchas (apply to most features)  `[inferred]`
- **Persistence is JSON files, not the DB.** `server/storage.ts` reads/writes `data/*.json`. `shared/schema.ts` (Drizzle `pgTable`) and `@neondatabase/serverless` are present but **not wired as the runtime store**. Do not assume SQL queries exist. ⚠️
- **Backend has no automated tests.** `vitest` coverage config excludes `server/`; the only tests are frontend (`client/src/**`). Verify backend changes by running the app.
- **Feature-sliced on both sides.** A feature usually spans `client/src/features/<name>/` and `server/features/<name>/`; cross via REST `/api/<name>` (`server/routes.ts`).
- **Auth is session-cookie + CSRF.** Client calls go through `client/src/features/auth/utils/secureApi.ts` + `csrf.ts`; server mounts CSRF via `addCsrfToken`. Dev has `autoLoginDev`.

## Candidate features (audit before trusting)  `[inferred]`

### Authentication & RBAC
- **Touches:** `server/features/auth/` (passport-local, bcrypt, sessions), `client/src/features/auth/` (Login, AuthContext, RouteGuard/RoleGuard), `shared/types/rbac` + `server/shared/utils/rbac.ts`.
- **Verify with:** run app + manual login; no dedicated automated suite.
- **Gotchas:** `autoLoginDev` middleware silently logs in during development (`server/routes.ts`); sessions are in-memory MemoryStore so they reset on restart.

### Chatbot (local + external models)
- **Touches:** `client/src/features/chatbot/` (`AIChatBotLocal`, `AIChatBotExternal`, chat UI), `server/features/chat/`, `server/features/model-management/`. API: `/api/chat`.
- **Gotchas:** "local" = Ollama / LM Studio; "external" = OpenAI / Google AI. Chat history persists to `data/chat_history.json`.

### Model management (AI providers)
- **Touches:** `server/features/model-management/` (services: `external-ai-*`, `google-ai`, `ollama`, `lmstudio`; factory pattern), `client/src/features/model-management/` + `settings/` provider panels. API: `/api/external-ai`, `/api/external-model-mgmt`, `/api/model-management`, `/api/ollama`, `/api/lmstudio`.
- **Gotchas:** provider abstraction via `external-ai-factory.ts`; local providers expect Ollama/LM Studio running locally.

### Translation
- **Touches:** `server/features/translation/` (+ history), `client/src/features/translate-local/` AND `client/src/features/translation/`. API: `/api/translate`.
- **Gotchas:** **two client feature folders** (`translate-local`, `translation`) — confirm which is live (see audit).

### Prompt improver / local prompt
- **Touches:** `server/features/prompt-improver/` (`promptEnhancement.ts` + history), `client/src/features/prompt-local/`. API: `/api/prompt-improver`.

### Summary
- **Touches:** `server/features/content/routes/summary.ts`, `client/src/features/summary-local-new/` (has the only co-located tests). API: registered via `registerSummaryRoutes`.

### Text manipulation
- **Touches:** `server/features/text-manipulation/`, `client/src/features/text-manipulation/`. API: `/api/text`.

### User management & profile / activity
- **Touches:** `server/features/user-management/` + `user-activity/`, `client/src/features/user-management/`. API: `/api/users`, `/api/user-profile`, `/api/user-activity`.

### Dashboard / Landing
- **Touches:** `client/src/features/dashboard/` (Dashboard, Landing, stats/charts via recharts, demo components). Mostly client-side.
- **Gotchas:** dashboard stats may be backed by the social/posts/analytics schema (`shared/schema.ts`) which is partly scaffolding — confirm what is live data vs. demo.

### Settings & monitoring
- **Touches:** `client/src/features/settings/` (Ollama/LM Studio/CDN/Sentry panels), `server/features/monitoring/` (Sentry test routes, dev-only `/api/sentry`), `server/shared/config/{sentry,cdn}.ts`.

### Content / social / templates / editor (UNSURE)
- **Touches:** `client/src/features/{content,social,templates,editor}/`. API clients exist (`content/api/{captions,images,posts,quotes}-api.ts`).
- **Gotchas:** these map to the social-media schema (`posts`, `quotes`, `templates`, `analytics`) and may be **partial / inherited scaffolding** from the project's social-content origins — confirm completeness before building on them.
