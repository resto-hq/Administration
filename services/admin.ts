import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";

export async function getPendingKyc(): Promise<
  ApiResponse<"pending_kyc_api_v1_admin_kyc_pending_get">
> {
  const { data } = await client.get("/api/v1/admin/kyc/pending");
  return data;
}

export async function getKycDetails(
  kycId: string
): Promise<ApiResponse<"get_kyc_details_api_v1_admin_kyc__kyc_id__get">> {
  const { data } = await client.get(`/api/v1/admin/kyc/${kycId}`);
  return data;
}

export async function approveKyc(
  kycId: string
): Promise<ApiResponse<"approve_kyc_api_v1_admin_kyc__kyc_id__approve_post">> {
  const { data } = await client.post(`/api/v1/admin/kyc/${kycId}/approve`);
  return data;
}

export async function rejectKyc(
  kycId: string,
  query?: ApiQuery<"reject_kyc_api_v1_admin_kyc__kyc_id__reject_post">
): Promise<ApiResponse<"reject_kyc_api_v1_admin_kyc__kyc_id__reject_post">> {
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

export async function getPlatformStats(): Promise<
  ApiResponse<"platform_stats_api_v1_admin_stats_get">
> {
  const { data } = await client.get("/api/v1/admin/stats");
  return data;
}

export async function listUsers(
  query?: ApiQuery<"list_users_api_v1_admin_users_get">
): Promise<ApiResponse<"list_users_api_v1_admin_users_get">> {
  const { data } = await client.get("/api/v1/admin/users", { params: query });
  return data;
}

export async function listAdmins(): Promise<
  ApiResponse<"list_admins_api_v1_admin_admins_get">
> {
  const { data } = await client.get("/api/v1/admin/admins");
  return data;
}

export async function promoteToAdmin(
  body: ApiJsonBody<"promote_to_admin_api_v1_admin_admins_promote_post">
): Promise<ApiResponse<"promote_to_admin_api_v1_admin_admins_promote_post">> {
  const { data } = await client.post("/api/v1/admin/admins/promote", body);
  return data;
}

export async function demoteAdmin(
  targetId: string
): Promise<ApiResponse<"demote_admin_api_v1_admin_admins__target_id__demote_post">> {
  const { data } = await client.post(`/api/v1/admin/admins/${targetId}/demote`);
  return data;
}

export async function deleteAdmin(
  targetId: string
): Promise<ApiResponse<"delete_admin_api_v1_admin_admins__target_id__delete">> {
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
