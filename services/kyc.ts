import { client, toFormData } from "./client";
import type { ApiFormBody, ApiResponse } from "./http-types";

// openapi-typescript renders `format: binary` fields as `string`; these are
// actually file uploads, so the file fields are retyped to `File`.
type PersonFileFields = "passport" | "id_card";
type BusinessFileFields =
  | "passport"
  | "id_card"
  | "proof_of_ownership"
  | "cfe_document"
  | "proof_of_employment"
  | "owner_photo";

export type SubmitPersonKycInput = Omit<
  ApiFormBody<"submit_kyc_person_api_v1_kyc_person_post">,
  PersonFileFields
> & {
  passport?: File | null;
  id_card?: File | null;
};

export type SubmitCreatorKycInput = Omit<
  ApiFormBody<"submit_kyc_creator_api_v1_kyc_creator_post">,
  PersonFileFields
> & {
  passport?: File | null;
  id_card?: File | null;
};

export type SubmitKybRestaurantInput = Omit<
  ApiFormBody<"submit_kyb_restaurant_api_v1_kyb_restaurant_post">,
  BusinessFileFields
> & {
  passport?: File | null;
  id_card?: File | null;
  proof_of_ownership?: File | null;
  cfe_document?: File | null;
  proof_of_employment?: File | null;
  owner_photo?: File | null;
};

/** GET /kyc/status has no response_model on the backend, so it's typed by hand. */
export type KycStageStatus = {
  status: "not_submitted" | "pending" | "approved" | "rejected";
  submitted_at: string | null;
  rejection_reason: string | null;
};

export type KycStatusResponse = {
  person_kyc: KycStageStatus;
  creator_kyc: KycStageStatus;
  business_kyb: KycStageStatus & { restaurant_id: string | null };
};

export type SubmitKybRestaurantResponse = {
  message: string;
  id: string;
  restaurant_id: string;
  restaurant_status: string;
};

/** Step 0: personal identity — required before creator KYC or business KYB. */
export async function submitPersonKyc(
  input: SubmitPersonKycInput
): Promise<ApiResponse<"submit_kyc_person_api_v1_kyc_person_post">> {
  const { data } = await client.post("/api/v1/kyc/person", toFormData(input));
  return data;
}

export async function submitCreatorKyc(
  input: SubmitCreatorKycInput
): Promise<ApiResponse<"submit_kyc_creator_api_v1_kyc_creator_post">> {
  const { data } = await client.post("/api/v1/kyc/creator", toFormData(input));
  return data;
}

/** Step 2: business verification for an existing draft fiche (`restaurant_id`). */
export async function submitKybRestaurant(
  input: SubmitKybRestaurantInput
): Promise<SubmitKybRestaurantResponse> {
  const { data } = await client.post("/api/v1/kyb/restaurant", toFormData(input));
  return data;
}

export async function getKycStatus(): Promise<KycStatusResponse> {
  const { data } = await client.get("/api/v1/kyc/status");
  return data;
}
