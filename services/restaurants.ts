import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";
import type { components } from "./api-types";

/** GET /restaurants/mine has no response_model on the backend, typed by hand. */
export type MyRestaurant = Pick<
  components["schemas"]["RestaurantCard"],
  | "id"
  | "name"
  | "logo"
  | "photos"
  | "cover_photo"
  | "restaurant_types"
  | "cuisine_types"
  | "price_range"
  | "address"
  | "coordinates"
  | "delivery_available"
  | "takeaway_available"
  | "is_verified"
  | "average_rating"
  | "review_count"
> & {
  status: components["schemas"]["RestaurantStatus"];
  rejection_reason: string | null;
  completion: components["schemas"]["RestaurantCompletion"];
};

/** Every fiche the caller owns, whatever its publication state (draft included). */
export async function listOwnRestaurants(): Promise<MyRestaurant[]> {
  const { data } = await client.get("/api/v1/restaurants/mine");
  return data;
}

export async function listRestaurants(
  query?: ApiQuery<"list_restaurants_api_v1_restaurants_get">
): Promise<ApiResponse<"list_restaurants_api_v1_restaurants_get">> {
  const { data } = await client.get("/api/v1/restaurants", { params: query });
  return data;
}

export async function createRestaurant(
  body: ApiJsonBody<"create_restaurant_api_v1_restaurants_post">
): Promise<ApiResponse<"create_restaurant_api_v1_restaurants_post">> {
  const { data } = await client.post("/api/v1/restaurants", body);
  return data;
}

export async function nearbyRestaurants(
  query: ApiQuery<"nearby_restaurants_api_v1_restaurants_nearby_get">
): Promise<ApiResponse<"nearby_restaurants_api_v1_restaurants_nearby_get">> {
  const { data } = await client.get("/api/v1/restaurants/nearby", { params: query });
  return data;
}

export async function trendingRestaurants(
  query?: ApiQuery<"trending_restaurants_api_v1_restaurants_trending_get">
): Promise<ApiResponse<"trending_restaurants_api_v1_restaurants_trending_get">> {
  const { data } = await client.get("/api/v1/restaurants/trending", { params: query });
  return data;
}

export async function mostSearchedRestaurants(
  query?: ApiQuery<"most_searched_api_v1_restaurants_most_searched_get">
): Promise<ApiResponse<"most_searched_api_v1_restaurants_most_searched_get">> {
  const { data } = await client.get("/api/v1/restaurants/most-searched", { params: query });
  return data;
}

export async function cheapestRestaurants(
  query?: ApiQuery<"cheapest_restaurants_api_v1_restaurants_cheapest_get">
): Promise<ApiResponse<"cheapest_restaurants_api_v1_restaurants_cheapest_get">> {
  const { data } = await client.get("/api/v1/restaurants/cheapest", { params: query });
  return data;
}

export async function getRestaurant(
  restaurantId: string
): Promise<ApiResponse<"get_restaurant_api_v1_restaurants__restaurant_id__get">> {
  const { data } = await client.get(`/api/v1/restaurants/${restaurantId}`);
  return data;
}

export async function updateRestaurant(
  restaurantId: string,
  body: ApiJsonBody<"update_restaurant_api_v1_restaurants__restaurant_id__put">
): Promise<ApiResponse<"update_restaurant_api_v1_restaurants__restaurant_id__put">> {
  const { data } = await client.put(`/api/v1/restaurants/${restaurantId}`, body);
  return data;
}

export async function deleteRestaurant(
  restaurantId: string
): Promise<ApiResponse<"delete_restaurant_api_v1_restaurants__restaurant_id__delete">> {
  const { data } = await client.delete(`/api/v1/restaurants/${restaurantId}`);
  return data;
}

export async function uploadLogo(
  restaurantId: string,
  file: File
): Promise<ApiResponse<"upload_logo_api_v1_restaurants__restaurant_id__logo_post">> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await client.post(`/api/v1/restaurants/${restaurantId}/logo`, form);
  return data;
}

export async function deleteLogo(
  restaurantId: string
): Promise<ApiResponse<"delete_logo_api_v1_restaurants__restaurant_id__logo_delete">> {
  const { data } = await client.delete(`/api/v1/restaurants/${restaurantId}/logo`);
  return data;
}

export async function uploadPhoto(
  restaurantId: string,
  file: File
): Promise<ApiResponse<"upload_photo_api_v1_restaurants__restaurant_id__photos_post">> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await client.post(`/api/v1/restaurants/${restaurantId}/photos`, form);
  return data;
}

export async function deletePhoto(
  restaurantId: string,
  photoIndex: number
): Promise<ApiResponse<"delete_photo_api_v1_restaurants__restaurant_id__photos__photo_index__delete">> {
  const { data } = await client.delete(
    `/api/v1/restaurants/${restaurantId}/photos/${photoIndex}`
  );
  return data;
}

export async function uploadMenuPhoto(
  restaurantId: string,
  file: File
): Promise<ApiResponse<"upload_menu_photo_api_v1_restaurants__restaurant_id__menu_photos_post">> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await client.post(`/api/v1/restaurants/${restaurantId}/menu-photos`, form);
  return data;
}

export async function deleteMenuPhoto(
  restaurantId: string,
  photoIndex: number
): Promise<ApiResponse<"delete_menu_photo_api_v1_restaurants__restaurant_id__menu_photos__photo_index__delete">> {
  const { data } = await client.delete(
    `/api/v1/restaurants/${restaurantId}/menu-photos/${photoIndex}`
  );
  return data;
}

export async function uploadMenuPdf(
  restaurantId: string,
  file: File
): Promise<ApiResponse<"upload_menu_pdf_api_v1_restaurants__restaurant_id__menu_pdf_post">> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await client.post(`/api/v1/restaurants/${restaurantId}/menu-pdf`, form);
  return data;
}
