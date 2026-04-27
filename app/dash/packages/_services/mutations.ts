"use client";

import { useMutationOP } from "@/lib/Fetch";

export const useReturnCheckout = () => {
  return useMutationOP("post", "/api/Payment/iyzico-callback");
};
