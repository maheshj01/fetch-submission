import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dog } from '../../types/types';

interface FavoritesState {
    dogs: Dog[];
}

const initialState: FavoritesState = {
    dogs: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Dog>) => {
            if (!state.dogs.some(dog => dog.id === action.payload.id)) {
                state.dogs.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.dogs = state.dogs.filter(dog => dog.id !== action.payload);
        },
        clearFavorites: (state) => {
            state.dogs = [];
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 