import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for create Group (POST Request)
export const createGroup = createAsyncThunk(
  'groups/create',
  async (groupName, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(
        `/groups/operations/create?groupName=${groupName}`,
      );
      console.log('Create Group response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const addMemberToGroup = createAsyncThunk(
  'groups/addMember',
  async ({groupId, username}, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(
        `/groups/${groupId}/member/add?username=${username}`,
      );
      console.log('Group member add response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const addMultipleMembersToGroup = createAsyncThunk(
  'groups/addMembers',
  async ({groupId, usernames}, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(
        `/groups/${groupId}/members/add`,
        usernames, // array of username
      );
      console.log('Added Group members response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Group Manager Slice
const groupManagerSlice = createSlice({
  name: 'groupManager',
  initialState: {
    response: null,
    group: null,
    groupManagerLoading: false,
    groupManagerError: null,
    groupManagerSuccessMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(createGroup.pending, state => {
        state.groupManagerLoading = true;
        state.groupManagerError = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groupManagerLoading = false;
        state.group = action.payload;
        state.groupManagerSuccessMessage = 'Groups created successfully!';
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.groupManagerLoading = false;
        state.groupManagerError = action.payload?.message;
      })

      .addCase(addMemberToGroup.pending, state => {
        state.groupManagerLoading = true;
        state.groupManagerError = null;
      })
      .addCase(addMemberToGroup.fulfilled, (state, action) => {
        state.groupManagerLoading = false;
        state.response = action.payload;
        state.groupManagerSuccessMessage = 'Group member added successfully!';
      })
      .addCase(addMemberToGroup.rejected, (state, action) => {
        state.groupManagerLoading = false;
        state.groupManagerError = action.payload?.message;
      })

      .addCase(addMultipleMembersToGroup.pending, state => {
        state.groupManagerLoading = true;
        state.groupManagerError = null;
      })
      .addCase(addMultipleMembersToGroup.fulfilled, (state, action) => {
        state.groupManagerLoading = false;
        state.response = action.payload;
        state.groupManagerSuccessMessage = 'Group members added successfully!';
      })
      .addCase(addMultipleMembersToGroup.rejected, (state, action) => {
        state.groupManagerLoading = false;
        state.groupManagerError = action.payload?.message;
      });
  },
});

export default groupManagerSlice.reducer;
