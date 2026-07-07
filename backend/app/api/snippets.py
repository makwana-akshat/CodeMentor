from fastapi import APIRouter, Depends
from app.schemas.responses import ApiResponse, EmptyData
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=ApiResponse[EmptyData])
async def get_snippets(
    current_user: dict = Depends(get_current_user)
):
    """
    Placeholder endpoint for snippets.
    """
    return ApiResponse(
        success=True,
        message="Snippets endpoint placeholder",
        data=EmptyData()
    )
