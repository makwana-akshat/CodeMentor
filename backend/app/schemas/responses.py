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
    reply: str
    context_used: bool

class HistoryResponse(BaseModel):
    id: str
    title: str
    created_at: str
