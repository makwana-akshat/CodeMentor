## ADDED Requirements

### Requirement: Accordion Rendering
The system SHALL render AI responses inside an accordion UI containing predefined sections (Summary, Line-by-Line Explanation, Bug Detection, etc.).

#### Scenario: Default expansion
- **WHEN** the AI response is received and rendered
- **THEN** only the "Summary" accordion item is expanded by default, and all others are collapsed.

### Requirement: Markdown and Syntax Highlighting
The system SHALL parse markdown and render code blocks with syntax highlighting within the AI response cards.

#### Scenario: Code block rendering
- **WHEN** the AI response includes markdown code blocks
- **THEN** they are formatted elegantly using a dark syntax highlighting theme matching the application design.
