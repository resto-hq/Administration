import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as restaurantRequestsService from "@/services/restaurantRequests";
import { queryKeys } from "./query-keys";

export function useMyRequests() {
  return useQuery({
    queryKey: queryKeys.restaurantRequests.mine(),
    queryFn: restaurantRequestsService.myRequests,
  });
}

export function useRequest(requestId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.restaurantRequests.detail(requestId),
    queryFn: () => restaurantRequestsService.getRequest(requestId),
    enabled: options?.enabled ?? Boolean(requestId),
  });
}

export function useRequestReferencing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restaurantRequestsService.requestReferencing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurantRequests.mine() });
    },
  });
}
