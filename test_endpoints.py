import httpx
import json
import sys

# Ensure UTF-8 output on Windows console
sys.stdout.reconfigure(encoding='utf-8')

base_url = "http://127.0.0.1:8000"

def test_api():
    with httpx.Client(base_url=base_url) as client:
        # Test Health
        r_health = client.get("/api/health")
        print("HEALTH:", r_health.status_code, r_health.json())

        # Test Characters
        r_chars = client.get("/api/characters")
        print("CHARACTERS:", r_chars.status_code, list(r_chars.json().keys()))

        # Test Quiz
        r_quiz = client.get("/api/quiz")
        print("QUIZ:", r_quiz.status_code, "questions count:", len(r_quiz.json()))

        # Test Chat (Vahagn)
        payload = {
            "character": "vahagn",
            "language": "hy",
            "messages": [
                {"role": "user", "content": "Ո՞վ ես դու։"}
            ]
        }
        r_chat = client.post("/api/chat", json=payload)
        print("CHAT VAHAGN STATUS:", r_chat.status_code)
        print("CHAT VAHAGN REPLY:", r_chat.json().get("reply")[:120] if r_chat.status_code == 200 else r_chat.text)

        # Test Chat (Devil)
        payload_devil = {
            "character": "devil",
            "language": "ru",
            "messages": [
                {"role": "user", "content": "Кто ты и почему отвечаешь на всё?"}
            ]
        }
        r_devil = client.post("/api/chat", json=payload_devil)
        print("CHAT DEVIL STATUS:", r_devil.status_code)
        print("CHAT DEVIL REPLY:", r_devil.json().get("reply")[:120] if r_devil.status_code == 200 else r_devil.text)

if __name__ == "__main__":
    test_api()
