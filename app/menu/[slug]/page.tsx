"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import PublicMenuView, { PublicMenuViewSkeleton } from "../_components/PublicMenuView";
import { useQueryOP } from "@/lib/Fetch";
import { getToken } from "@/lib/helpers";
import {
  defaultMenuTheme,
  menuThemes,
  neutralSkeletonTheme,
  toMenuThemeFromApi,
} from "@/lib/menu-theme";

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function normalizeColor(color: string | null | undefined) {
  return color?.trim().toLowerCase() ?? "";
}

export default function PublicMenuBySlugPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const themeId = searchParams.get("theme");
  const hasToken = Boolean(getToken());

  const publicMenuQuery = useQueryOP(
    "get",
    "/api/PublicMenu/{slug}",
    {
      params: { path: { slug } },
    },
    { enabled: Boolean(slug) },
  );
  const myThemeQuery = useQueryOP("get", "/api/MenuTheme/GetMyTheme", undefined, {
    enabled: hasToken,
  });

  const hasMenu = useMemo(
    () => Boolean(publicMenuQuery.data?.menu?.menuId),
    [publicMenuQuery.data?.menu?.menuId],
  );
  const publicMenuTheme = useMemo(() => {
    const menu = publicMenuQuery.data?.menu;
    if (!menu) {
      return null;
    }

    const primary = normalizeColor(menu.primaryColor);
    const secondary = normalizeColor(menu.secondaryColor);
    const tertiary = normalizeColor(menu.accentColor);
    if (!primary && !secondary && !tertiary) {
      return null;
    }

    const matchedTheme = menuThemes.find((theme) => {
      const isPrimaryMatch = !primary || normalizeColor(theme.primary) === primary;
      const isSecondaryMatch =
        !secondary || normalizeColor(theme.secondary) === secondary;
      const isTertiaryMatch =
        !tertiary || normalizeColor(theme.tertiary) === tertiary;
      return isPrimaryMatch && isSecondaryMatch && isTertiaryMatch;
    });
    if (matchedTheme) {
      return matchedTheme;
    }

    return {
      ...defaultMenuTheme,
      id: "public-menu-theme",
      name: "Menü Renkleri",
      description: "Kayıtlı menü renklerinden oluşturuldu.",
      primary: menu.primaryColor ?? defaultMenuTheme.primary,
      secondary: menu.secondaryColor ?? defaultMenuTheme.secondary,
      tertiary: menu.accentColor ?? defaultMenuTheme.tertiary,
    };
  }, [publicMenuQuery.data?.menu]);

  const selectedTheme = useMemo(() => {
    const previewTheme = menuThemes.find((theme) => theme.id === themeId);
    if (previewTheme) {
      return previewTheme;
    }
    return (
      toMenuThemeFromApi(myThemeQuery.data?.theme) ??
      publicMenuTheme ??
      defaultMenuTheme
    );
  }, [myThemeQuery.data?.theme, publicMenuTheme, themeId]);

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

  return <PublicMenuView menu={publicMenuQuery.data.menu} theme={selectedTheme} />;
}
