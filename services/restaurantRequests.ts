import { client } from "./client";
import type { ApiJsonBody, ApiResponse } from "./http-types";

export async function requestReferencing(
  body: ApiJsonBody<"request_referencing_api_v1_restaurants_requests_post">
): Promise<ApiResponse<"request_referencing_api_v1_restaurants_requests_post">> {
  const { data } = await client.post("/api/v1/restaurants/requests", body);
  return data;
}

export async function myRequests(): Promise<
  ApiResponse<"my_requests_api_v1_restaurants_requests_get">
> {
  const { data } = await client.get("/api/v1/restaurants/requests");
  return data;
}

export async function getRequest(
  requestId: string
): Promise<ApiResponse<"get_request_api_v1_restaurants_requests__request_id__get">> {
  const { data } = await client.get(`/api/v1/restaurants/requests/${requestId}`);
  return data;
}
