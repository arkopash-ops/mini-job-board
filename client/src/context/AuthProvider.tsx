import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";
import type { LoginData, RegisterData, User, UserRole } from "../types";
import { authService } from "../services/auth.service";
import { AuthContext } from "./AuthContext";

interface DecodedToken {
  userId: string;
  role: UserRole;
  exp?: number;
}

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  const expiresAt = Number(localStorage.getItem("authExpiresAt"));

  if (expiresAt && Date.now() >= expiresAt) {
    localStorage.removeItem("user");
    localStorage.removeItem("authExpiresAt");
    Cookies.remove("token");
    return null;
  }

  if (storedUser) {
    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem("user");
    }
  }

  const token = Cookies.get("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    return {
      id: decoded.userId,
      role: decoded.role,
      name: "",
      email: "",
    };
  } catch {
    Cookies.remove("token");
    return null;
  }
};

const saveUserSession = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp) {
      localStorage.setItem("authExpiresAt", String(decoded.exp * 1000));
    }
  } catch {
    localStorage.removeItem("authExpiresAt");
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      setUser(response.user);
      saveUserSession(response.user, response.token);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      saveUserSession(response.user, response.token);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("authExpiresAt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
