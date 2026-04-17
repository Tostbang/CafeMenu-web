import type { CSSProperties } from "react";

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
