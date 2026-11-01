import logging
import httpx
from typing import List
from app.config import settings
from app.schemas import ChatMessage, CharacterId, LanguageCode
from app.prompts.characters import get_system_prompt

logger = logging.getLogger("ai_service")

KEY_NOT_CONFIGURED_MESSAGES = {
    "hy": (
        "⚠️ OpenRouter API բանալին դեռ կարգավորված չէ backend/.env ֆայլում։ "
        "Խնդրում ենք ավելացնել ձեր OPENROUTER_API_KEY-ը backend/.env ֆայլում և վերագործարկել սերվերը։"
    ),
    "ru": (
        "⚠️ Ключ OpenRouter API ещё не настроен в файле backend/.env. "
        "Пожалуйста, укажите ваш OPENROUTER_API_KEY в backend/.env и перезапустите сервер."
    ),
    "en": (
        "⚠️ The OpenRouter API key is not yet configured in backend/.env. "
        "Please provide your OPENROUTER_API_KEY in backend/.env and restart the server."
    )
}

DEVIL_KEY_NOT_CONFIGURED_MESSAGES = {
    "hy": (
        "⚠️ Դևի API բանալին կարգավորված չէ backend/.env ֆայլում։ "
        "Խնդրում ենք ավելացնել DEVIL_API_KEY կամ OPENROUTER_API_KEY backend/.env ֆայլում և վերագործարկել սերվերը։"
    ),
    "ru": (
        "⚠️ Ключ для Дьявола ещё не настроен в файле backend/.env. "
        "Пожалуйста, укажите DEVIL_API_KEY (или OPENROUTER_API_KEY) в backend/.env и перезапустите сервер."
    ),
    "en": (
        "⚠️ The Devil API key is not yet configured in backend/.env. "
        "Please specify DEVIL_API_KEY (or OPENROUTER_API_KEY) in backend/.env and restart the server."
    )
}

ERROR_MESSAGES = {
    "auth_error": {
        "hy": "❌ Սխալ API բանալի։ Խնդրում ենք ստուգել OPENROUTER_API_KEY-ը backend/.env ֆայլում։",
        "ru": "❌ Неверный ключ API. Проверьте OPENROUTER_API_KEY в файле backend/.env.",
        "en": "❌ Invalid API key. Please check your OPENROUTER_API_KEY in backend/.env."
    },
    "rate_limit": {
        "hy": "⏳ Չափազանց շատ հարցումներ։ Խնդրում ենք սպասել մի պահ։",
        "ru": "⏳ Превышен лимит запросов. Пожалуйста, подождите минуту.",
        "en": "⏳ Rate limit reached. Please wait a moment."
    },
    "timeout": {
        "hy": "⏱️ Հարցման ժամանակը սպառվեց։ Խնդրում ենք փորձել կրկին։",
        "ru": "⏱️ Время ожидания ответа истекло. Пожалуйста, попробуйте отправить вопрос снова.",
        "en": "⏱️ Request timed out. Please try asking again."
    },
    "general_error": {
        "hy": "⚠️ Կապի խափանում։ Խնդրում ենք փորձել կրկին մի փոքր ուշ։",
        "ru": "⚠️ Ошибка связи. Пожалуйста, повторите попытку немного позже.",
        "en": "⚠️ Communication error. Please try again shortly."
    }
}

FALLBACK_MODELS = [
    "google/gemini-2.5-flash",
    "google/gemini-2.0-flash",
    "meta-llama/llama-3.3-70b-instruct"
]

DEVIL_FALLBACK_MODELS = [
    "gryphe/mythomax-l2-13b",
    "nousresearch/hermes-3-llama-3.1-405b",
    "mistralai/mistral-nemo"
]

async def _send_openrouter_request(client: httpx.AsyncClient, url: str, headers: dict, payload: dict) -> tuple[int, dict, str]:
    try:
        response = await client.post(
            url,
            headers=headers,
            json=payload
        )
        data = None
        try:
            data = response.json()
        except Exception:
            pass
        return response.status_code, data, response.text
    except httpx.TimeoutException:
        return 408, None, "Timeout"
    except Exception as exc:
        return 500, None, str(exc)

async def generate_character_reply(
    character: CharacterId,
    language: LanguageCode,
    messages: List[ChatMessage]
) -> str:
    is_devil = (character == "devil")

    if is_devil and settings.DEVIL_API_KEY and len(settings.DEVIL_API_KEY) > 10 and "your_" not in settings.DEVIL_API_KEY.lower():
        api_key = settings.DEVIL_API_KEY
        request_url = settings.DEVIL_BASE_URL
        primary_model = settings.DEVIL_MODEL or settings.OPENROUTER_MODEL
    else:
        api_key = settings.OPENROUTER_API_KEY
        request_url = settings.OPENROUTER_URL
        primary_model = settings.DEVIL_MODEL if (is_devil and settings.DEVIL_MODEL) else settings.OPENROUTER_MODEL

    if not api_key or "your_" in api_key.lower() or api_key == "test_key":
        if is_devil:
            return DEVIL_KEY_NOT_CONFIGURED_MESSAGES.get(language, DEVIL_KEY_NOT_CONFIGURED_MESSAGES["en"])
        return KEY_NOT_CONFIGURED_MESSAGES.get(language, KEY_NOT_CONFIGURED_MESSAGES["en"])

    system_content = get_system_prompt(character, language)
    formatted_messages = [{"role": "system", "content": system_content}]

    recent_messages = messages[-10:] if len(messages) > 10 else messages
    for msg in recent_messages:
        formatted_messages.append({"role": msg.role, "content": msg.content})

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Talk to a God"
    }

    models_to_try = [primary_model]
    active_fallbacks = DEVIL_FALLBACK_MODELS if is_devil else FALLBACK_MODELS
    for fb_model in active_fallbacks:
        if fb_model not in models_to_try:
            models_to_try.append(fb_model)

    temp_val = 0.85 if is_devil else 0.8
    tokens_val = 900 if is_devil else 800

    async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT) as client:
        last_status = None

        for model_id in models_to_try:
            payload = {
                "model": model_id,
                "messages": formatted_messages,
                "temperature": temp_val,
                "max_tokens": tokens_val
            }

            status_code, data, raw_text = await _send_openrouter_request(client, request_url, headers, payload)
            last_status = status_code

            if status_code == 200 and data:
                choices = data.get("choices", [])
                if choices and "message" in choices[0] and "content" in choices[0]["message"]:
                    reply_text = choices[0]["message"]["content"].strip()
                    if reply_text:
                        return reply_text

            logger.warning(
                f"Model '{model_id}' returned status {status_code}: {raw_text[:200]}"
            )

            if status_code == 401:
                return ERROR_MESSAGES["auth_error"].get(language, ERROR_MESSAGES["auth_error"]["en"])

        if last_status == 408:
            return ERROR_MESSAGES["timeout"].get(language, ERROR_MESSAGES["timeout"]["en"])
        elif last_status in (402, 429):
            return ERROR_MESSAGES["rate_limit"].get(language, ERROR_MESSAGES["rate_limit"]["en"])
        else:
            return ERROR_MESSAGES["general_error"].get(language, ERROR_MESSAGES["general_error"]["en"])
