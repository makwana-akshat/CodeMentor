from app.database.repositories.repositories import ChatRepository
from app.services.context_builder import ConversationContextBuilder
from app.ai.agent.code_agent import CodeAgent
import uuid
import datetime

class ChatService:
    def __init__(self):
        self.chat_repo = ChatRepository()
        self.context_builder = ConversationContextBuilder()
        self.agent = CodeAgent()

    async def follow_up_question(self, user_id: str, conversation_id: str, message: str) -> dict:
        """
        Handles follow up chat messages by reconstructing context and calling AI.
        """
        # 1. Save user message
        user_msg = {
            "id": str(uuid.uuid4()),
            "conversation_id": conversation_id,
            "role": "user",
            "message": message,
            "created_at": datetime.datetime.utcnow().isoformat()
        }
        self.chat_repo.create(user_msg)
        
        # 2. Build context
        try:
            context_block = self.context_builder.build_context(user_id, conversation_id)
        except Exception as e:
            # If conversation is not found or fails to build
            raise ValueError(f"Failed to build context: {str(e)}")
            
        # 3. Call AI
        ai_reply_text = await self.agent.chat(context_block, message)
        
        # 4. Save AI message
        ai_msg = {
            "id": str(uuid.uuid4()),
            "conversation_id": conversation_id,
            "role": "assistant",
            "message": ai_reply_text,
            "created_at": datetime.datetime.utcnow().isoformat()
        }
        self.chat_repo.create(ai_msg)
        
        return {
            "answer": ai_reply_text,
            "conversation_id": conversation_id
        }
