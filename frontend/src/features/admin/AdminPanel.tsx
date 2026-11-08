"use client";

import { Button, Card, Field, Input, PageTitle, Table, Td, Tr } from "@/components/ui";

export function AdminPanel() {
  return (
    <div>
      <PageTitle>Admin Panel</PageTitle>
      <div className="flex flex-col gap-10">
        <FacilitiesSection />
        <AllBookingsSection />
      </div>
    </div>
  );
}

function FacilitiesSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Facilities</h2>

      <Card>
        <h3 className="mb-3 font-bold">Add facility</h3>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <Field label="Name">
            <Input disabled />
          </Field>
          <Field label="Sport type">
            <Input disabled />
          </Field>
          <Field label="Location">
            <Input disabled />
          </Field>
          <Field label="Capacity">
            <Input type="number" disabled />
          </Field>
          <Field label="Hourly rate (THB)">
            <Input type="number" disabled />
          </Field>
          <div className="flex items-end">
            <Button type="submit" disabled>
              Add facility (TODO)
            </Button>
          </div>
        </form>
      </Card>

      <PlaceholderTable columns={["Name", "Sport", "Location", "Capacity", "Rate", "Actions"]} />
    </section>
  );
}

function AllBookingsSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">All bookings</h2>
      <PlaceholderTable columns={["Member", "Facility", "Date", "Time", "Hours", "Actions"]} />
    </section>
  );
}

function PlaceholderTable({ columns }: { columns: string[] }) {
  return (
    <Table columns={columns}>
      <Tr>
        <Td colSpan={columns.length}>Not connected yet (TODO)</Td>
      </Tr>
    </Table>
  );
}
