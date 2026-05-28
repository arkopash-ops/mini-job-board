import type { AuthResponse, LoginData, RegisterData } from "../types";
import Cookies from "js-cookie";
import api from "./api";

export const authService = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const res = await api.post<AuthResponse>('/users/register', data);
        Cookies.set('token', res.data.token, {
            expires: 1 / 24,
            sameSite: 'lax'
        });
        return res.data
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        const res = await api.post<AuthResponse>('/user/login', data);
        Cookies.set('token', res.data.token, {
            expires: 1 / 24,
            sameSite: 'lax'
        });
        return res.data;
    },

    logout: () => {
        Cookies.remove('token');
    },

    isAuthenticated: (): boolean => {
        return !!Cookies.get('token');
    }
};
