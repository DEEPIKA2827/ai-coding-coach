# 🧠 AI-Assisted Coding Practice Coach

A full-stack AI-powered tool that helps coding students **practice problems without immediately seeing solutions**. It guides students through reasoning, releases hints progressively, analyzes code quality, and tracks daily learning.

---

## 🎯 Problem It Solves

Most students jump to solutions too quickly and don't develop real problem-solving skills. This coach:
- **Blocks solution-seeking** by asking reasoning questions first
- **Releases hints gradually** — not all at once
- **Evaluates code quality** and time complexity
- **Tracks what you learned** from each problem

---

## 🧩 Core Modules

| Module | Description |
|---|---|
| 🤔 **Thinking Coach** | Asks reasoning questions before giving any hints |
| 💡 **Progressive Hint System** | Hints unlock in tiers (1 → 2 → 3) |
| 📊 **Code Analyzer** | Evaluates time/space complexity and code quality |
| 📅 **Daily Coding Tracker** | Log reflections and learnings per problem |
| 🔌 **Chrome Extension** | Detects LeetCode problem pages and activates the coach |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Browser Extension | Chrome Extension API (Manifest V3) |
| Auth | JWT + bcryptjs |
| AI | OpenAI / Gemini (via LLM Gateway) |

---

## 📁 Project Structure

```
ai-coding-coach/
├── backend/
│   ├── server.js                  # Entry point
│   ├── .env                       # Secrets (not committed)
│   └── src/
│       ├── config/
│       │   └── db.js              # MongoDB connection
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── hints.routes.js
│       │   ├── problems.routes.js
│       │   ├── analyzer.routes.js
│       │   └── tracker.routes.js
│       ├── models/
│       │   ├── User.model.js
│       │   ├── TrackerLog.model.js
│       │   └── HintSession.model.js
│       ├── controllers/           # (in progress)
│       ├── services/              # (in progress)
│       └── middleware/
│           └── errorHandler.js
│
└── extension/
    ├── manifest.json
    ├── background/
    │   └── background.js          # Detects LeetCode tab changes
    ├── content/
    │   └── content.js             # Injects coach panel into page
    ├── popup/
    │   ├── popup.html
    │   └── popup.js
    └── icons/
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/DEEPIKA2827/ai-coding-coach.git
cd ai-coding-coach
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai_coding_coach
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```
Server runs at `http://localhost:5000`

### 3. Load Chrome Extension
1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer Mode** (top right)
3. Click **"Load unpacked"**
4. Select the `extension/` folder
5. Open any LeetCode problem — the coach panel appears!

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Server health check |
| GET | `/api/auth/health` | Auth route check |
| GET | `/api/hints/health` | Hints route check |
| GET | `/api/problems/health` | Problems route check |
| GET | `/api/analyzer/health` | Analyzer route check |
| GET | `/api/tracker/health` | Tracker route check |

> More endpoints coming as each module is built.

---

## 🗺️ Data Flow

```
Student opens LeetCode problem
        ↓
Extension detects page → shows coach panel
        ↓
Student clicks "Request Hint"
        ↓
Thinking Coach asks reasoning questions
        ↓
LLM evaluates depth of understanding
        ↓
Good answer → Hint Tier 1 unlocked
        ↓
HintSession saved in MongoDB
TrackerLog records what student learned
```

---

## 📌 Build Progress

- [x] System architecture design
- [x] Express backend server
- [x] MongoDB schemas (User, TrackerLog, HintSession)
- [x] Chrome Extension (LeetCode detector + coach panel)
- [ ] Auth (Register / Login with JWT)
- [ ] Thinking Coach Service (LLM prompts)
- [ ] Progressive Hint Engine
- [ ] Code Analyzer
- [ ] React Frontend
- [ ] Connect Extension to Backend

---

## 🤝 Contributing

This is a learning project built step by step. Feel free to fork and build along!

---

## 📄 License

MIT
