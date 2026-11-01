# ԽՈՍԻՐ ԱՍՏԾՈ ՀԵՏ (Talk to a God / Поговори с богом)

> **An immersive, cinematic, single-page AI experience inspired by ancient Armenian mythology.**  
> Converse directly with the deities of the ancient pantheon — **Վահագն (Vahagn)**, **ԱՐԱՄԱԶԴ (Aramazd)**, and **ԱՆԱՀԻՏ (Anahit)** — explore timeless legends, test your knowledge in the interactive trial quiz, and experience authentic speech interaction.

---

## 🏛️ Project Overview

- **Concept**: Interactive digital mythology museum meets independent game website aesthetics. Visitors converse with ancient Armenian deities roleplayed by advanced AI, delve into pre-Christian history, and test their wisdom.
- **Single-Page Architecture**: The entire application fits on one responsive page without route reloads. Modals and drawer states handle detailed educational content and the interactive quiz.
- **Trilingual Localization**: Complete instantaneous switching across **Հայերեն (hy)**, **Русский (ru)**, and **English (en)**, saved in `localStorage`.
- **Audio & Voice**:
  - **Speech-to-Text (STT)**: Microphone speech input powered by the Web Speech API (`hy-AM`, `ru-RU`, `en-US`).
  - **Text-to-Speech (TTS)**: Deities speak aloud their wisdom using browser speech synthesis.
  - **Atmospheric Soundscape**: Procedurally synthesized ancient temple drone and resonant chimes generated via the Web Audio API without broken external audio files.
- **Mythology Quiz**: 10 authentic multiple-choice questions with instant feedback, historical explanations, score tracking, and victory confetti.
- **Educational Pantheon Guide**: Comprehensive historical breakdown citing Movses Khorenatsi, Agathangelos, Urartian roots, and pre-Christian sacred sanctuaries.

---

## 🗂️ Project Structure

```
ai EU/
├── backend/
│   ├── app/
│   │   ├── config.py           # Environment settings & OpenRouter configuration
│   │   ├── main.py             # FastAPI entrypoint, CORS, rate limiting
│   │   ├── schemas.py          # Pydantic validation models
│   │   ├── data/
│   │   │   ├── characters_data.py # Character bios, archetypes, greetings
│   │   │   ├── mythology_info.py  # Educational pantheon history
│   │   │   └── quiz.py            # Multilingual 10-question mythology quiz
│   │   ├── prompts/
│   │   │   └── characters.py   # System prompts for Vahagn, Aramazd, Anahit
│   │   └── services/
│   │       └── ai_service.py   # OpenRouter async client & graceful fallbacks
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── public/
│   │   └── assets/images/      # Custom cinematic portraits & temple hero art
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx      # Arevakhach emblem, nav controls, lang switcher
│   │   │   ├── Hero.jsx        # First-screen cinematic composition & CTAs
│   │   │   └── Modals/
│   │   │       ├── InfoModal.jsx  # Educational pantheon guide
│   │   │       └── QuizModal.jsx  # Interactive trial quiz modal
│   │   ├── features/
│   │   │   ├── characters/     # Deity selection cards & badges
│   │   │   ├── chat/           # Chat window, message bubbles, STT/TTS, prompts
│   │   │   ├── quiz/           # Quiz game logic, progress, score, explanations
│   │   │   └── data/           # Default offline fallback datasets
│   │   ├── i18n/
│   │   │   └── translations.js # Complete strings in hy, ru, en
│   │   ├── services/
│   │   │   ├── api.js          # Backend API client
│   │   │   ├── audio.js        # Web Audio API procedural temple drone
│   │   │   └── speech.js       # Speech recognition & synthesis
│   │   ├── styles/
│   │   │   └── index.css       # Obsidian & antique gold cinematic theme
│   │   ├── App.jsx             # Root single-page state management
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .env
└── README.md
```

---

## ⚡ Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Python**: v3.10 or higher
- **Modern Web Browser**: Chrome, Edge, Safari, or Firefox (Chrome/Edge recommended for full Web Speech recognition support).

---

## 🚀 Quick Start Guide

### 1. Backend Setup

1. Open a terminal in the project directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   - **Windows**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `backend/.env` and insert your OpenRouter API key:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx
   OPENROUTER_MODEL=google/gemini-2.5-flash
   FRONTEND_ORIGIN=http://localhost:5173
   PORT=8000
   ```
5. Start the backend server:
   ```bash
   uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   The backend will be live at `http://127.0.0.1:8000`. You can test health at:
   `http://127.0.0.1:8000/api/health`

---

### 2. Frontend Setup

1. In a second terminal, navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Configure frontend environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Ensure it points to the backend:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser at:
   `http://127.0.0.1:5173`

---

## 🔑 OpenRouter API Configuration

