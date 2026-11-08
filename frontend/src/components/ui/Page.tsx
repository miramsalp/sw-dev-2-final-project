import Link from "next/link";

/** Full-width page body with the Figma content column (940px + gutters). */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div data-full-bleed className="mx-auto w-full max-w-[972px] px-4 pt-4 pb-16 font-plex">
      {children}
    </div>
  );
}

export function BackLink({ href }: { href: string }) {
  return (
    <div className="p-2.5">
      <Link
        href={href}
        className="inline-flex h-11 items-center px-5 text-[28px] leading-10 font-semibold hover:bg-black/5"
      >
        &lt; Back
      </Link>
    </div>
  );
}

/** Salmon "(+)" tile that starts a new item (booking, facility...). */
export function AddCard({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="flex h-[192px] items-center justify-center border-6 border-[#ffcdbc] bg-[#ffe3d9] text-[40px] font-bold text-[#ffa485] transition-colors hover:bg-[#ffd6c8]"
    >
      (+)
    </Link>
  );
}
