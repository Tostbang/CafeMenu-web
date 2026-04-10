import { useQueryOP } from "@/lib/Fetch";

export function useGetMenuBySlug(slug: string) {
  return useQueryOP("get", "/api/PublicMenu/{slug}", {
    params: {
      path: { slug },
    },
  });
}
