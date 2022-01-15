import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/slices/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});
