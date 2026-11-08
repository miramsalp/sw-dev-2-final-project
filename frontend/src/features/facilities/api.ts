import { api } from "@/lib/api";
import type { Facility, FacilityInput } from "./types";

export const getFacilities = () => api<Facility[]>("/facilities");
export const getFacility = (id: string) => api<Facility>(`/facilities/${id}`);

export const facilitiesApi = {
  create: (token: string | undefined, input: FacilityInput) =>
    api<Facility>("/facilities", { method: "POST", body: input, token }),
  update: (token: string | undefined, id: string, input: Partial<FacilityInput>) =>
    api<Facility>(`/facilities/${id}`, { method: "PUT", body: input, token }),
  remove: (token: string | undefined, id: string) => api(`/facilities/${id}`, { method: "DELETE", token }),
};
