from fastapi import APIRouter, Depends
from typing import List
from app.schemas.responses import ApiResponse, HistoryResponse
from app.services.history_service import HistoryService
from app.dependencies.services import get_history_service
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=ApiResponse[List[HistoryResponse]])
async def get_history(
    service: HistoryService = Depends(get_history_service),
    current_user: dict = Depends(get_current_user)
):
    # Pass user_id from token
    user_id = current_user.get("sub", "unknown_user")
    result = await service.get_user_history(user_id=user_id)
    
    return ApiResponse(
        success=True,
        message="History retrieved",
        data=[HistoryResponse(**item) for item in result]
    )
