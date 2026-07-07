from app.database.client import get_supabase_client
from typing import Optional, Dict, Any

class UserRepository:
    def __init__(self):
        self.client = get_supabase_client()

    def create_user(self, user_data: Dict[str, Any]) -> Optional[Dict]:
        """
        Creates a user record in Supabase.
        Table: users
        """
        if not self.client:
            return None
        
        try:
            response = self.client.table("users").insert(user_data).execute()
            if response.data:
                return response.data[0]
        except Exception as e:
            print(f"Error creating user: {e}")
        return None

    def get_user_by_clerk_id(self, clerk_user_id: str) -> Optional[Dict]:
        """
        Retrieves a user by their Clerk ID.
        """
        if not self.client:
            return None
            
        try:
            response = self.client.table("users").select("*").eq("clerk_user_id", clerk_user_id).execute()
            if response.data and len(response.data) > 0:
                return response.data[0]
        except Exception as e:
            print(f"Error fetching user: {e}")
        return None

    def update_user(self, clerk_user_id: str, update_data: Dict[str, Any]) -> Optional[Dict]:
        """
        Updates an existing user.
        """
        if not self.client:
            return None
            
        try:
            response = self.client.table("users").update(update_data).eq("clerk_user_id", clerk_user_id).execute()
            if response.data:
                return response.data[0]
        except Exception as e:
            print(f"Error updating user: {e}")
        return None

