from typing import Type, TypeVar, Any
from pydantic import BaseModel, ValidationError
from langchain_core.output_parsers import PydanticOutputParser
from app.ai.exceptions import ParsingError
import logging

logger = logging.getLogger(__name__)
T = TypeVar('T', bound=BaseModel)

class JsonParser:
    """Validates and parses LLM responses into Pydantic models."""

    @staticmethod
    def get_parser(pydantic_model: Type[T]) -> PydanticOutputParser:
        """Returns a LangChain PydanticOutputParser for the given model."""
        return PydanticOutputParser(pydantic_object=pydantic_model)

    @staticmethod
    def parse(response_text: str, pydantic_model: Type[T]) -> T:
        """
        Manually parses a raw JSON string into a Pydantic model.
        Raises ParsingError if validation fails.
        """
        parser = PydanticOutputParser(pydantic_object=pydantic_model)
        try:
            parsed_object = parser.invoke(response_text)
            return parsed_object
        except Exception as e:
            logger.error(f"Failed to parse LLM response: {e}")
            raise ParsingError(f"Failed to parse LLM response: {str(e)}")
