import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for User weekly expense stats (GET Request)
export const fetchUserWeeklyExpenseStats = createAsyncThunk(
  'expenses/stats/weekly',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(`/expenses/user/stats/lastWeek`);
      console.log('User weekly expense stats: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export // stats Slice
const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    lastWeekStats: [],
    response: null,
    statsLoading: false,
    statsError: null,
    statsSuccessMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(fetchUserWeeklyExpenseStats.pending, state => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchUserWeeklyExpenseStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.lastWeekStats = action.payload;
        state.expenseSuccessMessage = 'Expense weekly stats fetched!';
      })
      .addCase(fetchUserWeeklyExpenseStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload?.message;
      });
  },
});

export default statsSlice.reducer;
