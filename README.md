<div align="center">
  <h1>🤖 Neo SaaS Chatbot Platform</h1>
  <p><b>A modern multi-LLM chatbot SaaS platform built with React 19, Node.js, and Express.</b></p>

  <p>Seamlessly orchestrates cloud-based models (OpenAI GPT, Google Gemini) and local offline LLMs (Ollama, LM Studio) behind an authenticated, role-based, secure Single Page Application (SPA).</p>

  <div style="margin: 20px 0;">
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node.js-%3E%3D_20.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js version"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript version"></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/react-v19.x-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React version"></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite version"></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express version"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  </div>

  <p><i>Crafted by blending Human Intellect with Agentic AI Systems.</i></p>
</div>

---

## ✨ Key Capabilities & Features

The platform is designed around a modular **Feature-Driven Architecture**, making it clean to expand, scale, and maintain.

### 🤖 Multi-LLM Orchestration
- **Cloud AI Providers**: Integrated API connectors for OpenAI (GPT series) and Google AI Studio (Gemini series).
- **Local Offline Engines**: Support for locally-served LLMs using [Ollama](https://ollama.com) or [LM Studio](https://lmstudio.ai).
- **Live Model Configs**: A dynamic settings panel to easily switch and configure different models.

### ⚡ Feature-Rich AI Slices
- **Interactive ChatBot**: Direct real-time chatting interface with session saving, history caching, and conversational recall.
- **Multilingual Translator**: Translate text between multiple target languages with a persistent translation history.
- **Prompt Improver**: Automatically refine, detail, and optimize raw prompts using localized AI assistance.
- **Document Summarizer**: Instant TL;DR and smart digests for long articles, code snippets, or documents.
- **Text Manipulation**: Modify formatting, tone, style, and structure on the fly.

### 🔒 SaaS Infrastructure
- **Secure Sessions**: Passport-local authentication schema coupled with Express-session storage.
- **Web Protections**: Embedded CSRF token generation and validation, secure cookies, and Zod schema input validation.
- **Role-Based Access Control (RBAC)**: Custom routing guards restricting access based on user tier constraints.
- **Error Monitoring**: Real-time error catching and client-side tracking using [Sentry](https://sentry.io).

---

## 🏗️ Architecture & Codebase Map

This codebase uses **Feature-Driven Development (FDD)** layout where views, state hooks, and API handlers are grouped together by feature domain:

```
├── client/                  # Frontend SPA
│   └── src/
│       ├── features/        # Self-contained UI slices (chatbot, auth, settings, user-mgmt)
│       ├── shared/          # Reusable components (shadcn/ui), hooks, layouts
│       └── lib/             # Integrations & clients (Sentry setup, queryClient)
├── server/                  # Backend API (Express + TypeScript)
│   ├── features/            # API endpoints & controller logic (auth, chat, summary, translation)
│   └── shared/              # Express middlewares (CSRF, sessions, RBAC, logger)
├── shared/                  # Shared Zod validation schemas & TypeScript types
├── data/                    # Zero-config local JSON database directory
└── scripts/                 # Server builds, CDNs, and setup automation
```

> 📂 **Zero-Config Database Persistence (`IStorage`)**:
> To enable instantaneous local onboarding, this application defaults to storing data (users, chat histories, settings) inside local JSON files in the `./data/` folder. Drizzle schemas are utilized for type safety, meaning **no active PostgreSQL database setup is required** to develop or host locally.

---

## 🚀 Quick Start (3 Minutes)

### Prerequisites
- **Node.js** v20.x or higher
- **npm** v10.x or higher
- *(Optional)* A running instance of **Ollama** or **LM Studio** for local AI execution.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kunalsuri/neo-saas-chatbot.git
   cd neo-saas-chatbot
   ```

2. **Run the Automated Setup:**
   Run the interactive installer tailored for your operating system. It will check prerequisites, install node modules, configure environmental defaults, and seed local test databases:
   
   *   **Windows (PowerShell):**
       ```powershell
       npm run setup:windows
       ```
   *   **Linux / macOS (Bash):**
       ```bash
       npm run setup:local
       ```

3. **Launch Local Development:**
   Start the hot-reloading development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to **`http://localhost:5000`** to access the platform.

---

## ⚙️ Configuration (`.env`)

Copy the template config file to customize keys:
```bash
cp .env.development.example .env
```

| Environment Key | Purpose | Default |
|---|---|---|
| `PORT` | Local host listener port | `5000` |
| `NODE_ENV` | Application environment state | `development` |
| `OPENAI_API_KEY` | OpenAI API key for GPT models | *(Optional)* |
| `GEMINI_API_KEY` | Google Gemini API key | *(Optional)* |
| `OLLAMA_BASE_URL` | Endpoint for local Ollama instances | `http://localhost:11434` |
| `LM_STUDIO_API_URL` | Endpoint for local LM Studio API | `http://localhost:1234/v1` |

---

## 🛠️ Developer Scripts

Manage, build, and test your local environment using these npm commands:

| Command | Description |
|---|---|
| `npm run dev` | Start the development server (runs Express and hosts Vite client) |
| `npm run build` | Bundle frontend static assets (`vite build`) and backend server (`esbuild`) |
| `npm test` | Run the Vitest test runner (unit and component testing) |
| `npm run lint` | Inspect codebase for syntax and style guidelines using ESLint |
| `npm run clean` | Delete temporary caching and previous build directories (`dist`) |

---

## 🧪 Testing

Execute client component tests, backend unit tests, and API integration tests:
```bash
# Run all tests (client + backend)
npm test

# Run the extended backend test suite only
npm run test:extended

# Run all tests with code coverage analysis
npm run test:all
```

The test files are organized as follows:
* **Client UI & Component Tests**: Co-located within the `client/` directory (e.g., `client/src/features/summary-local-new/__tests__`).
* **Backend Unit & Integration Tests**: Located under the `/tests/` directory (e.g., `tests/unit` and `tests/integration`).

---

<details>
<summary>⚖️ <b>License & Disclaimer (Click to expand)</b></summary>
<br>

### 📄 License
This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

### ⚠️ Disclaimer
This project has been developed using a combination of AI-assisted software development and whiteboarding tools, including (but not limited to) Visual Studio Code, GitHub Copilot Pro, Windsurf, Cursor, and Krio, with Human-in-the-Loop supervision and review.

While every reasonable precaution has been taken, including AI-generated code validation, malware scanning, and static analysis using tools such as CodeQL — the authors and contributors do not accept any responsibility for potential errors, security vulnerabilities, or unintended behavior within the generated code.

This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement.

Use this project at your own discretion and risk. Please review and validate any AI-generated code before committing or merging changes.
</details>
