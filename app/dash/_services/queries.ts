
import { useQueryOP } from "@/lib/Fetch"

export default function useGetProfile() {
  return useQueryOP("get", "/api/Auth/GetMyProfile")
}
