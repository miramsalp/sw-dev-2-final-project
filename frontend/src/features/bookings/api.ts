import { api } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import type { Booking, BookingInput } from "./types";

export const useBookings = () => useFetch<Booking[]>("/bookings");
export const useBooking = (id: string) => useFetch<Booking>(`/bookings/${id}`);

export const bookingsApi = {
  create: (facilityId: string, input: BookingInput) =>
    api<Booking>("/bookings", { method: "POST", body: { facility: facilityId, ...input } }),
  update: (id: string, input: BookingInput) =>
    api<Booking>(`/bookings/${id}`, { method: "PUT", body: input }),
  remove: (id: string) => api(`/bookings/${id}`, { method: "DELETE" }),
};
