"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui";
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

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">Book this facility</h2>
      {!user && (
        <p>
          <Link href="/login" className="underline">
            Log in
          </Link>{" "}
          as a member to book.
        </p>
      )}
      {user?.role === "admin" && <p>Admins cannot create bookings. Log in as a member.</p>}
      {user?.role === "member" && (
        <Card>
          <BookingForm submitLabel="Book" onSubmit={create} />
        </Card>
      )}
    </section>
  );
}
