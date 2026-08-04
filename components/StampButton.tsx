import type { ButtonHTMLAttributes } from "react";

const VARIANTS = {
  primary: "bg-primary text-paper shadow-[5px_5px_0_var(--color-ink)] hover:shadow-[7px_7px_0_var(--color-ink)]",
  ink: "bg-ink text-paper shadow-[5px_5px_0_var(--color-primary)] hover:shadow-[7px_7px_0_var(--color-primary)]",
};

export default function StampButton({
  variant = "primary",
  className = "",
  ...props
}: {
  variant?: keyof typeof VARIANTS;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`cut-corners-sm px-6 py-3 font-semibold transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
    />
  );
}
