import { PageTitle } from "@/components/ui";
import { FacilityCard } from "./FacilityCard";
import type { Facility } from "./types";

export function FacilityList({ facilities }: { facilities: Facility[] }) {
  return (
    <div>
      <PageTitle>Facilities</PageTitle>
      {facilities.length === 0 && <p>No facilities yet.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {facilities.map((f) => (
          <FacilityCard key={f._id} facility={f} />
        ))}
      </div>
    </div>
  );
}
