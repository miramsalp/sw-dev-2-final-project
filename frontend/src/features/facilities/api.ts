import { api } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import type { Facility, FacilityInput } from "./types";

export const useFacilities = () => useFetch<Facility[]>("/facilities");
export const useFacility = (id: string) => useFetch<Facility>(`/facilities/${id}`);

export const facilitiesApi = {
  create: (input: FacilityInput) => api<Facility>("/facilities", { method: "POST", body: input }),
  update: (id: string, input: Partial<FacilityInput>) =>
    api<Facility>(`/facilities/${id}`, { method: "PUT", body: input }),
  remove: (id: string) => api(`/facilities/${id}`, { method: "DELETE" }),
};
