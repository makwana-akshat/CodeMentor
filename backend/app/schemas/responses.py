from pydantic import BaseModel, Field
from typing import Generic, TypeVar, Optional, Any

T = TypeVar("T")

class ErrorDetail(BaseModel):
    code: str
    details: Optional[dict] = None

class ApiResponse(BaseModel, Generic[T]):
    success: bool
    message: str
    data: Optional[T] = None
    error: Optional[ErrorDetail] = None

class EmptyData(BaseModel):
    pass

class ExplainResponse(BaseModel):
    summary: str
    line_by_line: list[dict]
    bug_detection: str
    complexity: str
    best_practices: list[str]
    analogy: str

class ChatResponse(BaseModel):
    answer: str
    conversation_id: str

class MessageModel(BaseModel):
    id: str
    conversation_id: str
    role: str
    message: str
    created_at: str

class ConversationResponse(BaseModel):
    id: str
    title: Optional[str] = None
    created_at: str
    snippet: Optional[dict] = None
    explanation: Optional[dict] = None
    messages: list[MessageModel] = []
