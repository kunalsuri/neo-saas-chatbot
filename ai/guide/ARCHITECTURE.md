<!-- Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. -->
# Architecture — neo-saas-chatbot

> Drafted by `/cold-start` on 2026-06-28 @ commit f6c2a30. Every claim is `[inferred]`
> unless marked `[verified in code]`. A human audits and flips tags.

## The big pieces  `[inferred]`
A single-process, full-stack TypeScript app (one repo, **not** a fork) with a clear split:

- **`client/` — React 18 SPA** `[verified in code]`. Vite-built, wouter routing, TanStack
  Query for server state, shadcn/ui (Radix) components, Sentry. Feature-sliced under
  `client/src/features/*`; shared UI/util in `client/src/shared/*`.
- **`server/` — Express API** `[verified in code]`. Bootstrapped in `server/index.ts`,
  routes mounted in `server/routes.ts`. Feature-sliced under `server/features/*`
  (each with `routes/`, `services/`, `types/`); cross-cutting middleware/utils in
  `server/shared/*`.
- **`shared/` — shared contracts** `[verified in code]`. `schema.ts` (Drizzle table
  defs + drizzle-zod + domain types), `validation.ts`, `types/*`. Imported by both
  sides via the `@shared` path alias.
- **`server/storage.ts` — persistence layer** `[verified in code]`. A JSON-file-backed
  `IStorage` implementation reading/writing `data/*.json`.
- **AI provider layer** `[verified in code]`. `server/features/model-management/services/*`
  abstracts external (OpenAI, Google AI) and local (Ollama, LM Studio) providers behind
  a factory.

## How they connect  `[inferred]`
- **Frontend ↔ backend: REST/JSON over HTTP** `[verified in code]`. All API routes are
  mounted under `/api/*` in `server/routes.ts`. The client uses TanStack Query +
  `client/src/features/auth/utils/secureApi.ts`. See `ai/analysis/diagrams/seam.mmd`.
- **Auth & sessions** `[verified in code]`. `express-session` cookie + Passport-local;
  CSRF token applied to responses (`addCsrfToken`). **Session store is in-memory
  `MemoryStore`**, not Postgres — sessions reset on restart. Dev auto-login via
  `autoLoginDev`.
- **Persistence** `[verified in code]`. Feature services call `server/storage.ts`, which
  serializes domain objects to `data/*.json`. **The Drizzle/`pgTable` schema and
  `@neondatabase/serverless` dependency are NOT wired as the runtime store** — `schema.ts`
  is used for its TypeScript types and zod insert schemas. ⚠️ Treat "we have a Postgres
  DB" as false until a human confirms otherwise.
- **Dev vs. prod serving** `[verified in code]`. In development the Express server attaches
  Vite middleware (`server/vite.ts`); in production it serves the built SPA from
  `dist/public`. Single port (default 5000) serves both API and client.
- **AI calls** `[verified in code]`. Feature routes call provider services over HTTP. A
  `ws` dependency is present but WebSocket/streaming usage is **UNVERIFIED — needs human**.

## Build & test seams  `[verified in code]`
- Build: `npm run build` = `build:client` (`vite build` → `dist/public`) + `build:server`
  (`node scripts/build-server.js`, esbuild `[inferred]` → `dist/server`).
- Dev: `npm run dev` = `tsx server/index.ts` (server hosts the Vite-driven client).
- Test: `npm test` = `vitest` (jsdom). **Frontend only** — coverage config excludes `server/`.

## Diagrams
Text-based (Mermaid) diagrams live in `ai/analysis/diagrams/`: `package-deps.mmd`,
`domain-core.mmd`, `seam.mmd`. Regenerate them via /cold-start; do not hand-maintain.

## Invariants an agent must not break  `[verified] required`
<Only humans add rows here. Candidate invariants to confirm during audit:
- "Runtime persistence is JSON files in data/ — do not introduce live DB calls without a decision."
- "Client↔server contract types live in shared/ and are imported via @shared on both sides.">
