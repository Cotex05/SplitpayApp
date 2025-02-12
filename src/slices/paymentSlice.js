import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

// Async Thunk for create Payment (POST Request)
export const createPayment = createAsyncThunk(
  'payments/create',
  async (request, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.post(
        `/payments/operations/create`,
        request,
      );
      console.log('Create Payment response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const fetchUserPaymentsInGroup = createAsyncThunk(
  'payments/user',
  async (groupId, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(
        `/payments/groups/${groupId}/user`,
      );
      console.log('User payments response: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Payment Slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    response: null,
    payments: [],
    paymentLoading: false,
    paymentError: null,
    paymentSuccessMessage: null,
  },
  reducers: {}, // If needed, add manual reducers here
  extraReducers: builder => {
    builder
      .addCase(createPayment.pending, state => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.response = action.payload;
        state.paymentSuccessMessage = 'Payment created successfully!';
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload?.message;
      })

      .addCase(fetchUserPaymentsInGroup.pending, state => {
        state.paymentLoading = true;
        state.paymentError = null;
      })
      .addCase(fetchUserPaymentsInGroup.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.payments = action.payload;
        state.paymentSuccessMessage = 'Payments fetched successfully!';
      })
      .addCase(fetchUserPaymentsInGroup.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload?.message;
      });
  },
});

export default paymentSlice.reducer;
