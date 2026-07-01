import axios from 'axios';

// Base URL for the backend API
const API_URL = 'https://jronix-backend.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
