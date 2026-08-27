import { client, toFormData } from "./client";
import type { ApiFormBody, ApiResponse } from "./http-types";

// openapi-typescript renders `format: binary` fields as `string`; these are
// actually file uploads, so the file fields are retyped to `File`.
type FileFields = "passport" | "id_card" | "proof_of_ownership" | "cfe_document";

export type SubmitKycCreatorInput = Omit<
  ApiFormBody<"submit_kyc_creator_api_v1_kyc_creator_post">,
  "passport" | "id_card"
> & {
  passport?: File | null;
  id_card?: File | null;
};

export type SubmitKycRestaurantInput = Omit<
  ApiFormBody<"submit_kyc_restaurant_api_v1_kyc_restaurant_post">,
  FileFields
> & {
  passport?: File | null;
  id_card?: File | null;
  proof_of_ownership?: File | null;
  cfe_document?: File | null;
};

export async function submitKycCreator(
  input: SubmitKycCreatorInput
): Promise<ApiResponse<"submit_kyc_creator_api_v1_kyc_creator_post">> {
  const { data } = await client.post("/api/v1/kyc/creator", toFormData(input));
  return data;
}

export async function submitKycRestaurant(
  input: SubmitKycRestaurantInput
): Promise<ApiResponse<"submit_kyc_restaurant_api_v1_kyc_restaurant_post">> {
  const { data } = await client.post("/api/v1/kyc/restaurant", toFormData(input));
  return data;
}

export async function getKycStatus(): Promise<
  ApiResponse<"get_kyc_status_api_v1_kyc_status_get">
> {
  const { data } = await client.get("/api/v1/kyc/status");
  return data;
}
