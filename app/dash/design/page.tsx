"use client";

import { useMemo, useState } from "react";
import { Check, Palette } from "lucide-react";
import { defaultMenuTheme, menuThemes } from "@/lib/menu-theme";
import { cn } from "@/lib/utils";

export default function DesignPage() {
  const [themeId, setThemeId] = useState(defaultMenuTheme.id);

  const selectedTheme =
    menuThemes.find((theme) => theme.id === themeId) ?? defaultMenuTheme;
  const previewUrl = useMemo(
    () => `/menu/preview?theme=${encodeURIComponent(selectedTheme.id)}`,
    [selectedTheme.id],
  );

  return (
    <div className="h-full p-4 md:p-6 ">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-wrap justify-between gap-3">
          <div>
            <h1 className="font-carter text-3xl uppercase">Tasarım</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Menü görünümünü canlı önizleme ile anında düzenleyin.
            </p>
          </div>
            <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold">
              <Palette className="size-3.5" />
              Canlı Önizleme
            </span>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[430px_1fr]">
          <section className="rounded-3xl border bg-white/70 p-4 shadow-sm backdrop-blur-sm scale-70 origin-top">
            <p className="mb-3 text-sm font-semibold text-muted-foreground">
              iPhone 17 Pro Önizleme
            </p>
            <div className="relative mx-auto h-[560px] w-[260px] rounded-[3.3rem] bg-zinc-900 p-2 shadow-[0_28px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:h-[844px] sm:w-[390px] ">
              <div className="absolute inset-0 rounded-[3.3rem] bg-linear-to-b from-white/20 to-transparent opacity-40" />
              <div className="relative h-full rounded-[2.8rem] bg-black p-2">
                {/* <div className="absolute left-1/2 top-2 z-30 h-6 w-30 -translate-x-1/2 rounded-full bg-black" /> */}
                <div className="h-full overflow-hidden rounded-[2.35rem] bg-black">
                  <iframe
                    key={selectedTheme.id}
                    src={previewUrl}
                    title="Menü mobil önizleme"
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-white/80 p-5 shadow-sm backdrop-blur-sm">
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
          </section>
        </div>
      </div>
    </div>
  );
}
