import os
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings, StorageContext, load_index_from_storage
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.ollama import OllamaEmbedding

load_dotenv()

class RAGEngine:
    def __init__(self, data_dir: str = "../data", storage_dir: str = "./storage"):
        self.data_dir = data_dir
        self.storage_dir = storage_dir
        self.index = None
        self._initialize_settings()
        self._load_index()

    def _initialize_settings(self):
        # Configure Deepseek API via OpenAI compatible interface
        api_key = os.getenv("DEEPSEEK_API_KEY")
        if not api_key:
            print("Warning: DEEPSEEK_API_KEY not found in environment variables.")
        
        Settings.llm = OpenAI(
            model="deepseek-chat", 
            api_key=api_key, 
            api_base="https://api.deepseek.com"
        )
        
        # Keep using local Ollama for embeddings
        Settings.embed_model = OllamaEmbedding(model_name="nomic-embed-text:latest")

    def _load_index(self):
        if os.path.exists(self.storage_dir):
            try:
                storage_context = StorageContext.from_defaults(persist_dir=self.storage_dir)
                self.index = load_index_from_storage(storage_context)
                print("Index loaded from storage.")
            except Exception as e:
                print(f"Failed to load index from storage: {e}")
                self.index = None
        else:
            print("No existing storage found. Please index documents.")

    def refresh_index(self):
        if not os.path.exists(self.data_dir):
            os.makedirs(self.data_dir)
            
        documents = SimpleDirectoryReader(self.data_dir).load_data()
        if not documents:
            return "No documents found in data directory."
            
        self.index = VectorStoreIndex.from_documents(documents)
        
        # Persist to disk
        if not os.path.exists(self.storage_dir):
            os.makedirs(self.storage_dir)
        self.index.storage_context.persist(persist_dir=self.storage_dir)
        
        return f"Successfully indexed {len(documents)} documents."

    def query(self, query_text: str):
        if not self.index:
            return "Knowledge base is empty. Please ask admin to upload documents."
            
        query_engine = self.index.as_query_engine()
        response = query_engine.query(query_text)
        return str(response)

# Singleton instance
rag_engine = RAGEngine()
