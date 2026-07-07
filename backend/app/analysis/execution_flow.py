from typing import Dict, Any
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.ai.clients.gemini_client import GeminiClient
import json
import logging

logger = logging.getLogger(__name__)

class ExecutionFlow:
    def __init__(self):
        self.llm = GeminiClient.get_llm()

    async def analyze(self, code: str, language: str) -> list:
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a technical writer. Summarize the execution flow of the code. Return ONLY valid JSON."),
            ("user", f"""
            Generate a simple explanation of how the following {language} code executes.
            Return ONLY valid JSON as a list of strings representing the steps:
            ["step 1", "step 2", "step 3"]
            
            Code:
            ```
            {code}
            ```
            """)
        ])
        chain = prompt | self.llm | StrOutputParser()
        try:
            response = await chain.ainvoke({})
            return self._parse_json(response)
        except Exception as e:
            logger.error(f"ExecutionFlow failed: {e}")
            return []

    def _parse_json(self, response_text: str) -> list:
        cleaned = response_text.strip()
        if cleaned.startswith("```json"): cleaned = cleaned[7:]
        elif cleaned.startswith("```"): cleaned = cleaned[3:]
        if cleaned.endswith("```"): cleaned = cleaned[:-3]
        return json.loads(cleaned.strip())
