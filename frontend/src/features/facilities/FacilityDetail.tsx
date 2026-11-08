import { PageShell, PageTitle } from "@/components/ui";
import { BookingLayout } from "@/features/bookings/BookingLayout";
import { CreateBooking } from "@/features/bookings/CreateBooking";
import { ActivityCard } from "./ActivityCard";
import type { Facility } from "./types";

/** Figma "Booking": chosen activity on the left, booking form on the right. */
export function FacilityDetail({ facility }: { facility: Facility }) {
  return (
    <PageShell>
      <PageTitle>Booking</PageTitle>
      <BookingLayout
        backHref="/facilities"
        card={<ActivityCard facility={facility} href="/facilities" />}
        hint="click on the card to change activity"
      >
        <CreateBooking facilityId={facility._id} />
      </BookingLayout>
    </PageShell>
  );
}
