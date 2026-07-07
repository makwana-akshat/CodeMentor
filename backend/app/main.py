from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.core.config import settings
from app.core.logger import logger
from app.core.exceptions import AppException
from app.middleware.request_logger import RequestLoggerMiddleware
from app.api.routers import api_router
from app.schemas.responses import ApiResponse, ErrorDetail

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description="AI-powered code explanation platform API",
        version="0.1.0"
    )

    # Middlewares
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestLoggerMiddleware)

    # Exception Handlers
    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        logger.error(f"AppException: {exc.message} - Code: {exc.error_code}")
        response = ApiResponse(
            success=False,
            message=exc.message,
            error=ErrorDetail(code=exc.error_code, details=exc.details)
        )
        return JSONResponse(status_code=exc.status_code, content=response.model_dump())

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logger.warning(f"Validation error: {exc.errors()}")
        response = ApiResponse(
            success=False,
            message="Validation error",
            error=ErrorDetail(code="VALIDATION_ERROR", details={"errors": exc.errors()})
        )
        return JSONResponse(status_code=422, content=response.model_dump())

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.error(f"Global unhandled exception: {str(exc)}")
        response = ApiResponse(
            success=False,
            message="Internal server error",
            error=ErrorDetail(code="INTERNAL_SERVER_ERROR")
        )
        return JSONResponse(status_code=500, content=response.model_dump())

    # Routers
    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/health", response_model=ApiResponse[dict], tags=["Health"])
    def health_check():
        return ApiResponse(success=True, message="System is healthy", data={"status": "healthy"})

    return app

app = create_app()
