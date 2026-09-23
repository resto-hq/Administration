export default function Stepper({
  steps,
  current,
  maxVisited,
  onStepClick,
}: {
  steps: string[];
  current: number;
  maxVisited?: number;
  onStepClick?: (index: number) => void;
}) {
  const reachable = maxVisited ?? current;

  return (
    <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((label, index) => {
        const clickable = Boolean(onStepClick) && index <= reachable && index !== current;
        return (
          <div key={label} className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => onStepClick?.(index)}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                index < current
                  ? "bg-ink text-paper"
                  : index === current
                    ? "bg-primary text-white"
                    : "bg-app-bg text-ink/40"
              } ${clickable ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
            >
              {index + 1}
            </button>
            <span
              className={`text-xs font-semibold ${index === current ? "text-ink" : "text-ink/40"}`}
            >
              {label}
            </span>
            {index < steps.length - 1 && <div className="h-px w-8 bg-ink/15" />}
          </div>
        );
      })}
    </div>
  );
}
