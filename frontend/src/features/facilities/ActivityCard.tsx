import Image from "next/image";
import Link from "next/link";
import { facilityImage } from "./images";
import type { Facility } from "./types";

/** Figma "activity-card": 300×400 tile with photo, name and details. */
export function ActivityCard({ facility, href }: { facility: Facility; href?: string }) {
  const body = (
    <div className="flex h-[400px] w-full flex-col items-center overflow-hidden border-6 border-[#f0f0f0] bg-white px-6 pt-[18px] pb-3 text-center transition-colors group-hover:border-[#ee7d57] [&>*]:shrink-0">
      <div className="relative aspect-[4/3] w-full border border-black">
        <Image src={facilityImage(facility.sportType)} alt="" fill sizes="240px" className="object-cover" />
      </div>
      <h2 className="mt-4 line-clamp-2 w-full font-sans text-[28px] leading-8 font-black tracking-tighter break-words uppercase">
        {facility.name}
      </h2>
      <p className="mt-3 line-clamp-2 text-base font-light">
        {facility.sportType} · {facility.location}
      </p>
      <p className="mt-1 text-base font-light">
        {facility.capacity} people · {facility.hourlyRate} THB/hr
      </p>
    </div>
  );

  if (!href) return body;
  return (
    <Link href={href} className="group block w-full focus-visible:outline-4 focus-visible:outline-[#ee7d57]">
      {body}
    </Link>
  );
}
