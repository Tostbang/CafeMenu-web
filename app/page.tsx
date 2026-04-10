import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  QrCode,
  Smartphone,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MyHeader from "@/components/MyHeader";
import { cn } from "@/lib/utils";
import { MyButton } from "@/components/myButtons";
import MyMainNav from "@/components/my-main-nav";

const menuCards = [
  ["Kahveler", "34 ürün", "Espresso, filtre, soğuk kahve"],
  ["Tatlılar", "18 ürün", "Cheesecake, brownie, günlük pasta"],
  ["Ana Yemek", "27 ürün", "Burger, makarna, salata çeşitleri"],
  ["İçecekler", "41 ürün", "Fresh, smoothie, sıcak/soğuk içecek"],
];

const colorfulCards = [
  ["bg-my-red/40", "Masa QR Kodu", "Her masa için ayrı kod üret"],
  ["bg-my-blue", "Anlık Güncelleme", "Fiyat değişikliği hemen yayında"],
  ["bg-my-lavender", "Detaylı Ürün", "İçerik, alerjen ve gramaj göster"],
  [
    "bg-my-plum text-my-bright-background",
    "Kampanya Alanı",
    "Öne çıkan ürünleri sabitle",
  ],
];

const ticker = [
  "QR MENÜ PLATFORMU",
  "KAFE VE RESTORANLAR İÇİN",
  "ANLIK FİYAT GÜNCELLEME",
  "MENÜNÜ OLUŞTUR VE PAYLAŞ",
];

