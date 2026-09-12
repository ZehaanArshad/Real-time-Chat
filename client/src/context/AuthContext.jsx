import { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

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

  async function login(credentials) {
    const { user: loggedInUser, token: newToken } = await authApi.login(credentials);
    persistSession(loggedInUser, newToken);
  }

  async function signup(data) {
    const { user: newUser, token: newToken } = await authApi.signup(data);
    persistSession(newUser, newToken);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  }

  const value = { user, token, isLoading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
