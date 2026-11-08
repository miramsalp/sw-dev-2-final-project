"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, ErrorBox, Input } from "@/components/ui";
import { errorMessage } from "@/lib/api";
import { AuthSplitLayout } from "./AuthSplitLayout";
import { useAuth } from "./AuthProvider";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await login(email, password);
      router.push(user.role === "admin" ? "/admin" : "/facilities");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[598px] min-w-0 flex-col items-start gap-6"
      >
        <h1 className="text-2xl font-semibold">Log in</h1>
        <ErrorBox message={error} />
        <div className="flex w-full flex-col gap-5">
          <Input
            aria-label="Email"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            aria-label="Password"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Logging in..." : "Log in"}
        </Button>
        <p className="text-sm">
          No account yet?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
