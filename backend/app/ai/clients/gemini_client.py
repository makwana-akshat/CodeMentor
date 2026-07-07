from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
from app.ai.exceptions import GeminiError
import logging

logger = logging.getLogger(__name__)

class GeminiClient:
    """Provides a configured instance of the Gemini LLM for LangChain."""

    @staticmethod
    def get_llm() -> ChatGoogleGenerativeAI:
        try:
            if not settings.GEMINI_API_KEY:
                raise ValueError("GEMINI_API_KEY is not set.")

            # ChatGoogleGenerativeAI has built-in retry logic (max_retries)
            llm = ChatGoogleGenerativeAI(
                model=settings.AI_MODEL_NAME,
                temperature=settings.AI_TEMPERATURE,
                top_p=settings.AI_TOP_P,
                max_tokens=settings.AI_MAX_TOKENS,
                max_retries=settings.AI_RETRY_COUNT,
                timeout=settings.AI_TIMEOUT_SECONDS,
                google_api_key=settings.GEMINI_API_KEY
            )
            return llm
        except Exception as e:
            logger.error(f"Failed to initialize Gemini Client: {e}")
            raise GeminiError(f"Failed to initialize Gemini Client: {str(e)}")
