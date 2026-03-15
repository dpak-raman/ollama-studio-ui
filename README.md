# Ollama Studio UI

A ChatGPT-like web interface for your locally running [Ollama](https://ollama.com) instance. Built with Next.js 14, MUI, Zustand, TanStack Query, and MongoDB.

---

## Prerequisites

- **Node.js** 18 or later
- **MongoDB** running locally on port `27017` (or any accessible URI)
- **Ollama** running locally on port `11434` with at least one model pulled

```bash
# Pull a model if you haven't yet
ollama pull llama3
```

---

## Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd ollama-studio-ui

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Edit .env.local if your MongoDB or Ollama run on non-default ports

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
src/
  app/                    Next.js App Router (pages + API routes)
    api/
      conversations/      CRUD for conversations
      conversations/[id]/messages/  Chat messages + Ollama proxy
      ollama/models/      Proxy to Ollama /api/tags
      ollama/chat/        Proxy to Ollama /api/chat
  components/
    chat/                 ChatWindow, MessageBubble, MessageInput, TypingIndicator
    sidebar/              Sidebar, ConversationList, ConversationItem, NewChatButton
    settings/             SettingsDrawer, ModelSelector, ParameterSliders, SystemPromptEditor
    layout/               AppShell, TopBar, ThemeToggle
    shared/               MarkdownRenderer, CodeBlock, CopyButton, ContextWindowBar
  hooks/                  TanStack Query + custom hooks
  lib/
    db/                   Mongoose connection + models
    ollama/               Typed Ollama REST client
    validators/           Zod schemas
    utils/                Helpers (formatDate, cn, token estimation)
  store/                  Zustand stores (chat, settings, ui)
  types/                  Global TypeScript interfaces
  __tests__/              Vitest unit tests
```

---

## Testing

```bash
# Run all tests once
npm test

# Watch mode
npm run test:watch

# With coverage report
npm run test:coverage
```

Tests are located in `src/__tests__/` and mirror the `src/` structure. They use Vitest + React Testing Library.

---

## How to Add a New Ollama Model

1. Pull the model with Ollama:
   ```bash
   ollama pull mistral
   ```
2. Open the Settings drawer in the UI (gear icon in the top bar).
3. Select the new model from the **Model** dropdown — it will appear automatically once pulled.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MONGODB_URI` | `mongodb://localhost:27017/ollama-chat` | MongoDB connection string |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server base URL (server-side default) |

The Ollama Base URL can also be changed per-session from the Settings drawer without restarting the server.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | MUI (Material UI v5) + Tailwind CSS |
| State | Zustand |
| Server state | TanStack Query v5 |
| Database | MongoDB + Mongoose |
| Validation | Zod |
| Theming | next-themes |
| Markdown | react-markdown + rehype-highlight |
| Testing | Vitest + React Testing Library |
