"use client";
import { Suspense, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import PublicMenuView, {
  PublicMenuViewSkeleton,
} from "../_components/PublicMenuView";
import { useQueryOP } from "@/lib/Fetch";
import { getToken } from "@/lib/helpers";
import {
  defaultMenuTheme,
  menuThemes,
  neutralSkeletonTheme,
  toMenuThemeFromApi,
  toMenuThemeFromPublicMenu,
} from "@/lib/menu-theme";

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function PublicMenuBySlugPage() {
  // useSearchParams requires a Suspense boundary in Next 16 (it opts the
  // entire component tree up to the boundary into client-side rendering).
  return (
    <Suspense
      fallback={<PublicMenuViewSkeleton theme={neutralSkeletonTheme} />}
    >
      <PublicMenuBySlugPageInner />
    </Suspense>
  );
}

function PublicMenuBySlugPageInner() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const themeId = searchParams.get("theme");
  // Only fetch the dashboard user's theme when authenticated; otherwise the
  // call 401s and we fall back to the menu's stored colors or the default.
  const isAuthenticated = Boolean(getToken());

  const publicMenuQuery = useQueryOP(
    "get",
    "/api/PublicMenu/{slug}",
    {
      params: { path: { slug } },
    },
    { enabled: Boolean(slug) },
  );
  const myThemeQuery = useQueryOP(
    "get",
    "/api/MenuTheme/GetMyTheme/{slug}",
    { params: { path: { slug } } },
    { enabled: isAuthenticated && Boolean(slug) },
  );

  const hasMenu = useMemo(
    () => Boolean(publicMenuQuery.data?.menu?.menuId),
    [publicMenuQuery.data?.menu?.menuId],
  );

  const selectedTheme = useMemo(() => {
    // 1. URL query param wins (used by QR codes and design preview).
    const previewTheme = menuThemes.find((theme) => theme.id === themeId);
    if (previewTheme) {
      return previewTheme;
    }
    const menu = publicMenuQuery.data?.menu;
    // 2. Theme derived from the menu's stored colors (saved theme is mirrored
    //    onto the menu entity by SaveMenuTheme).
    const fromMenu = toMenuThemeFromPublicMenu(menu);
    if (fromMenu) {
      return fromMenu;
    }
    // 3. Authenticated dashboard user's saved theme.
    const fromApi = toMenuThemeFromApi(myThemeQuery.data?.theme);
    if (fromApi) {
      return fromApi;
    }
    // 4. Default fallback.
    return defaultMenuTheme;
  }, [
    themeId,
    publicMenuQuery.data?.menu,
    myThemeQuery.data?.theme,
  ]);

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
    return <PublicMenuViewSkeleton theme={neutralSkeletonTheme} />;
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

  return (
    <PublicMenuView menu={publicMenuQuery.data.menu} theme={selectedTheme} />
  );
}
