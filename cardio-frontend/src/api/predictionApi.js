import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkHealth = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export const predictRisk = async (assessmentData) => {
  try {
    const response = await api.post('/predict', assessmentData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Prediction failed');
    }
    throw new Error('Unable to connect to the prediction server. Please make sure the backend is running and try again.');
  }
};
