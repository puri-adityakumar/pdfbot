import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Get list of uploaded documents
export const getDocuments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_documents/`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Upload PDF file
export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_BASE_URL}/upload_pdf/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

// Create WebSocket connection for chat
export const createChatWebSocket = () => {
  // Determine the WebSocket protocol based on the API URL protocol
  const wsProtocol = API_BASE_URL.startsWith('https') ? 'wss://' : 'ws://';
  
  // Remove the protocol part from the API URL
  const wsBaseUrl = API_BASE_URL.replace(/^https?:\/\//, '');
  
  return new WebSocket(`${wsProtocol}${wsBaseUrl}/ws/chat`);
};