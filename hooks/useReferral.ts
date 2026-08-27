import { useQuery } from "@tanstack/react-query";
import * as referralService from "@/services/referral";
import { queryKeys } from "./query-keys";

export function useReferralLink() {
  return useQuery({
    queryKey: queryKeys.referral.link(),
    queryFn: referralService.getReferralLink,
  });
}

export function useReferralStats() {
  return useQuery({
    queryKey: queryKeys.referral.stats(),
    queryFn: referralService.getReferralStats,
  });
}
