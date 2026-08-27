import { isAxiosError } from "axios";

/** Turns an axios/FastAPI error into a short message safe to show in a form. */
export function getApiErrorMessage(error: unknown, fallback = "Une erreur est survenue."): string {
  if (!isAxiosError(error)) return fallback;

  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => (typeof item?.msg === "string" ? item.msg : null))
      .filter((msg): msg is string => Boolean(msg));
    if (messages.length > 0) return messages.join(" ");
  }
  return fallback;
}
