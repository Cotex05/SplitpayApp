import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for API call
export const saveProfile = createAsyncThunk(
  'profile/save',
  async (profileData, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.put(
        `/user/profile/save`,
        profileData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Create Profile Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: [],
    profileLoading: false,
    profileError: null,
    profileSuccessMessage: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveProfile.pending, state => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profileData = action.payload;
        state.profileSuccessMessage = 'Profile saved successfully!';
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload?.message;
      });
  },
});

export default profileSlice.reducer;
