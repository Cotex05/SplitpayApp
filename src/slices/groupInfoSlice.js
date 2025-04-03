import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for Group Info (GET Request)
export const fetchGroupInfo = createAsyncThunk(
  'groups/info',
  async (groupId, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(`/groups/${groupId}`);
      console.log('Group info response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Async Thunk for Group Info (GET Request)
export const fetchGroupMembers = createAsyncThunk(
  'groups/members',
  async (groupId, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(
        `/groups/${groupId}/members/all`,
      );
      console.log('Group members response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export // Group Info Slice
const groupInfoSlice = createSlice({
  name: 'groupInfo',
  initialState: {
    groupData: null,
    groupMembers: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(fetchGroupInfo.pending, state => {
        state.loading = true;
        state.groupData = null;
        state.error = null;
      })
      .addCase(fetchGroupInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.groupData = action.payload;
        state.successMessage = 'Group info fetched!';
      })
      .addCase(fetchGroupInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Cases for fetching group members
      .addCase(fetchGroupMembers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.groupMembers = action.payload;
        state.successMessage = 'Group members fetched!';
      })
      .addCase(fetchGroupMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default groupInfoSlice.reducer;
