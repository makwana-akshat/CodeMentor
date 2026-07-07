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
        
class SnippetRepository(BaseRepository):
    def __init__(self):
        super().__init__("code_snippets")

class ExplanationRepository(BaseRepository):
    def __init__(self):
        super().__init__("explanations")

class ChatRepository(BaseRepository):
    def __init__(self):
        super().__init__("chat_history")
