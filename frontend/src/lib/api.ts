const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method?: Method;
  body?: unknown;
  token?: string;
}

export async function api<T>(path: string, { method = "GET", body, token }: ApiOptions = {}): Promise<T> {
  const baseUrl = typeof window === "undefined" ? `${BACKEND_URL}/api/v1` : "/api/v1";
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new ApiError(json?.error ?? `Request failed (${res.status})`, res.status);
  }
  return json.data as T;
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong";
}
