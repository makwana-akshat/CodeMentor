import re

class LanguageDetector:
    """Detects programming language from a code snippet."""
    
    @staticmethod
    def detect(code: str) -> str:
        code_lower = code.lower()
        
        # Simple heuristics for language detection
        if "def " in code_lower and ":" in code_lower or "import " in code_lower and "from " in code_lower:
            return "python"
        elif "function" in code_lower or "const " in code_lower or "let " in code_lower or "=>" in code_lower:
            return "javascript"
        elif "public class" in code_lower or "System.out.println" in code_lower:
            return "java"
        elif "#include" in code_lower or "std::" in code_lower:
            return "cpp"
            
        return "unknown"
