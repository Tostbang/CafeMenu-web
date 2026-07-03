"use client";

import { useRouter } from "next/navigation";
import { useMutationOP } from "@/lib/Fetch";
import { updateToken } from "@/lib/helpers";
import { Role } from "@/lib/types";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  return useMutationOP("post", "/api/Auth/Login", {
    onSuccess: (data) => {
      // Save token to cookie
      if (data.token) {
        updateToken(data.token);
        toast.success("Giriş başarılı!");
      }
      // Redirect to dashboard — router.push preserves TanStack Query cache
      // and avoids a full document reload that window.location.href causes.
      if (data.roleId === Role.Admin) {
        router.push("/admin");
      } else if (data.roleId === Role.CafeOwner || data.roleId === Role.User) {
        router.push("/dash");
      }
    },
  });
};


