import { client } from "./client";
import type { ApiJsonBody, ApiQuery, ApiResponse } from "./http-types";

export async function listEvents(
  query?: ApiQuery<"list_events_api_v1_events_get">
): Promise<ApiResponse<"list_events_api_v1_events_get">> {
  const { data } = await client.get("/api/v1/events", { params: query });
  return data;
}

export async function createEvent(
  body: ApiJsonBody<"create_event_api_v1_events_post">
): Promise<ApiResponse<"create_event_api_v1_events_post">> {
  const { data } = await client.post("/api/v1/events", body);
  return data;
}

export async function upcomingEvents(
  query?: ApiQuery<"upcoming_events_api_v1_events_upcoming_get">
): Promise<ApiResponse<"upcoming_events_api_v1_events_upcoming_get">> {
  const { data } = await client.get("/api/v1/events/upcoming", { params: query });
  return data;
}

export async function todayEvents(): Promise<
  ApiResponse<"today_events_api_v1_events_today_get">
> {
  const { data } = await client.get("/api/v1/events/today");
  return data;
}

export async function getEvent(
  eventId: string
): Promise<ApiResponse<"get_event_api_v1_events__event_id__get">> {
  const { data } = await client.get(`/api/v1/events/${eventId}`);
  return data;
}

export async function updateEvent(
  eventId: string,
  body: ApiJsonBody<"update_event_api_v1_events__event_id__put">
): Promise<ApiResponse<"update_event_api_v1_events__event_id__put">> {
  const { data } = await client.put(`/api/v1/events/${eventId}`, body);
  return data;
}

export async function deleteEvent(
  eventId: string
): Promise<ApiResponse<"delete_event_api_v1_events__event_id__delete">> {
  const { data } = await client.delete(`/api/v1/events/${eventId}`);
  return data;
}

export async function uploadEventPhoto(
  eventId: string,
  file: File
): Promise<ApiResponse<"upload_event_photo_api_v1_events__event_id__photos_post">> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await client.post(`/api/v1/events/${eventId}/photos`, form);
  return data;
}

export async function deleteEventPhoto(
  eventId: string,
  photoIndex: number
): Promise<ApiResponse<"delete_event_photo_api_v1_events__event_id__photos__photo_index__delete">> {
  const { data } = await client.delete(`/api/v1/events/${eventId}/photos/${photoIndex}`);
  return data;
}

export async function uploadEventVideo(
  eventId: string,
  file: File
): Promise<ApiResponse<"upload_event_video_api_v1_events__event_id__video_post">> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await client.post(`/api/v1/events/${eventId}/video`, form);
  return data;
}

export async function deleteEventVideo(
  eventId: string
): Promise<ApiResponse<"delete_event_video_api_v1_events__event_id__video_delete">> {
  const { data } = await client.delete(`/api/v1/events/${eventId}/video`);
  return data;
}
