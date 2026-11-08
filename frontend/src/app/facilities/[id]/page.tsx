import { FacilityDetail } from "@/features/facilities/FacilityDetail";

export default async function FacilityPage({ params }: PageProps<"/facilities/[id]">) {
  const { id } = await params;
  return <FacilityDetail id={id} />;
}
