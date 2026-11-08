import { ErrorBox } from "@/components/ui";
import { getFacility } from "@/features/facilities/api";
import { FacilityDetail } from "@/features/facilities/FacilityDetail";
import { errorMessage } from "@/lib/api";

export default async function FacilityPage({ params }: PageProps<"/facilities/[id]">) {
  const { id } = await params;
  const result = await getFacility(id).then(
    (facility) => ({ facility, error: null }),
    (error) => ({ facility: null, error: errorMessage(error) }),
  );

  if (!result.facility) return <ErrorBox message={result.error} />;
  return <FacilityDetail facility={result.facility} />;
}
