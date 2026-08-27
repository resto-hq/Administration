import { client } from "./client";
import type { ApiJsonBody, ApiResponse } from "./http-types";

export async function getSettings(): Promise<
  ApiResponse<"get_settings_api_v1_users_me_settings_get">
> {
  const { data } = await client.get("/api/v1/users/me/settings");
  return data;
}

export async function updateSettings(
  body: ApiJsonBody<"update_settings_api_v1_users_me_settings_put">
): Promise<ApiResponse<"update_settings_api_v1_users_me_settings_put">> {
  const { data } = await client.put("/api/v1/users/me/settings", body);
  return data;
}

export async function getPublicProfile(
  username: string
): Promise<ApiResponse<"get_public_profile_api_v1_users__username__get">> {
  const { data } = await client.get(`/api/v1/users/${username}`);
  return data;
}

export async function getFavorites(): Promise<
  ApiResponse<"get_favorites_api_v1_users_me_favorites_get">
> {
  const { data } = await client.get("/api/v1/users/me/favorites");
  return data;
}

export async function addFavoriteRestaurant(
  restaurantId: string
): Promise<ApiResponse<"add_favorite_restaurant_api_v1_users_me_favorites_restaurants__restaurant_id__post">> {
  const { data } = await client.post(`/api/v1/users/me/favorites/restaurants/${restaurantId}`);
  return data;
}

export async function removeFavoriteRestaurant(
  restaurantId: string
): Promise<ApiResponse<"remove_favorite_restaurant_api_v1_users_me_favorites_restaurants__restaurant_id__delete">> {
  const { data } = await client.delete(`/api/v1/users/me/favorites/restaurants/${restaurantId}`);
  return data;
}

export async function saveEvent(
  eventId: string
): Promise<ApiResponse<"save_event_api_v1_users_me_favorites_events__event_id__post">> {
  const { data } = await client.post(`/api/v1/users/me/favorites/events/${eventId}`);
  return data;
}

export async function unsaveEvent(
  eventId: string
): Promise<ApiResponse<"unsave_event_api_v1_users_me_favorites_events__event_id__delete">> {
  const { data } = await client.delete(`/api/v1/users/me/favorites/events/${eventId}`);
  return data;
}
