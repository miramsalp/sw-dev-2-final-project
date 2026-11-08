"use client";

import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/features/auth/AuthProvider";
import type { Booking } from "./types";

export function useBookings() {
  const { token } = useAuth();
  return useFetch<Booking[]>(token ? "/bookings" : null, token);
}

export function useBooking(id: string) {
  const { token } = useAuth();
  return useFetch<Booking>(token ? `/bookings/${id}` : null, token);
}
