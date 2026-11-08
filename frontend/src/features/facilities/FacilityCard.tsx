import Link from "next/link";
import { Card } from "@/components/ui";
import type { Facility } from "./types";

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Card>
      <h2 className="text-lg font-bold">{facility.name}</h2>
      <p className="text-sm">
        {facility.sportType} · {facility.location}
      </p>
      <p className="text-sm">
        Capacity {facility.capacity} · {facility.hourlyRate} THB/hour
      </p>
      <Link href={`/facilities/${facility._id}`} className="mt-3 inline-block underline">
        View &amp; book →
      </Link>
    </Card>
  );
}
