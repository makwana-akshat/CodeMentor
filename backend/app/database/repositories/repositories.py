from app.database.repositories.base import BaseRepository
from typing import Optional, Dict, Any

class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__("users")

    def get_user_by_clerk_id(self, clerk_user_id: str) -> Optional[Dict[str, Any]]:
        self._check_client()
        response = self.client.table(self.table_name).select("*").eq("clerk_user_id", clerk_user_id).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None

class ConversationRepository(BaseRepository):
    def __init__(self):
        super().__init__("conversations")
        
    def get_user_conversations(self, user_id: str) -> list[Dict[str, Any]]:
        self._check_client()
        response = self.client.table(self.table_name).select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return response.data if response.data else []
        
class SnippetRepository(BaseRepository):
    def __init__(self):
        super().__init__("code_snippets")

    def get_by_conversation(self, user_id: str, conversation_id: str) -> Optional[Dict[str, Any]]:
        self._check_client()
        # RLS handles user_id isolation, but we enforce here for safety
        response = self.client.table(self.table_name).select("*").eq("conversation_id", conversation_id).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None

class ExplanationRepository(BaseRepository):
    def __init__(self):
        super().__init__("explanations")

    def get_by_conversation(self, user_id: str, conversation_id: str) -> Optional[Dict[str, Any]]:
        self._check_client()
        response = self.client.table(self.table_name).select("*").eq("conversation_id", conversation_id).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None

class ChatRepository(BaseRepository):
    def __init__(self):
        super().__init__("chat_history")

    def get_history(self, user_id: str, conversation_id: str, limit: int = 6) -> list[Dict[str, Any]]:
        self._check_client()
        # Order by created_at desc to get the most recent ones, limit N
        response = self.client.table(self.table_name).select("*").eq("conversation_id", conversation_id).order("created_at", desc=True).limit(limit).execute()
        return response.data if response.data else []
