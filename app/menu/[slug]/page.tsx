"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import PublicMenuView from "../_components/PublicMenuView";
import { useQueryOP } from "@/lib/Fetch";

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function PublicMenuBySlugPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const publicMenuQuery = useQueryOP(
    "get",
    "/api/PublicMenu/{slug}",
    {
      params: { path: { slug } },
    },
    { enabled: Boolean(slug) },
  );

  const hasMenu = useMemo(
    () => Boolean(publicMenuQuery.data?.menu?.menuId),
    [publicMenuQuery.data?.menu?.menuId],
  );

  if (!slug) {
    return (
      <main className="min-h-dvh p-4">
        <div className="mx-auto max-w-xl rounded-2xl border p-4 text-sm">
          Geçersiz menü bağlantısı.
        </div>
      </main>
    );
  }

  if (publicMenuQuery.isPending) {
    return (
      <main className="min-h-dvh p-4">
        <div className="mx-auto max-w-xl rounded-2xl border p-4 text-sm">
          Menü yükleniyor...
        </div>
      </main>
    );
  }

  if (publicMenuQuery.isError || !hasMenu) {
    return (
      <main className="min-h-dvh p-4">
        <div className="mx-auto max-w-xl rounded-2xl border p-4 text-sm">
          {toErrorMessage(
            publicMenuQuery.error,
            "Menü bulunamadı veya şu anda erişilemiyor.",
          )}
        </div>
      </main>
    );
  }

  return <PublicMenuView menu={publicMenuQuery.data.menu} />;
}
