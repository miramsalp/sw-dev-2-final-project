"use client";

import { useState } from "react";
import { Button, ErrorBox, Input } from "@/components/ui";
import { errorMessage } from "@/lib/api";
import type { Facility, FacilityInput } from "@/features/facilities/types";

const emptyValues = { name: "", sportType: "", location: "", capacity: "", hourlyRate: "" };

type Values = typeof emptyValues;

const fields: { key: keyof Values; label: string; type?: string }[] = [
  { key: "name", label: "Name" },
  { key: "sportType", label: "Sport type" },
  { key: "location", label: "Location" },
  { key: "capacity", label: "Capacity", type: "number" },
  { key: "hourlyRate", label: "Hourly rate (THB)", type: "number" },
];

const toValues = (facility: Facility | null): Values =>
  facility
    ? {
        name: facility.name,
        sportType: facility.sportType,
        location: facility.location,
        capacity: String(facility.capacity),
        hourlyRate: String(facility.hourlyRate),
      }
    : emptyValues;

function validate(values: Values): string | null {
  if (!values.name.trim()) return "Name is required";
  if (!values.sportType.trim()) return "Sport type is required";
  if (!values.location.trim()) return "Location is required";
  if (!values.capacity || Number(values.capacity) < 1) return "Capacity must be at least 1";
  if (!values.hourlyRate || Number(values.hourlyRate) < 0) return "Hourly rate cannot be negative";
  return null;
}

export function FacilityForm({
  editing,
  onSubmit,
  onCancel,
}: {
  editing: Facility | null;
  onSubmit: (input: FacilityInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState(() => toValues(editing));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const invalid = validate(values);
    if (invalid) return setError(invalid);

    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        name: values.name.trim(),
        sportType: values.sportType.trim(),
        location: values.location.trim(),
        capacity: Number(values.capacity),
        hourlyRate: Number(values.hourlyRate),
      });
      setValues(emptyValues);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const submitLabel = editing ? "Save changes" : "Add facility";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 border-6 border-[#ffcdbc] bg-[#ffe3d9] p-6"
    >
      <h3 className="text-2xl font-bold">{editing ? "Edit facility" : "(+) Add facility"}</h3>
      <ErrorBox message={error} />
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label, type }) => (
          <Input
            key={key}
            aria-label={label}
            placeholder={label}
            type={type}
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <Button type="submit" size="lg" disabled={submitting} className="w-[180px]">
          {submitting ? "Saving..." : submitLabel}
        </Button>
        {editing && (
          <Button type="button" size="lg" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
