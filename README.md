# PDF Bot - AI-Powered Document Q&A Application

PDF Bot is a full-stack application that enables users to upload PDF documents and ask questions about their content in natural language. The application processes the uploaded documents, stores their content in a vector database, and uses advanced natural language processing to provide accurate answers to user queries in real-time.

![PDF Bot](https://img.shields.io/badge/PDF%20Bot-Document%20Q%26A-blue)

## Features

- **PDF Document Upload**: Upload any PDF document for AI analysis
- **Real-time Chat Interface**: Ask questions about your documents and receive instant answers
- **Source Attribution**: Responses include references to the source documents

## Technology Stack

### Frontend (Client)

- **Framework**: React 19.0 with React Router 7.5
- **UI Components**: Material-UI v7 (MUI)
- **Styling**: Tailwind CSS, Emotion (MUI's styling solution)
- **API Interaction**: Axios for HTTP requests
- **Real-time Communication**: WebSockets for chat functionality
- **Markdown Rendering**: React Markdown for formatting responses
- **Build Tool**: Vite 6.3

### Backend (Server)

- **Framework**: FastAPI (Python)
- **Language Model**: Google Gemini 2.0 Flash
- **Embeddings**: Google Generative AI Embeddings
- **Vector Database**: Chroma DB for document storage and retrieval
- **PDF Processing**: PyPDF2/pypdf
- **Language Processing**: LangChain for document chain-of-thought processing
- **Real-time Communication**: WebSockets for bidirectional chat
- **Authentication**: Not implemented in the current version

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.11
- Google Gemini API key
