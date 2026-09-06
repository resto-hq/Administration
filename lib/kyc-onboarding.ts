// Client-only UI state for the KYC onboarding flow — not backend data, just
// "has this browser already seen X" flags so we don't re-nag on every visit.

const INTRO_CHOICE_KEY = "resto:kyc-person-intro-seen";

/** Has the user already picked "start now" or "later" on the intro screen? */
export function hasSeenKycIntro(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(INTRO_CHOICE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markKycIntroSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(INTRO_CHOICE_KEY, "1");
  } catch {
    // Storage unavailable (private mode, quota) — worst case, ask again next visit.
  }
}

const APPROVED_MODAL_KEY = "resto:kyc-approved-modal-seen";

/** Has the user already acknowledged the "identity approved, create a restaurant" prompt? */
export function hasSeenApprovedModal(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(APPROVED_MODAL_KEY) === "1";
  } catch {
    return true;
  }
}

export function markApprovedModalSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(APPROVED_MODAL_KEY, "1");
  } catch {
    // ignore
  }
}

/** One modal per browser tab session per status, not one per page navigation. */
export function hasSeenStatusModal(status: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(`resto:kyc-status-modal:${status}`) === "1";
  } catch {
    return true;
  }
}

export function markStatusModalSeen(status: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(`resto:kyc-status-modal:${status}`, "1");
  } catch {
    // ignore
  }
}
