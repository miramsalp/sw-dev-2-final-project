export interface Facility {
  _id: string;
  name: string;
  sportType: string;
  location: string;
  capacity: number;
  hourlyRate: number;
}

export type FacilityInput = Omit<Facility, "_id">;

export interface BookedSlot {
  _id: string;
  startMinutes: number;
  endMinutes: number;
}

export interface FacilityAvailability {
  date: string;
  booked: BookedSlot[];
}
