## Context

We are implementing the frontend of CodeMentor AI. This is a React-based SPA built with Vite, Tailwind CSS, shadcn/ui, and Monaco Editor. The layout needs to mimic ChatGPT's clean, minimalist look but must be tailored for developers interacting with code snippets.

## Goals / Non-Goals

**Goals:**
- Construct a robust structural layout: Left sidebar + Main Content area.
- Integrate Monaco Editor (`@monaco-editor/react`) tightly into the chat input mechanism.
- Implement Accordion-based cards for AI responses (Summary, Bug Detection, etc.).
- Apply smooth animations using Framer Motion (page transitions, hover states, sidebar toggle).
- Setup dark theme (using specified hex codes: `#0D1117`, `#10A37F`).

**Non-Goals:**
- Do NOT implement actual backend API integration yet. Use placeholder JSON.
- Do NOT setup Clerk authentication logic (rely on existing setup or mock state for pure UI rendering).

## Decisions

- **Tailwind Config**: We will extend the default Tailwind config to include the exact hex values (`bg-[#0D1117]`, `border-[#30363D]`, etc.) to match the dark theme requirement perfectly without relying on generic gray scales.
- **shadcn/ui Adoption**: We will use standard shadcn Accordions for the output cards to ensure accessible keyboard navigation and consistent styling.
- **Framer Motion**: Used for the Sidebar drawer transition on mobile and for staggered enter animations of the chat messages.
- **Monaco Editor**: Embedded in a resizable container at the bottom of the chat, styled to blend with the chat input area instead of looking like a separate IDE window.

## Risks / Trade-offs

- **Risk**: Monaco Editor can be heavy and delay initial page load.
  - **Mitigation**: Rely on Vite's efficient bundling and lazily load the editor component if necessary.
- **Risk**: Accordion content (markdown) might not style well out of the box with Tailwind's prose.
  - **Mitigation**: Use a custom `react-markdown` renderer to match the dark theme typography exactly, applying appropriate padding and syntax highlighting styles (`react-syntax-highlighter`).
