import Link from "next/link";

type Variant = "primary" | "secondary" | "danger";

type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "bg-[#029d35] text-[#caffdb] hover:bg-[#028a2e]",
  secondary: "bg-white text-black hover:bg-black hover:text-white",
  danger: "bg-[#d93025] text-white hover:bg-[#b8261d]",
};

const sizeClass: Record<Size, string> = {
  sm: "h-6 px-[18px] text-sm font-semibold",
  md: "px-4 py-2 text-sm font-medium",
  lg: "h-16 min-w-40 px-6 text-xl font-semibold",
};

const borderClass = (variant: Variant, size: Size) =>
  variant === "secondary" ? "border" : size === "sm" ? "border-2" : "border-4";

const buttonClass = (variant: Variant = "primary", size: Size = "md") =>
  [
    "inline-flex items-center justify-center border-black",
    "disabled:cursor-not-allowed disabled:border-dashed",
    sizeClass[size],
    borderClass(variant, size),
    variantClass[variant],
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
  size,
  href,
  className = "",
  children,
}: {
  variant?: Variant;
  size?: Size;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}
