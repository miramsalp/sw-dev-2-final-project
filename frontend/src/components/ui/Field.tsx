const inputClass =
  "h-12 w-full border-b border-black bg-[#f0f0f0] px-3.5 pt-[11px] pb-1 text-xl font-medium text-black placeholder:text-[#717171] disabled:border-dashed";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}

export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${inputClass} ${className}`} {...props} />;
}

export function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative w-full">
      <select className={`${inputClass} appearance-none pr-10 ${className}`} {...props} />
      <svg
        aria-hidden
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2"
      >
        <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}
