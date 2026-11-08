"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, ErrorBox, Input, Select } from "@/components/ui";
import { errorMessage } from "@/lib/api";
import { useAuth } from "./AuthProvider";
import type { Role } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_RE = /^[0-9+\-\s]{9,15}$/;

const initialForm = {
  name: "",
  email: "",
  tel: "",
  role: "member" as Role,
  password: "",
  confirmPassword: "",
};

type Form = typeof initialForm;

function validate(form: Form): string | null {
  if (!form.name.trim()) return "Name is required";
  if (!EMAIL_RE.test(form.email)) return "Please enter a valid email";
  if (!TEL_RE.test(form.tel)) return "Please enter a valid telephone number";
  if (form.password.length < 6) return "Password must be at least 6 characters";
  if (form.password !== form.confirmPassword) return "Passwords do not match";
  return null;
}

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const invalid = validate(form);
    if (invalid) return setError(invalid);

    setError(null);
    setSubmitting(true);
    try {
      const { name, email, tel, role, password } = form;
      const user = await register({ name, email, tel, role, password });
      router.push(user.role === "admin" ? "/admin" : "/facilities");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-full-bleed
      className="mt-2.5 flex items-center justify-center gap-16 px-4 py-4 font-plex"
    >
      <div className="relative hidden h-[902px] w-[606px] shrink-0 xl:block">
        <Image
          src="/images/register-banner.jpg"
          alt=""
          fill
          preload
          sizes="606px"
          className="object-cover"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[598px] min-w-0 flex-col items-start gap-6"
      >
        <h1 className="text-2xl font-semibold">Register</h1>
        <ErrorBox message={error} />
        <div className="flex w-full flex-col gap-5">
          <Input aria-label="Name" placeholder="Name" value={form.name} onChange={update("name")} />
          <Input
            aria-label="Email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={update("email")}
          />
          <Input
            aria-label="Tel"
            placeholder="Tel"
            type="tel"
            value={form.tel}
            onChange={update("tel")}
          />
          <Select aria-label="Role" value={form.role} onChange={update("role")}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </Select>
          <Input
            aria-label="Password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={update("password")}
          />
          <Input
            aria-label="Confirm password"
            placeholder="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
          />
        </div>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
        </Button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
