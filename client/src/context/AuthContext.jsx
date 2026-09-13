import { createContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../api/auth';
import api from '../api/axios';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  function persistSession(nextUser, nextToken) {
    localStorage.setItem('user', JSON.stringify(nextUser));
    localStorage.setItem('token', nextToken);
    setUser(nextUser);
    setToken(nextToken);
  }

  const login = useCallback(async (credentials) => {
    const { user: loggedInUser, token: newToken } = await authApi.login(credentials);
    persistSession(loggedInUser, newToken);
  }, []);

  const signup = useCallback(async (data) => {
    const { user: newUser, token: newToken } = await authApi.signup(data);
    persistSession(newUser, newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptorId);
  }, [logout]);

  const value = { user, token, isLoading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
