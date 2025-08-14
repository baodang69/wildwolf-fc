"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// import * as authApi from "../api/auth";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra authentication khi component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra authentication:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock login - thay thế bằng API thực tế sau
      if (email === "admin@wildwolf.com" && password === "admin123") {
        const userData = {
          id: "1",
          email: email,
          name: "Admin",
          role: "admin",
        };
        const token = "mock-jwt-token";

        // Lưu token và user data
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};
