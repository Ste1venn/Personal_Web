from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Personal AI Website API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pydantic import BaseModel
from rag_engine import rag_engine

class ChatRequest(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Personal AI Website Backend"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    response = rag_engine.query(request.query)
    return {"response": response}

@app.post("/api/refresh")
def refresh_knowledge():
    status = rag_engine.refresh_index()
    return {"status": status}
