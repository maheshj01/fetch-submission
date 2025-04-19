import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginCredentials } from '../../types/types';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
        name: string;
        email: string;
    } | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginInit: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<LoginCredentials>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.isLoading = false;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const { loginSuccess, loginFailure, logout, loginInit } = authSlice.actions;
export default authSlice.reducer; 