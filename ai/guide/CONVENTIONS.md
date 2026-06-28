<!-- Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. -->
# Conventions — how to write code that fits neo-saas-chatbot

> Drafted by `/cold-start` on 2026-06-28. Observations are `[inferred]` from reading
> code/config; a human confirms and adds the rules that live only in heads.

## Languages & style  `[inferred]`
- TypeScript throughout (TS 5.6, ESM — `"type": "module"`). React 18 + TSX on the client.
- Lint: **ESLint flat config** (`eslint.config.js`), `npm run lint` runs with
  `--max-warnings 0` — warnings fail. Type-check via `npm run type-check` (`tsconfig.dev.json`)
  or `type-check:strict`.
- No Prettier config found; match surrounding formatting (2-space indent observed).
- **License header on every source file** — copy from a neighbor:
  `/** Copyright 2025 Kunal Suri — Licensed under the Apache License 2.0 (see LICENSE file) */`
  (Note: files under `ai/` use a different `CEA LIST` header — don't mix them.)

## Patterns to follow  `[inferred]`
- **Feature-sliced architecture.** Add a feature as `client/src/features/<name>/`
  (mirror the existing `index.ts` + `components/` + `hooks/` + `api/` + `types.ts` layout)
  and `server/features/<name>/{routes,services,types}/`. Exemplars: `server/features/translation/`,
  `client/src/features/summary-local-new/`.
- **Server route registration** is centralized in `server/routes.ts` (`app.use("/api/<name>", router)`);
  add new routers there.
- **Path aliases:** `@` → `client/src`, `@shared` → `shared`, `@assets` → `attached_assets`
  (client/server share types via `@shared`). Use them instead of deep relative paths.
- **Validation with Zod** at boundaries; insert schemas derived via `drizzle-zod` in
  `shared/schema.ts`. Shared contract types live in `shared/` — define once, import both sides.
- **Server state on the client = TanStack Query** (`client/src/lib/queryClient.ts`); pages
  are `lazy()` + `Suspense` (see `client/src/App.tsx`). UI uses shadcn/ui in
  `client/src/shared/components/ui/`.
- **Error handling (server):** throw/normalize via `server/shared/utils/{errors,response}.ts`
  and the `errorHandler` middleware; log via Winston (`server/shared/utils/logger.ts`),
  not `console.*`. Sentry is wired top-of-stack.
- **Persistence:** go through `server/storage.ts` (`IStorage`) — do **not** add ad-hoc file
  I/O or introduce live DB calls without a human decision (see ARCHITECTURE ⚠️).
- **Tests:** Vitest + Testing Library, **co-located** (`*.test.ts(x)` or `__tests__/`).
  Setup in `client/src/test/setup.ts`. Backend is currently untested — verify server
  changes by running the app.

## Things that look wrong but are right  `[verified] required`
<Only humans add rows. Candidates to confirm:
- "JSON-file storage instead of the Drizzle/Postgres the README advertises — intentional (for now)?"
- "Two translation client folders (translate-local, translation) — which is canonical?">

## Definition of done
- Builds: `npm install && npm run build`
- Tests pass: `npm test`
- Lint clean (`npm run lint`, max-warnings 0) and type-checks.
- License headers match neighbors; diffs are surgical; ai/ knowledge updated if the
  change moved or added modules/features.
