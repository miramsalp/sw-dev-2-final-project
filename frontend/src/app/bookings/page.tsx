import { RequireAuth } from "@/features/auth/RequireAuth";
import { MyBookings } from "@/features/bookings/MyBookings";

export default function BookingsPage() {
  return (
    <RequireAuth role="member">
      <MyBookings />
    </RequireAuth>
  );
}
