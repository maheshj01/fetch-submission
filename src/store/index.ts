import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dogsReducer from './slices/dogsSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dogs: dogsReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 