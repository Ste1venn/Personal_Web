# AI-Powered Personal Portfolio & Knowledge Base

A modern, high-performance personal website combining a **Glassmorphism UI** portfolio with a **Local RAG (Retrieval-Augmented Generation)** AI assistant.

Built with **React (Vite)**, **FastAPI**, **Deepseek LLM**, and **LlamaIndex**.

<<<<<<< HEAD
=======
![Project Preview](frontend/public/images/articles/preview_placeholder.png)
*(Replace this path with a real screenshot of your landing page)*

>>>>>>> dbb55892 (second)
## ✨ Key Features

- **🎨 Extremely Beautiful UI**:

  - Implements **Nielsen’s 10 Usability Heuristics**.
  - Modern **Glassmorphism** aesthetic with dynamic framer-motion animations.
  - Fully responsive design with dark mode focus.
- **🤖 AI Agent Integration**:

  - **RAG Engine**: Answers questions based on your personal documents (uploaded to `data/`).
  - **Hybrid AI Stack**: Uses **Deepseek Cloud API** for high-intelligence reasoning and **Local Ollama** for private embeddings.
  - **Context-Aware**: The AI knows about your portfolio content and professional background.
- **📝 Dynamic Content System**:

  - **Markdown-First**: Write articles/projects in Markdown with Frontmatter.
  - **Auto-Discovery**: Simply drop `.md` files into the content folders to update the website instantly.
  - **Rich Rendering**: Supports syntax highlighting, images with captions, and tagged categorization.

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Design System (CSS Variables)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v7

### Backend

- **Framework**: FastAPI (Python 3.12)
- **AI Framework**: LlamaIndex
- **LLM**: Deepseek Chat (`deepseek-chat`)
- **Embeddings**: Ollama (`nomic-embed-text`)
- **Vector Store**: Local disk persistence

### Deployment

- **Containerization**: Docker + Docker Compose
- **Server**: Nginx (Reverse Proxy)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **Python** (v3.12+)
- **Docker** & Docker Compose
- **Ollama** (Running locally with `nomic-embed-text` model)

### 1. Clone the Repository

```bash
git clone https://github.com/Ste1venn/Personal_Web.git
cd Personal_Web
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# backend/.env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### 3. Run with Docker (Recommended)

This will start both Frontend (Nginx) and Backend (FastAPI).

```bash
docker-compose up -d --build
```

Access the site at `http://localhost`.

---

### 4. Manual Development Setup

#### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Ensure you have the embedding model
ollama pull nomic-embed-text

# Start Server
uvicorn main:app --reload
```

*Backend runs on `http://localhost:8000`*

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

*Frontend runs on `http://localhost:5173`*

## 📚 Content Management

### Adding a New Project/Article

No code changes required! Just add a Markdown file.

1. **Locate Directory**: Go to `frontend/src/content/` and choose:

   - `product/`
   - `ai/`
   - `entrepreneurship/`
2. **Create File**: Create `my-new-post.md` with this Frontmatter:

   ```markdown
   ---
   title: My Amazing Project
   description: A short summary displayed on the card.
   tags: [React, AI, Design]
   date: Oct 2025
   ---

   # My Amazing Project

   Here is the detailed content...
   ```
3. **Adding Images**:

   - Place image in `frontend/public/images/articles/`.
   - Reference in markdown: `![Alt Text](/images/articles/my-image.png "Caption")`

### Updating the AI Knowledge Base

To make the AI aware of your new content:

1. Save your content as a `.md` or `.txt` file.
2. proper Place it in the `data/` directory.
3. Call the refresh endpoint:
   ```bash
   curl -X POST http://localhost:8000/api/refresh
   ```

## 📂 Project Structure

```
Personal_Web/
├── backend/                # FastAPI Application
│   ├── main.py            # API Endpoints
│   ├── rag_engine.py      # LlamaIndex Logic
│   └── ...
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/    # Reusable UI (Card, ChatWidget)
│   │   ├── content/       # Markdown Content Files
│   │   ├── pages/         # Page Views
│   │   ├── styles/        # Design System
│   │   └── utils/         # Content Loader Logic
│   └── ...
├── data/                   # RAG Knowledge Base Documents
├── storage/                # Persisted Vector Index
└── docker-compose.yml      # Deployment Config
```

## 📝 License

This project is licensed under the MIT License.
