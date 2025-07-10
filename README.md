# RAG System using LlamaIndex

A comprehensive Retrieval-Augmented Generation (RAG) system built with LlamaIndex.

## Setup

1. **Install dependencies**:
   ```bash
   uv add llama-index python-dotenv openai
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

3. **Create data directory**:
   ```bash
   mkdir -p data
   ```

4. **Add your documents** to the `data/` folder (supports .txt, .pdf, .docx, .md, etc.)

5. **Run Jupyter Lab**:
   ```bash
   uv run --with jupyter jupyter lab
   ```

6. **Open** `rag_llamaindex.ipynb` and run the cells

## Features

- ✅ Document loading from multiple formats
- ✅ Vector embeddings with OpenAI
- ✅ Similarity search and retrieval
- ✅ Query engine with multiple modes
- ✅ Source attribution
- ✅ Index persistence
- ✅ Streaming responses
- ✅ Interactive querying

## Usage

1. Load documents from the `data/` folder
2. Create vector embeddings
3. Build searchable index
4. Query your documents with natural language
5. Get contextual answers with source attribution

## Requirements

- Python 3.8+
- OpenAI API key
- Documents in the `data/` folder

## File Structure

```
RAG-using-LlamaIndex/
├── data/                    # Your documents go here
├── storage/                 # Persistent index storage
├── rag_llamaindex.ipynb    # Main notebook
├── .env.example            # Environment template
├── commands_to_run.txt     # Useful commands
└── README.md              # This file
```

## Next Steps

- Add more documents to improve knowledge base
- Experiment with different query modes
- Try different similarity thresholds
- Explore metadata filtering
- Build a web interface with Streamlit
