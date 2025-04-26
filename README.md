# PDF Bot Frontend

A React-based frontend for the PDF Bot application that allows users to upload PDF documents, chat with their contents using AI, and manage document collections.

## Features

- Upload and manage PDF documents
- Chat interface for asking questions about document content
- Responsive design with light/dark mode support
- Real-time communication with backend via WebSockets

## Technologies

- React 19
- Material UI 7
- Tailwind CSS 4
- Vite 6
- WebSocket communication

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Configuration

The application connects to a backend server running at `http://localhost:8000` by default. To change the API endpoint, modify the `API_BASE_URL` in `src/services/api.js`.

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/src/services` - API services and utilities

