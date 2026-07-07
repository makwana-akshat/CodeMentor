from app.database.client import get_supabase_client
from typing import Optional, Dict, List

class HistoryRepository:
    def __init__(self):
        self.client = get_supabase_client()

    def add_message(self, conversation_id: str, role: str, message: str) -> Optional[Dict]:
        """
        Placeholder: Add a chat message to history.
        Table: chat_history
        """
        # TODO: Implement DB logic
        return {"id": "mock_msg_id", "conversation_id": conversation_id, "role": role, "message": message}

    def get_history(self, conversation_id: str) -> List[Dict]:
        """
        Placeholder: Get full chat history for a conversation.
        """
        # TODO: Implement DB logic
        return []
