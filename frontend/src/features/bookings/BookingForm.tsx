"use client";

import { useState } from "react";
import { Button, ErrorBox, Field, Input } from "@/components/ui";
import { errorMessage } from "@/lib/api";
import type { BookingInput } from "./types";

export function BookingForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: BookingInput;
  submitLabel: string;
  onSubmit: (input: BookingInput) => Promise<void>;
}) {
  const [bookingDate, setBookingDate] = useState(initial?.bookingDate ?? "");
  const [startTime, setStartTime] = useState(initial?.startTime ?? "");
  const [durationHours, setDurationHours] = useState(String(initial?.durationHours ?? 1));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ bookingDate, startTime, durationHours: Number(durationHours) });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ErrorBox message={error} />
      <Field label="Date">
        <Input type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
      </Field>
      <Field label="Start time">
        <Input type="time" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </Field>
      <Field label="Duration (hours, max 2)">
        <Input
          type="number"
          required
          min={0.5}
          step={0.5}
          value={durationHours}
          onChange={(e) => setDurationHours(e.target.value)}
        />
      </Field>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
