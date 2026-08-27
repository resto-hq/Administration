import { useQuery } from "@tanstack/react-query";
import * as homeService from "@/services/home";
import { queryKeys } from "./query-keys";

export function useHome(query?: Parameters<typeof homeService.getHome>[0]) {
  return useQuery({
    queryKey: queryKeys.home.root(query),
    queryFn: () => homeService.getHome(query),
  });
}
