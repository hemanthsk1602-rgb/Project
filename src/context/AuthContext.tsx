'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  streak: number;
  role: string;
  preferredLanguage: string;
}

export const DEMO_USER: AuthUser = {
  id: 'usr_demo_01',
  name: 'Hemanth S',
  username: 'hemanth_dev',
  email: 'hemanth@codearena.dev',
  avatar: 'HS',
  level: 24,
  streak: 87,
  role: 'Senior Software Engineer',
  preferredLanguage: 'cpp',
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithOAuth: (provider: 'github' | 'google') => Promise<{ success: boolean }>;
  signup: (data: {
    name: string;
    username: string;
    email: string;
    password?: string;
    preferredLanguage?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loginDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('codearena-auth-user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Pre-fill with demo user on initial launch for seamless evaluation
        setUser(DEMO_USER);
        localStorage.setItem('codearena-auth-user', JSON.stringify(DEMO_USER));
      }
    } catch {
      setUser(DEMO_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    // Simulate network authentication latency
    await new Promise((r) => setTimeout(r, 650));

    // If matches demo or any email, authenticate
    const username = email.split('@')[0] || 'developer';
    const initials = (username.substring(0, 2) || 'CA').toUpperCase();
    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: email === DEMO_USER.email ? DEMO_USER.name : username.charAt(0).toUpperCase() + username.slice(1),
      username: email === DEMO_USER.email ? DEMO_USER.username : username.toLowerCase(),
      email,
      avatar: initials,
      level: 12,
      streak: 14,
      role: 'Software Engineer',
      preferredLanguage: 'cpp',
    };

    setUser(newUser);
    localStorage.setItem('codearena-auth-user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const loginWithOAuth = async (provider: 'github' | 'google'): Promise<{ success: boolean }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const oauthUser: AuthUser = {
      id: `usr_oauth_${Date.now()}`,
      name: provider === 'github' ? 'GitHub Developer' : 'Google Engineer',
      username: provider === 'github' ? 'octocat_dev' : 'google_engineer',
      email: provider === 'github' ? 'dev@github.com' : 'dev@gmail.com',
      avatar: provider === 'github' ? 'GH' : 'GO',
      level: 18,
      streak: 21,
      role: 'Systems Engineer',
      preferredLanguage: 'python',
    };

    setUser(oauthUser);
    localStorage.setItem('codearena-auth-user', JSON.stringify(oauthUser));
    setIsLoading(false);
    return { success: true };
  };

  const signup = async (data: {
    name: string;
    username: string;
    email: string;
    password?: string;
    preferredLanguage?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const initials = data.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'CA';

    const newUser: AuthUser = {
      id: `usr_${Date.now()}`,
      name: data.name,
      username: data.username.replace('@', ''),
      email: data.email,
      avatar: initials,
      level: 1,
      streak: 1,
      role: 'Aspiring Engineer',
      preferredLanguage: data.preferredLanguage || 'cpp',
    };

    setUser(newUser);
    localStorage.setItem('codearena-auth-user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('codearena-auth-user');
  };

  const loginDemo = () => {
    setUser(DEMO_USER);
    localStorage.setItem('codearena-auth-user', JSON.stringify(DEMO_USER));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithOAuth,
        signup,
        logout,
        loginDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: DEMO_USER,
      isAuthenticated: true,
      isLoading: false,
      login: async () => ({ success: true }),
      loginWithOAuth: async () => ({ success: true }),
      signup: async () => ({ success: true }),
      logout: () => {},
      loginDemo: () => {},
    };
  }
  return context;
}

