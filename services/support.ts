import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";

export async function listConversations(
  query?: ApiQuery<"list_conversations_api_v1_support_conversations_get">
): Promise<ApiResponse<"list_conversations_api_v1_support_conversations_get">> {
  const { data } = await client.get("/api/v1/support/conversations", { params: query });
  return data;
}

export async function getConversation(
  userId: string
): Promise<ApiResponse<"get_conversation_api_v1_support_conversations__user_id__get">> {
  const { data } = await client.get(`/api/v1/support/conversations/${userId}`);
  return data;
}

export async function replyToConversation(
  userId: string,
  body: ApiJsonBody<"reply_to_conversation_api_v1_support_conversations__user_id__reply_post">
): Promise<ApiResponse<"reply_to_conversation_api_v1_support_conversations__user_id__reply_post">> {
  const { data } = await client.post(`/api/v1/support/conversations/${userId}/reply`, body);
  return data;
}

export async function getChat(): Promise<ApiResponse<"get_chat_api_v1_support_chat_get">> {
  const { data } = await client.get("/api/v1/support/chat");
  return data;
}

export async function sendMessage(
  body: ApiJsonBody<"send_message_api_v1_support_chat_post">
): Promise<ApiResponse<"send_message_api_v1_support_chat_post">> {
  const { data } = await client.post("/api/v1/support/chat", body);
  return data;
}
