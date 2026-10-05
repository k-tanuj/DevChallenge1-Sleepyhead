import os
import time

class AIService:
    def __init__(self):
        self.use_mock = os.getenv("OLLAMA_BASE_URL") is None
        self.model = os.getenv("OLLAMA_MODEL", "llama3")

    def generate_plan(self, context_data: dict, user_message: str):
        if self.use_mock:
            return {
                "response": f"[Local AI - Demo Mode]\nBased on your routine data, pushing through '{user_message}' tonight will likely ruin your sleep schedule. Stop at midnight.",
                "actions": ["Plan Tomorrow", "Adjust Exam Goals"]
            }
        # Real implementation would call Ollama here via requests library
        return {"response": "Real AI Not Configured", "actions": []}

    def analyze_routine(self, user_id: int):
        if self.use_mock:
            return {
                "insights": [
                    "You consistently complete more study work between 7 PM and 9 PM.",
                    "Your bedtime becomes less consistent after late-night study sessions."
                ]
            }
        return {"insights": []}
