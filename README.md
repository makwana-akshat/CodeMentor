# CodeMentor AI

An AI-powered code explanation platform where authenticated users can submit code snippets, receive explanations, documentation references, bug analysis, and continue conversations.

## Architecture & Folder Structure

```
CodeMentorAI/
├── frontend/             # React (Vite) Frontend
│   ├── src/              # Source code (components, pages, services, etc.)
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── backend/              # Python FastAPI Backend
│   ├── app/              # Core API logic, agents, db repositories
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
└── docker-compose.yml    # Root Docker Orchestration
```

## Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS
- React Router DOM
- Axios, TanStack Query
- Monaco Editor
- Clerk Authentication

**Backend:**
- Python 3.12, FastAPI, Uvicorn
- Pydantic, python-dotenv
- LangChain, DuckDuckGo Search (Placeholders)
- Supabase Python Client (Repository Pattern)

**Infrastructure:**
- Docker & Docker Compose

## Getting Started

### Local Development (Docker Setup)

1. Clone the repository.
2. Navigate to the root directory.
3. Configure Environment Variables (see below).
4. Run the application:

```bash
docker compose up --build
```

### Environment Variables

Copy `.env.example` to `.env` in both `frontend` and `backend` directories.

**Frontend (`frontend/.env`):**
- `VITE_API_BASE_URL=http://localhost:8000`
- `VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key`
- `VITE_SUPABASE_URL=your_supabase_url`
- `VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`

**Backend (`backend/.env`):**
- `GEMINI_API_KEY=your_gemini_api_key`
- `SUPABASE_URL=your_supabase_url`
- `SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key`
- `CLERK_SECRET_KEY=your_clerk_secret_key`
- `CLERK_JWT_ISSUER=https://your-issuer.clerk.accounts.dev`
- `CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key`

## Available Endpoints (Backend)
- `GET /health`
- `POST /api/explain` (Protected)
- `POST /api/chat` (Protected)
- `GET /api/history` (Protected)
- `POST /api/docs` (Protected)

## Future Roadmap
- Implement Gemini AI Integration and Agents
- Connect Repositories to real Supabase tables
- Implement Bug Detection and Conversation Memory
