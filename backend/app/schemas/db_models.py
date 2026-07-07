from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

class UserDB(BaseModel):
    id: UUID
    clerk_user_id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_image: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class ConversationDB(BaseModel):
    id: UUID
    user_id: UUID
    title: Optional[str] = None
    language: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class SnippetDB(BaseModel):
    id: UUID
    conversation_id: UUID
    language: Optional[str] = None
    source_code: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class ExplanationDB(BaseModel):
    id: UUID
    conversation_id: UUID
    explanation_level: Optional[str] = None
    summary: Optional[Dict[str, Any]] = None
    line_by_line: Optional[List[Dict[str, Any]]] = None
    documentation: Optional[List[Dict[str, Any]]] = None
    bugs: Optional[List[str]] = None
    complexity: Optional[Dict[str, Any]] = None
    analogy: Optional[str] = None
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class ChatHistoryDB(BaseModel):
    id: UUID
    conversation_id: UUID
    role: str
    message: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
