import Image from "next/image"
import {
  Camera,
  Globe,
  Leaf,
  LineChart,
  Palette,
  RefreshCw,
  Smartphone,
  Tag,

} from "lucide-react"

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Canlı güncellemeler",
    desc: "Günün menüsü bitti mi? Menüyü bir kez değiştirin — her müşteri anında görür.",
  },
  {
    icon: Camera,
    title: "Fotoğraf odaklı",
    desc: "Ağız sulandıran fotoğraflar yükleyin. Misafirler ne sipariş ettiğini görünce daha fazla sipariş verir.",
  },
  {
    icon: Globe,
    title: "Dil desteği",
    desc: "Türkçe, İngilizce, Arapça, Almanca — her turist için menünüzü otomatik çevirin.",

  },

  {
    icon: Tag,
    title: "Akıllı etiketler",
    desc: "Popüler, vegan, acılı veya yeni etiketlerini tek dokunuşla ekleyin. Hazır rozetler dahil.",
  },
  {
    icon: Leaf,

    title: "Alerjen ve diyet",
    desc: "Besin değerleri, içerikler ve alerjen bilgisini gösterin; her misafir kendini güvende hissetsin.",
  },
  {

    icon: LineChart,
    title: "Tarama analitiği",
    desc: "Hangi yemeklerin en çok görüntülendiğini, yoğun saatleri ve şubeye göre performansı görün.",
  },
  {
    icon: Palette,
    title: "Size özel tasarım",
    desc: "Kafenizin renk, font ve logosuyla uyumlu. Menünüz; jenerik bir şablon değil, sizin.",
  },
  {
    icon: Smartphone,
    title: "Uygulama gerekmez",

    desc: "Müşteriler QR'ı tarar, menü tarayıcıda açılır — indirme yok, bekleme yok.",
  },
]


export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-pink py-24 sm:py-32 border-y-2 border-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-cream">
              Her şey içinde
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-charcoal text-balance">
              Küçük bir araç,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">büyük iştah</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime rounded-full" aria-hidden="true" />
              </span>
              .
            </h2>

          </div>
          <p className="max-w-md text-charcoal/80 leading-relaxed">

            Gerçek kafe sahipleriyle birlikte geliştirildi — her özellik birilerinin yoğun bir Cumartesi
            gecesinde ihtiyaç duyduğu için burada.
          </p>
        </div>


        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-3xl border-2 border-charcoal bg-cream p-6 ${
                i % 3 === 0 ? "lg:translate-y-2" : ""
              }`}

            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-red text-white">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-charcoal">{f.title}</h3>
              <p className="mt-2 text-sm text-charcoal/75 leading-relaxed">{f.desc}</p>
            </div>
          ))}

        </div>

        {/* Big showcase card */}
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-3xl border-2 border-charcoal bg-lime p-8 sm:p-10 relative overflow-hidden">
            <h3 className="text-3xl sm:text-4xl font-bold text-charcoal max-w-md text-balance">
              Sizin markanız, sizin menünüz, sizin kurallarınız.
            </h3>

            <p className="mt-4 max-w-md text-charcoal/80 leading-relaxed">
              Logonuzu ekleyin, renklerinizi seçin — menuqrda kafenizin ruhunu yansıtır: samimi bir köşe
              fırınından şık bir bistroya kadar.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Klasik", "Modern", "Vegan", "Popüler", "Acılı", "Yeni"].map((tag, i) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full border-2 border-charcoal px-3 py-1.5 text-sm font-semibold ${
                    ["bg-pink", "bg-cream", "bg-red text-white", "bg-white", "bg-red text-white", "bg-charcoal text-cream"][i]

                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 h-75 rounded-3xl border-2 border-charcoal bg-cream p-4 overflow-hidden relative">
            <Image
              src="/images/features-dish.jpg"
              alt="Pembe arka plan üzerinde yoğurtlu Türk mantısı"
              width={760}
              height={900}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

