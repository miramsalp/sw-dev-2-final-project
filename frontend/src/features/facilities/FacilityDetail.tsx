"use client";

import Link from "next/link";
import { Card, ErrorBox, Loading, PageTitle } from "@/components/ui";
import { CreateBooking } from "@/features/bookings/CreateBooking";
import { useFacility } from "./api";

export function FacilityDetail({ id }: { id: string }) {
  const { data: facility, error, loading } = useFacility(id);

  if (loading) return <Loading />;
  if (error || !facility) return <ErrorBox message={error ?? "Facility not found"} />;

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
