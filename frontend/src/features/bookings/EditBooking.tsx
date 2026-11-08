"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ErrorBox, Loading, PageShell, PageTitle } from "@/components/ui";
import { useAuth } from "@/features/auth/AuthProvider";
import { ActivityCard } from "@/features/facilities/ActivityCard";
import type { Facility } from "@/features/facilities/types";
import { useFetch } from "@/hooks/useFetch";
import { errorMessage } from "@/lib/api";
import { toDateInput } from "@/lib/format";
import { bookingsApi } from "./api";
import { useBooking } from "./hooks";
import { BookingForm } from "./BookingForm";
import { BookingLayout } from "./BookingLayout";
import type { BookingInput } from "./types";

/**
 * Same template as the Booking page. `facilityId` comes from /facilities?editBooking=<id>
 * when the user picked a different activity.
 */
export function EditBooking({ id, facilityId }: { id: string; facilityId?: string }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const { data: booking, error, loading } = useBooking(id);
  const picked = useFetch<Facility>(facilityId ? `/facilities/${facilityId}` : null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const backHref = user?.role === "admin" ? "/admin" : "/bookings";

  const save = async (input: BookingInput) => {
    await bookingsApi.update(token, id, facilityId ? { ...input, facility: facilityId } : input);
    router.push(backHref);
  };

  const remove = async () => {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    setDeleteError(null);
    setDeleting(true);
    try {
      await bookingsApi.remove(token, id);
      router.push(backHref);
    } catch (err) {
      setDeleteError(errorMessage(err));
      setDeleting(false);
    }
  };

  const facility = facilityId ? picked.data : booking?.facility;

  return (
    <PageShell>
      <PageTitle>Edit Booking</PageTitle>
      {(loading || (!!facilityId && picked.loading)) && <Loading />}
      <ErrorBox message={error ?? picked.error ?? deleteError} />
      {booking && (
        <BookingLayout
          backHref={backHref}
          card={
            facility ? (
              <ActivityCard facility={facility} href={`/facilities?editBooking=${booking._id}`} />
            ) : (
              <p className="border-6 border-[#f0f0f0] p-6 text-xl">This facility is no longer available.</p>
            )
          }
          hint="click on the card to change activity"
        >
          <BookingForm
            submitLabel="Save"
            initial={{
              bookingDate: toDateInput(booking.bookingDate),
              startTime: booking.startTime,
              durationHours: booking.durationHours,
            }}
            onSubmit={save}
            extraActions={
              <Button type="button" variant="danger" size="lg" onClick={remove} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            }
          />
        </BookingLayout>
      )}
    </PageShell>
  );
}
