"use client";

import { useMutationOP } from "@/lib/Fetch";
import { updateToken } from "@/lib/helpers";
import { Role } from "@/lib/types";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutationOP("post", "/api/Auth/Login", {
    onSuccess: (data) => {
      // Save token to cookie
      if (data.token) {
        updateToken(data.token);
        toast.success("Giriş başarılı!");
      }
      // Redirect to dashboard
      if (data.roleId === Role.Admin) {
        window.location.href = "/admin";
      } else if (data.roleId === Role.CafeOwner || data.roleId === Role.User) {
        window.location.href = "/dash";
      }
    },
  });
};


