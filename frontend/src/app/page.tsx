import { LinkButton, PageTitle } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle>Sports Facility Booking</PageTitle>
      <p>Find a badminton court, tennis court, futsal field or gym and book a time slot.</p>
      <div className="flex flex-wrap gap-3">
        <LinkButton href="/facilities">Browse facilities</LinkButton>
        <LinkButton href="/register" variant="secondary">
          Create an account
        </LinkButton>
      </div>
    </div>
  );
}
