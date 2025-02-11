import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for create expense (POST Request)
export const saveExpense = createAsyncThunk(
  'expense/create',
  async ({groupId, expenseData}, {rejectWithValue}) => {
    console.log({groupId, expenseData});
    try {
      const response = await AxiosInstance.post(
        `/expenses/groups/${groupId}/add`,
        expenseData,
      );
      console.log('Saved expense response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const removeExpense = createAsyncThunk(
  'expense/remove',
  async ({expenseId, groupId}, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.delete(
        `/expenses/${expenseId}/groups/${groupId}/remove`,
      );
      console.log('Deleted expense response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export // Expense Manager Slice
const expenseManagerSlice = createSlice({
  name: 'expenseManager',
  initialState: {
    response: null,
    expenseSaving: false,
    expenseRemoving: false,
    expenseError: null,
    expenseSuccessMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(saveExpense.pending, state => {
        state.expenseSaving = true;
        state.expenseError = null;
      })
      .addCase(saveExpense.fulfilled, (state, action) => {
        state.expenseSaving = false;
        state.response = action.payload;
        state.expenseSuccessMessage = 'Expense saved!';
      })
      .addCase(saveExpense.rejected, (state, action) => {
        state.expenseSaving = false;
        state.expenseError = action.payload?.message;
      })

      .addCase(removeExpense.pending, state => {
        state.expenseRemoving = true;
        state.expenseError = null;
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.expenseRemoving = false;
        state.response = action.payload;
        state.expenseSuccessMessage = 'Expense removed!';
      })
      .addCase(removeExpense.rejected, (state, action) => {
        state.expenseRemoving = false;
        state.expenseError = action.payload?.message;
      });
  },
});

export default expenseManagerSlice.reducer;
