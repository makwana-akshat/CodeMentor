from app.database.repositories.repositories import ConversationRepository, SnippetRepository, ExplanationRepository, ChatRepository
from app.ai.agent.code_agent import CodeAgent
import asyncio

class ConversationService:
    def __init__(self):
        self.conversation_repo = ConversationRepository()
        self.snippet_repo = SnippetRepository()
        self.explanation_repo = ExplanationRepository()
        self.chat_repo = ChatRepository()
        self.agent = CodeAgent()

    async def get_user_history(self, user_id: str) -> list:
        return self.conversation_repo.get_user_conversations(user_id)

    async def get_conversation(self, conversation_id: str) -> dict:
        conversation = self.conversation_repo.get_by_id(conversation_id)
        if not conversation:
            return None
            
        snippets = self.snippet_repo.list(filters={"conversation_id": conversation_id}, order_by="created_at", ascending=True)
        explanations = self.explanation_repo.list(filters={"conversation_id": conversation_id}, order_by="created_at", ascending=True)
        chat_history = self.chat_repo.list(filters={"conversation_id": conversation_id}, order_by="created_at", ascending=True)
        
        return {
            "conversation": conversation,
            "snippets": snippets,
            "explanations": explanations,
            "chat_history": chat_history
        }

    async def delete_conversation(self, conversation_id: str):
        # Snippets, Explanations, and Chat history have ON DELETE CASCADE in DB
        self.conversation_repo.delete(conversation_id)
        return True

    async def rename_conversation(self, conversation_id: str, new_title: str):
        self.conversation_repo.update(conversation_id, {"title": new_title})
        return True

    async def generate_auto_title(self, conversation_id: str, code: str):
        """
        Background task to auto-generate a title based on the original code.
        """
        try:
            # We use the chat endpoint of our agent with a specific short prompt
            title = await self.agent.chat(f"Code snippet: {code[:500]}", "Generate a very short, 3-5 word title for a conversation about this code. Return ONLY the title string, no quotes.")
            title = title.strip().strip('"').strip("'")
            if title:
                self.conversation_repo.update(conversation_id, {"title": title})
        except Exception as e:
            # If auto-titling fails, it's not a critical error
            pass
