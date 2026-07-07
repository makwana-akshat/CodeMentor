from fastapi import Depends
from app.services.explanation_service import ExplanationService
from app.services.chat_service import ChatService
from app.services.history_service import HistoryService

# These dependency functions will eventually take Repositories and other clients as parameters
# and inject them into the services.

def get_explanation_service() -> ExplanationService:
    return ExplanationService()

def get_chat_service() -> ChatService:
    return ChatService()

def get_history_service() -> HistoryService:
    return HistoryService()
