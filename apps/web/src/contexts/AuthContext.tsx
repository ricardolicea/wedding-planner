import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import type {  Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { type ApiError } from '../api/ApiError';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  weddingId?: string | null;
  signIn: (email: string, password: string) => Promise<{ error?: ApiError }>;
  signUp: (email: string, password: string) => Promise<{ error?: ApiError }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [weddingId, setWeddingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadWeddingForUser(userId: string) {
    try {
      const { data, error } = await supabase
        .from('wedding_members')
        .select('wedding_id')
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();
      if (error) {
        setError('Error loading wedding for user');
        setWeddingId(null);
        return;
      }
      setWeddingId(data?.wedding_id ?? null);
    } catch (err: ApiError | unknown) {
      setError('Error loading wedding for user' + (err instanceof Error ? err.message : String(err)));
      setWeddingId(null);
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setSession(session ?? null);
        setUser(session?.user ?? null);
        if (currentUser) {
          await loadWeddingForUser(currentUser.id);
        }
      } catch (err: unknown) {
        setError('Error initializing auth context' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const currentUser = session?.user ?? null;
        setSession(session ?? null);
        setUser(currentUser);
        if (currentUser) {
          await loadWeddingForUser(currentUser.id);
        } else {
          setWeddingId(null);
        }
      } catch (err: ApiError | unknown) {
        setError('Error in auth state change' + (err instanceof Error ? err.message : String(err)));
        setWeddingId(null);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ?? undefined };
  }

  async function signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error ?? undefined };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  const value: AuthContextValue & { error: string | null } = {
    user,
    session,
    loading,
    setLoading,
    weddingId,
    signIn,
    signUp,
    signOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
