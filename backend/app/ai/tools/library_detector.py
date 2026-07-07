import re
from typing import List

class LibraryDetector:
    """Extracts imported libraries from code snippets."""
    
    @staticmethod
    def extract_imports(code: str, language: str = "python") -> List[str]:
        imports = []
        if language == "python":
            # Match `import x` or `from x import y`
            import_patterns = [
                r"^import\s+([a-zA-Z0-9_\.]+)",
                r"^from\s+([a-zA-Z0-9_\.]+)\s+import"
            ]
            for line in code.splitlines():
                line = line.strip()
                for pattern in import_patterns:
                    match = re.search(pattern, line)
                    if match:
                        imports.append(match.group(1).split('.')[0])
        elif language == "javascript":
            # Match `import x from 'y'` or `const x = require('y')`
            import_patterns = [
                r"from\s+['\"]([^'\"]+)['\"]",
                r"require\(['\"]([^'\"]+)['\"]\)"
            ]
            for line in code.splitlines():
                for pattern in import_patterns:
                    match = re.search(pattern, line)
                    if match:
                        imports.append(match.group(1))
        elif language == "java":
            # Match `import java.util.List;`
            pattern = r"^import\s+([a-zA-Z0-9_\.]+);"
            for line in code.splitlines():
                match = re.search(pattern, line.strip())
                if match:
                    imports.append(match.group(1))
        elif language == "cpp":
            # Match `#include <iostream>` or `#include "header.h"`
            pattern = r"^#include\s*[<\"]([^>\"]+)[>\"]"
            for line in code.splitlines():
                match = re.search(pattern, line.strip())
                if match:
                    imports.append(match.group(1))

        return list(set(imports))
