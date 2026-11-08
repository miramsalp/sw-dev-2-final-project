export function ErrorBox({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div role="alert" className="border-2 border-black p-3 text-sm font-medium">
      Error: {message}
    </div>
  );
}

export function Loading() {
  return <p className="text-sm">Loading...</p>;
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mb-4 text-center font-plex text-4xl leading-[66px] font-bold sm:text-5xl">
      {children}
    </h1>
  );
}
