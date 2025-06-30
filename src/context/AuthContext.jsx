import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginApi, register as registerApi, getProfile } from '../api/auth';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [state, setState] = useState(() => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
  }));

  const { user, token, isLoading } = state;

  // Unified state updater
  const setAuthState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Save to localStorage and state
  const persistAuth = useCallback((userData, authToken) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    setAuthState({ user: userData, token: authToken });
  }, []);

  // Clear auth data
  const clearAuth = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuthState({ user: null, token: null });
  }, []);

  // Validate and load user profile
  const loadUserProfile = useCallback(async () => {
    if (token && !user) {
      setAuthState({ isLoading: true });
      try {
        const profile = await getProfile();
        persistAuth({
          _id: profile._id,
          name: profile.name,
          email: profile.email,
          isAdmin: profile.isAdmin,
          joinDate: profile.joinDate,
        }, token);
      } catch (error) {
        console.error('Session validation failed:', error);
        clearAuth();
      } finally {
        setAuthState({ isLoading: false });
      }
    }
  }, [token, user, persistAuth, clearAuth]);

  // Initial load
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  // Auto-check token validity
  useEffect(() => {
    const interval = setInterval(() => {
      if (token) loadUserProfile();
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [token, loadUserProfile]);

  const login = async (email, password) => {
    setAuthState({ isLoading: true });
    try {
      const { token: authToken, ...userData } = await loginApi({ email, password });
      persistAuth(userData, authToken);
      toast.success('Login successful!');
      return userData;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setAuthState({ isLoading: false });
    }
  };

  const register = async (name, email, password) => {
    setAuthState({ isLoading: true });
    try {
      const { token: authToken, ...userData } = await registerApi({ name, email, password });
      persistAuth(userData, authToken);
      toast.success('Registration successful!');
      return userData;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setAuthState({ isLoading: false });
    }
  };

  const logout = () => {
    clearAuth();
    toast('Logged out', { icon: '👋' });
  };

  const syncUser = async () => {
    try {
      const profile = await getProfile();
      persistAuth(profile, token);
    } catch (error) {
      clearAuth();
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout,
    syncUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};