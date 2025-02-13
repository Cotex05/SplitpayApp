import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../api/AxiosInstance';

export const fetchUserUpi = createAsyncThunk(
  'user/upi',
  async (username, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance.get(`upi/address/users/${username}`);
      console.log('User upi: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// Need to be refactor if required
export const addUserUpi = createAsyncThunk(
  'add/upi',
  async ({upiDetails, primaryUPI}, {rejectWithValue}) => {
    try {
      const upiAddressId =
        upiDetails.length > 0 ? upiDetails[0]?.upiAddressId : null;
      let response;
      console.log('upiAddressId', upiAddressId, primaryUPI);
      // if already exist then update only
      if (upiAddressId) {
        response = await AxiosInstance.put(
          `upi/address/${upiAddressId}?upi=${primaryUPI}`,
        );
      } else {
        // add new upi
        response = await AxiosInstance.post(
          `upi/address/add?upi=${primaryUPI}`,
        );
      }

      console.log('Added User upi: ', response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

// UPI Slice
export const upiSlice = createSlice({
  name: 'upi',
  initialState: {
    upiDetails: [],
    upiResponse: null,
    upiLoading: false,
    upiError: null,
    upiSuccessMessage: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserUpi.pending, state => {
        state.upiLoading = true;
        state.upiError = null;
      })
      .addCase(fetchUserUpi.fulfilled, (state, action) => {
        state.upiLoading = false;
        state.upiDetails = action.payload;
        state.upiSuccessMessage = 'User upi fetched!';
      })
      .addCase(fetchUserUpi.rejected, (state, action) => {
        state.upiLoading = false;
        state.upiError = action.payload?.message;
      })

      .addCase(addUserUpi.pending, state => {
        state.upiLoading = true;
        state.upiError = null;
      })
      .addCase(addUserUpi.fulfilled, (state, action) => {
        state.upiLoading = false;
        state.upiResponse = action.payload;
        state.upiSuccessMessage = 'User upi fetched!';
      })
      .addCase(addUserUpi.rejected, (state, action) => {
        state.upiLoading = false;
        state.upiError = action.payload?.message;
      });
  },
});

export default upiSlice.reducer;
