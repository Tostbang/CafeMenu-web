import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* decorative glows */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-pink/40 blur-3xl" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-lime/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">

          {/* Left — copy */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium text-cream">

              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />

              Yeni: Tek tıkla AI yemek açıklamaları
            </span>

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal text-balance leading-[0.95]">
              Menünüz{" "}

              <span className="relative inline-block">
                <span className="relative z-10">Tarandı.</span>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 -z-0 h-4 bg-lime rounded-full"
                />
              </span>{" "}

              Servis edildi.

            </h1>

            <p className="mt-6 max-w-xl text-lg text-charcoal/70 text-pretty leading-relaxed">
              menuqrda, kafe ve restoranınızın menüsünü güzel bir dijital deneyime dönüştürür. Tek bir QR kod
              bastırın, yemekleri istediğiniz zaman güncelleyin — uygulama yok, yeniden baskı yok.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-red px-6 py-3.5 text-base font-semibold text-white shadow-[0_6px_0_0_#313131] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#313131] transition-all"
              >
                Menümü oluştur — ücretsiz
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <Link
                href="/menu"

                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal bg-cream px-6 py-3.5 text-base font-semibold text-charcoal hover:bg-charcoal hover:text-cream transition-colors"

              >
                Örnek menüyü gör
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[
                  { bg: "bg-pink" },
                  { bg: "bg-lime" },
                  { bg: "bg-red" },
                  { bg: "bg-charcoal" },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`h-9 w-9 rounded-full border-2 border-cream ${a.bg}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-charcoal">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-red text-red" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm text-charcoal/70">
                  <span className="font-semibold text-charcoal">2.400+</span> kafe menuqrda ile servis yapıyor
                </p>
              </div>
            </div>
          </div>


          {/* Right — food photo collage */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">

              {/* background cards */}
              <div className="absolute inset-0 -rotate-3 rounded-[2.5rem] bg-pink" aria-hidden="true" />
              <div className="absolute inset-0 rotate-2 rounded-[2.5rem] bg-lime/70" aria-hidden="true" />

              <div className="relative rounded-[2.5rem] bg-cream p-4 border-2 border-charcoal/10">

                <Image
                  src="/images/hero-cafe.jpg"
                  alt="Kahve, baklava ve dijital menüyü gösteren telefonun yer aldığı kafe masası"
                  width={900}
                  height={900}
                  className="w-full h-auto rounded-2xl object-cover aspect-square"
                  priority
                />


                {/* Floating stickers */}
                <div className="absolute -top-4 -right-4 rotate-6 rounded-2xl bg-red px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_0_#313131]">
                  Beni tara!
                </div>
                <div className="absolute -bottom-3 -left-3 -rotate-6 rounded-2xl bg-lime px-4 py-2 text-sm font-bold text-charcoal shadow-[0_4px_0_0_#313131]">
                  172 yemek
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


      {/* Marquee */}

      <div className="relative overflow-hidden border-y-2 border-charcoal bg-charcoal py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, row) => (
            <div key={row} className="flex items-center gap-10 pr-10 text-cream text-lg font-semibold">
              {[
                "Tara. Sipariş ver. Keyfini çıkar.",
                "Uygulama gerekmez",
                "Gerçek zamanlı güncelleme",
                "Dil seçenekleri",

                "Fotoğraf odaklı tasarım",

                "Çevrimdışı çalışır",
                "Baskıya hazır QR kodlar",
              ].map((t, i) => (
                <span key={`${row}-${i}`} className="flex items-center gap-10">
                  <span>{t}</span>
                  <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
                </span>
              ))}

            </div>
          ))}
        </div>
      </div>
    </section>
  )

}

