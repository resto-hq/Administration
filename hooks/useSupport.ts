import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as supportService from "@/services/support";
import { queryKeys } from "./query-keys";

const CONVERSATIONS_POLL_INTERVAL_MS = 30 * 1000;

export function useConversations(query?: Parameters<typeof supportService.listConversations>[0]) {
  return useQuery({
    queryKey: queryKeys.support.conversations(query),
    queryFn: () => supportService.listConversations(query),
    refetchInterval: CONVERSATIONS_POLL_INTERVAL_MS,
  });
}

export function useConversation(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.support.conversation(userId),
    queryFn: () => supportService.getConversation(userId),
    enabled: options?.enabled ?? Boolean(userId),
    refetchInterval: CONVERSATIONS_POLL_INTERVAL_MS,
  });
}

export function useReplyToConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: string;
      body: Parameters<typeof supportService.replyToConversation>[1];
    }) => supportService.replyToConversation(userId, body),
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.support.conversation(userId) });
      queryClient.invalidateQueries({ queryKey: ["support", "conversations"] });
    },
  });
}

export function useChat() {
  return useQuery({
    queryKey: queryKeys.support.chat(),
    queryFn: supportService.getChat,
    refetchInterval: CONVERSATIONS_POLL_INTERVAL_MS,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: supportService.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.support.chat() });
    },
  });
}
