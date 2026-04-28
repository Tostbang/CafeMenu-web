"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { useQueryOP } from "@/lib/Fetch"
import { DurationType, DurationTypeLabels } from "@/lib/types"
import type { components } from "@/lib/types/api"

type PackageModel = components["schemas"]["CafeMenu.Entity.DTO.PackageListModel"]

const CARD_STYLES = [
  { bg: "bg-cream", accent: "bg-lime", cta: "Ücretsiz başla" },
  { bg: "bg-lime", accent: "bg-red", cta: "Hemen başla" },
  { bg: "bg-pink", accent: "bg-charcoal", cta: "Hemen başla" },
]

const formatPrice = (price: number) => new Intl.NumberFormat("tr-TR").format(price)

const getPackageFeatures = (pkg: PackageModel) => {
  const durationLabel =
    DurationTypeLabels[pkg.durationType as DurationType] ?? "Ay"
  const descriptionItems = (pkg.description ?? "")
    .split(/\r?\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean)

  const baseItems = [`${pkg.durationValue} ${durationLabel} geçerlilik`]
  const items = [...baseItems, ...descriptionItems].slice(0, 6)

  return items.length > 1
    ? items
    : [...items, "QR menünüz için güvenilir ve hızlı kullanım"]
}

export function PricingSection() {
  const { data: packagesData, isPending } = useQueryOP(
    "get",
    "/api/Membership/GetAllPackages",
  )
  const packages = packagesData?.packages ?? []

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-cream">
            Fiyatlandırma
          </span>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-charcoal text-balance">
            Basit planlar. Bir fincan kahve fiyatına.
          </h2>
          <p className="mt-4 text-lg text-charcoal/70 leading-relaxed">
            Ücretsiz başlayın. Kafeniz canlanınca yükseltirsiniz.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {isPending &&
            Array.from({ length: 3 }).map((_, index) => {
              const style = CARD_STYLES[index % CARD_STYLES.length]
              return (
                <div
                  key={`pricing-skeleton-${index}`}
                  className={`${style.bg} rounded-3xl border-2 border-charcoal p-8 shadow-[0_6px_0_0_#313131]`}
                >
                  <div className="h-8 w-32 animate-pulse rounded bg-charcoal/10" />
                  <div className="mt-4 h-6 w-40 animate-pulse rounded bg-charcoal/10" />
                  <div className="mt-6 h-12 w-44 animate-pulse rounded bg-charcoal/10" />
                  <div className="mt-6 space-y-3">
                    <div className="h-5 w-full animate-pulse rounded bg-charcoal/10" />
                    <div className="h-5 w-full animate-pulse rounded bg-charcoal/10" />
                    <div className="h-5 w-full animate-pulse rounded bg-charcoal/10" />
                  </div>
                </div>
              )
            })}

          {!isPending && packages.length > 0 && packages.map((pkg, index) => {
            const style = CARD_STYLES[index % CARD_STYLES.length]
            const isPopular = packages.length > 1 && index === 1
            const durationLabel =
              DurationTypeLabels[pkg.durationType as DurationType] ?? "Ay"
            const features = getPackageFeatures(pkg)

            return (
            <div
              key={pkg.packageId}
              className={`${style.bg} relative rounded-3xl border-2 border-charcoal p-8 flex flex-col ${
                isPopular ? "lg:-translate-y-3 shadow-[0_10px_0_0_#313131]" : "shadow-[0_6px_0_0_#313131]"

              }`}
            >
              {isPopular && (
                <span className="absolute -top-3 left-6 rotate-[-3deg] rounded-full bg-red px-3 py-1 text-xs font-bold text-white border-2 border-charcoal">
                  En popüler
                </span>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-charcoal">
                  {pkg.name || `Paket ${index + 1}`}
                </h3>
                <span className={`h-8 w-8 rounded-full ${style.accent} border-2 border-charcoal`} aria-hidden="true" />
              </div>
              <p className="mt-2 text-charcoal/70">
                {pkg.description || "Kafeniz için esnek üyelik planı"}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-charcoal">
                  ₺{formatPrice(pkg.price)}
                </span>
                <span className="text-charcoal/60">
                  / {pkg.durationValue} {durationLabel.toLocaleLowerCase("tr-TR")}
                </span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-charcoal">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-charcoal">
                      <Check className="h-3 w-3 text-cream" aria-hidden="true" />

                    </span>

                    <span className="text-sm">{f}</span>
                  </li>

                ))}
              </ul>

              <Link
                href="/login"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors border-2 border-charcoal ${
                  isPopular
                    ? "bg-charcoal text-cream hover:bg-charcoal/90"
                    : "bg-white text-charcoal hover:bg-charcoal hover:text-cream"
                }`}
              >
                {pkg.price === 0 ? "Ücretsiz başla" : style.cta}
              </Link>
            </div>
            )
          })}

          {!isPending && packages.length === 0 && (
            <div className="rounded-3xl border-2 border-charcoal bg-cream p-8 text-charcoal lg:col-span-3">
              Şu anda gösterilecek paket bulunamadı.
            </div>
          )}
        </div>
      </div>

    </section>
  )
}
