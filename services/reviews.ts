import { client } from "./client";
import type { ApiJsonBody, ApiResponse } from "./http-types";

export async function getRestaurantReviews(
  restaurantId: string
): Promise<ApiResponse<"get_restaurant_reviews_api_v1_reviews_restaurant__restaurant_id__get">> {
  const { data } = await client.get(`/api/v1/reviews/restaurant/${restaurantId}`);
  return data;
}

export async function createReview(
  restaurantId: string,
  body: ApiJsonBody<"create_review_api_v1_reviews_restaurant__restaurant_id__post">
): Promise<ApiResponse<"create_review_api_v1_reviews_restaurant__restaurant_id__post">> {
  const { data } = await client.post(`/api/v1/reviews/restaurant/${restaurantId}`, body);
  return data;
}

export async function updateReview(
  reviewId: string,
  body: ApiJsonBody<"update_review_api_v1_reviews__review_id__put">
): Promise<ApiResponse<"update_review_api_v1_reviews__review_id__put">> {
  const { data } = await client.put(`/api/v1/reviews/${reviewId}`, body);
  return data;
}

export async function deleteReview(
  reviewId: string
): Promise<ApiResponse<"delete_review_api_v1_reviews__review_id__delete">> {
  const { data } = await client.delete(`/api/v1/reviews/${reviewId}`);
  return data;
}

export async function respondToReview(
  reviewId: string,
  body: ApiJsonBody<"respond_to_review_api_v1_reviews__review_id__respond_post">
): Promise<ApiResponse<"respond_to_review_api_v1_reviews__review_id__respond_post">> {
  const { data } = await client.post(`/api/v1/reviews/${reviewId}/respond`, body);
  return data;
}
