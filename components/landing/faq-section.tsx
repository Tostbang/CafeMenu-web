"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = [
  {
    q: "Müşterilerimin menüyü görmek için uygulama indirmesi gerekir mi?",
    a: "Hayır. Biri QR kodunuzu tarattığında menü anında telefonunun tarayıcısında açılır. İndirme yok, kayıt yok — sadece menünüz.",
  },
  {
    q: "Menümü değiştirirsem QR kodu yeniden bastırmam gerekir mi?",
    a: "Asla. QR kod her zaman canlı menünüze işaret eder. Bir fiyat değiştirin, yeni yemek ekleyin, stok bitti olarak işaretleyin — her şey otomatik güncellenir.",

  },

  {
    q: "Menuly'i kafemin markasına uyumlu hale getirebilir miyim?",
    a: "Evet. Logonuzu yükleyin, marka renklerinizi ve fontlarınızı ayarlayın — menünüz jenerik bir şablon değil, kafenizin bir uzantısı gibi görünsün.",
  },
  {
    q: "Menuly çok dilli menüleri destekliyor mu?",
    a: "Kesinlikle. Büyüme planı 3 dili, Zincir planı ise sınırsız dili destekler. Hatta başlangıç için yemeklerinizi otomatik çevirebiliriz.",
  },
  {
    q: "Kurulum ne kadar sürer?",
    a: "Çoğu kafe sahibi 15 dakikadan kısa sürede yayına geçer. Yemekleri ekleyin, QR kodu indirin ve ilk taramanıza hazır olun.",
  },
  {

    q: "İstediğim zaman iptal edebilir miyim?",
    a: "Evet. Sözleşme yok, gizli ücret yok. Tek tıkla iptal edin; menünüz ücretsiz planda kullanılabilir kalır.",
  },
]


export function FaqSection() {
  return (
    <section id="faq" className="bg-pink py-24 sm:py-32 border-y-2 border-charcoal">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">

          <span className="inline-block rounded-full bg-charcoal px-3 py-1 text-xs font-medium text-cream">
            SSS

          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-charcoal text-balance">
            Sorular, kahve yudumlarken cevaplandı.
          </h2>
          <p className="mt-4 text-lg text-charcoal/75 leading-relaxed">

            Hâlâ merak ediyor musunuz? Bir e-posta kadar yakınız.
          </p>
        </div>


        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border-2 border-charcoal bg-cream px-5 data-[state=open]:bg-lime"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-charcoal hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/80 leading-relaxed pb-5">

                {item.a}
              </AccordionContent>
            </AccordionItem>

          ))}
        </Accordion>
      </div>
    </section>
  )

}

