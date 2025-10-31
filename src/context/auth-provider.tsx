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
  logout: () => void;
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
    // Simulate checking for an existing session
    const checkSession = () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from session storage", error);
        sessionStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (data: LoginFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (data.email === 'admin@example.com' && data.password === 'password') {
          const adminUser: User = { id: '1', name: 'Admin User', email: data.email, role: 'admin' };
          setUser(adminUser);
          sessionStorage.setItem('user', JSON.stringify(adminUser));
          toast({ title: 'Login Successful', description: 'Welcome back, Admin!' });
          router.push('/dashboard');
        } else if (data.email === 'user@example.com' && data.password === 'password') {
          const regularUser: User = { id: '2', name: 'John Doe', email: data.email, role: 'user' };
          setUser(regularUser);
          sessionStorage.setItem('user', JSON.stringify(regularUser));
          toast({ title: 'Login Successful', description: 'Welcome back, John!' });
          router.push('/dashboard');
        } else {
          toast({ variant: 'destructive', title: 'Login Failed', description: 'Invalid email or password.' });
        }
        resolve();
      }, 1000);
    });
  };

  const signup = async (data: SignupFormValues) => {
     return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = { id: Date.now().toString(), name: data.name, email: data.email, role: data.role };
        setUser(newUser);
        sessionStorage.setItem('user', JSON.stringify(newUser));
        toast({ title: 'Signup Successful!', description: `Welcome, ${data.name}! Your account has been created.` });
        router.push('/dashboard');
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    router.push('/login');
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
