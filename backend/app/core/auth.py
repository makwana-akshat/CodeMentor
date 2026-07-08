import jwt
from fastapi import Depends, HTTPException, Security, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
import os
from typing import Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

CLERK_JWT_ISSUER = os.getenv("CLERK_JWT_ISSUER")
if not CLERK_JWT_ISSUER:
    print("Warning: CLERK_JWT_ISSUER environment variable is not set.")

# Initialize the JWK client to fetch and cache Clerk's public keys
jwks_url = f"{CLERK_JWT_ISSUER}/.well-known/jwks.json" if CLERK_JWT_ISSUER else ""
jwks_client = jwt.PyJWKClient(jwks_url) if jwks_url else None

def verify_clerk_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Verify the Clerk JWT using the JWKS endpoint.
    Returns the decoded token payload or raises 401.
    """
    token = credentials.credentials
    if not CLERK_JWT_ISSUER or not jwks_client:
        raise HTTPException(status_code=500, detail="Authentication is not configured properly on the server.")

    try:
        # Get the signing key from the JWT header
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        # Decode and verify the token
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            # Clerk doesn't typically require audience verification for the session token by default, 
            # but we pass options to disable it if necessary, or specify the frontend origin.
            options={"verify_audience": False},
            leeway=60 # Add a 60 second leeway to account for clock skew on local development machines
        )
        
        clerk_user_id = payload.get("sub")
        if not clerk_user_id:
            raise HTTPException(status_code=401, detail="Invalid token: no subject")
            
        return payload

    except jwt.ExpiredSignatureError as e:
        print(f"JWT Error: Token expired: {str(e)}")
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        print(f"JWT Error: Invalid token: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
    except Exception as e:
        print(f"JWT Error: Unknown exception: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")

def get_current_user(token_payload: dict = Depends(verify_clerk_token)) -> str:
    """
    Dependency to get the current Clerk user ID.
    """
    return token_payload.get("sub")

