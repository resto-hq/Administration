import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as kycService from "@/services/kyc";
import { queryKeys } from "./query-keys";

export function useKycStatus() {
  return useQuery({
    queryKey: queryKeys.kyc.status(),
    queryFn: kycService.getKycStatus,
  });
}

export function useSubmitPersonKyc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kycService.submitPersonKyc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kyc.status() });
    },
  });
}

export function useSubmitCreatorKyc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kycService.submitCreatorKyc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kyc.status() });
    },
  });
}

export function useSubmitKybRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: kycService.submitKybRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.kyc.status() });
      queryClient.invalidateQueries({ queryKey: queryKeys.restaurants.mine() });
    },
  });
}
