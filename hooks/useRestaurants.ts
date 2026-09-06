import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import * as restaurantsService from "@/services/restaurants";
import { queryKeys } from "./query-keys";

/** Any restaurant mutation can change what shows up in every list/card query. */
function invalidateAllRestaurants(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: ["restaurants"] });
}

export function useMyRestaurants() {
  return useQuery({
    queryKey: queryKeys.restaurants.mine(),
    queryFn: restaurantsService.listOwnRestaurants,
  });
}

export function useRestaurantsList(
  query?: Parameters<typeof restaurantsService.listRestaurants>[0]
) {
  return useQuery({
    queryKey: queryKeys.restaurants.list(query),
    queryFn: () => restaurantsService.listRestaurants(query),
  });
}

export function useNearbyRestaurants(
  query: Parameters<typeof restaurantsService.nearbyRestaurants>[0]
) {
  return useQuery({
    queryKey: queryKeys.restaurants.nearby(query),
    queryFn: () => restaurantsService.nearbyRestaurants(query),
    enabled: query.lat !== undefined && query.lng !== undefined,
  });
}

export function useTrendingRestaurants(
  query?: Parameters<typeof restaurantsService.trendingRestaurants>[0]
) {
  return useQuery({
    queryKey: queryKeys.restaurants.trending(query),
    queryFn: () => restaurantsService.trendingRestaurants(query),
  });
}

export function useMostSearchedRestaurants(
  query?: Parameters<typeof restaurantsService.mostSearchedRestaurants>[0]
) {
  return useQuery({
    queryKey: queryKeys.restaurants.mostSearched(query),
    queryFn: () => restaurantsService.mostSearchedRestaurants(query),
  });
}

export function useCheapestRestaurants(
  query?: Parameters<typeof restaurantsService.cheapestRestaurants>[0]
) {
  return useQuery({
    queryKey: queryKeys.restaurants.cheapest(query),
    queryFn: () => restaurantsService.cheapestRestaurants(query),
  });
}

export function useRestaurant(restaurantId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.restaurants.detail(restaurantId),
    queryFn: () => restaurantsService.getRestaurant(restaurantId),
    enabled: options?.enabled ?? Boolean(restaurantId),
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restaurantsService.createRestaurant,
    onSuccess: () => invalidateAllRestaurants(queryClient),
  });
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      restaurantId,
      body,
    }: {
      restaurantId: string;
      body: Parameters<typeof restaurantsService.updateRestaurant>[1];
    }) => restaurantsService.updateRestaurant(restaurantId, body),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
      invalidateAllRestaurants(queryClient);
    },
  });
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restaurantsService.deleteRestaurant,
    onSuccess: () => invalidateAllRestaurants(queryClient),
  });
}

export function useUploadLogo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, file }: { restaurantId: string; file: File }) =>
      restaurantsService.uploadLogo(restaurantId, file),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
      invalidateAllRestaurants(queryClient);
    },
  });
}

export function useDeleteLogo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restaurantsService.deleteLogo,
    onSuccess: (_data, restaurantId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
      invalidateAllRestaurants(queryClient);
    },
  });
}

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, file }: { restaurantId: string; file: File }) =>
      restaurantsService.uploadPhoto(restaurantId, file),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, photoIndex }: { restaurantId: string; photoIndex: number }) =>
      restaurantsService.deletePhoto(restaurantId, photoIndex),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
    },
  });
}

export function useUploadMenuPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, file }: { restaurantId: string; file: File }) =>
      restaurantsService.uploadMenuPhoto(restaurantId, file),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
    },
  });
}

export function useDeleteMenuPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, photoIndex }: { restaurantId: string; photoIndex: number }) =>
      restaurantsService.deleteMenuPhoto(restaurantId, photoIndex),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
    },
  });
}

export function useUploadMenuPdf() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ restaurantId, file }: { restaurantId: string; file: File }) =>
      restaurantsService.uploadMenuPdf(restaurantId, file),
    onSuccess: (_data, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.detail(restaurantId) });
    },
  });
}
