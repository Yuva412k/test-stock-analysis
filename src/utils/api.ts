import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

export const api = axios.create({
  baseURL: isDevelopment ? 'http://localhost:8000' : 'https://api.example.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchMockData = async (endpoint: string) => {
  if (isDevelopment) {
    const response = await import(`../mockData/${endpoint}.json`);
    return response.default;
  } else {
    const response = await api.get(endpoint);
    return response.data;
  }
};
