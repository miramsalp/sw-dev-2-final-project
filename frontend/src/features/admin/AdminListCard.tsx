export function AdminListCard({
  title,
  details,
  children,
}: {
  title: string;
  details: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-6 border-[#f0f0f0] bg-white px-6 py-4">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="text-2xl font-bold uppercase">{title}</h3>
        <div className="text-sm font-light">
          {details.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 gap-2">{children}</div>
    </div>
  );
}
