import { client } from "./client";
import type { ApiResponse } from "./http-types";

export async function getReferralLink(): Promise<
  ApiResponse<"get_referral_link_api_v1_referral_link_get">
> {
  const { data } = await client.get("/api/v1/referral/link");
  return data;
}

export async function getReferralStats(): Promise<
  ApiResponse<"get_referral_stats_api_v1_referral_stats_get">
> {
  const { data } = await client.get("/api/v1/referral/stats");
  return data;
}
