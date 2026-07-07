import time
import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from app.core.logger import logger
import contextvars

request_id_var = contextvars.ContextVar("request_id", default="UNKNOWN")

# A custom log filter to inject request_id into logs automatically
import logging
class RequestIdFilter(logging.Filter):
    def filter(self, record):
        record.request_id = request_id_var.get()
        return True

logger.addFilter(RequestIdFilter())

class RequestLoggerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        req_id = str(uuid.uuid4())
        request_id_var.set(req_id)
        
        start_time = time.time()
        logger.info(f"Incoming Request: {request.method} {request.url.path}")
        
        try:
            response = await call_next(request)
            process_time = time.time() - start_time
            logger.info(f"Completed Response: {response.status_code} in {process_time:.4f}s")
            response.headers["X-Request-ID"] = req_id
            response.headers["X-Process-Time"] = str(process_time)
            return response
        except Exception as e:
            process_time = time.time() - start_time
            logger.error(f"Unhandled Exception in {request.method} {request.url.path} after {process_time:.4f}s: {str(e)}")
            raise e
