"use client";

import { Button, LinkButton, Table, Td, Tr } from "@/components/ui";
import { endTime, toDateInput } from "@/lib/format";
import type { Booking } from "./types";

export function BookingTable({
  bookings,
  showMember = false,
  onDelete,
}: {
  bookings: Booking[];
  showMember?: boolean;
  onDelete: (booking: Booking) => void;
}) {
  const columns = [
    ...(showMember ? ["Member"] : []),
    "Facility",
    "Date",
    "Time",
    "Hours",
    "Actions",
  ];

  return (
    <Table columns={columns}>
      {bookings.map((b) => (
        <Tr key={b._id}>
          {showMember && <Td>{b.user?.name}</Td>}
          <Td>
            {b.facility?.name ?? "(removed)"}
            <br />
            <span className="text-xs">{b.facility?.sportType}</span>
          </Td>
          <Td>{toDateInput(b.bookingDate)}</Td>
          <Td>
            {b.startTime}–{endTime(b.startTime, b.durationHours)}
          </Td>
          <Td>{b.durationHours}</Td>
          <Td>
            <div className="flex gap-2">
              <LinkButton href={`/bookings/${b._id}/edit`} variant="secondary">
                Edit
              </LinkButton>
              <Button variant="secondary" onClick={() => onDelete(b)}>
                Delete
              </Button>
            </div>
          </Td>
        </Tr>
      ))}
    </Table>
  );
}
