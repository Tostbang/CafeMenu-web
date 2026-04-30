import Link from "next/link";
import { ArrowRight, Instagram, Twitter, QrCode, Youtube } from "lucide-react";
import Image from "next/image";

export function CtaSection() {
  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-charcoal bg-lime p-10 sm:p-16 text-center shadow-[0_10px_0_0_#313131]">
          {/* decorative pills */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <span className="absolute top-8 left-8 -rotate-12 rounded-full bg-pink border-2 border-charcoal px-3 py-1 text-xs font-bold text-charcoal">
              Akıllı
            </span>
            <span className="absolute top-10 right-10 rotate-6 rounded-full bg-red border-2 border-charcoal px-3 py-1 text-xs font-bold text-white">
              çalış
            </span>

            <span className="absolute bottom-10 left-12 rotate-3 rounded-full bg-cream border-2 border-charcoal px-3 py-1 text-xs font-bold text-charcoal">
              çok
            </span>
            <span className="absolute bottom-12 right-8 -rotate-6 rounded-full bg-charcoal px-3 py-1 text-xs font-bold text-cream">
              değil
            </span>
          </div>

          <h2 className="relative mx-auto max-w-2xl text-4xl sm:text-6xl font-bold tracking-tight text-charcoal text-balance leading-tight">
            Bir sonraki müşteriniz az önce içeri girdi. Taramaları için bir şey
            verin.
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-lg text-charcoal/80 leading-relaxed">
            İlk menünüzü 15 dakikadan kısa sürede oluşturun. Küçük kafeler için
            sonsuza kadar ücretsiz — kart gerekmez.
          </p>

          <form className="relative mx-auto mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-md">
            <label htmlFor="email" className="sr-only">
              E-postanız
            </label>
            <input
              id="email"
              type="email"
              placeholder="siz@kafeniz.com"
              className="flex-1 rounded-full border-2 border-charcoal bg-cream px-5 py-3.5 text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:ring-2 focus:ring-charcoal"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red border-2 border-charcoal px-6 py-3.5 text-sm font-bold text-white hover:bg-charcoal transition-colors"
            >
              Başla
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid size-14 p-1.5 place-items-center rounded-full bg-cream text-charcoal">
                <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
              </span>
              <span className="text-xl font-bold tracking-tight">QR Menü</span>
            </Link>

            <p className="mt-4 max-w-sm text-cream/70 leading-relaxed">
              Kafe ve restoranların menülerini QR kodla oluşturmasının,
              paylaşmasının ve güncellemesinin en samimi yolu.
            </p>

            {/* <div className="mt-6 flex items-center gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream hover:bg-cream hover:text-charcoal transition-colors"
                  aria-label="Sosyal medya bağlantısı"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div> */}
          </div>

	  <div className="md:col-span-2 self-end">


          {[
            {
              title: "Ürün",
              links: [
                { name: "Özellikler", link: "#features" },
                { name: "Fiyatlandırma", link: "#pricing" },
                { name: "Nasıl çalışır", link: "#how-it-works" },
                { name: "SSS", link: "#faq" },
              ],
            },
            /* {
              title: "Şirket",
              links: ["Hakkımızda", "Blog", "Kariyer", "İletişim", "Destek"],
            }, */
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-cream/60">
                {col.title}
              </h4>
              <ul className="mt-4  space-y-2 text-cream/80 flex gap-x-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <a href={l.link} className="hover:text-cream">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
	  </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/60">
          <p>
            &copy; {new Date().getFullYear()} Menuly. Sevgi ve Türk kahvesiyle
            yapıldı.
          </p>

          {/* <div className="flex items-center gap-6"> */}
          {/*   <a href="#" className="hover:text-cream"> */}
          {/*     Gizlilik */}
          {/*   </a> */}
          {/*   <a href="#" className="hover:text-cream"> */}
          {/*     Şartlar */}
          {/*   </a> */}
          {/*   <a href="#" className="hover:text-cream"> */}
          {/*     Çerezler */}
          {/*   </a> */}
          {/* </div> */}
        </div>
      </div>
    </footer>
  );
}
