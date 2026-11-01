import sys
import time
from pathlib import Path
from collections import defaultdict

if sys.platform == "win32":
    try:
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        if hasattr(sys.stderr, 'reconfigure'):
            sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.schemas import (
    ChatRequest,
    ChatResponse,
    HealthResponse,
    OracleRequest,
    OracleResponse
)
from app.services.ai_service import generate_character_reply
from app.services.oracle_service import generate_oracle_prophecy
from app.data.characters_data import CHARACTERS_DATA
from app.data.mythology_info import MYTHOLOGY_INFO

app = FastAPI(
    title="ԽՈՍԻՐ ԱՍՏԾՈ ՀԵՏ",
    version="1.0.0"
)

origins = [
    settings.FRONTEND_ORIGIN,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

unique_origins = []
for orig in origins:
    if orig and orig not in unique_origins:
        unique_origins.append(orig)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем отовсюду для стабильной работы
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ip_requests = defaultdict(list)

def check_rate_limit(client_ip: str):
    now = time.time()
    ip_requests[client_ip] = [t for t in ip_requests[client_ip] if now - t < 60]
    if len(ip_requests[client_ip]) >= settings.RATE_LIMIT_PER_MINUTE:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait a moment."
        )
    ip_requests[client_ip].append(now)


@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    has_key = bool(
        settings.OPENROUTER_API_KEY
        and not settings.OPENROUTER_API_KEY.startswith("your_")
        and len(settings.OPENROUTER_API_KEY) > 10
    )
    has_devil_key = bool(
        (settings.DEVIL_API_KEY and not settings.DEVIL_API_KEY.startswith("your_") and len(settings.DEVIL_API_KEY) > 10)
        or has_key
    )
    return HealthResponse(
        status="healthy",
        api_key_configured=has_key,
        model=settings.OPENROUTER_MODEL,
        devil_api_configured=has_devil_key,
        devil_model=settings.DEVIL_MODEL or settings.OPENROUTER_MODEL,
        version="1.0.0"
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, req: Request):
    client_ip = req.client.host if req.client else "unknown"
    check_rate_limit(client_ip)

    reply_text = await generate_character_reply(
        character=request.character,
        language=request.language,
        messages=request.messages
    )

    return ChatResponse(
        reply=reply_text,
        character=request.character,
        language=request.language
    )


@app.get("/api/characters")
async def get_characters():
    return CHARACTERS_DATA


@app.post("/api/oracle", response_model=OracleResponse)
async def oracle_prophecy(request: OracleRequest, req: Request):
    client_ip = req.client.host if req.client else "unknown"
    check_rate_limit(client_ip)

    prophecy_text = await generate_oracle_prophecy(
        name=request.name,
        language=request.language
    )

    return OracleResponse(
        prophecy=prophecy_text,
        name=request.name,
        language=request.language
    )


@app.get("/api/mythology-info")
async def get_mythology_info():
    return MYTHOLOGY_INFO


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
