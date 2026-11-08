import type { Role } from "@/features/auth/types";
import type { Facility } from "@/features/facilities/types";

export interface Booking {
  _id: string;
  facility: Facility | null;
  user: { _id: string; name: string; email: string; tel: string; role: Role };
  bookingDate: string;
  startTime: string;
  durationHours: number;
}

export interface BookingInput {
  bookingDate: string;
  startTime: string;
  durationHours: number;
}
