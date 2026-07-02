"use client";

import { useSearchParams } from "next/navigation";
import PublicMenuView from "../_components/PublicMenuView";
import { data } from "../_services/data";
import { defaultMenuTheme, menuThemes } from "@/lib/menu-theme";

export default function MenuPreviewPage() {
  const searchParams = useSearchParams();
  const themeId = searchParams.get("theme") ?? defaultMenuTheme.id;
  const selectedTheme =
    menuThemes.find((theme) => theme.id === themeId) ?? defaultMenuTheme;

  return (
    <div className="h-dvh overflow-y-auto bg-black">
      <PublicMenuView menu={data.menu} theme={selectedTheme} />
    </div>
  );
}
