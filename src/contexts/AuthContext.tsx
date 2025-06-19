
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  favorite_player?: string;
  fan_level: number;
  xp: number;
  is_verified: boolean;
  created_at: string;
  preferences: {
    notifications: boolean;
    theme: 'classic' | 'modern' | 'retro';
    language: string;
  };
}

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  resendVerification: () => Promise<void>;
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
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setSupabaseUser(null);
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          username: data.username || 'Culer',
          email: data.email,
          avatar_url: data.avatar_url,
          favorite_player: data.favorite_player,
          fan_level: data.fan_level || 1,
          xp: data.xp || 0,
          is_verified: data.is_verified || false,
          created_at: data.created_at,
          preferences: data.preferences || {
            notifications: true,
            theme: 'classic',
            language: 'en'
          }
        });
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            fan_level: 1,
            xp: 100
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Welcome to BarçaVerse! 🔵🔴",
          description: "Please check your email and click the verification link to unlock all features.",
          duration: 6000,
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Email Verification Required 📧",
          description: "Please verify your email to unlock all BarçaVerse features.",
          duration: 5000,
        });
      } else {
        toast({
          title: "Welcome back, Culer! 🏟️",
          description: "Ready to continue your Barça journey?",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Fins aviat, Culer! 👋",
        description: "Thank you for being part of the Blaugrana family. See you at the next match!",
        duration: 4000,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const addXP = async (amount: number) => {
    if (!user) return;
    
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;
    
    await updateProfile({ xp: newXP, fan_level: newLevel });

    if (newLevel > user.fan_level) {
      toast({
        title: `Level Up! 🎉`,
        description: `You're now a Level ${newLevel} Culer! Keep going!`,
        duration: 4000,
      });
    }
  };

  const resendVerification = async () => {
    if (!supabaseUser?.email) return;
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: supabaseUser.email
      });

      if (error) throw error;

      toast({
        title: "Verification Email Sent 📧",
        description: "Check your inbox for the new verification link.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error('Resend verification error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to resend verification email",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const value = {
    user,
    supabaseUser,
    isLoading,
    isAuthenticated: !!supabaseUser,
    isVerified: !!supabaseUser?.email_confirmed_at,
    login,
    signup,
    logout,
    updateProfile,
    addXP,
    resendVerification
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
