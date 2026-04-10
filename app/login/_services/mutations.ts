"use client";

import { useMutationOP } from "@/lib/Fetch";

export const useLogin = () => {
  return useMutationOP("post", "/api/Auth/Login");
};
