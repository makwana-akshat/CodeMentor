class HistoryService:
    def __init__(self):
        pass

    async def get_user_history(self, user_id: str) -> list:
        """
        Placeholder method to get user history.
        """
        return [
            {
                "id": "mock_id_1",
                "title": "Mock Snippet Explanation",
                "created_at": "2026-01-01T00:00:00Z"
            }
        ]

    async def get_conversation(self, conversation_id: str) -> dict:
        """
        Placeholder for fetching a specific conversation.
        """
        return {
            "id": conversation_id,
            "messages": []
        }
