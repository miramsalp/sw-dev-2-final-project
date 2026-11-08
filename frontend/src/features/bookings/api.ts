import { api } from "@/lib/api";
import type { Booking, BookingInput } from "./types";

export const bookingsApi = {
  create: (token: string | undefined, facilityId: string, input: BookingInput) =>
    api<Booking>("/bookings", { method: "POST", body: { facility: facilityId, ...input }, token }),
  update: (token: string | undefined, id: string, input: BookingInput & { facility?: string }) =>
    api<Booking>(`/bookings/${id}`, { method: "PUT", body: input, token }),
  remove: (token: string | undefined, id: string) => api(`/bookings/${id}`, { method: "DELETE", token }),
};
