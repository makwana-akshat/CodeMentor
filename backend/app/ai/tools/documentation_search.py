from langchain_community.tools import DuckDuckGoSearchRun
from app.ai.exceptions import DocumentationSearchError
import logging

logger = logging.getLogger(__name__)

class DocumentationSearchTool:
    """Wraps DuckDuckGo for searching external documentation."""
    
    def __init__(self):
        self.search_tool = DuckDuckGoSearchRun()

    def search(self, query: str) -> str:
        """
        Executes a search query and returns the results.
        Raises DocumentationSearchError on failure.
        """
        try:
            logger.info(f"Searching documentation for: {query}")
            # DuckDuckGoSearchRun internally handles the HTTP requests.
            # Langchain's wrapper handles basic timeouts/errors but we wrap it to ensure it matches our exceptions.
            result = self.search_tool.run(query)
            if not result or result.strip() == "":
                return "No documentation found."
            return result
        except Exception as e:
            logger.error(f"Documentation search failed for query '{query}': {e}")
            raise DocumentationSearchError(f"Failed to search for '{query}': {str(e)}")
