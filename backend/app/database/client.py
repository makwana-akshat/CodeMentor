import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

def get_supabase_client() -> Client:
    """
    Initialize and return a Supabase client.
    Note: Supabase auth is NOT used here, only the application data via the service role key.
    """
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL == "your_supabase_url" or not SUPABASE_URL.startswith("http"):
        # Prevent crash if not set or if it's a placeholder
        print("Warning: Supabase credentials not fully configured or are placeholders.")
        return None
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
