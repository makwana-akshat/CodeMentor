import asyncio
import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

from app.services.explanation_service import ExplanationService
from app.core.config import settings

async def main():
    print(f"Using Gemini Key: {settings.GEMINI_API_KEY[:5]}...")
    
    service = ExplanationService()
    try:
        result = await service.explain_code(
            code='print("hello world")',
            language='python',
            level='beginner',
            user_id=None
        )
        print("Success!")
        print(result.keys())
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
