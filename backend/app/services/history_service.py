from app.database.repositories.repositories import ConversationRepository, SnippetRepository, ExplanationRepository, ChatRepository

class HistoryService:
    def __init__(self):
        self.conversation_repo = ConversationRepository()
        self.snippet_repo = SnippetRepository()
        self.explanation_repo = ExplanationRepository()
        self.chat_repo = ChatRepository()

    async def get_user_history(self, user_id: str) -> list:
        """
        Returns all conversations for a user.
        """
        conversations = self.conversation_repo.list(filters={"user_id": user_id})
        return conversations

    async def get_conversation(self, conversation_id: str) -> dict:
        """
        Returns the full context of a conversation.
        """
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
