<!-- Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. -->
# Project overview — neo-saas-chatbot

> Drafted by `/cold-start` on 2026-06-28 (first-run 2026-06-28); every `[inferred]`
> section is a guess until a human audits it.

## What this is
**SaaS AI ChatBot NEO Platform** — a modern, full-stack TypeScript SaaS chatbot with a
Feature-Driven Architecture, multiple AI providers (local + cloud), and a polished UI.
> Crafted with ❤️ in Paris by [kunalsuri](https://github.com/kunalsuri), blending Human
> Intellect with Agentic AI Systems (Human-in-the-Loop).

## Stack (from `ai/repo-profile.json` — deterministic)
- Languages: TypeScript/JavaScript
- Build: `npm install && npm run build`  `[verified in package.json]`
- Test:  `npm test`  (= `vitest`, jsdom, **frontend only**)  `[verified in package.json]`
- Frontend: React 18 · Vite 5 · wouter · TanStack Query · shadcn/ui (Radix) · Tailwind · Sentry
- Backend: Express 4 · Passport-local · express-session · Winston · Sentry · OpenAI/Google/Ollama/LM Studio
- Shared: Drizzle ORM + drizzle-zod + Zod (type/schema layer)

> **Note for the auditor:** the wizard recorded stack `kind: single`, but the repo is a
> **split** client/server/shared layout. Mapped as a split throughout `ai/guide/`. Confirm.

## Why it exists  `[inferred]`
Provides a self-hostable AI chatbot platform where a user can chat against either local
LLMs (Ollama, LM Studio) or cloud providers (OpenAI, Google AI), plus adjacent text/AI
utilities (translation, summarization, prompt improvement, text manipulation) behind an
authenticated, RBAC-aware SPA. Targets developers/teams wanting one UI over many model
backends with enterprise-style concerns (auth, CSRF, logging, monitoring).

## What is load-bearing vs. aspirational  `[inferred]`
Not a fork — all code is "ours". The meaningful distinction here is **live** vs.
**scaffolding/aspirational**:
- **Load-bearing & active (`ours`):** the AI feature slices (`chatbot`, `model-management`,
  `translation`, `prompt-improver`/`prompt-local`, `summary`, `text-manipulation`), auth,
  user-management, and the shared UI kit.
- **Cross-cutting infra (`stable`):** `server/shared/*` middleware/utils, `client/src/shared/*`,
  build scripts, config.
- **⚠️ Documentation/reality drift to resolve (audit):**
  - README & badges advertise **"Drizzle ORM with a PostgreSQL database"**, but runtime
    persistence is **JSON files** (`server/storage.ts` → `data/*.json`); the Drizzle schema
    supplies types only and no `drizzle.config.ts` exists.
  - README advertises **"comprehensive testing / high coverage"**, but `vitest` coverage
    **excludes `server/`** and only a handful of frontend tests exist.
  - The Drizzle schema models a **social-media content** domain (`posts`, `quotes`,
    `templates`, `analytics`, scheduling/engagement). Client `content/social/templates/editor`
    features map to it and may be **partial scaffolding** from the project's origins. Confirm
    what is live vs. demo.

## Glossary  `[inferred]`
| Term | Meaning here |
|---|---|
| Local model | LLM served by Ollama or LM Studio on the user's machine |
| External model | Cloud LLM provider (OpenAI, Google AI) |
| Feature slice | A `features/<name>/` folder mirrored on client (`routes/services/types` on server) |
| `IStorage` | The persistence interface in `server/storage.ts`, backed by `data/*.json` |
| RBAC / role | Role-based access (`RoleSchema`, `server/shared/utils/rbac.ts`); user plans free→enterprise |
| `@shared` | Path alias to `shared/` (contracts imported by both client and server) |
