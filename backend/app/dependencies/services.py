from fastapi import Depends
from app.services.explanation_service import ExplanationService
from app.services.chat_service import ChatService
from app.services.conversation_service import ConversationService

# These dependency functions will eventually take Repositories and other clients as parameters
# and inject them into the services.

def get_explanation_service() -> ExplanationService:
    return ExplanationService()

def get_chat_service() -> ChatService:
    return ChatService()

def get_conversation_service() -> ConversationService:
    return ConversationService()
