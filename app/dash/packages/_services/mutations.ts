"use client";

import { useQuery } from "@tanstack/react-query";
import { baseUrl, customFetch } from "@/lib/Fetch";

type CallbackResponse = {
  code: string | null;
  message: string | null;
  errors: string[] | null;
};

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await customFetch(`${baseUrl}${path}`, init);
  return (await response.json()) as T;
}

export function useReturnCheckout(token: string | undefined) {
  return useQuery({
    queryKey: ["payment-callback", token],
    queryFn: () =>
      apiRequest<CallbackResponse>("/api/Payment/iyzico-callback", {
        method: "POST",
        body: JSON.stringify({ token: token ?? null }),
      }),
    enabled: !!token,
  });
}
