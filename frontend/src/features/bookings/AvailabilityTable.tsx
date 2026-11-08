"use client";

import { Table, Td, Tr } from "@/components/ui";
import type { BookedSlot, FacilityAvailability } from "@/features/facilities/types";
import { useFetch } from "@/hooks/useFetch";
import { toTime } from "@/lib/format";

const DAY_END = 24 * 60;

function toRows(booked: BookedSlot[]) {
  const rows: { start: number; end: number; free: boolean }[] = [];
  let cursor = 0;
  for (const { startMinutes, endMinutes } of booked) {
    if (startMinutes > cursor) rows.push({ start: cursor, end: startMinutes, free: true });
    rows.push({ start: startMinutes, end: endMinutes, free: false });
    cursor = Math.max(cursor, endMinutes);
  }
  if (cursor < DAY_END) rows.push({ start: cursor, end: DAY_END, free: true });
  return rows;
}

/** Read-only day schedule. The backend still decides whether a booking is allowed. */
export function AvailabilityTable({
  facilityId,
  date,
  excludeBookingId,
}: {
  facilityId: string;
  date: string;
  excludeBookingId?: string;
}) {
  const { data, error } = useFetch<FacilityAvailability>(
    `/facilities/${facilityId}/availability?date=${date}`,
  );

  // `data` still holds the previous day until the new response arrives.
  if (data?.date !== date) {
    return <p className="text-sm">{error ? "Could not load the schedule." : "Loading schedule..."}</p>;
  }

  const rows = toRows(data.booked.filter((slot) => slot._id !== excludeBookingId));

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">Schedule for this day</p>
      <Table columns={["Time", "Status"]}>
        {rows.map(({ start, end, free }) => (
          <Tr key={`${start}-${end}`}>
            <Td>
              {toTime(start)}–{toTime(end)}
            </Td>
            <Td>
              <span className={`font-semibold ${free ? "text-[#029d35]" : "text-[#d93025]"}`}>
                {free ? "Free" : "Booked"}
              </span>
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
}
