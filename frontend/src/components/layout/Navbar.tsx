"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";

const navLinkClass =
  "flex h-[60px] min-w-[97px] items-center justify-center px-5 py-2.5 font-medium hover:bg-black/10";

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="border-b-3 border-black bg-[#ee7d57] font-plex text-black">
      <div className="flex flex-wrap items-center justify-between pl-5">
        <Link href="/" className="text-xl font-bold">
          Sports Booking
        </Link>

        <div className="flex flex-wrap items-center">
          <Link href="/facilities" className={navLinkClass}>
            Facilities
          </Link>
          {user?.role === "member" && (
            <Link href="/bookings" className={navLinkClass}>
              My Bookings
            </Link>
          )}
          {user?.role === "admin" && (
            <Link href="/admin" className={navLinkClass}>
              Admin Panel
            </Link>
          )}
          {loading ? null : user ? (
            <>
              <button type="button" onClick={handleLogout} className={`${navLinkClass} cursor-pointer`}>
                Logout
              </button>
              <span className="flex h-[60px] items-center justify-center bg-[#030303] px-4 py-2.5 text-xl font-semibold whitespace-nowrap text-white">
                {user.name}
              </span>
            </>
          ) : (
            <>
              <Link href="/login" className={navLinkClass}>
                Login
              </Link>
              <Link href="/register" className={navLinkClass}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
