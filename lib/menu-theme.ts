import type { CSSProperties } from "react";
import type { components } from "@/lib/types/api";

export type MenuTheme = {
  id: string;
  name: string;
  description: string;
  backgroundStart: string;
  backgroundMiddle: string;
  backgroundEnd: string;
  surface: string;
  card: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
  mutedText: string;
  border: string;
  onPrimary: string;
  onSecondary: string;
  onTertiary: string;
};

type MenuThemeDetailModel =
  components["schemas"]["CafeMenu.Entity.DTO.MenuThemeDetailModel"];
type PublicMenuDetailModel =
  components["schemas"]["CafeMenu.Entity.DTO.PublicMenuDetailModel"];
type SaveMenuThemeRequest =
  components["schemas"]["CafeMenu.Entity.DTO.SaveMenuThemeRequest"];

export const menuThemes: MenuTheme[] = [
  {
    id: "current",
    name: "Mevcut Tema",
    description: "Şu an menünüzde kullanılan renk düzeni.",
    backgroundStart: "#eafc91",
    backgroundMiddle: "#ceebc8",
    backgroundEnd: "#bbdde1",
    surface: "#f7fcdf",
    card: "#f7fcdf",
    primary: "#ea8fc0",
    secondary: "#d4e95a",
    tertiary: "#ffae82",
    text: "#313131",
    mutedText: "#5f5f5f",
    border: "#d6dea8",
    onPrimary: "#1f1f1f",
    onSecondary: "#1f1f1f",
    onTertiary: "#1f1f1f",
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Sıcak ve enerjik bir kafe atmosferi.",
    backgroundStart: "#ffe4cf",
    backgroundMiddle: "#ffd6e5",
    backgroundEnd: "#f3c8ff",
    surface: "#fff7f0",
    card: "#fff0e7",
    primary: "#ff6b8a",
    secondary: "#f7b641",
    tertiary: "#8a6eff",
    text: "#3f2a2a",
    mutedText: "#6c5858",
    border: "#f2dac9",
    onPrimary: "#ffffff",
    onSecondary: "#2f2105",
    onTertiary: "#ffffff",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Ferah, modern ve temiz bir görünüm.",
    backgroundStart: "#dff5ff",
    backgroundMiddle: "#cdeeff",
    backgroundEnd: "#d5e6ff",
    surface: "#f4fbff",
    card: "#ebf7ff",
    primary: "#1f8ef1",
    secondary: "#25c2a0",
    tertiary: "#6f7bf7",
    text: "#173047",
    mutedText: "#46627a",
    border: "#c7dff0",
    onPrimary: "#ffffff",
    onSecondary: "#052820",
    onTertiary: "#ffffff",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Premium koyu tema hissi.",
    backgroundStart: "#111827",
    backgroundMiddle: "#1f2937",
    backgroundEnd: "#312e81",
    surface: "#111a2e",
    card: "#17223a",
    primary: "#9b87f5",
    secondary: "#22d3ee",
    tertiary: "#f59e0b",
    text: "#edf2ff",
    mutedText: "#b3c0d9",
    border: "#334155",
    onPrimary: "#090611",
    onSecondary: "#06242b",
    onTertiary: "#241800",
  },
];

export const defaultMenuTheme = menuThemes[0];

export const neutralSkeletonTheme: MenuTheme = {
  id: "skeleton",
  name: "Loading",
  description: "Neutral loading theme",
  backgroundStart: "#ffffff",
  backgroundMiddle: "#ffffff",
  backgroundEnd: "#ffffff",
  surface: "#f5f5f5",
  card: "#ffffff",
  primary: "#ffffff",
  secondary: "#ffffff",
  tertiary: "#ffffff",
  text: "#ffffff",
  mutedText: "#ffffff",
  border: "#e5e5e5",
  onPrimary: "#ffffff",
  onSecondary: "#ffffff",
  onTertiary: "#ffffff",
};

export function toSaveMenuThemeRequest(theme: MenuTheme): SaveMenuThemeRequest {
  return {
    themeName: theme.id,
    themeMode: theme.id === "midnight" ? "dark" : "light",
    description: theme.description,
    backgroundStart: theme.backgroundStart,
    backgroundMiddle: theme.backgroundMiddle,
    backgroundEnd: theme.backgroundEnd,
    cardColor: theme.card,
    primaryColor: theme.primary,
    secondaryColor: theme.secondary,
    tertiaryColor: theme.tertiary,
    textColor: theme.text,
    mutedTextColor: theme.mutedText,
    borderColor: theme.border,
    onPrimaryColor: theme.onPrimary,
    onSecondaryColor: theme.onSecondary,
    onTertiaryColor: theme.onTertiary,
  };
}

