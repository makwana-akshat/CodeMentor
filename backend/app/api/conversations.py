from fastapi import APIRouter, Depends, HTTPException
from typing import Any
from app.services.conversation_service import ConversationService
from app.schemas.responses import ApiResponse, ConversationResponse
from app.api.auth import verify_clerk_token
from pydantic import BaseModel

router = APIRouter()
conversation_service = ConversationService()

@router.get("/", response_model=ApiResponse[list])
async def get_conversations(
    user_id: str = Depends(verify_clerk_token)
) -> Any:
    conversations = await conversation_service.get_user_history(user_id)
    return ApiResponse(success=True, message="Conversations retrieved", data=conversations)

@router.get("/{conversation_id}", response_model=ApiResponse[ConversationResponse])
async def get_conversation_details(
    conversation_id: str,
    user_id: str = Depends(verify_clerk_token)
) -> Any:
    details = await conversation_service.get_conversation(conversation_id)
    if not details:
        raise HTTPException(status_code=404, detail="Conversation not found")
        
    # We must ensure the conversation actually belongs to the user
    # The repository handles this or we can check the user_id matches
    conv_data = details["conversation"]
    if conv_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized access to this conversation")

    # Map to ConversationResponse schema
    response_data = {
        "id": conv_data["id"],
        "title": conv_data.get("title"),
        "created_at": conv_data["created_at"],
        "snippet": details["snippets"][0] if details["snippets"] else None,
        "explanation": details["explanations"][0] if details["explanations"] else None,
        "messages": details["chat_history"]
    }

    return ApiResponse(success=True, message="Conversation retrieved", data=response_data)

@router.delete("/{conversation_id}", response_model=ApiResponse[bool])
async def delete_conversation(
    conversation_id: str,
    user_id: str = Depends(verify_clerk_token)
) -> Any:
    # First check ownership
    details = await conversation_service.get_conversation(conversation_id)
    if not details or details["conversation"].get("user_id") != user_id:
        raise HTTPException(status_code=404, detail="Conversation not found")
        
    await conversation_service.delete_conversation(conversation_id)
    return ApiResponse(success=True, message="Conversation deleted", data=True)

class RenameRequest(BaseModel):
    title: str

@router.patch("/{conversation_id}", response_model=ApiResponse[bool])
async def rename_conversation(
    conversation_id: str,
    request: RenameRequest,
    user_id: str = Depends(verify_clerk_token)
) -> Any:
    details = await conversation_service.get_conversation(conversation_id)
    if not details or details["conversation"].get("user_id") != user_id:
        raise HTTPException(status_code=404, detail="Conversation not found")
        
    await conversation_service.rename_conversation(conversation_id, request.title)
    return ApiResponse(success=True, message="Conversation renamed", data=True)
