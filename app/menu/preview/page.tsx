"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PublicMenuView from "../_components/PublicMenuView";
import { data } from "../_services/data";
import { useQueryOP } from "@/lib/Fetch";
import { defaultMenuTheme, menuThemes } from "@/lib/menu-theme";
import { components } from "@/lib/types/api";

type PublicMenu =
  components["schemas"]["CafeMenu.Entity.DTO.PublicMenuDetailModel"];

export default function MenuPreviewPage() {
  const searchParams = useSearchParams();
  const themeId = searchParams.get("theme") ?? defaultMenuTheme.id;
  const selectedTheme =
    menuThemes.find((theme) => theme.id === themeId) ?? defaultMenuTheme;

  const getMyMenuQuery = useQueryOP("get", "/api/Menu/GetMyMenu");
  const menuSlug = getMyMenuQuery.data?.menu?.slug ?? "";
  const publicMenuQuery = useQueryOP(
    "get",
    "/api/PublicMenu/{slug}",
    {
      params: { path: { slug: menuSlug } },
    },
    { enabled: Boolean(menuSlug) },
  );

  const previewMenu = useMemo<PublicMenu>(() => {
    const publicMenu = publicMenuQuery.data?.menu;
    if (publicMenu?.menuId) {
      return publicMenu;
    }

    const myMenu = getMyMenuQuery.data?.menu;
    if (!myMenu?.menuId) {
      return data.menu as PublicMenu;
    }

    return {
      ...(data.menu as PublicMenu),
      ...myMenu,
      title: myMenu.title ?? data.menu.title,
      description: myMenu.description ?? data.menu.description,
      logoUrl: myMenu.logoUrl ?? data.menu.logoUrl,
      backgroundImageUrl: myMenu.backgroundImageUrl ?? data.menu.backgroundImageUrl,
      slug: myMenu.slug ?? data.menu.slug,
    };
  }, [publicMenuQuery.data?.menu, getMyMenuQuery.data?.menu]);

  return (
    <div className="h-dvh overflow-y-auto bg-black">
      <PublicMenuView menu={data.menu} theme={selectedTheme} />
    </div>
  );
}
