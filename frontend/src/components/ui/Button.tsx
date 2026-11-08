import Link from "next/link";

type Variant = "primary" | "secondary";

type Size = "md" | "lg";

const buttonClass = (variant: Variant = "primary", size: Size = "md") =>
  [
    "inline-block border-black",
    "disabled:cursor-not-allowed disabled:border-dashed",
    size === "lg" ? "h-16 min-w-40 px-6 text-xl font-semibold" : "px-4 py-2 text-sm font-medium",
    variant === "primary"
      ? "border-4 bg-[#029d35] text-[#caffdb] hover:bg-[#028a2e]"
      : "border bg-white text-black hover:bg-black hover:text-white",
  ].join(" ");

export function Button({
  variant,
  size,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={`${buttonClass(variant, size)} ${className}`} {...props} />;
}

export function LinkButton({
  variant,
  href,
  children,
}: {
  variant?: Variant;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}
