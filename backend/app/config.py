import os
from pathlib import Path
from dotenv import load_dotenv

backend_env = Path(__file__).resolve().parent.parent / ".env"
workspace_env = Path(__file__).resolve().parent.parent.parent / ".env"

if workspace_env.exists():
    load_dotenv(dotenv_path=workspace_env, override=True)
if backend_env.exists():
    load_dotenv(dotenv_path=backend_env, override=True)

class Settings:
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "").strip()
    OPENROUTER_MODEL: str = os.getenv("OPENROUTER_MODEL", "google/gemini-2.5-flash").strip()
    FRONTEND_ORIGIN: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173").strip()
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "127.0.0.1")
    OPENROUTER_URL: str = "https://openrouter.ai/api/v1/chat/completions"
    REQUEST_TIMEOUT: float = float(os.getenv("REQUEST_TIMEOUT", "45.0"))
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))

    DEVIL_API_KEY: str = os.getenv("DEVIL_API_KEY", "").strip()
    DEVIL_MODEL: str = os.getenv("DEVIL_MODEL", "google/gemini-2.5-flash").strip()
    DEVIL_BASE_URL: str = os.getenv("DEVIL_BASE_URL", "https://openrouter.ai/api/v1/chat/completions").strip()

settings = Settings()
