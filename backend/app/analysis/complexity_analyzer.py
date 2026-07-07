from typing import Dict, Any
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.ai.clients.gemini_client import GeminiClient
import json
import logging

logger = logging.getLogger(__name__)

class ComplexityAnalyzer:
    def __init__(self):
        self.llm = GeminiClient.get_llm()

    async def analyze(self, code: str, language: str) -> dict:
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an expert computer scientist. Analyze the time and space complexity of the code. Return ONLY valid JSON."),
            ("user", f"""
            Analyze the following {language} code.
            Return ONLY valid JSON in this exact structure:
            {{
                "time_complexity": {{"complexity": "O(...)", "explanation": "string"}},
                "space_complexity": {{"complexity": "O(...)", "explanation": "string"}}
            }}
            
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
            logger.error(f"ComplexityAnalyzer failed: {e}")
            return {"time_complexity": {}, "space_complexity": {}}

    def _parse_json(self, response_text: str) -> dict:
        cleaned = response_text.strip()
        if cleaned.startswith("```json"): cleaned = cleaned[7:]
        elif cleaned.startswith("```"): cleaned = cleaned[3:]
        if cleaned.endswith("```"): cleaned = cleaned[:-3]
        return json.loads(cleaned.strip())
