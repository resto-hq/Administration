import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

// No default Content-Type header: axios infers "application/json" for plain
// object bodies and leaves FormData bodies alone so the browser can set the
// correct multipart boundary itself.
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function setAuthTokens(accessToken: string, refreshToken: string) {
  Cookies.set(ACCESS_TOKEN_COOKIE, accessToken);
  Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken);
}

export function clearAuthTokens() {
  Cookies.remove(ACCESS_TOKEN_COOKIE);
  Cookies.remove(REFRESH_TOKEN_COOKIE);
}

/** Builds a FormData from a flat field map, skipping null/undefined values. */
export function toFormData(
  fields: Record<string, string | number | boolean | File | null | undefined>
): FormData {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue;
    form.append(key, value instanceof File ? value : String(value));
  }
  return form;
}

client.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN_COOKIE);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const { data } = await axios.post<{ access_token: string; refresh_token: string }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
    { refresh_token: refreshToken }
  );

  setAuthTokens(data.access_token, data.refresh_token);
  return data.access_token;
}

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retried?: boolean })
      | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retried) {
      return Promise.reject(error);
    }
    originalRequest._retried = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const accessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return client(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      return Promise.reject(refreshError);
    }
  }
);
