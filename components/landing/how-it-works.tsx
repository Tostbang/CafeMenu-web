import { ChefHat, QrCode, Utensils } from "lucide-react"


const STEPS = [
  {
    n: "01",

    icon: ChefHat,

    title: "Menünüzü oluşturun",
    desc: "Yemekleri, kategorileri, fiyatları ve fotoğrafları kullanımı kolay editörle ekleyin. Sürükle, bırak, tamam.",
    bg: "bg-lime",
  },
  {
    n: "02",

    icon: QrCode,
    title: "QR kodu yazdırın",
    desc: "Markalı, baskıya hazır QR kodunu indirin ve masalara, vitrine veya fişlere yapıştırın.",
    bg: "bg-pink",
  },
  {

    n: "03",
    icon: Utensils,
    title: "Misafirler tarasın",
    desc: "Müşteriler menünüzü anında açar — uygulama yok, giriş yok. Menüyü telefonunuzdan dilediğiniz an güncelleyin.",
    bg: "bg-cream",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">

          <span className="inline-block rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-cream">
            Nasıl çalışır

          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-charcoal text-balance">
            Boş bir sayfadan masa standına üç adımda.

          </h2>
          <p className="mt-4 text-lg text-charcoal/70 leading-relaxed">
            Çoğu kafe ilk QR menüsünü 15 dakikadan kısa sürede yayına alıyor.
          </p>
        </div>


        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`${s.bg} relative rounded-3xl border-2 border-charcoal p-7 shadow-[0_6px_0_0_#313131]`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-charcoal/60">{s.n}</span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-charcoal text-cream">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-charcoal text-balance">{s.title}</h3>
              <p className="mt-3 text-charcoal/75 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

