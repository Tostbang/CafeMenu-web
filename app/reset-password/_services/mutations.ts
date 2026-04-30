"use client";

import { useMutationOP } from "@/lib/Fetch";

export const useResetPassword = () => {
  return useMutationOP("post", "/api/Auth/ResetPassword");
};

