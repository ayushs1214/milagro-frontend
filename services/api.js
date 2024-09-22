import axios from 'axios';

// Set up the base URL for Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL from the .env file
});

// Function to set the Authorization header if needed
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;