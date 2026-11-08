"use client";

import { useState } from "react";
import { Button, ErrorBox, Input, Select } from "@/components/ui";
import { errorMessage } from "@/lib/api";
import { toMinutes, toTime } from "@/lib/format";
import type { BookingInput } from "./types";

const STEP = 15; // minutes
const MIN_LENGTH = 30; // backend: durationHours >= 0.5
const MAX_LENGTH = 120; // backend: durationHours <= 2
const DAY_END = 24 * 60; // booking must end by 24:00

const range = (from: number, to: number) =>
  Array.from({ length: Math.max(0, Math.floor((to - from) / STEP) + 1) }, (_, i) => from + i * STEP);

const START_OPTIONS = range(0, DAY_END - MIN_LENGTH);
const endOptionsFor = (start: number) =>
  range(start + MIN_LENGTH, Math.min(start + MAX_LENGTH, DAY_END));

/** Keep an existing off-grid value (e.g. 18:10 from older data) selectable. */
const withValue = (options: number[], value: number | null) =>
  value === null || options.includes(value) ? options : [...options, value].sort((a, b) => a - b);

// Same "today" rule as the backend (UTC), and identical on server and client.
const todayUtc = () => new Date().toISOString().slice(0, 10);

export function BookingForm({
  initial,
  submitLabel,
  onSubmit,
  extraActions,
}: {
  initial?: BookingInput;
  submitLabel: string;
  onSubmit: (input: BookingInput) => Promise<void>;
  extraActions?: React.ReactNode;
}) {
  const initialStart = initial ? toMinutes(initial.startTime) : null;
  const [bookingDate, setBookingDate] = useState(initial?.bookingDate ?? "");
  const [start, setStart] = useState<number | null>(initialStart);
  const [end, setEnd] = useState<number | null>(
    initial && initialStart !== null ? initialStart + Math.round(initial.durationHours * 60) : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const changeStart = (value: string) => {
    const next = Number(value);
    const length = start !== null && end !== null ? end - start : 60;
    const options = endOptionsFor(next);
    setStart(next);
    setEnd(options.includes(next + length) ? next + length : (options.find((o) => o >= next + 60) ?? options.at(-1) ?? null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || start === null || end === null) {
      return setError("Please pick a date, start time and end time");
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ bookingDate, startTime: toTime(start), durationHours: (end - start) / 60 });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  // `!` so it wins over the input's own text-black.
  const placeholderClass = (empty: boolean) => (empty ? "text-[#717171]!" : "");

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col">
      <div className="flex flex-col gap-3">
        <ErrorBox message={error} />
        <Input
          aria-label="Date"
          type="date"
          required
          min={todayUtc()}
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className={placeholderClass(!bookingDate)}
        />
        <Select
          aria-label="Start time"
          required
          value={start ?? ""}
          onChange={(e) => changeStart(e.target.value)}
          className={placeholderClass(start === null)}
        >
          <option value="" disabled>
            Start time
          </option>
          {withValue(START_OPTIONS, start).map((m) => (
            <option key={m} value={m}>
              {toTime(m)}
            </option>
          ))}
        </Select>
        <Select
          aria-label="End time"
          required
          disabled={start === null}
          value={end ?? ""}
          onChange={(e) => setEnd(Number(e.target.value))}
          className={placeholderClass(end === null)}
        >
          <option value="" disabled>
            End time
          </option>
          {start !== null &&
            withValue(endOptionsFor(start), end).map((m) => (
              <option key={m} value={m}>
                {toTime(m)} ({(m - start) / 60} h)
              </option>
            ))}
        </Select>
      </div>
      <div className="mt-9 flex flex-wrap gap-4">
        <Button type="submit" size="lg" className="min-w-[180px]" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </Button>
        {extraActions}
      </div>
    </form>
  );
}
