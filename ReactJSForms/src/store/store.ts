import { configureStore } from '@reduxjs/toolkit';
import appReducer from './storeSlices/appReducer.ts';
import formDataReducer from './storeSlices/formDataReducer.ts';

export const store = configureStore({
  reducer: {
    app: appReducer,
    formData: formDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
