from typing import Type, TypeVar, Any, List
from pydantic import BaseModel
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import Tool
from app.ai.clients.gemini_client import GeminiClient
from app.ai.prompts.prompt_manager import PromptManager
from app.ai.parsers.json_parser import JsonParser
from app.ai.tools.documentation_search import DocumentationSearchTool
from app.ai.exceptions import AIException
import logging

logger = logging.getLogger(__name__)
T = TypeVar('T', bound=BaseModel)

class CodeAgent:
    """Orchestrates the AI workflow using LangChain, LLM, and tools."""

    def __init__(self):
        self.llm = GeminiClient.get_llm()
        self.doc_tool = DocumentationSearchTool()

    async def analyze(
        self, 
        code: str, 
        level: str, 
        response_model: Type[T], 
        language: str = "unknown", 
        libraries: List[str] = None
    ) -> T:
        """
        Analyzes the code using the configured LLM and tools, 
        returning a validated Pydantic model.
        """
        if libraries is None:
            libraries = []

        try:
            # 1. Gather Documentation Context if libraries are present
            doc_context = ""
            if libraries:
                query = f"{language} " + " ".join(libraries) + " documentation"
                try:
                    doc_context = self.doc_tool.search(query)
                except Exception as e:
                    logger.warning(f"Documentation search failed, proceeding without it: {e}")
                    doc_context = "No external documentation could be retrieved."

            # 2. Get the system prompt based on user level
            system_prompt_template = PromptManager.get_prompt(level)

            # 3. Setup the parser and its format instructions
            parser = JsonParser.get_parser(response_model)
            format_instructions = parser.get_format_instructions()

            # 4. Construct the prompt
            prompt = ChatPromptTemplate.from_messages([
                ("system", system_prompt_template),
                ("system", "Here is the external documentation context for the libraries used:\n{doc_context}"),
                ("system", "You must format your response exactly according to the following instructions:\n{format_instructions}"),
                ("user", "Language: {language}\n\nCode to analyze:\n{code}")
            ])

            # 5. Create the chain and invoke
            chain = prompt | self.llm | parser

            logger.info(f"Invoking CodeAgent for level '{level}' and language '{language}'")
            
            result = await chain.ainvoke({
                "doc_context": doc_context,
                "format_instructions": format_instructions,
                "language": language,
                "code": code
            })
            
            return result

        except Exception as e:
            logger.error(f"CodeAgent analysis failed: {e}")
            raise AIException(f"Analysis failed: {str(e)}")
