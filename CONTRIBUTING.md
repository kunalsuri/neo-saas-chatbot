<!-- Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. -->
# Contributing to Neo SaaS Chatbot Platform

Thank you for your interest in contributing to the **Neo SaaS Chatbot Platform**! We welcome bug reports, feature requests, documentation improvements, and pull requests.

Please take a moment to review this document to make your contribution process smooth and successful.

---

## 🏗️ Codebase Rules & Boundaries

Every contributor is expected to respect the boundaries and guidelines of this repository:
1. **License Headers**: Every new source file must include the appropriate copyright header, matching existing neighbor files. For example:
   - **Markdown/HTML**: `<!-- Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. -->`
   - **TypeScript/JavaScript**: `/** Copyright (c) 2026 Kunal Suri (CEA LIST). All rights reserved. */`
2. **No Layout Churn**: Do not reorganize directories or refactor load-bearing files without prior coordination.
3. **No Configuration Churn**: Avoid rewriting, restructuring, or simplifying configuration files (`eslint.config.js`, `tsconfig.json`, `package.json`, etc.) unless strictly necessary.
4. **Zero-Config Persistence**: We default to a zero-config JSON-file-backed local storage under `data/` to keep onboarding immediate. Do not wire DBs/Drizzle at runtime for standard setups without checking first.

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js** v20.x or higher
- **npm** v10.x or higher

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kunalsuri/neo-saas-chatbot.git
   cd neo-saas-chatbot
   ```

2. **Run the OS-Specific Installation Script:**
   The installation script sets up dependencies, configures your environmental defaults, and initializes the local data directory.
   - **Windows (PowerShell):**
     ```powershell
     npm run setup:windows
     ```
   - **Linux / macOS (Bash):**
     ```bash
     npm run setup:local
     ```

3. **Configure Environment Variables:**
   A `.env` file will be created by the setup script. Open `.env` and fill in any API keys needed (e.g., `OPENAI_API_KEY`, `GEMINI_API_KEY`).

4. **Launch Local Development:**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5000`.

---

## 🧪 Testing Guidelines

We use **Vitest** for all testing needs. Please make sure all tests pass before submitting a pull request.

- **Client-side Component Tests**: These are co-located with their corresponding feature modules under `client/src/features/**/__tests__/`.
- **Backend Unit & Integration Tests**: These reside in the `/tests/` directory at the root of the project.

### Test Commands
- **Run all tests:** `npm test -- --run`
- **Run extended tests:** `npm run test:extended`
- **Generate test coverage:** `npm run test:coverage`

---

## 📦 Submitting a Pull Request

1. **Branch Naming Conventions**:
   - Features: `feature/short-description`
   - Bug fixes: `bugfix/short-description`
   - Refactor: `refactor/short-description`
   - Chore: `chore/short-description`

2. **Commit Messages**:
   Keep commit messages descriptive, outlining what changed and why.

3. **Build & Verify**:
   Make sure the project builds successfully and passes formatting rules:
   ```bash
   npm run build
   npm run lint
   ```

4. **Fill out the PR Template**:
   Provide a detailed description of the changes, verification steps, and link any related issues.
