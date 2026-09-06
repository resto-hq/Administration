export default function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((label, index) => (
        <div key={label} className="flex shrink-0 items-center gap-2">
          <div
            className={`cut-corners-sm flex h-9 w-9 shrink-0 items-center justify-center text-sm font-bold ${
              index < current
                ? "bg-ink text-paper"
                : index === current
                  ? "bg-primary text-paper"
                  : "bg-paper-alt text-ink/40"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`text-xs font-semibold ${index === current ? "text-ink" : "text-ink/40"}`}
          >
            {label}
          </span>
          {index < steps.length - 1 && <div className="h-px w-8 bg-ink/15" />}
        </div>
      ))}
    </div>
  );
}
