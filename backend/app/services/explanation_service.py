from app.ai.agent.code_agent import CodeAgent
from app.ai.tools.language_detector import LanguageDetector
from app.ai.tools.library_detector import LibraryDetector
from app.schemas.responses import ExplainResponse
from app.core.exceptions import AppException
from app.database.repositories.repositories import SnippetRepository, ExplanationRepository
from app.database.repositories.repositories import ConversationRepository
import logging
import uuid
from datetime import datetime

logger = logging.getLogger(__name__)

class ExplanationService:
    def __init__(self):
        self.agent = CodeAgent()
        self.language_detector = LanguageDetector()
        self.library_detector = LibraryDetector()
        self.conversation_repo = ConversationRepository()
        self.snippet_repo = SnippetRepository()
        self.explanation_repo = ExplanationRepository()

    async def explain_code(self, code: str, language: str, level: str, user_id: str = None) -> dict:
        """
        Orchestrates the AI explanation workflow.
        """
        logger.info(f"Explaining code at level: {level}")
        
        try:
            if not language or language.lower() == "unknown":
                language = self.language_detector.detect(code)
            
            libraries = self.library_detector.extract_imports(code, language)
            
            logger.info("Invoking CodeAgent...")
            result: ExplainResponse = await self.agent.analyze(
                code=code,
                level=level,
                response_model=ExplainResponse,
                language=language,
                libraries=libraries
            )
            
            # Save to database using repositories if user_id is provided
            if user_id:
                try:
                    # 1. Create a conversation
                    conv_data = {
                        "id": str(uuid.uuid4()),
                        "user_id": user_id,
                        "title": f"Explanation in {language.capitalize()}",
                        "language": language
                    }
                    conv = self.conversation_repo.create(conv_data)
                    
                    # 2. Create the code snippet
                    snippet_data = {
                        "id": str(uuid.uuid4()),
                        "conversation_id": conv["id"],
                        "language": language,
                        "source_code": code
                    }
                    self.snippet_repo.create(snippet_data)
                    
                    # 3. Create the explanation
                    explanation_data = {
                        "id": str(uuid.uuid4()),
                        "conversation_id": conv["id"],
                        "explanation_level": level,
                        "summary": result.summary,
                        "line_by_line": result.line_by_line,
                        "documentation": result.documentation,
                        "bugs": result.bugs,
                        "complexity": result.complexity,
                        "analogy": result.analogy
                    }
                    self.explanation_repo.create(explanation_data)
                    logger.info("Explanation saved to Database successfully.")
                except Exception as db_err:
                    logger.error(f"Failed to save explanation to Database: {db_err}")
            
            return result.model_dump()
            
        except Exception as e:
            logger.error(f"ExplanationService failed: {e}")
            raise AppException(message="Failed to explain code", status_code=500, details={"error": str(e)})
