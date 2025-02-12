import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for Group expense cashflow (GET Request)
export const fetchExpenseCashFlow = createAsyncThunk(
  'expense/cashflow',
  async (groupId, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(
        `/expenses/groups/${groupId}/user/cashflow`,
      );
      console.log('Group expense cashflow response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Async Thunk for Group expenses (GET Request)
export const fetchGroupExpenses = createAsyncThunk(
  'group/expenses',
  async (groupId, {rejectWithValue}) => {
    try {
      console.log('group id', groupId);
      const response = await AxiosInstance.get(`/expenses/groups/${groupId}`);
      console.log('Group expenses response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Async Thunk for User expense stats (GET Request)
export const fetchUserExpenseStats = createAsyncThunk(
  'expenses/stats',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(`/expenses/user/stats`);
      console.log('User expense stats response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export // Expense Slice
const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenseStats: null,
    cashflow: null,
    expenses: [],
    expenseLoading: false,
    expenseError: null,
    expenseSuccessMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(fetchExpenseCashFlow.pending, state => {
        state.expenseLoading = true;
        state.expenseError = null;
      })
      .addCase(fetchExpenseCashFlow.fulfilled, (state, action) => {
        state.expenseLoading = false;
        state.cashflow = action.payload;
        state.expenseSuccessMessage = 'Expense cashflow fetched!';
      })
      .addCase(fetchExpenseCashFlow.rejected, (state, action) => {
        state.expenseLoading = false;
        state.expenseError = action.payload?.message;
      })

      .addCase(fetchGroupExpenses.pending, state => {
        state.expenseLoading = true;
        state.expenseError = null;
      })
      .addCase(fetchGroupExpenses.fulfilled, (state, action) => {
        state.expenseLoading = false;
        state.expenses = action.payload;
        state.expenseSuccessMessage = 'Group expenses fetched!';
      })
      .addCase(fetchGroupExpenses.rejected, (state, action) => {
        state.expenseLoading = false;
        state.expenseError = action.payload?.message;
      })

      .addCase(fetchUserExpenseStats.pending, state => {
        state.expenseLoading = true;
        state.expenseError = null;
      })
      .addCase(fetchUserExpenseStats.fulfilled, (state, action) => {
        state.expenseLoading = false;
        state.expenseStats = action.payload;
        state.expenseSuccessMessage = 'User expense stats fetched!';
      })
      .addCase(fetchUserExpenseStats.rejected, (state, action) => {
        state.expenseLoading = false;
        state.expenseError = action.payload?.message;
      });
  },
});

export default expenseSlice.reducer;
