class AppException(Exception):
    """
    Base exception class for the application.
    All custom exceptions should inherit from this class to be handled centrally.
    """
    def __init__(
        self, 
        message: str, 
        status_code: int = 400, 
        error_code: str = "BAD_REQUEST",
        details: dict = None
    ):
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        self.details = details or {}
        super().__init__(self.message)

class ResourceNotFoundException(AppException):
    def __init__(self, message: str = "Resource not found", details: dict = None):
        super().__init__(message, 404, "NOT_FOUND", details)

class UnauthorizedException(AppException):
    def __init__(self, message: str = "Unauthorized", details: dict = None):
        super().__init__(message, 401, "UNAUTHORIZED", details)

class ForbiddenException(AppException):
    def __init__(self, message: str = "Forbidden", details: dict = None):
        super().__init__(message, 403, "FORBIDDEN", details)

class ValidationException(AppException):
    def __init__(self, message: str = "Validation error", details: dict = None):
        super().__init__(message, 422, "VALIDATION_ERROR", details)
