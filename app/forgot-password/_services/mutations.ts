"use client";

import { useMutationOP } from "@/lib/Fetch";

export const useForgotPassword = () => {
  return useMutationOP("post", "/api/Auth/ForgotPassword");
};

