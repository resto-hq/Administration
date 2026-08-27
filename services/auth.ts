import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";

export async function register(
  body: ApiJsonBody<"register_api_v1_auth_register_post">
): Promise<ApiResponse<"register_api_v1_auth_register_post">> {
  const { data } = await client.post("/api/v1/auth/register", body);
  return data;
}

export async function login(
  body: ApiJsonBody<"login_api_v1_auth_login_post">
): Promise<ApiResponse<"login_api_v1_auth_login_post">> {
  const { data } = await client.post("/api/v1/auth/login", body);
  return data;
}

export async function googleLogin(
  query?: ApiQuery<"google_login_api_v1_auth_google_login_get">
): Promise<ApiResponse<"google_login_api_v1_auth_google_login_get">> {
  const { data } = await client.get("/api/v1/auth/google/login", { params: query });
  return data;
}

export async function googleCallback(
  query: ApiQuery<"google_callback_api_v1_auth_google_callback_get">
): Promise<ApiResponse<"google_callback_api_v1_auth_google_callback_get">> {
  const { data } = await client.get("/api/v1/auth/google/callback", { params: query });
  return data;
}

export async function googleLoginIdToken(
  body: ApiJsonBody<"google_login_id_token_api_v1_auth_google_post">
): Promise<ApiResponse<"google_login_id_token_api_v1_auth_google_post">> {
  const { data } = await client.post("/api/v1/auth/google", body);
  return data;
}

export async function refreshToken(
  body: ApiJsonBody<"refresh_token_api_v1_auth_refresh_post">
): Promise<ApiResponse<"refresh_token_api_v1_auth_refresh_post">> {
  const { data } = await client.post("/api/v1/auth/refresh", body);
  return data;
}

export async function forgotPassword(
  body: ApiJsonBody<"forgot_password_api_v1_auth_forgot_password_post">
): Promise<ApiResponse<"forgot_password_api_v1_auth_forgot_password_post">> {
  const { data } = await client.post("/api/v1/auth/forgot-password", body);
  return data;
}

export async function resetPassword(
  body: ApiJsonBody<"reset_password_api_v1_auth_reset_password_post">
): Promise<ApiResponse<"reset_password_api_v1_auth_reset_password_post">> {
  const { data } = await client.post("/api/v1/auth/reset-password", body);
  return data;
}

export async function verifyEmail(
  body: ApiJsonBody<"verify_email_api_v1_auth_verify_email_post">
): Promise<ApiResponse<"verify_email_api_v1_auth_verify_email_post">> {
  const { data } = await client.post("/api/v1/auth/verify-email", body);
  return data;
}

export async function resendVerification(
  body: ApiJsonBody<"resend_verification_api_v1_auth_resend_verification_post">
): Promise<ApiResponse<"resend_verification_api_v1_auth_resend_verification_post">> {
  const { data } = await client.post("/api/v1/auth/resend-verification", body);
  return data;
}

export async function logout(): Promise<ApiResponse<"logout_api_v1_auth_logout_post">> {
  const { data } = await client.post("/api/v1/auth/logout");
  return data;
}

export async function getMe(): Promise<ApiResponse<"get_me_api_v1_auth_me_get">> {
  const { data } = await client.get("/api/v1/auth/me");
  return data;
}

export async function updateMe(
  body: ApiJsonBody<"update_me_api_v1_auth_me_put">
): Promise<ApiResponse<"update_me_api_v1_auth_me_put">> {
  const { data } = await client.put("/api/v1/auth/me", body);
  return data;
}

export async function uploadAvatar(
  file: File
): Promise<ApiResponse<"upload_avatar_api_v1_auth_me_avatar_post">> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await client.post("/api/v1/auth/me/avatar", form);
  return data;
}

export async function deleteAvatar(): Promise<
  ApiResponse<"delete_avatar_api_v1_auth_me_avatar_delete">
> {
  const { data } = await client.delete("/api/v1/auth/me/avatar");
  return data;
}
