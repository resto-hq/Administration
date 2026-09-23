const COUNTRY_CODES = [
  { code: "+228", label: "Togo" },
  { code: "+229", label: "Bénin" },
  { code: "+233", label: "Ghana" },
  { code: "+225", label: "Côte d'Ivoire" },
  { code: "+221", label: "Sénégal" },
  { code: "+234", label: "Nigeria" },
  { code: "+33", label: "France" },
] as const;

const DEFAULT_CODE = "+228";

/** Splits a stored "+228 90 00 00 00" string into its country code and local number. */
export function splitPhone(value: string): { code: string; number: string } {
  const trimmed = value.trim();
  const match = COUNTRY_CODES.find((c) => trimmed.startsWith(c.code));
  if (match) return { code: match.code, number: trimmed.slice(match.code.length).trim() };
  return { code: DEFAULT_CODE, number: trimmed };
}

function joinPhone(code: string, number: string): string {
  const trimmed = number.trim();
  return trimmed ? `${code} ${trimmed}` : "";
}

export default function PhoneField({
  label,
  id,
  value,
  onChange,
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const { code, number } = splitPhone(value);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <div className="flex gap-2">
        <select
          value={code}
          onChange={(event) => onChange(joinPhone(event.target.value, number))}
          className="rounded-lg border border-border bg-app-bg px-2 text-sm text-ink outline-none focus:border-primary"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} {c.label}
            </option>
          ))}
        </select>
        <input
          id={id}
          name={id}
          type="tel"
          required={required}
          value={number}
          onChange={(event) => onChange(joinPhone(code, event.target.value))}
          placeholder="90 00 00 00"
          className="w-full min-w-0 flex-1 rounded-lg border border-border bg-app-bg px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
    </div>
  );
}
