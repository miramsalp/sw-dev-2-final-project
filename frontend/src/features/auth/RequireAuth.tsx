"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ErrorBox, Loading } from "@/components/ui";
import { useAuth } from "./AuthProvider";
import type { Role } from "./types";

export function RequireAuth({ role, children }: { role?: Role; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return <Loading />;
  if (role && user.role !== role) {
    return <ErrorBox message={`This page is for ${role} accounts only.`} />;
  }
  return <>{children}</>;
}
