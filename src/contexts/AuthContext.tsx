
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  favorite_player?: string;
  fan_level: number;
  xp: number;
  created_at: string;
  preferences: {
    notifications: boolean;
    theme: 'classic' | 'modern' | 'retro';
    language: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  addXP: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('barcaverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        username: 'CulerForLife2010',
        email,
        avatar_url: '/placeholder.svg',
        favorite_player: 'Pedri',
        fan_level: 5,
        xp: 2450,
        created_at: '2010-05-28',
        preferences: {
          notifications: true,
          theme: 'classic',
          language: 'en'
        }
      };

      setUser(mockUser);
      localStorage.setItem('barcaverse_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        fan_level: 1,
        xp: 0,
        created_at: new Date().toISOString(),
        preferences: {
          notifications: true,
          theme: 'classic',
          language: 'en'
        }
      };

      setUser(newUser);
      localStorage.setItem('barcaverse_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('barcaverse_user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('barcaverse_user', JSON.stringify(updatedUser));
  };

  const addXP = (amount: number) => {
    if (!user) return;
    
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    
    updateProfile({ xp: newXP, fan_level: newLevel });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
    addXP
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
