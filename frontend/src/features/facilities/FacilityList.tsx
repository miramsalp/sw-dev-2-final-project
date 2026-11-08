"use client";

import { ErrorBox, Loading, PageTitle } from "@/components/ui";
import { useFacilities } from "./api";
import { FacilityCard } from "./FacilityCard";

export function FacilityList() {
  const { data: facilities, error, loading } = useFacilities();

  return (
    <div>
      <PageTitle>Facilities</PageTitle>
      {loading && <Loading />}
      <ErrorBox message={error} />
      {facilities?.length === 0 && <p>No facilities yet.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {facilities?.map((f) => <FacilityCard key={f._id} facility={f} />)}
      </div>
    </div>
  );
}
