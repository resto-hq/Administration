import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import * as eventsService from "@/services/events";
import { queryKeys } from "./query-keys";

function invalidateAllEvents(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: ["events"] });
}

export function useEventsList(
  query?: Parameters<typeof eventsService.listEvents>[0],
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: queryKeys.events.list(query),
    queryFn: () => eventsService.listEvents(query),
    enabled: options?.enabled ?? true,
  });
}

export function useUpcomingEvents(query?: Parameters<typeof eventsService.upcomingEvents>[0]) {
  return useQuery({
    queryKey: queryKeys.events.upcoming(query),
    queryFn: () => eventsService.upcomingEvents(query),
  });
}

export function useTodayEvents() {
  return useQuery({
    queryKey: queryKeys.events.today(),
    queryFn: eventsService.todayEvents,
  });
}

export function useEvent(eventId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.events.detail(eventId),
    queryFn: () => eventsService.getEvent(eventId),
    enabled: options?.enabled ?? Boolean(eventId),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eventsService.createEvent,
    onSuccess: () => invalidateAllEvents(queryClient),
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      body,
    }: {
      eventId: string;
      body: Parameters<typeof eventsService.updateEvent>[1];
    }) => eventsService.updateEvent(eventId, body),
    onSuccess: (_data, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(eventId) });
      invalidateAllEvents(queryClient);
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eventsService.deleteEvent,
    onSuccess: () => invalidateAllEvents(queryClient),
  });
}

export function useUploadEventPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, file }: { eventId: string; file: File }) =>
      eventsService.uploadEventPhoto(eventId, file),
    onSuccess: (_data, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(eventId) });
    },
  });
}

export function useDeleteEventPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, photoIndex }: { eventId: string; photoIndex: number }) =>
      eventsService.deleteEventPhoto(eventId, photoIndex),
    onSuccess: (_data, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(eventId) });
    },
  });
}

export function useUploadEventVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, file }: { eventId: string; file: File }) =>
      eventsService.uploadEventVideo(eventId, file),
    onSuccess: (_data, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(eventId) });
    },
  });
}

export function useDeleteEventVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eventsService.deleteEventVideo,
    onSuccess: (_data, eventId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.detail(eventId) });
    },
  });
}
