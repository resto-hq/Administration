import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";
import type { components } from "./api-types";

// KYC, /admin/stats and /admin/dashboard have no response_model on the
// backend, so those shapes are typed by hand from app/schemas/kyc.py and
// app/features/admin/service.py. Everything else below has a response_model
// and comes straight from the generated schema.

export type KycFileInfo = { field: string; url: string | null };

export type KycAdminRecord = {
  id: string;
  user_id: string;
  // KYCType.BUSINESS keeps the historical wire value "restaurant".
  kyc_type: "person" | "creator" | "restaurant";
  status: "pending" | "approved" | "rejected";
  first_name: string;
  last_name: string;
  full_address: string;
  phone: string;
  files: KycFileInfo[];
  restaurant_name: string | null;
  restaurant_address: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  restaurant_id: string | null;
  rejection_reason: string | null;
  reviewed_by: string | null;
  submitted_at: string | null;
  reviewed_at: string | null;
};

export type PlatformStats = {
  total_users: number;
  total_restaurants: number;
  total_events: number;
  total_reviews: number;
  pending_kyc: number;
  monthly_active_users: number;
  ticket_link_clicks: number;
};

export type AdminUserResponse = components["schemas"]["AdminUserResponse"];
export type AdminRestaurantRead = components["schemas"]["AdminRestaurantRead"];
export type AuditLogRead = components["schemas"]["AuditLogRead"];

export async function getPendingKyc(): Promise<KycAdminRecord[]> {
  const { data } = await client.get("/api/v1/admin/kyc/pending");
  return data;
}

export async function getKycDetails(kycId: string): Promise<KycAdminRecord> {
  const { data } = await client.get(`/api/v1/admin/kyc/${kycId}`);
  return data;
}

export async function approveKyc(
  kycId: string
): Promise<{ message: string; restaurant_id?: string }> {
  const { data } = await client.post(`/api/v1/admin/kyc/${kycId}/approve`);
  return data;
}

export async function rejectKyc(
  kycId: string,
  query?: ApiQuery<"reject_kyc_api_v1_admin_kyc__kyc_id__reject_post">
): Promise<{ message: string }> {
  const { data } = await client.post(`/api/v1/admin/kyc/${kycId}/reject`, undefined, {
    params: query,
  });
  return data;
}

export async function getPendingEvents(
  query?: ApiQuery<"pending_events_api_v1_admin_events_pending_get">
): Promise<ApiResponse<"pending_events_api_v1_admin_events_pending_get">> {
  const { data } = await client.get("/api/v1/admin/events/pending", { params: query });
  return data;
}

export async function approveEvent(
  eventId: string
): Promise<ApiResponse<"approve_event_api_v1_admin_events__event_id__approve_post">> {
  const { data } = await client.post(`/api/v1/admin/events/${eventId}/approve`);
  return data;
}

export async function rejectEvent(
  eventId: string
): Promise<ApiResponse<"reject_event_api_v1_admin_events__event_id__reject_post">> {
  const { data } = await client.post(`/api/v1/admin/events/${eventId}/reject`);
  return data;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const { data } = await client.get("/api/v1/admin/stats");
  return data;
}

export async function listUsers(
  query?: ApiQuery<"list_users_api_v1_admin_users_get">
): Promise<ApiResponse<"list_users_api_v1_admin_users_get">> {
  const { data } = await client.get("/api/v1/admin/users", { params: query });
  return data;
}

export async function getUser(
  userId: string
): Promise<ApiResponse<"get_user_api_v1_admin_users__user_id__get">> {
  const { data } = await client.get(`/api/v1/admin/users/${userId}`);
  return data;
}

export async function updateUserStatus(
  userId: string,
  body: ApiJsonBody<"update_user_api_v1_admin_users__user_id__patch">
): Promise<ApiResponse<"update_user_api_v1_admin_users__user_id__patch">> {
  const { data } = await client.patch(`/api/v1/admin/users/${userId}`, body);
  return data;
}

export async function updateUserRole(
  userId: string,
  body: ApiJsonBody<"update_user_role_api_v1_admin_users__user_id__role_patch">
): Promise<ApiResponse<"update_user_role_api_v1_admin_users__user_id__role_patch">> {
  const { data } = await client.patch(`/api/v1/admin/users/${userId}/role`, body);
  return data;
}

export async function getUserActivity(
  userId: string,
  query?: ApiQuery<"user_activity_api_v1_admin_users__user_id__activity_get">
): Promise<ApiResponse<"user_activity_api_v1_admin_users__user_id__activity_get">> {
  const { data } = await client.get(`/api/v1/admin/users/${userId}/activity`, {
    params: query,
  });
  return data;
}

export async function listAdminRestaurants(
  query?: ApiQuery<"list_restaurants_api_v1_admin_restaurants_get">
): Promise<ApiResponse<"list_restaurants_api_v1_admin_restaurants_get">> {
  const { data } = await client.get("/api/v1/admin/restaurants", { params: query });
  return data;
}

export async function updateAdminRestaurantStatus(
  restaurantId: string,
  body: ApiJsonBody<"update_restaurant_api_v1_admin_restaurants__restaurant_id__patch">
): Promise<ApiResponse<"update_restaurant_api_v1_admin_restaurants__restaurant_id__patch">> {
  const { data } = await client.patch(`/api/v1/admin/restaurants/${restaurantId}`, body);
  return data;
}

export async function listAuditLogs(
  query?: ApiQuery<"list_audit_logs_api_v1_admin_audit_logs_get">
): Promise<ApiResponse<"list_audit_logs_api_v1_admin_audit_logs_get">> {
  const { data } = await client.get("/api/v1/admin/audit-logs", { params: query });
  return data;
}

// No response_model on this one either — same reasoning as PlatformStats.
export async function listAdmins(): Promise<AdminUserResponse[]> {
  const { data } = await client.get("/api/v1/admin/admins");
  return data;
}

export async function promoteToAdmin(
  body: ApiJsonBody<"promote_to_admin_api_v1_admin_admins_promote_post">
): Promise<{ message: string }> {
  const { data } = await client.post("/api/v1/admin/admins/promote", body);
  return data;
}

export async function demoteAdmin(targetId: string): Promise<{ message: string }> {
  const { data } = await client.post(`/api/v1/admin/admins/${targetId}/demote`);
  return data;
}

export async function deleteAdmin(targetId: string): Promise<{ message: string }> {
  const { data } = await client.delete(`/api/v1/admin/admins/${targetId}`);
  return data;
}

export async function listRestaurantRequests(
  query?: ApiQuery<"list_requests_api_v1_admin_restaurant_requests_get">
): Promise<ApiResponse<"list_requests_api_v1_admin_restaurant_requests_get">> {
  const { data } = await client.get("/api/v1/admin/restaurant-requests", { params: query });
  return data;
}

export async function approveRestaurantRequest(
  requestId: string
): Promise<ApiResponse<"approve_request_api_v1_admin_restaurant_requests__request_id__approve_post">> {
  const { data } = await client.post(`/api/v1/admin/restaurant-requests/${requestId}/approve`);
  return data;
}

export async function rejectRestaurantRequest(
  requestId: string,
  body: ApiJsonBody<"reject_request_api_v1_admin_restaurant_requests__request_id__reject_post">
): Promise<ApiResponse<"reject_request_api_v1_admin_restaurant_requests__request_id__reject_post">> {
  const { data } = await client.post(
    `/api/v1/admin/restaurant-requests/${requestId}/reject`,
    body
  );
  return data;
}
