import type { User as AppUser } from "@/features/auth/types";

declare module "next-auth" {
  interface Session {
    user: AppUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AppUser;
  }
}
