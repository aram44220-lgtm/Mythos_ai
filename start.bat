@echo off
chcp 65001 >nul
echo ========================================================
echo    Запуск проекта: ԽՈՍԻՐ ԱՍՏԾՈ ՀԵՏ / Talk to a God
echo ========================================================
echo.

echo [1/2] Запуск бэкенда FastAPI (порт 8000)...
start "AI EU - Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && call .\venv\Scripts\activate && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 /nobreak >nul

echo [2/2] Запуск фронтенда Vite (порт 5173)...
start "AI EU - Frontend (Vite)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================================
echo Серверы запущены! Открываем страницу в браузере...
echo Адрес фронтенда: http://localhost:5173
echo Адрес бэкенда:   http://127.0.0.1:8000
echo ========================================================
start http://localhost:5173
pause
