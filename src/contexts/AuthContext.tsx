import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Fetch user data
      api.get('/user').then(response => {
        setUser(response.data);
      }).catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
