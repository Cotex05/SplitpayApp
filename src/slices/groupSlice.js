import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASE_URL} from '@env';

// Async Thunk for User Group (GET Request)
export const userGroups = createAsyncThunk(
  'groups/userGroups',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/groups/user`);
      console.log('User Groups response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Group Slice
const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(userGroups.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        state.successMessage = 'Groups fetched successfully!';
      })
      .addCase(userGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default groupSlice.reducer;
