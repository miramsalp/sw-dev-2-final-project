"use client";

import { useState } from "react";
import { Button, ErrorBox, LinkButton, Loading, PageShell } from "@/components/ui";
import { errorMessage } from "@/lib/api";
import { endTime, formatDate } from "@/lib/format";
import { useAuth } from "@/features/auth/AuthProvider";
import { bookingsApi } from "@/features/bookings/api";
import { useBookings } from "@/features/bookings/hooks";
import type { Booking } from "@/features/bookings/types";
import { facilitiesApi } from "@/features/facilities/api";
import { useFacilities } from "@/features/facilities/hooks";
import type { Facility, FacilityInput } from "@/features/facilities/types";
import { AdminListCard } from "./AdminListCard";
import { FacilityForm } from "./FacilityForm";

export function AdminPanel() {
  return (
    <PageShell>
      <h1 className="text-center text-[40px] font-bold">Admin Panel</h1>
      <div className="mt-4 flex flex-col gap-10">
        <FacilitiesSection />
        <AllBookingsSection />
      </div>
    </PageShell>
  );
}

function FacilitiesSection() {
  const { token } = useAuth();
  const { data: facilities, error, loading, reload } = useFacilities();
  const [editing, setEditing] = useState<Facility | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleSubmit = async (input: FacilityInput) => {
    if (editing) {
      await facilitiesApi.update(token, editing._id, input);
      setEditing(null);
    } else {
      await facilitiesApi.create(token, input);
    }
    reload();
  };

  const handleEdit = (facility: Facility) => {
    setActionError(null);
    setEditing(facility);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (facility: Facility) => {
    if (!confirm(`Delete ${facility.name}?`)) return;
    setActionError(null);
    try {
      await facilitiesApi.remove(token, facility._id);
      if (editing?._id === facility._id) setEditing(null);
      reload();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Facilities</h2>
      <FacilityForm
        key={editing?._id ?? "new"}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />
      {loading && <Loading />}
      <ErrorBox message={error ?? actionError} />
      {facilities?.length === 0 && <p>No facilities yet.</p>}
      {facilities?.map((facility) => (
        <AdminListCard
          key={facility._id}
          title={facility.name}
          details={[
            `${facility.sportType} · ${facility.location}`,
            `Capacity: ${facility.capacity} · ${facility.hourlyRate} THB/hour`,
          ]}
        >
          <Button size="sm" onClick={() => handleEdit(facility)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(facility)}>
            Delete
          </Button>
        </AdminListCard>
      ))}
    </section>
  );
}

function AllBookingsSection() {
  const { token } = useAuth();
  const { data: bookings, error, loading, reload } = useBookings();
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDelete = async (booking: Booking) => {
    if (!confirm(`Delete ${booking.user?.name ?? "this member"}'s booking?`)) return;
    setActionError(null);
    try {
      await bookingsApi.remove(token, booking._id);
      reload();
    } catch (err) {
      setActionError(errorMessage(err));
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">All bookings</h2>
      {loading && <Loading />}
      <ErrorBox message={error ?? actionError} />
      {bookings?.length === 0 && <p>No bookings yet.</p>}
      {bookings?.map((booking) => (
        <AdminListCard
          key={booking._id}
          title={booking.facility?.name ?? "(removed)"}
          details={[
            `${formatDate(booking.bookingDate)} ·${booking.startTime}–${endTime(booking.startTime, booking.durationHours)} · ${booking.durationHours} ${booking.durationHours === 1 ? "hour" : "hours"}`,
            `Member: ${booking.user?.name ?? "(removed)"}`,
          ]}
        >
          <LinkButton size="sm" href={`/bookings/${booking._id}/edit`}>
            Edit
          </LinkButton>
          <Button size="sm" variant="danger" onClick={() => handleDelete(booking)}>
            Delete
          </Button>
        </AdminListCard>
      ))}
    </section>
  );
}
