import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reviewsService from "@/services/reviews";
import { useMyRestaurants } from "./useRestaurants";
import { queryKeys } from "./query-keys";

/**
 * All reviews across every published restaurant the caller owns. There is no
 * "my reviews" endpoint — reviews are only fetchable per restaurant — so this
 * fans out one query per published restaurant and flattens the results.
 */
export function useMyReviews() {
  const { data: restaurants, isPending: restaurantsPending } = useMyRestaurants();
  const published = (restaurants ?? []).filter((restaurant) => restaurant.status === "published");

  const reviewQueries = useQueries({
    queries: published.map((restaurant) => ({
      queryKey: queryKeys.reviews.byRestaurant(restaurant.id),
      queryFn: () => reviewsService.getRestaurantReviews(restaurant.id),
    })),
  });

  const isPending = restaurantsPending || reviewQueries.some((query) => query.isPending);
  const isError = reviewQueries.some((query) => query.isError);
  const reviews = published.flatMap((restaurant, index) =>
    (reviewQueries[index]?.data ?? []).map((review) => ({
      ...review,
      restaurant_name: restaurant.name,
    }))
  );

  return { data: reviews, isPending, isError };
}

export function useRestaurantReviews(restaurantId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.reviews.byRestaurant(restaurantId),
    queryFn: () => reviewsService.getRestaurantReviews(restaurantId),
    enabled: options?.enabled ?? Boolean(restaurantId),
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      restaurantId,
      body,
    }: {
      restaurantId: string;
      body: Parameters<typeof reviewsService.createReview>[1];
    }) => reviewsService.createReview(restaurantId, body),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byRestaurant(restaurantId) });
    },
  });
}

// update/delete/respond only carry a reviewId, not the restaurant it belongs
// to, so cache invalidation falls back to the whole "reviews" prefix.
export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reviewId,
      body,
    }: {
      reviewId: string;
      body: Parameters<typeof reviewsService.updateReview>[1];
    }) => reviewsService.updateReview(reviewId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewsService.deleteReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}

export function useRespondToReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reviewId,
      body,
    }: {
      reviewId: string;
      body: Parameters<typeof reviewsService.respondToReview>[1];
    }) => reviewsService.respondToReview(reviewId, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
