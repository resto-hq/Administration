import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reviewsService from "@/services/reviews";
import { queryKeys } from "./query-keys";

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
