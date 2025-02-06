import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlices';
import authReducer from '../slices/authSlices';
import groupReducer from '../slices/groupSlice';
import groupInfoReducer from '../slices/groupInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    group: groupReducer,
    groupInfo: groupInfoReducer,
  },
});

export default store;
