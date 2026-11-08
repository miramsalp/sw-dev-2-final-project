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

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass} {...props} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={inputClass} {...props} />;
}
