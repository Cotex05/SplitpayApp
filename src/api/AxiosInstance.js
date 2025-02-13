import axios from 'axios';
import {API_BASE_URL} from '@env';
import {showToastWithGravity} from '../components/native/AndroidComponents';
import {navigateToLogin} from '../navigation/NavigationService';

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

// Add a response interceptor to handle errors
AxiosInstance.interceptors.response.use(
  response => response, // Pass through successful responses
  error => {
    // Check if it's a server error
    if (error.response) {
      // Server responded with a status code out of 2xx range
      console.log('Error Response:', error.response);

      // Extract error message
      let errorMessage = error.response?.data?.message;

      if (error.response.status == 401) {
        navigateToLogin();
      }

      if (!errorMessage) {
        switch (error.response.status) {
          case 400:
            errorMessage = 'Bad or Invalid request!';
            break;
          case 401:
            errorMessage = 'Unauthorized: Please log in!';
            break;
          case 403:
            errorMessage = 'Forbidden: You are not authorized!';
            break;
          case 404:
            errorMessage = 'Not Found: The requested resource does not exist.';
            break;
          case 500:
            errorMessage = 'Server Error: Please try again later.';
            break;
          default:
            errorMessage = 'An unexpected error occurred.';
        }
      }
      // Display custom error message
      showToastWithGravity(errorMessage);
    }

    // Always reject the error to propagate it to the calling function
    return Promise.reject(error);
  },
);

export default AxiosInstance;
