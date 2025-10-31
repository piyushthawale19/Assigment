"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { SignupFormValues, LoginFormValues } from '@/lib/schemas';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormValues) => Promise<void>;
  signup: (data: SignupFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session using API
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser({
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          });
        } else if (response.status !== 401) {
          // Only log errors that aren't expected 401 (unauthorized) responses
          console.error("Failed to check session", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Failed to check session", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (data: LoginFormValues) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const userData: User = {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        };
        setUser(userData);
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${userData.name}!`
        });
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: result.error || 'Invalid email or password.'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'An error occurred during login.'
      });
    }
  };

  const signup = async (data: SignupFormValues) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Signup Successful!',
          description: `Welcome, ${data.name}! Please login with your credentials.`
        });
        router.push('/login');
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup Failed',
          description: result.error || 'An error occurred during signup.'
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'An error occurred during signup.'
      });
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });

      setUser(null);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.'
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      setUser(null);
      router.push('/login');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
