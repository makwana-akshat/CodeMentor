from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # App Config
    APP_NAME: str = "CodeMentor AI Backend"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = True
    
    # Auth (Clerk)
    CLERK_SECRET_KEY: str = ""
    CLERK_PUBLISHABLE_KEY: str = ""
    CLERK_PEM_PUBLIC_KEY: Optional[str] = None
    
    # Database (Supabase)
    SUPABASE_URL: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    
    # AI (Gemini)
    GEMINI_API_KEY: str = ""
    AI_MODEL_NAME: str = "gemini-2.5-pro"
    AI_TEMPERATURE: float = 0.7
    AI_TOP_P: float = 0.95
    AI_MAX_TOKENS: int = 2048
    AI_RETRY_COUNT: int = 3
    AI_TIMEOUT_SECONDS: int = 30
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
