## Why

We are building "CodeMentor AI" for a GenAI Hackathon. The goal is to create an intelligent coding assistant that helps developers understand, analyze, and improve code. The application needs a production-ready, highly polished frontend UI that looks and feels like ChatGPT but is optimized for developers with built-in code editors and structured explanations.

## What Changes

- Implement a two-column responsive layout (Sidebar + Main Chat Area).
- Integrate Monaco Editor for code input with language and explanation level selection.
- Build an expandable accordion-based UI for AI responses covering Summary, Line-by-Line, Bugs, Docs, Complexity, Best Practices, Security, and Analogies.
- Apply a strict dark-theme developer aesthetic (Inter font, #0D1117 background, #10A37F accent).
- Ensure smooth animations using Framer Motion and accessible shadcn/ui components.
- Mock AI responses with realistic static JSON data.

## Capabilities

### New Capabilities
- `chat-interface`: Core chat UI including Sidebar, Monaco Editor input, and message history.
- `ai-response-cards`: Structured accordion layout for rendering complex AI explanations.

### Modified Capabilities
- None

## Impact

This introduces a completely new React (Vite) frontend layer inside the repository. It relies on standard modern frontend tooling (Tailwind, shadcn, Framer Motion) and does not yet connect to backend APIs (uses static data).
