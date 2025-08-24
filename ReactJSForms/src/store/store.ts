import { configureStore } from '@reduxjs/toolkit';
import appReducer from './storeSlices/appReducer.ts';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
