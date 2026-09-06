import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";

// None of the endpoints below have a response_model on the backend, so their
// shapes are typed by hand from app/schemas/kyc.py, app/schemas/user.py and
// app/features/admin/service.py.

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
};

export type AdminUserRecord = {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  role: "user" | "creator" | "restaurateur" | "admin" | "superadmin";
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
};

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
): Promise<AdminUserRecord[]> {
  const { data } = await client.get("/api/v1/admin/users", { params: query });
  return data;
}

export async function listAdmins(): Promise<AdminUserRecord[]> {
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
