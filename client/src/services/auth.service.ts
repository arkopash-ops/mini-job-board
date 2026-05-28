import type { AuthResponse, LoginData, RegisterData } from "../types";
import api from "./api";

export const authService = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const res = await api.post<AuthResponse>('/user/register', data);
        return res.data
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        const res = await api.post<AuthResponse>('/user/login', data);
        return res.data;
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('authExpiresAt');
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('user');
    }
};
