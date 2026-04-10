"use client";

import { useMutationOP } from "@/lib/Fetch";

export const useRegister = () => {
  return useMutationOP("post", "/api/Auth/Register");
};
