import { configureStore } from '@reduxjs/toolkit';
import appReducer from './storeSlices/app-reducer';
import { planetsApi } from '../services/planetsApi';

export const store = configureStore({
  reducer: {
    [planetsApi.reducerPath]: planetsApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planetsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
