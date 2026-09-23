import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const VARIANTS = {
  solid: "bg-primary text-white hover:bg-primary-dark",
  outline: "border border-ink/15 text-ink hover:border-ink/30",
  "outline-light": "border border-white/30 text-white hover:border-white/60",
};

type Variant = keyof typeof VARIANTS;

const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";

export function LandingButton({
  variant = "solid",
  className = "",
  children,
  ...props
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${base} ${VARIANTS[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function LandingLinkButton({
  variant = "solid",
  className = "",
  children,
  ...props
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className={`${base} ${VARIANTS[variant]} ${className}`}>
      {children}
    </a>
  );
}
