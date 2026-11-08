"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken } from "@/lib/api";
import { authApi } from "./api";
import type { RegisterInput, User } from "./types";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let current: User | null = null;
      if (getToken()) {
        try {
          current = await authApi.me();
        } catch {
          setToken(null);
        }
      }
      if (!cancelled) {
        setUser(current);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const saveSession = ({ token, id, name, email, role }: User & { token: string }) => {
    setToken(token);
    const next: User = { id, name, email, role };
    setUser(next);
    return next;
  };

  const login = async (email: string, password: string) =>
    saveSession(await authApi.login(email, password));

  const register = async (input: RegisterInput) => saveSession(await authApi.register(input));

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
