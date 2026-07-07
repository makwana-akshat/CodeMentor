from fastapi import APIRouter, Depends
from app.schemas.requests import ExplainRequest
from app.schemas.responses import ApiResponse, ExplainResponse
from app.services.explanation_service import ExplanationService
from app.dependencies.services import get_explanation_service
from app.core.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=ApiResponse[ExplainResponse])
async def explain_code(
    request: ExplainRequest,
    service: ExplanationService = Depends(get_explanation_service),
    current_user: dict = Depends(get_current_user)
):
    result = await service.explain_code(
        code=request.code,
        language=request.language,
        level=request.level
    )
    return ApiResponse(
        success=True,
        message="Code explained successfully",
        data=ExplainResponse(**result)
    )
