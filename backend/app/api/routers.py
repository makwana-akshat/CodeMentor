from fastapi import APIRouter

from app.api.explain import router as explain_router
from app.api.chat import router as chat_router
from app.api.conversations import router as conversations_router
from app.api.snippets import router as snippets_router
from app.api.auth import router as auth_router
from app.api.docs import router as docs_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Auth"])
api_router.include_router(explain_router, prefix="/explain", tags=["Explain"])
api_router.include_router(chat_router, prefix="/chat", tags=["Chat"])
api_router.include_router(conversations_router, prefix="/conversations", tags=["Conversations"])
api_router.include_router(snippets_router, prefix="/snippets", tags=["Snippets"])
api_router.include_router(docs_router, prefix="/docs", tags=["Docs"])
