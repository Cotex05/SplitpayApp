import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlices';
import authReducer from '../slices/authSlices';
import groupReducer from '../slices/groupSlice';
import groupInfoReducer from '../slices/groupInfoSlice';
import expenseReducer from '../slices/expenseSlice';
import expenseManagerSlice from '../slices/expenseManagerSlice';
import balanceSlice from '../slices/balanceSlice';
import groupManagerSlice from '../slices/groupManagerSlice';
import paymentSlice from '../slices/paymentSlice';
import upiSlice from '../slices/upiSlice';
import statsSlice from '../slices/statsSlice';
import profileSlice from '../slices/profileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    group: groupReducer,
    groupInfo: groupInfoReducer,
    groupManager: groupManagerSlice,
    expense: expenseReducer,
    expenseManager: expenseManagerSlice,
    balance: balanceSlice,
    payment: paymentSlice,
    upi: upiSlice,
    stats: statsSlice,
    profile: profileSlice,
  },
});

export default store;
