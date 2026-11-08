"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthProvider";
import { bookingsApi } from "./api";
import { BookingForm } from "./BookingForm";
import type { BookingInput } from "./types";

export function CreateBooking({ facilityId }: { facilityId: string }) {
  const { user, token } = useAuth();
  const router = useRouter();

  const create = async (input: BookingInput) => {
    await bookingsApi.create(token, facilityId, input);
    router.push("/bookings");
  };

  if (!user) {
    return (
      <p className="text-xl">
        <Link href="/login" className="font-semibold underline">
          Log in
        </Link>{" "}
        as a member to book this activity.
      </p>
    );
  }
  if (user.role === "admin") {
    return <p className="text-xl">Admins cannot create bookings. Log in as a member.</p>;
  }
  return <BookingForm submitLabel="Create" onSubmit={create} />;
}
