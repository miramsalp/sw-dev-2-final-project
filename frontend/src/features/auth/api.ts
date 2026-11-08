import { api } from "@/lib/api";
import type { RegisterInput, User } from "./types";

export const authApi = {
  login: (email: string, password: string) =>
    api<User>("/auth/login", { method: "POST", body: { email, password } }),

  register: (input: RegisterInput) => api<User>("/auth/register", { method: "POST", body: input }),
};
