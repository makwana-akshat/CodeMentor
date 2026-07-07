from app.database.repositories.repositories import ChatRepository
import uuid

class ChatService:
    def __init__(self):
        self.chat_repo = ChatRepository()

    async def follow_up_question(self, snippet_id: str, message: str) -> dict:
        """
        Placeholder method for handling follow up chat messages.
        """
        # Save user message
        user_msg = {
            "id": str(uuid.uuid4()),
            "conversation_id": snippet_id,
            "role": "user",
            "message": message
        }
        self.chat_repo.create(user_msg)
        
        # Save mock AI message
        ai_msg = {
            "id": str(uuid.uuid4()),
            "conversation_id": snippet_id,
            "role": "assistant",
            "message": f"This is a mock reply to: {message}"
        }
        self.chat_repo.create(ai_msg)
        
        return {
            "reply": ai_msg["message"],
            "context_used": True
        }