1. Visit [https://openrouter.ai/](https://openrouter.ai/) and create an account.
2. Generate an API Key under [https://openrouter.ai/keys](https://openrouter.ai/keys).
3. Open `backend/.env` and paste your key into:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ```
4. You can freely change `OPENROUTER_MODEL` to any supported model ID on OpenRouter:
   - `google/gemini-2.5-flash` (Recommended: fast, cost-effective, high quality)
   - `openai/gpt-4o-mini`
   - `meta-llama/llama-3.3-70b-instruct`
   - `anthropic/claude-3.5-haiku`
5. Restart the backend server after editing `.env`.
   *(Note: If no API key is provided, the backend returns a clear, polite configuration guide in the chosen language without breaking the application or crashing!)*

---

## ⛧ DEVIL / DEMON — Uncensored AI (Бесцензурный ИИ)

В проект добавлен четвёртый тайный персонаж — **Дьявол / Владыка Бездны (The Devil)**, расположенный в секции **«⛧ ЗАПРЕТНАЯ ЗОНА ⛧»**.  
В отличие от классических богов, он не скован догмами, говорит без ханжества, отвечает дерзко, глубоко и без цензуры на абсолютно любые вопросы (психология, тайны мироздания, запретные темы, природа зла, страсти).

### ⚙️ Как настроить API для Дьявола:
В файле `backend/.env` есть специальный блок:
```env
# 1. Если DEVIL_API_KEY пустой, дьявол автоматически использует OPENROUTER_API_KEY
DEVIL_API_KEY=

# 2. Модель для дьявола (по умолчанию google/gemini-2.5-flash или выбери uncensored)
DEVIL_MODEL=google/gemini-2.5-flash

# 3. Базовый адрес API (по умолчанию OpenRouter)
DEVIL_BASE_URL=https://openrouter.ai/api/v1/chat/completions
```

### 🌐 Где взять API без цензуры:
1. **OpenRouter (Самый удобный вариант, ключ уже подходит)**:
   - Сайт: [https://openrouter.ai/](https://openrouter.ai/)
   - Модели без цензуры (Uncensored) на OpenRouter (просто укажи в `DEVIL_MODEL`):
     - `cognitivecomputations/dolphin-mixtral-8x7b` — легендарная бесцензурная модель Dolphin
     - `nousresearch/nous-hermes-2-mixtral-8x7b-dpo` — глубокая философия, литература и отсутствие фильтров
     - `nousresearch/hermes-3-llama-3.1-405b` — сверхмощный интеллект без морализаторства
     - `gryphe/mythomax-l2-13b` — признанная модель для мистического и тёмного ролевого отыгрыша
     - `mistralai/mistral-large-2407` — максимальная эрудиция без цензуры
2. **Venice AI** ([https://venice.ai/](https://venice.ai/)):
   - Специализированный провайдер без цензуры и без сохранения логов.
   - `DEVIL_BASE_URL=https://api.venice.ai/api/v1/chat/completions`
   - `DEVIL_API_KEY=твой_ключ_от_venice`
3. **Featherless.ai** ([https://featherless.ai/](https://featherless.ai/)):
   - Сервис с доступом к тысячам моделей с HuggingFace без цензуры.
4. **Together AI** ([https://together.ai/](https://together.ai/)):
   - Быстрый доступ к открытым Llama, Mistral и Qwen моделям.
5. **Локально через Ollama (100% бесплатно и на вашем ПК)**:
   - Скачай Ollama с [https://ollama.com/](https://ollama.com/)
   - Запусти в консоли: `ollama run dolphin-llama3`
   - В `backend/.env` укажи:
     ```env
     DEVIL_BASE_URL=http://localhost:11434/v1/chat/completions
     DEVIL_MODEL=dolphin-llama3
     DEVIL_API_KEY=ollama
     ```


## 🛡️ Security & Privacy

- **Zero Client-Side Leaks**: The OpenRouter API key is strictly isolated in the Python backend (`backend/.env`). No secrets are exposed to Vite, client JavaScript, local storage, or network requests.
- **CORS Protection**: Configured via FastAPI middleware for allowed frontend origins.
- **Rate Limiting**: Sliding window rate limiting on `/api/chat` prevents spam and denial-of-service abuse.
- **Input Validation**: Pydantic schema validation restricts message lengths, enforces character whitelists, and prevents prompt injection attempts.

---

## 🧪 Testing and Verification

- **Backend Health**: `GET http://127.0.0.1:8000/api/health` returns `status: healthy` and indicates whether the API key is active.
- **Chat Endpoint**: `POST http://127.0.0.1:8000/api/chat` processes multilingual questions and validates character personas.
- **Language Switcher**: Test switching between **ՀԱՅ**, **РУС**, and **ENG**; all headings, buttons, suggested questions, and dialogs update instantly.
- **Character Selection**: Selecting Vahagn, Aramazd, or Anahit changes active accent lighting, greetings, and suggested inquiries.
- **Quiz**: Launch the quiz via the header button, answer questions to see instant validation and historical commentary, and complete all 10 questions to view the score and confetti celebration.
- **Voice Interaction**: Click the microphone icon to transcribe voice into the input field; click the speaker button on AI responses to listen to the deities speak.

---

## 📜 Cultural & Historical Context

The project is dedicated to the pre-Christian cultural heritage of the Armenian Highlands, drawing upon records preserved by 5th-century Armenian historians **Movses Khorenatsi** (*History of Armenia*), **Agathangelos**, and **Faustus of Byzantium**, as well as ancient bards (*Gusan* songs).

*Disclaimer: The dialogues presented in this project are creative AI roleplay simulations designed for education and cultural appreciation. They do not claim to represent literal supernatural entities or immutable historical transcripts.*
