import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "120 adet laminasyonlu menüyü tek bir QR etiketiyle değiştirdik. Garsonlar çok daha hızlı çalışıyor, günün menüsünü güncellemek ise 10 saniyelik bir iş.",
    name: "Leyla Haddad",
    role: "Sahibi, Kafe Zeytin",
    bg: "bg-lime",
    avatar: "bg-red",
  },
  {
    quote:
      "Sadece fotoğraflar bile tatlı satışlarımızı %22 artırdı. Müşteriler artık sipariş verdikleri şeyi gerçekten görüyor — oyunun kuralını değiştirdi.",
    name: "Mert Renzetti",

    role: "Müdür, Makarna Bar 31",
    bg: "bg-pink",
    avatar: "bg-charcoal",
  },
  {
    quote:
      "Üç şubem var ve Menuly hepsini senkronize tutuyor. Uçakta telefonumdan bir fiyatı değiştirdim. Harika.",
    name: "Ayşe Kaya",
    role: "Kurucu, Bloom Fırın",
    bg: "bg-cream",
    avatar: "bg-lime",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-charcoal text-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">
            Sahipler seviyor
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-cream text-balance">
            Dünyanın dört bir yanındaki kafeler Menuly&apos;e geçiyor.
          </h2>
          <p className="mt-4 text-lg text-cream/70 leading-relaxed">
            Gerçek kafe sahiplerinden gerçek sözler. Stok alıntı yok, ince yazı
            yok.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className={`${t.bg} rounded-3xl border-2 border-cream/10 p-7 text-charcoal flex flex-col justify-between`}
            >
              <blockquote className=" text-lg leading-relaxed text-pretty">
                <Quote className="mb-4 h-8 w-8 text-red" aria-hidden="true" />
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={`h-10 w-10 rounded-full ${t.avatar}`}
                  aria-hidden="true"
                />
                <span>
                  <span className="block font-bold">{t.name}</span>
                  <span className="block text-sm text-charcoal/70">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-cream/15 pt-12">
          {[
            { v: "2.400+", l: "Aktif kafe" },
            { v: "38M", l: "QR tarama" },
            { v: "72", l: "Ülke" },
            { v: "4,9/5", l: "Kullanıcı puanı" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="text-sm text-cream/60">{s.l}</dt>
              <dd className="mt-1 text-4xl font-bold text-cream">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
