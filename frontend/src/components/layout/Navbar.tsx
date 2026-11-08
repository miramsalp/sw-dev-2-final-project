"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/AuthProvider";

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="border-b border-black">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 px-4 py-3">
        <Link href="/" className="font-bold">
          Sports Booking
        </Link>
        <Link href="/facilities" className="underline">
          Facilities
        </Link>
        {user?.role === "member" && (
          <Link href="/bookings" className="underline">
            My Bookings
          </Link>
        )}
        {user?.role === "admin" && (
          <Link href="/admin" className="underline">
            Admin Panel
          </Link>
        )}

        <div className="ml-auto flex items-center gap-3 text-sm">
          {loading ? null : user ? (
            <>
              <span>
                {user.name} ({user.role})
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="underline">
                Log in
              </Link>
              <Link href="/register" className="underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
