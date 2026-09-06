/** "a, b,  c" -> ["a", "b", "c"] — for the backend's comma-free string-array fields. */
export function parseList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinList(value: string[] | undefined | null): string {
  return value?.join(", ") ?? "";
}
