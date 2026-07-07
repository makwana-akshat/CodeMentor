from app.database.client import get_supabase_client
from typing import Optional, Dict, Any, List
from app.core.exceptions import AppException
import logging

logger = logging.getLogger(__name__)

class BaseRepository:
    """Base repository for CRUD operations wrapping Supabase."""
    
    def __init__(self, table_name: str):
        self.client = get_supabase_client()
        self.table_name = table_name

    def _check_client(self):
        if not self.client:
            raise AppException(message="Database connection not initialized.", status_code=500)

    def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        self._check_client()
        try:
            response = self.client.table(self.table_name).insert(data).execute()
            if response.data:
                return response.data[0]
            raise AppException(message=f"Failed to create record in {self.table_name}", status_code=500)
        except Exception as e:
            logger.error(f"Error in create {self.table_name}: {e}")
            raise AppException(message=f"Database error during creation", status_code=500, details={"error": str(e)})

    def get_by_id(self, record_id: str) -> Optional[Dict[str, Any]]:
        self._check_client()
        try:
            response = self.client.table(self.table_name).select("*").eq("id", record_id).execute()
            if response.data and len(response.data) > 0:
                return response.data[0]
            return None
        except Exception as e:
            logger.error(f"Error fetching by id {record_id} in {self.table_name}: {e}")
            raise AppException(message="Database error during fetch", status_code=500, details={"error": str(e)})

    def update(self, record_id: str, data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        self._check_client()
        try:
            response = self.client.table(self.table_name).update(data).eq("id", record_id).execute()
            if response.data:
                return response.data[0]
            return None
        except Exception as e:
            logger.error(f"Error updating id {record_id} in {self.table_name}: {e}")
            raise AppException(message="Database error during update", status_code=500, details={"error": str(e)})

    def delete(self, record_id: str) -> bool:
        self._check_client()
        try:
            self.client.table(self.table_name).delete().eq("id", record_id).execute()
            return True
        except Exception as e:
            logger.error(f"Error deleting id {record_id} in {self.table_name}: {e}")
            raise AppException(message="Database error during delete", status_code=500, details={"error": str(e)})

    def list(self, filters: Dict[str, Any] = None, order_by: str = "created_at", ascending: bool = False) -> List[Dict[str, Any]]:
        self._check_client()
        try:
            query = self.client.table(self.table_name).select("*")
            if filters:
                for key, value in filters.items():
                    query = query.eq(key, value)
            
            response = query.order(order_by, desc=not ascending).execute()
            return response.data if response.data else []
        except Exception as e:
            logger.error(f"Error listing records in {self.table_name}: {e}")
            raise AppException(message="Database error during listing", status_code=500, details={"error": str(e)})
