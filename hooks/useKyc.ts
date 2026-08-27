import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as kycService from "@/services/kyc";
import { queryKeys } from "./query-keys";

export function useKycStatus() {
  return useQuery({
    queryKey: queryKeys.kyc.status(),
    queryFn: kycService.getKycStatus,
  });
}

export function useSubmitKycCreator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kycService.submitKycCreator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kyc.status() });
    },
  });
}

export function useSubmitKycRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kycService.submitKycRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kyc.status() });
    },
  });
}
