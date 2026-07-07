## ADDED Requirements

### Requirement: Layout and Structure
The system SHALL display a two-column layout comprising a left Sidebar and a main Chat Area.

#### Scenario: Desktop view
- **WHEN** viewed on a desktop screen (>768px)
- **THEN** the sidebar is permanently visible on the left and the chat area takes up the remaining width.

#### Scenario: Mobile view
- **WHEN** viewed on a mobile screen (<=768px)
- **THEN** the sidebar is hidden by default and accessible via a drawer toggle.

### Requirement: Monaco Editor Input
The system SHALL allow users to input code snippets using an embedded Monaco Editor.

#### Scenario: Code input
- **WHEN** a user clicks on the input area
- **THEN** they can type or paste code with syntax highlighting and line numbers.

### Requirement: Configuration Options
The system SHALL provide dropdowns for selecting the programming language and explanation level.

#### Scenario: Selecting level
- **WHEN** a user selects "Expert" from the explanation level dropdown
- **THEN** this setting is saved in the state and passed to the backend upon submission.
