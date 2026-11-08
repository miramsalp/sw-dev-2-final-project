export type Role = "member" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  token: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  tel: string;
  role: Role;
  password: string;
}
