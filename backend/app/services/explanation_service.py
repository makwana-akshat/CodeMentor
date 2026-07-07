class ExplanationService:
    def __init__(self):
        # Dependencies (like repositories or AI clients) will be injected here later
        pass

    async def explain_code(self, code: str, language: str, level: str) -> dict:
        """
        Placeholder method for explaining code.
        """
        return {
            "summary": "Mock summary of the code.",
            "line_by_line": [{"line": 1, "explanation": "Mock explanation"}],
            "bug_detection": "No bugs found (mock).",
            "complexity": "O(1)",
            "best_practices": ["Write clean code"],
            "analogy": "Like a mock analogy."
        }
