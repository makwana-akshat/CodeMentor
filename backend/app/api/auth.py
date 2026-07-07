from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any
from pydantic import BaseModel
from app.core.auth import get_current_user, verify_clerk_token
from app.database.repositories.users import UserRepository

router = APIRouter()
user_repo = UserRepository()

class SyncUserRequest(BaseModel):
    email: str
    first_name: str = ""
    last_name: str = ""
    profile_image: str = ""

@router.post("/sync", response_model=Dict[str, Any])
async def sync_user(
    request: SyncUserRequest, 
    token_payload: dict = Depends(verify_clerk_token)
):
    """
    Sync a Clerk user to the Supabase database.
    Called by the frontend immediately after a successful login.
    """
    clerk_user_id = token_payload.get("sub")
    if not clerk_user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Check if user already exists
    existing_user = user_repo.get_user_by_clerk_id(clerk_user_id)
    
    if existing_user:
        return {
            "status": "success", 
            "message": "User already exists",
            "user": existing_user
        }

    # Create new user
    user_data = {
        "clerk_user_id": clerk_user_id,
        "email": request.email,
        "first_name": request.first_name,
        "last_name": request.last_name,
        "profile_image": request.profile_image
    }
    
    new_user = user_repo.create_user(user_data)
    if not new_user:
        # Note: If Supabase table isn't created yet, this will fail gracefully and return a mock error
        return {"status": "error", "message": "Failed to sync user to database. Please ensure Supabase tables are created."}
        
    return {
        "status": "success",
        "message": "User synced successfully",
        "user": new_user
    }
