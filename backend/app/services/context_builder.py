from app.database.repositories.repositories import SnippetRepository, ExplanationRepository, ChatRepository

class ConversationContextBuilder:
    def __init__(self):
        self.snippet_repo = SnippetRepository()
        self.explanation_repo = ExplanationRepository()
        self.chat_repo = ChatRepository()

    def build_context(self, user_id: str, conversation_id: str, limit: int = 6) -> str:
        """
        Fetches the original snippet, explanation, and recent messages.
        Constructs a formatted string for the AI prompt context.
        """
        # 1. Fetch Code Snippet
        snippet = self.snippet_repo.get_by_conversation(user_id, conversation_id)
        if not snippet:
            raise ValueError(f"No code snippet found for conversation {conversation_id}")
            
        code = snippet.get("code", "")
        language = snippet.get("language", "")
        
        # 2. Fetch Original Explanation
        explanation = self.explanation_repo.get_by_conversation(user_id, conversation_id)
        explanation_summary = ""
        if explanation:
            explanation_summary = explanation.get("summary", "")

        # 3. Fetch Recent Chat History (ordered by created_at DESC)
        # Assuming chat_repo gets them in desc order, we take the last `limit` messages
        messages = self.chat_repo.get_history(user_id, conversation_id, limit=limit)
        
        # We need to reverse them to present chronologically to the LLM
        messages.reverse()
        
        # 4. Construct Context String
        context_parts = []
        
        context_parts.append(f"### Original Code ({language}) ###\n```\n{code}\n```\n")
        
        if explanation_summary:
            context_parts.append(f"### Original Explanation ###\n{explanation_summary}\n")
            
        if messages:
            context_parts.append("### Recent Conversation History ###")
            for msg in messages:
                role = "User" if msg.get("role") == "user" else "AI"
                content = msg.get("message", "")
                context_parts.append(f"{role}: {content}")
                
        return "\n".join(context_parts)
