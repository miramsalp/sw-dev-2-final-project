import Link from "next/link";
import { Card, PageTitle } from "@/components/ui";
import { CreateBooking } from "@/features/bookings/CreateBooking";
import type { Facility } from "./types";

export function FacilityDetail({ facility }: { facility: Facility }) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/facilities" className="text-sm underline">
        ← Back to facilities
      </Link>
      <PageTitle>{facility.name}</PageTitle>

      <Card>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <dt className="font-medium">Sport</dt>
          <dd>{facility.sportType}</dd>
          <dt className="font-medium">Location</dt>
          <dd>{facility.location}</dd>
          <dt className="font-medium">Capacity</dt>
          <dd>{facility.capacity}</dd>
          <dt className="font-medium">Hourly rate</dt>
          <dd>{facility.hourlyRate} THB</dd>
        </dl>
      </Card>

      <CreateBooking facilityId={facility._id} />
    </div>
  );
}
