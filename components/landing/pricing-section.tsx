import { Check } from "lucide-react"


const PLANS = [
  {
    name: "Başlangıç",
    price: "0",

    tagline: "Denemek isteyen tek şubeli kafeler için.",
    bg: "bg-cream",
    accent: "bg-lime",
    cta: "Ücretsiz başla",
    popular: false,
    features: [
      "1 menü, 30 yemeğe kadar",
      "Standart QR kod",
      "Gerçek zamanlı güncellemeler",
      "Menuly markalaması",
    ],

  },
  {
    name: "Büyüme",
    price: "549",

    tagline: "Daha fazla servis yapmaya hazır yoğun kafeler için.",
    bg: "bg-lime",
    accent: "bg-red",
    cta: "14 günlük deneme",
    popular: true,
    features: [
      "Sınırsız yemek ve kategori",
      "Markalı QR + özel renkler",
      "3 dil dahil",
      "Tarama analitiği",
      "Alerjen ve besin değeri",
      "Menuly markalamasını kaldır",
    ],
  },
  {
    name: "Zincir",
    price: "1.499",
    tagline: "Birden fazla şubesi olan restoranlar için.",
    bg: "bg-pink",

    accent: "bg-charcoal",

    cta: "Satışla görüş",

    popular: false,
    features: [
      "Büyüme planındaki her şey",
      "Sınırsız şube",
      "Sınırsız dil",
      "Ekip üyesi ve yetkiler",
      "Öncelikli destek",
      "Özel alan adı",
    ],

  },

]

export function PricingSection() {
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
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`${p.bg} relative rounded-3xl border-2 border-charcoal p-8 flex flex-col ${
                p.popular ? "lg:-translate-y-3 shadow-[0_10px_0_0_#313131]" : "shadow-[0_6px_0_0_#313131]"

              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rotate-[-3deg] rounded-full bg-red px-3 py-1 text-xs font-bold text-white border-2 border-charcoal">
                  En popüler
                </span>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-charcoal">{p.name}</h3>
                <span className={`h-8 w-8 rounded-full ${p.accent} border-2 border-charcoal`} aria-hidden="true" />
              </div>
              <p className="mt-2 text-charcoal/70">{p.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-charcoal">₺{p.price}</span>
                <span className="text-charcoal/60">/ ay</span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-charcoal">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-charcoal">
                      <Check className="h-3 w-3 text-cream" aria-hidden="true" />

                    </span>

                    <span className="text-sm">{f}</span>
                  </li>

                ))}
              </ul>

              <a

                href="#cta"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors border-2 border-charcoal ${
                  p.popular
                    ? "bg-charcoal text-cream hover:bg-charcoal/90"
                    : "bg-white text-charcoal hover:bg-charcoal hover:text-cream"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

