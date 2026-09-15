import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as adminService from "@/services/admin";
import { queryKeys } from "./query-keys";

// No realtime channel on the backend (no websocket/SSE), so admin queues
// that other people act on concurrently (KYC, events, restaurant requests
// awaiting review) poll every 30s on top of the default focus/mount
// revalidation, instead of only updating when this admin does something.
const QUEUE_POLL_INTERVAL_MS = 30 * 1000;

export function usePendingKyc() {
  return useQuery({
    queryKey: queryKeys.admin.pendingKyc(),
    queryFn: adminService.getPendingKyc,
    refetchInterval: QUEUE_POLL_INTERVAL_MS,
  });
}

export function useKycDetails(kycId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.admin.kycDetail(kycId),
    queryFn: () => adminService.getKycDetails(kycId),
    enabled: options?.enabled ?? Boolean(kycId),
  });
}

export function useApproveKyc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.approveKyc,
    onSuccess: (_data, kycId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.pendingKyc() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.kycDetail(kycId) });
    },
  });
}

export function useRejectKyc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      kycId,
      query,
    }: {
      kycId: string;
      query?: Parameters<typeof adminService.rejectKyc>[1];
    }) => adminService.rejectKyc(kycId, query),
    onSuccess: (_data, { kycId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.pendingKyc() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.kycDetail(kycId) });
    },
  });
}

export function usePendingEvents(query?: Parameters<typeof adminService.getPendingEvents>[0]) {
  return useQuery({
    queryKey: queryKeys.admin.pendingEvents(query),
    queryFn: () => adminService.getPendingEvents(query),
    refetchInterval: QUEUE_POLL_INTERVAL_MS,
  });
}

export function useApproveEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.approveEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events", "pending"] });
    },
  });
}

export function useRejectEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.rejectEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "events", "pending"] });
    },
  });
}

export function usePlatformStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: adminService.getPlatformStats,
  });
}

export function useAdminUsers(
  query?: Parameters<typeof adminService.listUsers>[0],
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: queryKeys.admin.users(query),
    queryFn: () => adminService.listUsers(query),
    enabled: options?.enabled ?? true,
  });
}

export function useAdmins(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.admin.admins(),
    queryFn: adminService.listAdmins,
    enabled: options?.enabled ?? true,
  });
}

export function usePromoteToAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.promoteToAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.admins() });
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useDemoteAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.demoteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.admins() });
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.admins() });
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useAdminRestaurantRequests(
  query?: Parameters<typeof adminService.listRestaurantRequests>[0]
) {
  return useQuery({
    queryKey: queryKeys.admin.restaurantRequests(query),
    queryFn: () => adminService.listRestaurantRequests(query),
    refetchInterval: QUEUE_POLL_INTERVAL_MS,
  });
}

export function useApproveRestaurantRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.approveRestaurantRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "restaurantRequests"] });
    },
  });
}

export function useRejectRestaurantRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      requestId,
      body,
    }: {
      requestId: string;
      body: Parameters<typeof adminService.rejectRestaurantRequest>[1];
    }) => adminService.rejectRestaurantRequest(requestId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "restaurantRequests"] });
    },
  });
}

export function useAdminUser(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.admin.userDetail(userId),
    queryFn: () => adminService.getUser(userId),
    enabled: options?.enabled ?? Boolean(userId),
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: string;
      body: Parameters<typeof adminService.updateUserStatus>[1];
    }) => adminService.updateUserStatus(userId, body),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.userDetail(userId) });
    },
  });
}

export function useUserActivity(
  userId: string,
  query?: Parameters<typeof adminService.getUserActivity>[1],
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: queryKeys.admin.userActivity(userId, query),
    queryFn: () => adminService.getUserActivity(userId, query),
    enabled: options?.enabled ?? Boolean(userId),
  });
}

export function useAdminRestaurants(query?: Parameters<typeof adminService.listAdminRestaurants>[0]) {
  return useQuery({
    queryKey: queryKeys.admin.restaurants(query),
    queryFn: () => adminService.listAdminRestaurants(query),
  });
}

export function useUpdateAdminRestaurantStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      restaurantId,
      body,
    }: {
      restaurantId: string;
      body: Parameters<typeof adminService.updateAdminRestaurantStatus>[1];
    }) => adminService.updateAdminRestaurantStatus(restaurantId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "restaurants"] });
    },
  });
}

export function useAuditLogs(query?: Parameters<typeof adminService.listAuditLogs>[0]) {
  return useQuery({
    queryKey: queryKeys.admin.auditLogs(query),
    queryFn: () => adminService.listAuditLogs(query),
  });
}
