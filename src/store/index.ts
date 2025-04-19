import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dogsReducer from './slices/dogsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dogs: dogsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 