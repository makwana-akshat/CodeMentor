from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[Dict[str, Any]])
async def get_history(current_user: str = Depends(get_current_user)):
    """
    Retrieve user conversation history.
    """
    # TODO: Integrate Repositories to fetch history from Supabase
    return []
