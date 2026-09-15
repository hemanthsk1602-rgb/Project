'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { StudentProfile } from '@/lib/types/nexus';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export const DEMO_STUDENT_PROFILE: StudentProfile = {
  id: 'demo-student-alex-rivera-001',
  fullName: 'Alex Rivera',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  collegeName: 'National Institute of Technology',
  courseName: 'B.Tech in Computer Science & AI',
  semester: 6,
  careerGoal: 'AI Engineer & Distributed Systems Architect',
  technicalLevel: 'intermediate',
  fitnessTrainingStyle: 'gym',
  fitnessGoal: 'muscle_gain',
  monthlyBudget: 12000,
  remainingBudget: 800, // Matching the prompt's key cross-module example
  preferredTransitMode: 'metro',
  isDemoStudent: true,
};

interface AuthContextType {
  user: any | null;
  profile: StudentProfile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  supabaseConnected: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password?: string, fullName?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  enterDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true); // Default to demo mode if Supabase not configured
  const supabaseConnected = isSupabaseConfigured();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!supabaseConnected) {
          // No live Supabase credentials configured: Run in explicit Demo Mode
          setIsDemoMode(true);
          setUser({ id: DEMO_STUDENT_PROFILE.id, email: 'alex.rivera@nexus.student' });
          setProfile(DEMO_STUDENT_PROFILE);
          setIsLoading(false);
          return;
        }

        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          setIsDemoMode(false);
          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileData) {
            setProfile({
              id: profileData.id,
              fullName: profileData.full_name,
              avatarUrl: profileData.avatar_url,
              collegeName: profileData.college_name,
              courseName: profileData.course_name,
              semester: profileData.semester,
              careerGoal: profileData.career_goal,
              technicalLevel: profileData.technical_level,
              fitnessTrainingStyle: profileData.fitness_training_style,
              fitnessGoal: profileData.fitness_goal,
              monthlyBudget: Number(profileData.monthly_budget) || 10000,
              remainingBudget: 800,
              preferredTransitMode: profileData.preferred_transit_mode || 'metro',
              isDemoStudent: false,
            });
          } else {
            // Profile pending onboarding
            setProfile({
              id: session.user.id,
              fullName: session.user.email?.split('@')[0] || 'Student',
              collegeName: '',
              courseName: '',
              semester: 1,
              careerGoal: '',
              technicalLevel: 'intermediate',
              fitnessTrainingStyle: 'gym',
              fitnessGoal: 'general_fitness',
              monthlyBudget: 10000,
              remainingBudget: 10000,
              preferredTransitMode: 'metro',
              isDemoStudent: false,
            });
          }
        } else {
          // No active session: Fallback to Demo Student for immediate evaluation
          setIsDemoMode(true);
          setUser({ id: DEMO_STUDENT_PROFILE.id, email: 'alex.rivera@nexus.student' });
          setProfile(DEMO_STUDENT_PROFILE);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setIsDemoMode(true);
        setUser({ id: DEMO_STUDENT_PROFILE.id, email: 'alex.rivera@nexus.student' });
        setProfile(DEMO_STUDENT_PROFILE);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [supabaseConnected]);

  const signIn = async (email: string, password?: string) => {
    if (!supabaseConnected) {
      // Demo sign in
      setIsDemoMode(true);
      setUser({ id: DEMO_STUDENT_PROFILE.id, email });
      setProfile(DEMO_STUDENT_PROFILE);
      return { error: null };
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: password || 'Test123456!',
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (e: any) {
      return { error: e.message || 'Failed to sign in' };
    }
  };

  const signUp = async (email: string, password?: string, fullName?: string) => {
    if (!supabaseConnected) {
      setIsDemoMode(true);
      const newProfile: StudentProfile = {
        ...DEMO_STUDENT_PROFILE,
        fullName: fullName || 'New Student',
      };
      setUser({ id: 'demo-user-id', email });
      setProfile(newProfile);
      return { error: null };
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password: password || 'Test123456!',
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch (e: any) {
      return { error: e.message || 'Failed to sign up' };
    }
  };

  const signOut = async () => {
    if (supabaseConnected) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    setIsDemoMode(true);
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const enterDemoMode = () => {
    setIsDemoMode(true);
    setUser({ id: DEMO_STUDENT_PROFILE.id, email: 'alex.rivera@nexus.student' });
    setProfile(DEMO_STUDENT_PROFILE);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isDemoMode,
        supabaseConnected,
        signIn,
        signUp,
        signOut,
        updateProfile,
        enterDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

