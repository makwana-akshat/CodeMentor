-- =========================================================
-- CodeMentor AI - Database Seed
-- =========================================================
-- WARNING: Do not run this in production. This clears data.

TRUNCATE TABLE chat_history CASCADE;
TRUNCATE TABLE explanations CASCADE;
TRUNCATE TABLE code_snippets CASCADE;
TRUNCATE TABLE conversations CASCADE;
TRUNCATE TABLE users CASCADE;

-- 1. Seed User
INSERT INTO users (id, clerk_user_id, email, first_name, last_name, profile_image)
VALUES ('00000000-0000-0000-0000-000000000001', 'clerk_test_123', 'test@example.com', 'Test', 'User', 'https://example.com/avatar.png');

-- 2. Seed Conversation
INSERT INTO conversations (id, user_id, title, language)
VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Understanding Python Lists', 'python');

-- 3. Seed Code Snippet
INSERT INTO code_snippets (id, conversation_id, language, source_code)
VALUES ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'python', 'def get_first(items):\n    return items[0]');

-- 4. Seed Explanation
INSERT INTO explanations (id, conversation_id, explanation_level, summary, line_by_line, documentation, bugs, complexity, analogy)
VALUES (
    '00000000-0000-0000-0000-000000000004', 
    '00000000-0000-0000-0000-000000000002', 
    'beginner',
    '{"text": "This function returns the first item from a list."}',
    '[{"line": 1, "explanation": "Defines the function"}, {"line": 2, "explanation": "Returns index 0"}]',
    '[]',
    '["Fails if list is empty"]',
    '{"time": "O(1)", "space": "O(1)"}',
    'Like picking the first book off a shelf.'
);

-- 5. Seed Chat History
INSERT INTO chat_history (id, conversation_id, role, message)
VALUES 
('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'user', 'What if the list is empty?'),
('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 'assistant', 'If the list is empty, Python will throw an IndexError.');
