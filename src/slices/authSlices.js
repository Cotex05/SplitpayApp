import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToastWithGravity} from '../components/native/AndroidComponents';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for User Sign Up (POST Request)
export const userSignUp = createAsyncThunk(
  'auth/userSignUp',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(`/auth/signup`, userData);
      console.log('Signup response: ', response);
      return response.data; // API response (success message or user data)
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// ✅ Async Thunk for User Login (POST Request)
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (loginData, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(`/auth/signin`, loginData);
      console.log('Login response: ', response);
      return response.data; // Returns user data (e.g., token, user details)
    } catch (error) {
      console.log(error);
      showToastWithGravity('Error: ' + error?.message);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// ✅ Async Thunk for User Login (POST Request)
export const userPersist = createAsyncThunk(
  'auth/userPersist',
  async (_, {rejectWithValue}) => {
    try {
      const jsonValue = await AsyncStorage.getItem('authUser');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('get userData', userData);
      if (userData) {
        return userData;
      } else {
        throw new Error('Auto authentication failed!');
      }
    } catch (error) {
      showToastWithGravity('Error: ' + error?.message);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Authentication Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(userSignUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = 'User registered successfully!';
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // ✅ Login Cases
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming API returns user object
        state.isAuthenticated = true;
        state.successMessage = 'Login successful!';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Persists Cases
      .addCase(userPersist.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userPersist.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.successMessage = 'Authorization successful!';
      })
      .addCase(userPersist.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
