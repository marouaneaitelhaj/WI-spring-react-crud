import { configureStore } from '@reduxjs/toolkit';
import songReducer from './songSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    songs: songReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;