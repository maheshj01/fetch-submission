// src/api/authService.ts
import { LoginCredentials } from '../types/types';
import api from './apiClient';

class AuthService {
    async login(credentials: LoginCredentials) {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.status === 200;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }
}

export default new AuthService();