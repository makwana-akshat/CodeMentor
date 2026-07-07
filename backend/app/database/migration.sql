-- =========================================================
-- CodeMentor AI - Database Migrations
-- =========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- TABLES
-- =========================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    profile_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Conversations Table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    language TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Code Snippets Table
CREATE TABLE IF NOT EXISTS code_snippets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    language TEXT,
    source_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Explanations Table
CREATE TABLE IF NOT EXISTS explanations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    explanation_level TEXT,
    summary JSONB,
    line_by_line JSONB,
    documentation JSONB,
    bugs JSONB,
    complexity JSONB,
    analogy TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Chat History Table
CREATE TABLE IF NOT EXISTS chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- INDEXES
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_code_snippets_conversation_id ON code_snippets(conversation_id);
CREATE INDEX IF NOT EXISTS idx_code_snippets_language ON code_snippets(language);
CREATE INDEX IF NOT EXISTS idx_explanations_conversation_id ON explanations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_conversation_id ON chat_history(conversation_id);

-- =========================================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE explanations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Note: RLS policies require a way to identify the current user.
-- If using Clerk with Supabase custom JWTs, auth.uid() can be used.
-- Since backend connects with Service Role, these policies are bypassed by the backend
-- but they protect the DB from direct client queries.

-- Users: Users can only see and update their own record
CREATE POLICY users_select_policy ON users FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');
CREATE POLICY users_update_policy ON users FOR UPDATE USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Conversations: Users can manage their own conversations
CREATE POLICY conversations_all_policy ON conversations FOR ALL USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub')
);

-- Code Snippets: Inherits access from conversation
CREATE POLICY snippets_all_policy ON code_snippets FOR ALL USING (
    conversation_id IN (
        SELECT id FROM conversations WHERE user_id IN (
            SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    )
);

-- Explanations: Inherits access from conversation
CREATE POLICY explanations_all_policy ON explanations FOR ALL USING (
    conversation_id IN (
        SELECT id FROM conversations WHERE user_id IN (
            SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    )
);

-- Chat History: Inherits access from conversation
CREATE POLICY chat_history_all_policy ON chat_history FOR ALL USING (
    conversation_id IN (
        SELECT id FROM conversations WHERE user_id IN (
            SELECT id FROM users WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    )
);
