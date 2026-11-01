import logging
import httpx
from app.config import settings
from app.prompts.oracle import get_oracle_system_prompt

logger = logging.getLogger("oracle_service")

FALLBACK_MODELS = [
    "google/gemini-2.5-flash",
    "google/gemini-2.0-flash",
    "meta-llama/llama-3.3-70b-instruct"
]

ERROR_MESSAGES = {
    "hy": "Սրբազան կրակը ժամանակավորապես հանգել է։ Խնդրում ենք նորից դիմել Սրբազան Տաճարին։",
    "ru": "Священный огонь временно угас. Пожалуйста, повторите обращение к Оракулу чуть позже.",
    "en": "The sacred flame has momentarily dimmed. Please approach the Oracle again shortly."
}

async def generate_oracle_prophecy(name: str, language: str) -> str:
    api_key = settings.OPENROUTER_API_KEY
    if not api_key or "your_" in api_key.lower() or api_key == "test_key":
        return ERROR_MESSAGES.get(language, ERROR_MESSAGES["en"])

    system_prompt = get_oracle_system_prompt(language)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"My name is {name}. Divine my fate, Oracle."}
    ]

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Sacred Oracle"
    }

    primary_model = settings.OPENROUTER_MODEL
    models_to_try = [primary_model]
    for fb in FALLBACK_MODELS:
        if fb not in models_to_try:
            models_to_try.append(fb)

    async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT) as client:
        for model_id in models_to_try:
            payload = {
                "model": model_id,
                "messages": messages,
                "temperature": 0.95,
                "max_tokens": 800
            }
            try:
                response = await client.post(settings.OPENROUTER_URL, headers=headers, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    choices = data.get("choices", [])
                    if choices and "message" in choices[0] and "content" in choices[0]["message"]:
                        reply = choices[0]["message"]["content"].strip()
                        if reply:
                            return reply
                logger.warning(f"Oracle model '{model_id}' returned {response.status_code}")
                if response.status_code == 401:
                    return ERROR_MESSAGES.get(language, ERROR_MESSAGES["en"])
            except httpx.TimeoutException:
                logger.warning(f"Oracle model '{model_id}' timed out")
            except Exception as exc:
                logger.warning(f"Oracle model '{model_id}' error: {exc}")

    return ERROR_MESSAGES.get(language, ERROR_MESSAGES["en"])
