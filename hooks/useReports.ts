import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reportsService from "@/services/reports";
import { queryKeys } from "./query-keys";

const QUEUE_POLL_INTERVAL_MS = 30 * 1000;

export function useReports(query?: Parameters<typeof reportsService.listReports>[0]) {
  return useQuery({
    queryKey: queryKeys.reports.list(query),
    queryFn: () => reportsService.listReports(query),
    refetchInterval: QUEUE_POLL_INTERVAL_MS,
  });
}

export function useReport(reportId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.reports.detail(reportId),
    queryFn: () => reportsService.getReport(reportId),
    enabled: options?.enabled ?? Boolean(reportId),
  });
}

function useReportDecision(
  mutationFn: (reportId: string, body: Parameters<typeof reportsService.resolveReport>[1]) => ReturnType<typeof reportsService.resolveReport>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reportId,
      body,
    }: {
      reportId: string;
      body: Parameters<typeof reportsService.resolveReport>[1];
    }) => mutationFn(reportId, body),
    onSuccess: (_data, { reportId }) => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.detail(reportId) });
    },
  });
}

export function useResolveReport() {
  return useReportDecision(reportsService.resolveReport);
}

export function useDismissReport() {
  return useReportDecision(reportsService.dismissReport);
}

export function useModerateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      reportId,
      body,
    }: {
      reportId: string;
      body: Parameters<typeof reportsService.moderateReport>[1];
    }) => reportsService.moderateReport(reportId, body),
    onSuccess: (_data, { reportId }) => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.detail(reportId) });
    },
  });
}
