import { api } from "@/lib/api";
import type { RegisterInput, User } from "./types";

type AuthResponse = User & { token: string };
type MeResponse = Omit<User, "id"> & { _id: string };

export const authApi = {
  login: (email: string, password: string) =>
    api<AuthResponse>("/auth/login", { method: "POST", body: { email, password } }),

  register: (input: RegisterInput) =>
    api<AuthResponse>("/auth/register", { method: "POST", body: input }),

  me: async (): Promise<User> => {
    const me = await api<MeResponse>("/auth/me");
    return { id: me._id, name: me.name, email: me.email, role: me.role };
  },

  logout: () => api("/auth/logout"),
};
