import axios from 'axios';
import {API_BASE_URL} from '@env';

// Base URL for backend
const BASE_URL = API_BASE_URL;

// Create Axios instance
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Needed if using cookies or authentication
});

// Interceptor to add token to requests
// api.interceptors.request.use(
//   async config => {
//     // Fetch token from async storage or redux
//     const token = 'your-jwt-token'; // Replace with actual token logic

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

export default AxiosInstance;
