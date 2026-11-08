import { BackLink } from "@/components/ui";

/** Shared create/edit template: "< Back", activity card (left) and form (right). */
export function BookingLayout({
  backHref,
  card,
  hint,
  children,
}: {
  backHref: string;
  card: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <BackLink href={backHref} />
      <div className="mt-4 flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex w-full max-w-[304px] shrink-0 flex-col gap-2">
          {card}
          {hint && <p className="text-xl font-light">{hint}</p>}
        </div>
        <div className="w-full md:max-w-[604px] md:flex-1">{children}</div>
      </div>
    </>
  );
}
