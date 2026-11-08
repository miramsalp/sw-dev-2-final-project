import { RequireAuth } from "@/features/auth/RequireAuth";
import { EditBooking } from "@/features/bookings/EditBooking";

export default async function EditBookingPage({
  params,
  searchParams,
}: PageProps<"/bookings/[id]/edit">) {
  const { id } = await params;
  const { facility } = await searchParams;
  return (
    <RequireAuth>
      <EditBooking id={id} facilityId={typeof facility === "string" ? facility : undefined} />
    </RequireAuth>
  );
}
