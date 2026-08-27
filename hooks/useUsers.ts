import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as usersService from "@/services/users";
import { queryKeys } from "./query-keys";

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.users.settings(),
    queryFn: usersService.getSettings,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersService.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.settings() });
    },
  });
}

export function usePublicProfile(username: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.users.publicProfile(username),
    queryFn: () => usersService.getPublicProfile(username),
    enabled: options?.enabled ?? Boolean(username),
  });
}

export function useFavorites() {
  return useQuery({
    queryKey: queryKeys.users.favorites(),
    queryFn: usersService.getFavorites,
  });
}

export function useAddFavoriteRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersService.addFavoriteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.favorites() });
    },
  });
}

export function useRemoveFavoriteRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersService.removeFavoriteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.favorites() });
    },
  });
}

export function useSaveEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersService.saveEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.favorites() });
    },
  });
}

export function useUnsaveEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersService.unsaveEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.favorites() });
    },
  });
}
