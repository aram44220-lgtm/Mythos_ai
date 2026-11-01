from typing import List, Literal, Optional, Dict
from pydantic import BaseModel, Field, field_validator

CharacterId = Literal["vahagn", "aramazd", "anahit", "devil"]
LanguageCode = Literal["hy", "ru", "en"]

class OracleRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    language: LanguageCode = "hy"

class OracleResponse(BaseModel):
    prophecy: str
    name: str
    language: LanguageCode

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=4000)

class ChatRequest(BaseModel):
    character: CharacterId
    language: LanguageCode = "hy"
    messages: List[ChatMessage] = Field(..., min_items=1, max_items=30)

    @field_validator("messages")
    @classmethod
    def validate_last_message_is_user(cls, v: List[ChatMessage]) -> List[ChatMessage]:
        if not v or v[-1].role != "user":
            raise ValueError("The last message in conversation must be from the user.")
        return v

class ChatResponse(BaseModel):
    reply: str
    character: CharacterId
    language: LanguageCode

class HealthResponse(BaseModel):
    status: str
    api_key_configured: bool
    model: str
    devil_api_configured: bool = False
    devil_model: str = ""
    version: str = "1.0.0"

class CharacterInfo(BaseModel):
    id: str
    name: Dict[str, str]
    title: Dict[str, str]
    archetype: Dict[str, str]
    description: Dict[str, str]
    accent_color: str
    avatar_image: str
    greeting: Dict[str, str]
    suggested_questions: Dict[str, List[str]]
