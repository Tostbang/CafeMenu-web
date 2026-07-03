"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, Info, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useMutationOP, useQueryOP } from "@/lib/Fetch";
import {
  defaultMenuTheme,
  menuThemes,
  toMenuThemeFromApi,
  toSaveMenuThemeRequest,
} from "@/lib/menu-theme";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "warning" | "error";

function PhoneAlert({
  icon,
  title,
  description,
  variant = "info",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: AlertVariant;
}) {
  const tone =
    variant === "error"
      ? "bg-red-100 text-red-700"
      : variant === "warning"
        ? "bg-amber-100 text-amber-700"
        : "bg-sky-100 text-sky-700";
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-[260px] rounded-2xl bg-white/95 p-4 text-center shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
        <div
          className={cn(
            "mx-auto mb-3 flex size-9 items-center justify-center rounded-full",
            tone,
          )}
        >
          {icon}
        </div>
        <p className="text-sm font-semibold text-zinc-900">{title}</p>
        <p className="mt-1.5 text-xs leading-snug text-zinc-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function DesignPage() {
  const [themeId, setThemeId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const getMyMenuQuery = useQueryOP("get", "/api/Menu/GetMyMenu");
  const menuSlug = getMyMenuQuery.data?.menu?.slug?.trim() ?? "";
  const getMyThemeQuery = useQueryOP(
    "get",
    "/api/MenuTheme/GetMyTheme/{slug}",
    { params: { path: { slug: menuSlug } } },
    { enabled: Boolean(menuSlug) },
  );
  const saveThemeMutation = useMutationOP(
    "post",
    "/api/MenuTheme/SaveMenuTheme",
  );
  const savedTheme = toMenuThemeFromApi(getMyThemeQuery.data?.theme);
  const savedThemeId = menuThemes.some((theme) => theme.id === savedTheme?.id)
    ? savedTheme?.id
    : null;
  const activeThemeId = themeId ?? savedThemeId ?? defaultMenuTheme.id;

  const selectedTheme =
    menuThemes.find((theme) => theme.id === activeThemeId) ?? defaultMenuTheme;
  const menu = getMyMenuQuery.data?.menu;
  // The preview iframe only makes sense when the menu is published and the
  // query is in a healthy state. Surface every other case as an iOS-style
  // alert inside the phone frame so the operator sees what to fix instead
  // of a silently broken iframe.
  const isMenuQueryPending = getMyMenuQuery.isPending && !getMyMenuQuery.data;
  const isMenuQueryError = getMyMenuQuery.isError;
  const isMenuUnpublished = Boolean(menu) && menu?.isPublished === false;
  const previewUrl = useMemo(
    () =>
      menuSlug && !isMenuUnpublished
        ? `/menu/${encodeURIComponent(menuSlug)}?theme=${encodeURIComponent(selectedTheme.id)}`
        : "",
    [menuSlug, selectedTheme.id, isMenuUnpublished],
  );
  const showPreviewIframe =
    Boolean(menuSlug) && !isMenuUnpublished && !isMenuQueryError;
  const isSaving = saveThemeMutation.isPending;

  const onSaveTheme = async () => {
    try {
      await saveThemeMutation.mutateAsync({
        body: toSaveMenuThemeRequest(selectedTheme),
      });

      // Optimistically push the new theme into the GetMyTheme cache so the
      // QR page and any other consumer see the new theme on next render
      // without waiting for a refetch round-trip.
      // The key mirrors the query key openapi-react-query uses for the
      // `/api/MenuTheme/GetMyTheme/{slug}` call (path + path params).
      queryClient.setQueryData(
        ["get", "/api/MenuTheme/GetMyTheme/{slug}", { params: { path: { slug: menuSlug } } }],
        (previous: unknown) => {
          const prev =
            typeof previous === "object" && previous !== null
              ? (previous as { theme?: Record<string, unknown> })
              : undefined;
          return {
            ...(prev ?? {}),
            theme: {
              ...(prev?.theme ?? {}),
              menuId: prev?.theme?.menuId ?? 0,
              themeName: selectedTheme.id,
              themeMode:
                selectedTheme.id === "midnight" ? "dark" : "light",
              description: selectedTheme.description,
              backgroundStart: selectedTheme.backgroundStart,
              backgroundMiddle: selectedTheme.backgroundMiddle,
              backgroundEnd: selectedTheme.backgroundEnd,
              cardColor: selectedTheme.card,
              primaryColor: selectedTheme.primary,
              secondaryColor: selectedTheme.secondary,
              tertiaryColor: selectedTheme.tertiary,
              textColor: selectedTheme.text,
              mutedTextColor: selectedTheme.mutedText,
              borderColor: selectedTheme.border,
              onPrimaryColor: selectedTheme.onPrimary,
              onSecondaryColor: selectedTheme.onSecondary,
              onTertiaryColor: selectedTheme.onTertiary,
            },
          };
        },
      );

      // Also invalidate the public menu query so any open public menu view
      // refetches its colors from the API.
      await queryClient.invalidateQueries({
        queryKey: ["get", "/api/PublicMenu"],
      });

      toast.success("Tema kaydedildi.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Tema kaydedilemedi.";
      toast.error(message);
    }
  };

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl rounded-2xl">
        <div className="mb-6 flex flex-wrap justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasarım</h1>
            <p className="mt-1 text-sm">
              Menü görünümünü canlı önizleme ile anında düzenleyin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-3 ">
          <section className="rounded-3xl border col-span-8  xl:col-span-3 bg-white/70  md:p-4 shadow-sm backdrop-blur-sm ">
            <p className="mb-3 text-sm font-semibold text-muted-foreground">
              iPhone 17 Pro Önizleme
            </p>
            <div className="relative mx-auto h-[650px] w-[300px] rounded-[3.3rem] bg-zinc-900 p-2 shadow-[0_28px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
              <div className="absolute inset-0 rounded-[3.3rem] bg-linear-to-b from-white/20 to-transparent opacity-40" />
              <div className="relative h-full rounded-[2.8rem] bg-black p-2">
                <div className="h-full overflow-hidden relative rounded-[2.35rem] bg-black">
                  <div className="absolute -inset-x-11 -inset-y-26 scale-75">
                    {isMenuQueryPending ? (
                      <PhoneAlert
                        variant="info"
                        icon={<Loader2 className="size-5 animate-spin" />}
                        title="Menü yükleniyor"
                        description="Lütfen bekleyin, menünüz hazırlanıyor..."
                      />
                    ) : isMenuQueryError ? (
                      <PhoneAlert
                        variant="error"
                        icon={<XCircle className="size-5" />}
                        title="Menü yüklenemedi"
                        description="Bir hata oluştu. Sayfayı yenileyip tekrar deneyin."
                      />
                    ) : isMenuUnpublished ? (
                      <PhoneAlert
                        variant="warning"
                        icon={<AlertTriangle className="size-5" />}
                        title="Menü henüz yayında değil"
                        description="Müşterilerinizin menüyü görebilmesi için menü düzenleyicide 'Menü Yayında' seçeneğini açın."
                      />
                    ) : showPreviewIframe ? (
                      <iframe
                        key={`${menuSlug}-${selectedTheme.id}`}
                        src={previewUrl}
                        title="Menü mobil önizleme"
                        className=" border-0  w-full h-full   "
                      />
                    ) : (
                      <PhoneAlert
                        variant="info"
                        icon={<Info className="size-5" />}
                        title="Menü bağlantısı bulunamadı"
                        description="Önce menü bilgilerinizi tamamlayın."
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-white/80 p-5 shadow-sm backdrop-blur-sm col-span-8 xl:col-span-5">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Renk Grupları</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Bir tema seçtiğiniz anda sol taraftaki mobil ekran anında
                güncellenir.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {menuThemes.map((theme) => {
                const isSelected = selectedTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setThemeId(theme.id)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-[0_10px_24px_rgba(225,99,73,0.12)]"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/40",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{theme.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {theme.description}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-3.5" />
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {[
                        theme.backgroundStart,
                        theme.card,
                        theme.primary,
                        theme.secondary,
                        theme.tertiary,
                      ].map((color) => (
                        <span
                          key={`${theme.id}-${color}`}
                          className="size-6 rounded-full border border-black/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            
            <div className="mt-6 rounded-2xl border border-dashed p-4">
              <p className="text-sm font-medium">Seçili tema</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Arka plan, kart, birincil, ikincil ve üçüncü vurgu rengi canlı
                olarak uygulanıyor.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border px-2.5 py-1 text-xs">
                  Arka Plan
                </span>
                <span className="rounded-full border px-2.5 py-1 text-xs">
                  Kart
                </span>
                <span className="rounded-full border px-2.5 py-1 text-xs">
                  Birincil
                </span>
                <span className="rounded-full border px-2.5 py-1 text-xs">
                  İkincil
                </span>
                <span className="rounded-full border px-2.5 py-1 text-xs">
                  Üçüncü Renk
                </span>
              </div>
            </div>
	    <div className="flex justify-end gap-2 mt-4">
              <Button type="button" onClick={onSaveTheme} disabled={isSaving}>
                {isSaving ? "Kaydediliyor..." : "Temayı Kaydet"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
