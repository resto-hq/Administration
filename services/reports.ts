import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";
import type { components } from "./api-types";

export type ReportRead = components["schemas"]["ReportRead"];
export type ReportContentType = components["schemas"]["ReportContentType"];
export type ReportStatus = components["schemas"]["ReportStatus"];
export type ModerationAction = components["schemas"]["ModerationAction"];

export async function listReports(
  query?: ApiQuery<"list_reports_api_v1_admin_reports_get">
): Promise<ApiResponse<"list_reports_api_v1_admin_reports_get">> {
  const { data } = await client.get("/api/v1/admin/reports", { params: query });
  return data;
}

export async function getReport(
  reportId: string
): Promise<ApiResponse<"get_report_api_v1_admin_reports__report_id__get">> {
  const { data } = await client.get(`/api/v1/admin/reports/${reportId}`);
  return data;
}

export async function resolveReport(
  reportId: string,
  body: ApiJsonBody<"resolve_report_api_v1_admin_reports__report_id__resolve_post">
): Promise<ApiResponse<"resolve_report_api_v1_admin_reports__report_id__resolve_post">> {
  const { data } = await client.post(`/api/v1/admin/reports/${reportId}/resolve`, body);
  return data;
}

export async function dismissReport(
  reportId: string,
  body: ApiJsonBody<"dismiss_report_api_v1_admin_reports__report_id__dismiss_post">
): Promise<ApiResponse<"dismiss_report_api_v1_admin_reports__report_id__dismiss_post">> {
  const { data } = await client.post(`/api/v1/admin/reports/${reportId}/dismiss`, body);
  return data;
}

export async function moderateReport(
  reportId: string,
  body: ApiJsonBody<"moderate_report_content_api_v1_admin_reports__report_id__moderate_post">
): Promise<ApiResponse<"moderate_report_content_api_v1_admin_reports__report_id__moderate_post">> {
  const { data } = await client.post(`/api/v1/admin/reports/${reportId}/moderate`, body);
  return data;
}
