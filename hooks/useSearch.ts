import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as searchService from "@/services/search";
import { queryKeys } from "./query-keys";

// The backend exposes /search as POST, but it's a read operation from the
// UI's point of view — callers control `enabled` (e.g. only once the user
// has typed something) to avoid firing an empty search on mount.
export function useSearch(
  query?: Parameters<typeof searchService.search>[0],
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: queryKeys.search.results(query),
    queryFn: () => searchService.search(query),
    enabled: options?.enabled ?? false,
  });
}

export function useSearchHistory() {
  return useQuery({
    queryKey: queryKeys.search.history(),
    queryFn: searchService.getSearchHistory,
  });
}

export function useClearSearchHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: searchService.clearSearchHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.search.history() });
    },
  });
}

export function useSearchSuggestions(
  query?: Parameters<typeof searchService.getSuggestions>[0],
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: queryKeys.search.suggestions(query),
    queryFn: () => searchService.getSuggestions(query),
    enabled: options?.enabled ?? true,
  });
}