export function toMenuThemeFromApi(
  apiTheme: MenuThemeDetailModel | null | undefined,
): MenuTheme | null {
  if (!apiTheme) {
    return null;
  }

  const normalizedThemeName = apiTheme.themeName?.trim().toLowerCase();
  const existingTheme = menuThemes.find(
    (theme) =>
      theme.id.toLowerCase() === normalizedThemeName ||
      theme.name.toLowerCase() === normalizedThemeName,
  );
  if (existingTheme) {
    return existingTheme;
  }

  return {
    id: apiTheme.themeName?.trim() || "saved-theme",
    name: apiTheme.themeName?.trim() || "Kayıtlı Tema",
    description: apiTheme.description?.trim() || "Kaydedilen menü teması",
    backgroundStart: apiTheme.backgroundStart ?? defaultMenuTheme.backgroundStart,
    backgroundMiddle:
      apiTheme.backgroundMiddle ?? defaultMenuTheme.backgroundMiddle,
    backgroundEnd: apiTheme.backgroundEnd ?? defaultMenuTheme.backgroundEnd,
    surface: apiTheme.cardColor ?? defaultMenuTheme.surface,
    card: apiTheme.cardColor ?? defaultMenuTheme.card,
    primary: apiTheme.primaryColor ?? defaultMenuTheme.primary,
    secondary: apiTheme.secondaryColor ?? defaultMenuTheme.secondary,
    tertiary: apiTheme.tertiaryColor ?? defaultMenuTheme.tertiary,
    text: apiTheme.textColor ?? defaultMenuTheme.text,
    mutedText: apiTheme.mutedTextColor ?? defaultMenuTheme.mutedText,
    border: apiTheme.borderColor ?? defaultMenuTheme.border,
    onPrimary: apiTheme.onPrimaryColor ?? defaultMenuTheme.onPrimary,
    onSecondary: apiTheme.onSecondaryColor ?? defaultMenuTheme.onSecondary,
    onTertiary: apiTheme.onTertiaryColor ?? defaultMenuTheme.onTertiary,
  };
}

function normalizeColor(color: string | null | undefined) {
  return color?.trim().toLowerCase() ?? null;
}

export function toMenuThemeFromPublicMenu(
  menu: PublicMenuDetailModel | null | undefined,
): MenuTheme | null {
  if (!menu) {
    return null;
  }

  const primaryColor = normalizeColor(menu.primaryColor);
  const secondaryColor = normalizeColor(menu.secondaryColor);
  const accentColor = normalizeColor(menu.accentColor);

  const matchedTheme = menuThemes.find((theme) => {
    const themePrimary = normalizeColor(theme.primary);
    const themeSecondary = normalizeColor(theme.secondary);
    const themeAccent = normalizeColor(theme.tertiary);

    return (
      (!primaryColor || themePrimary === primaryColor) &&
      (!secondaryColor || themeSecondary === secondaryColor) &&
      (!accentColor || themeAccent === accentColor)
    );
  });
  if (matchedTheme) {
    return matchedTheme;
  }

  if (!primaryColor && !secondaryColor && !accentColor) {
    return null;
  }

  return {
    ...defaultMenuTheme,
    id: "public-menu-theme",
    name: "Menü Teması",
    description: "Menüye kaydedilen renk düzeni.",
    primary: primaryColor ?? defaultMenuTheme.primary,
    secondary: secondaryColor ?? defaultMenuTheme.secondary,
    tertiary: accentColor ?? defaultMenuTheme.tertiary,
  };
}

export function toMenuThemeVars(theme: MenuTheme): CSSProperties {
  return {
    "--menu-bg-start": theme.backgroundStart,
    "--menu-bg-middle": theme.backgroundMiddle,
    "--menu-bg-end": theme.backgroundEnd,
    "--menu-surface": theme.surface,
    "--menu-card": theme.card,
    "--menu-primary": theme.primary,
    "--menu-secondary": theme.secondary,
    "--menu-tertiary": theme.tertiary,
    "--menu-text": theme.text,
    "--menu-muted-text": theme.mutedText,
    "--menu-border": theme.border,
    "--menu-on-primary": theme.onPrimary,
    "--menu-on-secondary": theme.onSecondary,
    "--menu-on-tertiary": theme.onTertiary,
  } as CSSProperties;
}
