import { deleteToken } from "@/lib/helpers";

/* export const useSignOut = () => {
  return useMutationOP("post", "/api/Auth/LogoutSession", {
    onSuccess: LogOut
  })
} */

export function LogOut() {
  deleteToken()
  window.location.href = "/";
}
