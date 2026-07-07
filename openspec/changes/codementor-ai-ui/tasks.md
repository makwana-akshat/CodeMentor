## 1. Global Setup & Theming

- [x] 1.1 Update `tailwind.config.js` with the exact color palette (bg-[#0D1117], sidebar-[#161B22], cards-[#21262D], accent-[#10A37F]).
- [x] 1.2 Import and apply the 'Inter' font globally.
- [x] 1.3 Install and configure required `shadcn/ui` components (Accordion, Button, Card).

## 2. Layout Skeleton

- [x] 2.1 Build the collapsible `Sidebar` component (280px width, containing Logo, New Chat button, History, Profile).
- [x] 2.2 Build the `MainLayout` shell managing the Sidebar state and top navigation bar.
- [x] 2.3 Implement Framer Motion transitions for the Sidebar mobile drawer effect.

## 3. Chat Input & Monaco Editor

- [x] 3.1 Install `@monaco-editor/react`.
- [x] 3.2 Build the `CodeInput` component embedding Monaco Editor, tailored to the dark theme.
- [x] 3.3 Add Language and Explanation Level dropdowns above the editor.
- [x] 3.4 Build the primary "Explain Code" submit button.

## 4. AI Response Cards & Formatting

- [x] 4.1 Create dummy JSON data representing an AI response (Summary, Bugs, Complexity, etc.).
- [x] 4.2 Build the `AIResponseAccordion` component utilizing `shadcn` Accordion to map over response sections.
- [x] 4.3 Integrate `react-markdown` and `react-syntax-highlighter` to format the Accordion content beautifully.
- [x] 4.4 Set the "Summary" section to be expanded by default.

## 5. Polish & Integration

- [x] 5.1 Add Framer Motion staggered enter animations for new chat messages.
- [x] 5.2 Implement the persistent "Follow-up Chat" input field below responses.
- [x] 5.3 Test responsiveness and contrast (ensure buttons and inputs match ChatGPT styling).
