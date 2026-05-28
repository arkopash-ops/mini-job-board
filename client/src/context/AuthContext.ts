import { createContext } from "react";
import type { LoginData, RegisterData, User } from "../types";

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: LoginData) => Promise<User>;
    register: (data: RegisterData) => Promise<User>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);
