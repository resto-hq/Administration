import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authService from "@/services/auth";
import { setAuthTokens, clearAuthTokens } from "@/services/client";
import { queryKeys } from "./query-keys";

/** Current authenticated user. Disable while there's no session to avoid a useless 401. */
export function useMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: authService.getMe,
    enabled: options?.enabled ?? true,
    // A 401 here means "no/expired session" — retrying won't change that,
    // it would only delay the redirect to /connexion.
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuthTokens(data.access_token, data.refresh_token);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuthTokens(data.access_token, data.refresh_token);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useGoogleLoginIdToken() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.googleLoginIdToken,
    onSuccess: (data) => {
      setAuthTokens(data.access_token, data.refresh_token);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      clearAuthTokens();
      queryClient.clear();
    },
  });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useDeleteAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.deleteAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useForgotPassword() {
  return useMutation({ mutationFn: authService.forgotPassword });
}

export function useResetPassword() {
  return useMutation({ mutationFn: authService.resetPassword });
}

export function useVerifyEmail() {
  return useMutation({ mutationFn: authService.verifyEmail });
}

export function useResendVerification() {
  return useMutation({ mutationFn: authService.resendVerification });
}
