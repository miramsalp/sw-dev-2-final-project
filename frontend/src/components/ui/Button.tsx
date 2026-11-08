import Link from "next/link";

type Variant = "primary" | "secondary";

const buttonClass = (variant: Variant = "primary") =>
  [
    "inline-block border border-black px-4 py-2 text-sm font-medium",
    "disabled:cursor-not-allowed disabled:border-dashed",
    variant === "primary"
      ? "bg-black text-white hover:bg-white hover:text-black"
      : "bg-white text-black hover:bg-black hover:text-white",
  ].join(" ");

export function Button({
  variant,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${buttonClass(variant)} ${className}`} {...props} />;
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
