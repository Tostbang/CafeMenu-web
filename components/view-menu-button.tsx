"use client";

import { useMemo } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryOP } from "@/lib/Fetch";
import { menuThemes, toMenuThemeFromApi } from "@/lib/menu-theme";
import { cn } from "@/lib/utils";

/**
 * Sidebar header CTA: opens the user's published public menu in a new tab.
 * The URL embeds the saved theme so the customer sees exactly the same
 * design the shop owner picked in /dash/design.
 *
 * Hidden while the menu is loading or when there is no slug yet.
 */
export function ViewMenuButton({
  collapsed,
}: {
  collapsed?: boolean;
}) {
  const getMyMenuQuery = useQueryOP("get", "/api/Menu/GetMyMenu");

  const menu = getMyMenuQuery.data?.menu;
  const slug = menu?.slug?.trim() ?? "";
  const getMyThemeQuery = useQueryOP(
    "get",
    "/api/MenuTheme/GetMyTheme/{slug}",
    { params: { path: { slug } } },
    { enabled: Boolean(slug) },
  );

  const savedTheme = toMenuThemeFromApi(getMyThemeQuery.data?.theme);
  const savedThemeId = menuThemes.some((theme) => theme.id === savedTheme?.id)
    ? savedTheme?.id
    : null;

  const publicMenuUrl = useMemo(() => {
    if (!slug) return "";
    const base = `/menu/${encodeURIComponent(slug)}`;
    return savedThemeId ? `${base}?theme=${encodeURIComponent(savedThemeId)}` : base;
  }, [slug, savedThemeId]);

  const isLoading = getMyMenuQuery.isPending || getMyThemeQuery.isFetching;
  const isReady = (Boolean(publicMenuUrl) && !isLoading) ;

  if (collapsed) {
    return (
      <Button
        asChild
        variant="outline"
        size="icon"
        disabled={!isReady}
        aria-label="Menümü görüntüle"
        title="Menümü görüntüle"
        className={cn(!isReady && "opacity-50")}
      >
        <a href={publicMenuUrl || "#"} target="_blank" rel="noreferrer">
          <Eye className="size-4" />
        </a>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      disabled={!isReady}
      className={cn(
        "w-full justify-between gap-2 border-2 border-charcoal/10 bg-white/80 text-charcoal",
        "hover:bg-charcoal hover:text-cream",
        !isReady && "opacity-60",
      )}
      title={isReady ? "Menümü yeni sekmede aç" : "Önce menü bilgilerinizi tamamlayın"}
    >
      <a href={publicMenuUrl || "#"} target="_blank" rel="noreferrer">
        <span className="flex items-center gap-2">
          <Eye className="size-4" />
          Menümü Görüntüle
        </span>
        <ExternalLink className="size-3.5 opacity-70" aria-hidden="true" />
      </a>
    </Button>
  );
}
