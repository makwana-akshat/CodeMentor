from app.ai.exceptions import PromptError
from app.ai.prompts.beginner import BEGINNER_PROMPT
from app.ai.prompts.intermediate import INTERMEDIATE_PROMPT
from app.ai.prompts.expert import EXPERT_PROMPT

class PromptManager:
    """Manages system prompts for different experience levels."""
    
    _prompts = {
        "beginner": BEGINNER_PROMPT,
        "intermediate": INTERMEDIATE_PROMPT,
        "expert": EXPERT_PROMPT
    }

    @classmethod
    def get_prompt(cls, level: str) -> str:
        """
        Retrieve the system prompt for a specific level.
        Raises PromptError if the level is invalid.
        """
        normalized_level = level.lower().strip()
        if normalized_level not in cls._prompts:
            valid_levels = ", ".join(cls._prompts.keys())
            raise PromptError(f"Invalid experience level: '{level}'. Valid levels are: {valid_levels}")
        
        return cls._prompts[normalized_level]
