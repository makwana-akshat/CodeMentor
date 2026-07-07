from pydantic import BaseModel, Field
from typing import Optional

class ExplainRequest(BaseModel):
    code: str = Field(..., description="The code snippet to explain")
    language: str = Field(..., description="Programming language (e.g., Python)")
    level: str = Field(default="Intermediate", description="Explanation level: Beginner, Intermediate, Expert")

class ChatRequest(BaseModel):
    snippet_id: str = Field(..., description="The ID of the saved code snippet")
    message: str = Field(..., description="The follow-up question")

class HistoryRequest(BaseModel):
    pass
