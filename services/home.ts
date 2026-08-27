import { client } from "./client";
import type { ApiQuery, ApiResponse } from "./http-types";

export async function getHome(
  query?: ApiQuery<"home_api_v1_home_get">
): Promise<ApiResponse<"home_api_v1_home_get">> {
  const { data } = await client.get("/api/v1/home", { params: query });
  return data;
}
