"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, ErrorBox, Loading, PageTitle } from "@/components/ui";
import { useAuth } from "@/features/auth/AuthProvider";
import { toDateInput } from "@/lib/format";
import { bookingsApi } from "./api";
import { useBooking } from "./hooks";
import { BookingForm } from "./BookingForm";
import type { BookingInput } from "./types";

export function EditBooking({ id }: { id: string }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const { data: booking, error, loading } = useBooking(id);
  const backHref = user?.role === "admin" ? "/admin" : "/bookings";

  const save = async (input: BookingInput) => {
    await bookingsApi.update(token, id, input);
    router.push(backHref);
  };

  if (loading) return <Loading />;
  if (error || !booking) return <ErrorBox message={error ?? "Booking not found"} />;

  return (
    <div className="mx-auto max-w-md">
      <Link href={backHref} className="text-sm underline">
        ← Back
      </Link>
      <PageTitle>Edit booking</PageTitle>
      <p className="mb-4">{booking.facility?.name}</p>
      <Card>
        <BookingForm
          submitLabel="Save changes"
          initial={{
            bookingDate: toDateInput(booking.bookingDate),
            startTime: booking.startTime,
            durationHours: booking.durationHours,
          }}
          onSubmit={save}
        />
      </Card>
    </div>
  );
}
