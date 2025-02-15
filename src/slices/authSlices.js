import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToastWithGravity} from '../components/native/AndroidComponents';
import AxiosInstance from '../api/AxiosInstance';
import {Buffer} from 'buffer';
import {APP_NAME} from '../constants/names';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Async Thunk for User Sign Up (POST Request)
export const userSignUp = createAsyncThunk(
  'auth/userSignUp',
  async (signUpRequest, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(`/auth/signup`, signUpRequest);
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
  async (loginRequest, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(`/auth/signin`, loginRequest);
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

// ✅ Async Thunk for User Signout (POST Request)
export const userSignout = createAsyncThunk(
  'auth/userSignout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(`/auth/signout`);
      console.log('Signout response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      showToastWithGravity('Error: ' + error?.message);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// ✅ Async Thunk for user existence through email (POST Request)
export const fetchUserExistStatus = createAsyncThunk(
  'auth/verify',
  async (email, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(`/auth/verify?email=${email}`);
      console.log('Verify response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
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
      const jwtToken = userData?.jwtToken;
      if (!jsonValue) {
        throw new Error(`Login to ${APP_NAME}`);
      }
      const parts = jwtToken
        .split('.')
        .map(part =>
          Buffer.from(
            part.replace(/-/g, '+').replace(/_/g, '/'),
            'base64',
          ).toString(),
        );
      const payload = JSON.parse(parts[1]);
      console.log('payload', payload);
      if (payload.exp * 1000 < Date.now()) {
        await AsyncStorage.removeItem('authUser');
        await GoogleSignin.signOut();
        throw new Error('Session Expire: Please login!');
      }
      console.log('userData', userData);
      return userData;
    } catch (error) {
      showToastWithGravity(error?.message);
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
    response: null,
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
        state.user = action.payload;
        state.isAuthenticated = true;
        state.successMessage = 'Login successful!';
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Signout Cases
      .addCase(userSignout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignout.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.successMessage = 'Signout successful!';
      })
      .addCase(userSignout.rejected, (state, action) => {
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
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })

      // Verify by email
      .addCase(fetchUserExistStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserExistStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.successMessage = 'Verification completed!';
      })
      .addCase(fetchUserExistStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
