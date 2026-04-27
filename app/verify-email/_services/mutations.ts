"use client";

import { useMutationOP } from "@/lib/Fetch";

export const useVerifyEmail = () => {
  return useMutationOP("post", "/api/Auth/VerifyEmail");
};

export const useResendVerificationCode = () => {
  return useMutationOP("post", "/api/Auth/ResendVerificationCode");
};
