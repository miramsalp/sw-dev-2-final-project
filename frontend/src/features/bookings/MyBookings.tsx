"use client";

import { AddCard, BackToTop, ErrorBox, Loading, PageShell, PageTitle } from "@/components/ui";
import { useBookings } from "./hooks";
import { BookingCard } from "./BookingCard";

export function MyBookings() {
  const { data: bookings, error, loading } = useBookings();

  return (
    <PageShell>
      <PageTitle>My Bookings</PageTitle>
      <div className="mx-auto flex max-w-[732px] flex-col gap-1">
        <AddCard href="/facilities" label="New booking" />
        {loading && <Loading />}
        <ErrorBox message={error} />
        {bookings?.length === 0 && (
          <p className="py-6 text-center text-xl font-light">No bookings yet. Press (+) to book an activity.</p>
        )}
        {bookings?.map((b) => <BookingCard key={b._id} booking={b} />)}
      </div>
      <BackToTop />
    </PageShell>
  );
}
