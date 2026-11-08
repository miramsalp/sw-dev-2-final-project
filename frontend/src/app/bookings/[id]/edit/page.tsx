import { RequireAuth } from "@/features/auth/RequireAuth";
import { EditBooking } from "@/features/bookings/EditBooking";

export default async function EditBookingPage({ params }: PageProps<"/bookings/[id]/edit">) {
  const { id } = await params;
  return (
    <RequireAuth>
      <EditBooking id={id} />
    </RequireAuth>
  );
}
