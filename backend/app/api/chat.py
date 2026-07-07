from fastapi import APIRouter, Depends
from app.schemas.requests import ChatRequest
from app.schemas.responses import ApiResponse, ChatResponse
from app.services.chat_service import ChatService
from app.api.auth import verify_clerk_token

router = APIRouter()
chat_service = ChatService()

@router.post("/", response_model=ApiResponse[ChatResponse])
async def follow_up_chat(
    request: ChatRequest,
    user_id: str = Depends(verify_clerk_token)
):
    result = await chat_service.follow_up_question(
        user_id=user_id,
        conversation_id=request.conversation_id,
        message=request.message
    )
    return ApiResponse(
        success=True,
        message="Reply generated",
        data=ChatResponse(**result)
    )
