/**
 * Central query key factory. Keeping these in one place makes cross-hook
 * cache invalidation (e.g. a mutation in one file invalidating a list owned
 * by another) explicit instead of relying on string literals scattered
 * across the hook files.
 */
export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  users: {
    settings: () => ["users", "settings"] as const,
    publicProfile: (username: string) => ["users", "public", username] as const,
    favorites: () => ["users", "favorites"] as const,
  },
  restaurantRequests: {
    mine: () => ["restaurantRequests", "mine"] as const,
    detail: (requestId: string) => ["restaurantRequests", "detail", requestId] as const,
  },
  restaurants: {
    list: (query?: unknown) => ["restaurants", "list", query ?? {}] as const,
    nearby: (query: unknown) => ["restaurants", "nearby", query] as const,
    trending: (query?: unknown) => ["restaurants", "trending", query ?? {}] as const,
    mostSearched: (query?: unknown) => ["restaurants", "most-searched", query ?? {}] as const,
    cheapest: (query?: unknown) => ["restaurants", "cheapest", query ?? {}] as const,
    detail: (restaurantId: string) => ["restaurants", "detail", restaurantId] as const,
    mine: () => ["restaurants", "mine"] as const,
  },
  events: {
    list: (query?: unknown) => ["events", "list", query ?? {}] as const,
    upcoming: (query?: unknown) => ["events", "upcoming", query ?? {}] as const,
    today: () => ["events", "today"] as const,
    detail: (eventId: string) => ["events", "detail", eventId] as const,
  },
  reviews: {
    byRestaurant: (restaurantId: string) => ["reviews", "restaurant", restaurantId] as const,
  },
  search: {
    results: (query?: unknown) => ["search", "results", query ?? {}] as const,
    history: () => ["search", "history"] as const,
    suggestions: (query?: unknown) => ["search", "suggestions", query ?? {}] as const,
  },
  home: {
    root: (query?: unknown) => ["home", query ?? {}] as const,
  },
  referral: {
    link: () => ["referral", "link"] as const,
    stats: () => ["referral", "stats"] as const,
  },
  kyc: {
    status: () => ["kyc", "status"] as const,
  },
  admin: {
    pendingKyc: () => ["admin", "kyc", "pending"] as const,
    kycDetail: (kycId: string) => ["admin", "kyc", "detail", kycId] as const,
    pendingEvents: (query?: unknown) => ["admin", "events", "pending", query ?? {}] as const,
    stats: () => ["admin", "stats"] as const,
    users: (query?: unknown) => ["admin", "users", query ?? {}] as const,
    userDetail: (userId: string) => ["admin", "users", "detail", userId] as const,
    userActivity: (userId: string, query?: unknown) =>
      ["admin", "users", "activity", userId, query ?? {}] as const,
    admins: () => ["admin", "admins"] as const,
    restaurantRequests: (query?: unknown) =>
      ["admin", "restaurantRequests", query ?? {}] as const,
    restaurants: (query?: unknown) => ["admin", "restaurants", query ?? {}] as const,
    auditLogs: (query?: unknown) => ["admin", "auditLogs", query ?? {}] as const,
  },
  reports: {
    list: (query?: unknown) => ["reports", "list", query ?? {}] as const,
    detail: (reportId: string) => ["reports", "detail", reportId] as const,
  },
  support: {
    conversations: (query?: unknown) => ["support", "conversations", query ?? {}] as const,
    conversation: (userId: string) => ["support", "conversation", userId] as const,
    chat: () => ["support", "chat"] as const,
  },
};
