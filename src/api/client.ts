import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:5000/api'; // Temporarily changed to local

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
