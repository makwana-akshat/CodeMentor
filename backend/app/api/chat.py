from fastapi import APIRouter, Depends
from app.schemas.requests import ChatRequest
from app.schemas.responses import ApiResponse, ChatResponse
from app.services.chat_service import ChatService
from app.dependencies.services import get_chat_service
from app.core.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=ApiResponse[ChatResponse])
async def follow_up_chat(
    request: ChatRequest,
    service: ChatService = Depends(get_chat_service),
    current_user: dict = Depends(get_current_user)
):
    result = await service.follow_up_question(
        snippet_id=request.snippet_id,
        message=request.message
    )
    return ApiResponse(
        success=True,
        message="Reply generated",
        data=ChatResponse(**result)
    )
