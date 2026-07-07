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

class BugDetail(BaseModel):
    type: str
    severity: str
    description: str
    line_number: Optional[int] = None
    fix: str

class SecurityDetail(BaseModel):
    vulnerability: str
    severity: str
    description: str
    fix: str

class OptimizationDetail(BaseModel):
    reason: str
    expected_improvement: str
    suggestion: str

class LearningRecommendation(BaseModel):
    topic: str
    explanation: str

class AnalysisResults(BaseModel):
    bugs: list[BugDetail] = Field(default_factory=list)
    time_complexity: dict = Field(default_factory=dict)
    space_complexity: dict = Field(default_factory=dict)
    best_practices: list[str] = Field(default_factory=list)
    code_smells: list[str] = Field(default_factory=list)
    security: list[SecurityDetail] = Field(default_factory=list)
    optimizations: list[OptimizationDetail] = Field(default_factory=list)
    execution_flow: list[str] = Field(default_factory=list)
    learning_recommendations: list[LearningRecommendation] = Field(default_factory=list)

class ExplainResponse(BaseModel):
    summary: str
    line_by_line: list[dict]
    bug_detection: str
    complexity: str
    best_practices: list[str]
    analogy: str
    analysis_results: Optional[AnalysisResults] = None

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
