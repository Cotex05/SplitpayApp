import axios from 'axios';
import {API_BASE_URL_SERVER} from '@env';
import {showToastWithGravity} from '../components/native/AndroidComponents';
import {navigateToSignin} from '../navigation/NavigationService';
import {Alert} from 'react-native';

// Base URL for backend
const BASE_URL = API_BASE_URL_SERVER;

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

// Request Interceptor
AxiosInstance.interceptors.request.use(
  config => {
    // console.log('Request:', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors
AxiosInstance.interceptors.response.use(
  response => response, // Pass through successful responses
  error => {
    if (error.message === 'Network Error') {
      Alert.alert(
        'Network Error',
        'An unexpected error occurred, unable to connect with server.',
      );
    } else if (error.code === 'ECONNABORTED') {
      Alert.alert(
        'Request Timed Out',
        'The request took too long. Please try again later.',
      );
    }
    // Check if it's a server error
    if (error.response) {
      // Server responded with a status code out of 2xx range
      console.log('Error Response:', error.response);

      // Extract error message
      let errorMessage = error.response?.data?.message;

      if (error.response.status == 401) {
        navigateToSignin();
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
