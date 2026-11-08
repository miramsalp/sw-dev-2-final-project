import { ErrorBox } from "@/components/ui";
import { getFacilities } from "@/features/facilities/api";
import { FacilityList } from "@/features/facilities/FacilityList";
import { errorMessage } from "@/lib/api";

export default async function FacilitiesPage() {
  const result = await getFacilities().then(
    (facilities) => ({ facilities, error: null }),
    (error) => ({ facilities: null, error: errorMessage(error) }),
  );

  if (!result.facilities) return <ErrorBox message={result.error} />;
  return <FacilityList facilities={result.facilities} />;
}
