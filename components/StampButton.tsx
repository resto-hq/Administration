import type { ButtonHTMLAttributes } from "react";

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  ink: "border border-border bg-panel text-ink hover:bg-app-bg",
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
      className={`rounded-lg px-6 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
    />
  );
}
