import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "navy" | "light" | "outline" | "outlineLight" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-700 text-white hover:bg-accent-600 hover:shadow-[0_10px_24px_-12px_rgb(181_71_8/0.85)]",
  navy: "bg-navy-800 text-white hover:bg-navy-700 hover:shadow-[0_10px_24px_-12px_rgb(10_36_64/0.8)]",
  /* For use on the amber band, where the primary button would disappear. */
  light: "bg-white text-navy-900 hover:bg-accent-50 hover:shadow-[0_10px_24px_-12px_rgb(0_0_0/0.5)]",
  outline:
    "border border-steel-300 bg-white text-ink hover:border-navy-700 hover:text-navy-700 hover:shadow-card",
  outlineLight: "border border-white/35 text-white hover:border-white/70 hover:bg-white/10",
  ghost: "text-navy-700 hover:text-accent-700",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`;
}

/** Chevron that slides forward when the parent button or card is hovered. */
function Chevron({ scope = "btn" }: { scope?: "btn" | "link" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scope === "btn" ? "group-hover/btn:translate-x-1" : "group-hover/link:translate-x-1"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
      {withArrow ? <Chevron /> : null}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

/** Text link with a trailing chevron, used at the foot of cards and sections. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:text-accent-700 ${className}`}
    >
      <span className="relative">
        {children}
        {/* Underline that draws in from the left on hover. */}
        <span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-600 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:scale-x-100"
          aria-hidden="true"
        />
      </span>
      <Chevron scope="link" />
    </Link>
  );
}

export { Icon };