export default function Home() {
  return (
    <main className="bg-[#f2efed] text-[#161316]">
      <MyMainNav />
      <section className="relative overflow-hidden bg-[#7f1148] px-6 pb-16 pt-36 text-white md:pb-24">
        <div className="absolute -left-20 top-28 size-40 rounded-full bg-[#5f0d35] blur-2xl" />
        <div className="absolute -right-24 bottom-16 size-52 rounded-full bg-[#9d1f60] blur-2xl" />
        <div className="mx-auto w-full max-w-6xl text-center">
          <MyHeader className="text-my-red">
            Menü Oluştur & <br /> QR Kodla & Paylaş
          </MyHeader>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-white/85 md:text-base">
            Kafe ve restoran sahipleri için: dijital menü oluştur, ürün
            detaylarını yönet, QR kodu masalara koy ve müşterilerin kodu okutup
            tüm menüyü telefonunda görsün.
          </p>

          <div className="relative mx-auto mt-10 max-w-4xl rounded-[2rem] bg-[#6f0d3d] p-5 md:p-8">
            <span className="absolute -left-3 top-12 rounded-full bg-[#d4f55f] px-3 py-1 text-xs font-bold text-black">
              %100 Mobil
            </span>
            <span className="absolute -right-3 bottom-16 rounded-full bg-[#ffd36f] px-3 py-1 text-xs font-bold text-black">
              QR Hazır
            </span>
            <div className="rounded-[1.5rem] border border-black/10 bg-[#f2efe8] p-5 text-left text-[#161316] md:p-7">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-heading text-xl font-bold">
                  Mavi Fincan Kafe
                </p>
                <div className="rounded-xl bg-white p-2 text-[#7f1148]">
                  <QrCode className="size-6" />
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["Flat White", "₺160"],
                  ["Çilekli Cheesecake", "₺210"],
                  ["Tavuklu Sandviç", "₺195"],
                ].map(([name, price]) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-black/10 bg-white p-3"
                  >
                    <p className="text-sm text-black/60">Öne çıkan ürün</p>
                    <p className="mt-1 font-semibold">{name}</p>
                    <p className="text-sm font-bold text-[#ff5d0a]">{price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-black text-white hover:bg-black/85"
                >
                  <Link href="/menu">Canlı Menü</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-black hover:bg-white/85"
                >
                  <Link href="#cozum">Özellikleri Gör</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-black/10 bg-[#e5e1d8] py-2">
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 text-[11px] font-bold tracking-wide text-black/70 uppercase md:px-6">
          {[...ticker, ...ticker].map((item, idx) => (
            <span key={`${item}-${idx}`} className="shrink-0">
              • {item}
            </span>
          ))}
        </div>
      </div>

      <section
        id="menu-panelleri"
        className="mx-auto -mt-4 w-full max-w-6xl px-6 pb-16 pt-10 md:pb-24"
      >
        <div className="rounded-[1.75rem] border border-black/10 bg-[#f4f0e8] p-5 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-bold tracking-wide uppercase">
              Menü Panelleri
            </p>
            <Button size="sm" className="bg-black text-white hover:bg-black/85">
              Tümünü Gör
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {menuCards.map(([title, count, text]) => (
              <article
                key={title}
                className="rounded-3xl border border-black/10 bg-white p-4"
              >
                <div className="mb-3 inline-flex rounded-full bg-[#7f1148]/10 px-2.5 py-1 text-[11px] font-bold text-[#7f1148] uppercase">
                  {count}
                </div>
                <h3 className="font-heading text-xl font-extrabold uppercase">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-black/70">{text}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#ff5d0a]">
                  <CheckCircle2 className="size-3.5" />
                  Aktif
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cozum" className="px-6 pb-16 text-center md:pb-24">
        <MyHeader className="text-5xl md:text-7xl">
          <span className="text-[#ff5d0a]">QR MENÜ</span>
          <br />
          MENÜ YÖNETİMİ
          <br />
          MÜŞTERİ DETAYI
          <br />
          <span className="text-[#ff5d0a]">ANLIK GÜNCELLEME</span>
          <br />
          RAPORLAMA
        </MyHeader>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24">
        <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 md:p-8">
          <MyHeader className="text-5xl md:text-7xl">
            GÜÇLÜ ALTYAPI,
            <br />
            BÜYÜYEN İŞLETME
          </MyHeader>
          <div className="mt-6 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-my-lavender p-5">
              <MyHeader className="text-3xl md:text-5xl">
                KAFE VE RESTORANLAR
                <br />
                İÇİN TEK PANEL
              </MyHeader>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-white/85 p-3">
                  <p className="text-xs font-bold uppercase">Şube Yönetimi</p>
                  <p className="text-sm text-black/70">
                    Her şube için ayrı menü kur
                  </p>
                </div>
                <div className="rounded-lg bg-white/85 p-3">
                  <p className="text-xs font-bold uppercase">Masa Takibi</p>
                  <p className="text-sm text-black/70">
                    Masa bazlı QR kod oluştur
                  </p>
                </div>
              </div>
            </div>
            <article className="rounded-3xl border border-black/10 p-5">
              <p className="text-sm text-black/65">
                Menüde bir değişiklik yaptığında müşteriler anında güncel halini
                görür. Baskı maliyeti azalır, servis hızı artar.
              </p>
              <div className="mt-5 space-y-3 text-sm">
                {[
                  "QR okutunca tüm ürün detayları",
                  "Alerjen ve içerik bilgisini gösterme",
                  "Kampanya ürünlerini öne çıkarma",
                ].map((item) => (
                  <p key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-[#7f1148]" />
                    {item}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 text-center md:pb-24">
        <p className="text-xs font-bold uppercase">İş akışı</p>
        <MyHeader className="mt-2 text-4xl md:text-6xl">
          Panelden
          <br />
          Masaya
        </MyHeader>
        <div className="mx-auto mt-8 grid w-full max-w-6xl gap-4 md:grid-cols-4">
          {colorfulCards.map(([bg, title, text]) => (
            <article
              key={title}
              className={cn(
                "rounded-[1.35rem] p-4 text-left flex flex-col justify-between",
                bg,
              )}
            >
              <div>
                <p className="text-xs font-semibold uppercase ">Adım</p>
                <h3 className="mt-1 font-heading text-2xl leading-none font-extrabold uppercase">
                  {title}
                </h3>
                <p className="mt-2 text-sm ">{text}</p>
              </div>
              <div>
                <MyButton className="mt-4  bg-white text-black hover:bg-white/85">
                  Detay
                </MyButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="haberler" className="px-6 pb-16 text-center md:pb-24">
        <p className="text-xs font-bold uppercase">Neler Yeni</p>
        <MyHeader className="mt-2  text-4xl md:text-6xl">
          QR Menü
          <br />
          Dünyası
        </MyHeader>
        <div className="mx-auto mt-8 grid w-full max-w-6xl gap-4 rounded-[1.35rem] bg-[#bca7f2] p-4 text-left md:grid-cols-[0.15fr_0.45fr_0.4fr] md:p-6">
          <div className="hidden items-stretch gap-2 md:flex md:flex-col">
            {["GÜNCELLEME", "ÖZELLİK", "DUYURU"].map((item, index) => (
              <span
                key={item}
                className="rounded-full px-2 py-2 text-center text-[11px] font-bold tracking-wide uppercase"
                style={{
                  background:
                    index === 0
                      ? "#f6b500"
                      : index === 1
                        ? "#13a9e8"
                        : "#d7cdf8",
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="rounded-2xl bg-white/75 p-4">
            <p className="text-xs text-black/60">Nisan 2026</p>
            <MyHeader className="mt-2  text-3xl md:text-3xl uppercase">
              Çoklu Şube
              <br />
              QR Yönetimi
            </MyHeader>
            <p className="mt-3 text-sm text-black/70">
              Yeni sürümle tüm şubelerinin menülerini tek panelden yönetebilir,
              her şube için ayrı QR kod kuralları tanımlayabilirsin.
            </p>
            <Button
              size="sm"
              className="mt-4 bg-black text-white hover:bg-black/85"
            >
              Haberi Oku
            </Button>
          </div>
          <article className="rounded-2xl bg-white p-4">
            <p className="text-sm font-semibold uppercase">Öne Çıkan Kazanım</p>
            <div className="mt-4 space-y-3">
              {[
                ["%42", "QR okutma artışı"],
                ["%55", "Basılı menü maliyet düşüşü"],
                ["%29", "Ürün detay görüntüleme artışı"],
              ].map(([value, text]) => (
                <div
                  key={text}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <p className="font-heading text-2xl font-extrabold text-[#ff5d0a]">
                    {value}
                  </p>
                  <p className="text-sm text-black/70">{text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <div className="overflow-hidden border-y border-black/10 bg-[#e5e1d8] py-2">
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 text-[11px] font-bold tracking-wide text-black/70 uppercase md:px-6">
          {[...ticker, ...ticker].map((item, idx) => (
            <span key={`${item}-bottom-${idx}`} className="shrink-0">
              • {item}
            </span>
          ))}
        </div>
      </div>

      <section className="bg-my-red px-6 py-16 text-white md:py-20">
        <div className="mx-auto w-full max-w-6xl text-center">
          <p className="text-xs font-bold uppercase">Bizi Takip Et</p>
          <MyHeader className="mt-3 text-4xl leading-none font-extrabold uppercase md:text-8xl text-white">
            @qrmenuhizmeti
            <br />
            Daha Fazlası İçin
          </MyHeader>
          <div className="mx-auto mt-4 flex w-fit flex-wrap gap-2">
            {["Instagram", "LinkedIn", "YouTube", "TikTok"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/30 px-3 py-1 text-xs"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {[
              "Masa QR",
              "Dijital Menü",
              "Mobil Görünüm",
              "Ürün Detayı",
              "Şube Yönetimi",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-black/25 p-4 text-left backdrop-blur"
              >
                <p className="text-xs text-white/75">Özellik</p>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#1f1a1d] px-6 pb-10 pt-12 text-white">
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-[1.35rem] bg-[#bca7f2] p-6 text-black md:p-8">
            <p className="text-xs font-bold uppercase">Bülten</p>
            <p className="mt-2 font-heading text-4xl leading-none font-extrabold uppercase md:text-6xl">
              Menü İçgörüleri
              <br />
              Her Ay Gelen Kutunda
            </p>
            <p className="mt-3 max-w-2xl text-sm text-black/75">
              QR menü trendleri, dönüşüm artırma taktikleri ve yeni ürün
              güncellemelerini kaçırma.
            </p>
            <Button className="mt-5 bg-black text-white hover:bg-black/85">
              Güncellemeleri Al
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-carter text-2xl">QRARS</p>
              <p className="mt-2 text-2xl font-bold tracking-wide text-[#d6b16f] uppercase">
                #MENÜNQRDA
              </p>
            </div>
            <div className="grid gap-5 text-sm text-white/80 md:grid-cols-3 md:gap-10">
              <div className="space-y-1">
                <p className="font-semibold text-white">Platform</p>
                <p>Ürünler</p>
                <p>Çözümler</p>
                <p>Fiyatlandırma</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-white">Kaynaklar</p>
                <p>Yardım Merkezi</p>
                <p>Blog</p>
                <p>Demo Talebi</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-white">İletişim</p>
                <p>info@qrmenu.app</p>
                <p>+90 850 000 00 00</p>
                <p>İstanbul, Türkiye</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/60">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p>© 2026 QRARS. Tüm hakları saklıdır.</p>
              <div className="flex items-center gap-3">
                <Store className="size-4" />
                <QrCode className="size-4" />
                <Smartphone className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
