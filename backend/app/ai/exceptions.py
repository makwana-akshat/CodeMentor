from app.core.exceptions import AppException

class AIException(AppException):
    """Base class for all AI related exceptions."""
    def __init__(self, message: str, status_code: int = 500, error_code: str = "AI_ERROR", details: dict = None):
        super().__init__(message, status_code, error_code, details)

class GeminiError(AIException):
    def __init__(self, message: str = "Gemini API encountered an error", details: dict = None):
        super().__init__(message, 502, "GEMINI_ERROR", details)

class PromptError(AIException):
    def __init__(self, message: str = "Prompt generation failed", details: dict = None):
        super().__init__(message, 400, "PROMPT_ERROR", details)

class ParsingError(AIException):
    def __init__(self, message: str = "Failed to parse AI response", details: dict = None):
        super().__init__(message, 500, "PARSING_ERROR", details)

class RateLimitError(AIException):
    def __init__(self, message: str = "AI provider rate limit exceeded", details: dict = None):
        super().__init__(message, 429, "RATE_LIMIT_ERROR", details)

class DocumentationSearchError(AIException):
    def __init__(self, message: str = "Failed to retrieve external documentation", details: dict = None):
        super().__init__(message, 500, "DOC_SEARCH_ERROR", details)
