import Image from "next/image";
import { LinkButton } from "@/components/ui";
import { facilityImage } from "@/features/facilities/images";
import { endTime, formatDate } from "@/lib/format";
import type { Booking } from "./types";

/** Figma "activity-booking-card": 720×180 row with photo, booking details and Edit. */
export function BookingCard({ booking }: { booking: Booking }) {
  const { facility } = booking;
  return (
    <article className="flex h-[192px] border-6 border-[#f0f0f0] bg-white">
      <div className="relative w-[38%] shrink-0 border border-black sm:w-[240px]">
        <Image
          src={facilityImage(facility?.sportType)}
          alt=""
          fill
          sizes="(min-width: 640px) 240px, 38vw"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start px-2.5 pt-4">
        <h2 className="w-full truncate font-sans text-xl leading-8 font-black tracking-tighter uppercase sm:text-[28px]">
          {facility?.name ?? "Removed facility"}
        </h2>
        <div className="mt-3 text-base leading-[23px]">
          <p>Date: {formatDate(booking.bookingDate)}</p>
          <p>
            Time: {booking.startTime}–{endTime(booking.startTime, booking.durationHours)}
          </p>
          <p className="truncate">Member: {booking.user?.name}</p>
        </div>
        <LinkButton href={`/bookings/${booking._id}/edit`} size="sm" className="mt-1.5">
          Edit
        </LinkButton>
      </div>
    </article>
  );
}
