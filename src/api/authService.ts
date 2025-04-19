// src/api/authService.ts
import { LoginCredentials } from '../types/types';
import api from './apiClient';

class AuthService {
    async login(credentials: LoginCredentials) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Invalid credentials. Please try again.');
            }

            return {
                name: credentials.name,
                email: credentials.email,
            };
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