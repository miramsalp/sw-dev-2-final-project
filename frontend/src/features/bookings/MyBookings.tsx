"use client";

import { useState } from "react";
import Link from "next/link";
import { ErrorBox, Loading, PageTitle } from "@/components/ui";
import { errorMessage } from "@/lib/api";
import { useAuth } from "@/features/auth/AuthProvider";
import { bookingsApi } from "./api";
import { useBookings } from "./hooks";
import { BookingTable } from "./BookingTable";
import type { Booking } from "./types";

export function MyBookings() {
  const { token } = useAuth();
  const { data: bookings, error, loading, reload } = useBookings();
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDelete = async (booking: Booking) => {
    if (!confirm(`Delete booking at ${booking.facility?.name ?? "this facility"}?`)) return;
    setActionError(null);
    try {
      await bookingsApi.remove(token, booking._id);
      reload();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  };

  return (
    <div>
      <PageTitle>My Bookings</PageTitle>
      {loading && <Loading />}
      <ErrorBox message={error ?? actionError} />
      {bookings?.length === 0 && (
        <p>
          No bookings yet.{" "}
          <Link href="/facilities" className="underline">
            Book a facility
          </Link>
        </p>
      )}
      {!!bookings?.length && <BookingTable bookings={bookings} onDelete={handleDelete} />}
    </div>
  );
}
