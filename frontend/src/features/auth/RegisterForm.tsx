"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, ErrorBox, Field, Input, PageTitle, Select } from "@/components/ui";
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
    <div className="mx-auto max-w-md">
      <PageTitle>Register</PageTitle>
      <Card>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <ErrorBox message={error} />
          <Field label="Name">
            <Input value={form.name} onChange={update("name")} />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={update("email")} />
          </Field>
          <Field label="Telephone">
            <Input type="tel" value={form.tel} onChange={update("tel")} />
          </Field>
          <Field label="Role">
            <Select value={form.role} onChange={update("role")}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </Select>
          </Field>
          <Field label="Password">
            <Input type="password" value={form.password} onChange={update("password")} />
          </Field>
          <Field label="Confirm password">
            <Input type="password" value={form.confirmPassword} onChange={update("confirmPassword")} />
          </Field>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </Button>
        </form>
      </Card>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
