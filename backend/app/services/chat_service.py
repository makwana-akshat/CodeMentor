class ChatService:
    def __init__(self):
        pass

    async def follow_up_question(self, snippet_id: str, message: str) -> dict:
        """
        Placeholder method for handling follow up chat messages.
        """
        return {
            "reply": f"This is a mock reply to: {message}",
            "context_used": True
        }
