import { Check } from "lucide-react"

function QrArt() {
  // Stylized 11x11 "QR-like" grid — purely decorative
  const pattern = [
    "11101110111",
    "10001000101",
    "10111011101",
    "10111010001",
    "10001011101",
    "11101000111",
    "00010111000",
    "11101010011",
    "10001011010",
    "10111000111",
    "11101110100",
  ]
  return (
    <div className="grid grid-cols-11 gap-[3px] p-4 bg-cream rounded-2xl border-2 border-charcoal">
      {pattern.flatMap((row, r) =>
        row.split("").map((c, i) => (
          <span
            key={`${r}-${i}`}
            className={`aspect-square rounded-[3px] ${c === "1" ? "bg-charcoal" : "bg-transparent"}`}
          />
        )),
      )}
    </div>

  )
}

export function QrShowcase() {
  const perks = [
    "Baskıya hazır PDF + PNG + SVG dışa aktarma",
    "Renk, logo ve çerçeve özelleştirme",
    "Sınırsız menü, sınırsız tarama",
    "Her telefonda çalışır, uygulama gerekmez",
  ]


  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: QR visual */}

          <div className="relative">
            <div className="absolute inset-0 rotate-[-4deg] rounded-3xl bg-pink" aria-hidden="true" />
            <div className="relative rounded-3xl border-2 border-charcoal bg-lime p-8 sm:p-10 shadow-[0_8px_0_0_#313131]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-charcoal/70">
                    Menüyü görüntülemek için tara
                  </p>
                  <p className="mt-1 text-2xl font-bold text-charcoal">Kafe Zeytin</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-cream">
                  menuqrda.app
                </span>
              </div>

              <div className="mt-6 mx-auto max-w-[280px]">
                <QrArt />
              </div>


              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-pink border-2 border-charcoal px-3 py-1 text-xs font-bold text-charcoal">
                  Kahvaltı
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cream border-2 border-charcoal px-3 py-1 text-xs font-bold text-charcoal">

                  Ana Yemek

                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-red border-2 border-charcoal px-3 py-1 text-xs font-bold text-white">
                  İçecekler
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white border-2 border-charcoal px-3 py-1 text-xs font-bold text-charcoal">
                  Tatlılar
                </span>
              </div>

            </div>

            {/* Sticker */}
            <div className="absolute -bottom-4 -right-4 rotate-6 rounded-2xl bg-charcoal px-4 py-2 text-sm font-bold text-cream shadow-[0_4px_0_0_#ef4136]">
              Yazdır beni!
            </div>
          </div>

          {/* Right: Copy */}
          <div>
            <span className="inline-block rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-cream">
              QR kodlar

            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-charcoal text-balance">
              Tek bir kod, her masa için —{" "}
              <span className="text-red">sıfır</span> yeniden baskı.
            </h2>
            <p className="mt-5 text-lg text-charcoal/75 leading-relaxed max-w-lg">
              Bir yemeği güncelleyin, aynı QR kod çalışmaya devam etsin. Masalara, stantlara, vitrine veya fişlere
              yapıştırın — baskı aynı kalırken menünüz gelişsin.

            </p>


            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime border-2 border-charcoal">

                    <Check className="h-3.5 w-3.5 text-charcoal" aria-hidden="true" />
                  </span>
                  <span className="text-charcoal">{p}</span>
                </li>
              ))}

            </ul>

            {/* <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-cream hover:bg-charcoal/90"

              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Örnek PDF indir
              </a>
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal bg-cream px-5 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                Baskıya hazır paket
              </a>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  )
}

