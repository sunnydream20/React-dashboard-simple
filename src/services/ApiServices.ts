import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch data');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error(error.message || 'Request failed');
    }
  }
);

export default api;