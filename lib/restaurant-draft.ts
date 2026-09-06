// Local draft of the (long, multi-step) restaurant creation wizard — lets a
// restaurateur stop partway through and pick up later, without a backend
// concept of "partial fiche" (the real record is only created on final submit).

const DRAFT_KEY = "resto:restaurant-create-draft";

export function saveRestaurantDraft<T>(state: T, step: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ state, step }));
  } catch {
    // Storage unavailable (private mode, quota) — worst case, the draft is lost.
  }
}

export function loadRestaurantDraft<T>(): { state: T; step: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { state: T; step: number };
  } catch {
    return null;
  }
}

export function clearRestaurantDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}
