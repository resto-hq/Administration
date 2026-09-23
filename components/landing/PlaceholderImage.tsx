const GRADIENTS = [
  "from-[#C2620E] to-[#3D2612]",
  "from-[#9C5A2E] to-[#2A2013]",
  "from-[#D9762A] to-[#3D2612]",
  "from-[#8C5326] to-[#241C11]",
];

export default function PlaceholderImage({
  seed = 0,
  label = "Photo à fournir",
  className = "",
}: {
  seed?: number;
  label?: string;
  className?: string;
}) {
  const gradient = GRADIENTS[seed % GRADIENTS.length];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {label && (
        <span className="absolute bottom-2 left-2 rounded-md bg-ink/70 px-2 py-1 text-[11px] font-semibold text-white">
          {label}
        </span>
      )}
    </div>
  );
}
