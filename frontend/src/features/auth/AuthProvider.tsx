"use client";

import type { Session } from "next-auth";
import { SessionProvider, getSession, signIn, signOut, useSession } from "next-auth/react";
import { authApi } from "./api";
import type { RegisterInput, User } from "./types";

export function AuthProvider({ session, children }: { session: Session | null; children: React.ReactNode }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

async function login(email: string, password: string): Promise<User> {
  const result = await signIn("credentials", { email, password, redirect: false });
  if (!result || result.error) throw new Error(result?.error ?? "Login failed");
  const session = await getSession();
  if (!session?.user) throw new Error("Login failed");
  return session.user;
}

async function register(input: RegisterInput): Promise<User> {
  await authApi.register(input);
  return login(input.email, input.password);
}

async function logout() {
  await signOut({ redirect: false });
}

export function useAuth() {
  const { data: session, status } = useSession();
  return {
    user: session?.user ?? null,
    token: session?.user?.token,
    loading: status === "loading",
    login,
    register,
    logout,
  };
}
