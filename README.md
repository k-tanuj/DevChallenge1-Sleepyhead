# Sleepyhead 🌙

*"Contribute to your own routine."*

Sleepyhead is a local-first AI routine companion built for a student/friend who struggles with inconsistent sleep and study timing. It combines personalized AI routine planning, sleep-safe study planning, and developer-style gamification.

## The Story (Hacktoberfest Concept)

My friend kept struggling with the same cycle: studying too late, sleeping late, waking late, and repeating it. Instead of building another generic productivity tracker, I built Sleepyhead specifically around their routine. 

The system learns their behavior, generates realistic challenges, and helps them *contribute to their own routine*.

I chose an open/local AI approach because routine and personal behavior data is highly private. The core AI architecture supports running locally through Ollama, ensuring that this sensitive information is never sent to a third-party AI provider.

## 🚀 Features

- **Developer-Inspired Gamification**: Level up your routine using a Hacktoberfest/GitHub-inspired contribution heatmap, XP, streaks, and achievements.
- **AI Coach (Local-First)**: An open-weight AI coach that plans study sessions around your preferred sleep windows.
- **Challenges & Issues**: Treat your healthy habits like repository issues. Close challenges to earn XP and unlock badges (e.g., *Night Owl*, *Early Bird*, *Locked In*).
- **Exam Mode**: Inform the AI about upcoming exams so it can generate safe, realistic study challenges without sacrificing your sleep schedule.
- **Dashboard**: A highly polished, dark-mode gaming-style dashboard to track your daily progress.

## 🏗️ Architecture

- **Frontend**: React, Vite, TypeScript, Tailwind CSS (v4).
- **Backend**: Python, FastAPI.
- **Database**: SQLite (local data storage).
- **AI**: Configurable open-weight instruction model (via Ollama).

## 🧠 Why Open-Weight AI?

Sleepyhead tracks when you sleep, when you study, and when you struggle. That data is private. By using an open-weight AI (like LLaMA3) running locally via Ollama, the user gets all the benefits of intelligent routine planning without the privacy risks of cloud-based LLM APIs.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js & npm
- Python 3.10+
- [Ollama](https://ollama.com/) (optional, for local AI)

### 1. Run the Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python main.py
```
*The backend will run on `http://localhost:8000`*

### 2. Run the Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on `http://localhost:5173`*

### 3. Setup Local AI (Ollama) - Optional
If you have Ollama installed:
```bash
ollama run llama3
```
You can configure the backend to use this by setting the environment variables:
`OLLAMA_BASE_URL=http://localhost:11434`
`OLLAMA_MODEL=llama3`

*(If Ollama is not configured, the app falls back to a deterministic Mock AI mode for demo purposes).*

## 📸 Screenshots
*(Coming soon)*

## 🔮 Future Improvements
- Deeper insights and analytics algorithms.
- Custom challenge creation.
- Weekly automated routine reports.
