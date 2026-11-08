import { PageShell, PageTitle } from "@/components/ui";
import { ActivityCard } from "./ActivityCard";
import type { Facility } from "./types";

/**
 * Figma "select-before-booking". With `editBookingId`, picking a card sends the user back to
 * that booking's edit page with the new facility instead of starting a new booking.
 */
export function FacilityList({
  facilities,
  editBookingId,
}: {
  facilities: Facility[];
  editBookingId?: string;
}) {
  const hrefFor = (f: Facility) =>
    editBookingId
      ? `/bookings/${encodeURIComponent(editBookingId)}/edit?facility=${encodeURIComponent(f._id)}`
      : `/facilities/${f._id}`;

  return (
    <PageShell>
      <PageTitle>{editBookingId ? "Change Activity" : "Select Activity"}</PageTitle>
      {facilities.length === 0 && <p className="text-center text-xl font-light">No facilities yet.</p>}
      <div className="grid grid-cols-[minmax(0,300px)] justify-center gap-x-4 gap-y-2 sm:grid-cols-[repeat(2,300px)] lg:grid-cols-[repeat(3,300px)]">
        {facilities.map((f) => (
          <ActivityCard key={f._id} facility={f} href={hrefFor(f)} />
        ))}
      </div>
    </PageShell>
  );
}
