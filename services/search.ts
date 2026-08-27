import { client } from "./client";
import type { ApiQuery, ApiResponse } from "./http-types";

export async function search(
  query?: ApiQuery<"search_api_v1_search_post">
): Promise<ApiResponse<"search_api_v1_search_post">> {
  const { data } = await client.post("/api/v1/search", undefined, { params: query });
  return data;
}

export async function getSearchHistory(): Promise<
  ApiResponse<"search_history_api_v1_search_history_get">
> {
  const { data } = await client.get("/api/v1/search/history");
  return data;
}

export async function clearSearchHistory(): Promise<
  ApiResponse<"clear_search_history_api_v1_search_history_delete">
> {
  const { data } = await client.delete("/api/v1/search/history");
  return data;
}

export async function getSuggestions(
  query?: ApiQuery<"suggestions_api_v1_search_suggestions_get">
): Promise<ApiResponse<"suggestions_api_v1_search_suggestions_get">> {
  const { data } = await client.get("/api/v1/search/suggestions", { params: query });
  return data;
}
