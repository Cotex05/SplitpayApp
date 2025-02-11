import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for API call
export const searchUsers = createAsyncThunk(
  'users/search',
  async (query, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(`/user/search?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Create User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    userLoading: false,
    userError: null,
    userSuccessMessage: null,
  },
  reducers: {
    clearSearchUsers: state => {
      state.users = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchUsers.pending, state => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload?.message;
      });
  },
});

export const {clearSearchUsers} = userSlice.actions;

export default userSlice.reducer;
