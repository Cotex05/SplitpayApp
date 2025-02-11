import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

export const fetchUserGroupBalanceGraph = createAsyncThunk(
  'group/balanceGraph',
  async (groupId, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(
        `expenses/groups/${groupId}/user/balance-graph`,
      );
      console.log('Group balance graph response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Balance Slice
export const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    balanceGraph: null,
    balanceLoading: false,
    balanceError: null,
    balanceSuccessMessage: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserGroupBalanceGraph.pending, state => {
        state.balanceLoading = true;
        state.balanceError = null;
      })
      .addCase(fetchUserGroupBalanceGraph.fulfilled, (state, action) => {
        state.balanceLoading = false;
        state.balanceGraph = action.payload;
        state.balanceSuccessMessage = 'Group balanceGraph fetched!';
      })
      .addCase(fetchUserGroupBalanceGraph.rejected, (state, action) => {
        state.balanceLoading = false;
        state.balanceError = action.payload?.message;
      });
  },
});

export default balanceSlice.reducer;
