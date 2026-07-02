import { Suspense } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/landing/cta-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { RegisterForm } from "./_components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-[2.5rem] border-2 border-charcoal bg-cream p-3 shadow-[0_10px_0_0_#313131] md:grid-cols-[1.05fr_0.95fr] md:p-4">
            <section className="relative overflow-hidden rounded-[2rem] border-2 border-charcoal bg-red p-7 text-white sm:p-10">
              <span className="inline-flex rounded-full border-2 border-charcoal bg-cream px-3 py-1 text-xs font-bold uppercase text-charcoal">
                Yeni Hesap
              </span>
              <h1 className="mt-4 max-w-lg text-4xl font-bold leading-tight text-balance sm:text-5xl">
                Kafeni dakikalar içinde dijitale taşı.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
                Hesabını oluştur, ürün ve kategorilerini ekle, QR menünü tek
                panelden kolayca yönet.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-charcoal">
                <span className="rounded-full border-2 border-charcoal bg-cream px-3 py-1 text-xs font-bold">
                  Hızlı Kurulum
                </span>
                <span className="rounded-full border-2 border-charcoal bg-lime px-3 py-1 text-xs font-bold">
                  Kategori Yönetimi
                </span>
                <span className="rounded-full border-2 border-charcoal bg-white px-3 py-1 text-xs font-bold">
                  QR ile Paylaş
                </span>
              </div>
              <Link
                href="/login"
                className="mt-8 inline-flex rounded-full border-2 border-charcoal bg-charcoal px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-charcoal/90"
              >
                Hesabın varsa giriş yap
              </Link>
            </section>

            <section className="rounded-[2rem] border-2 border-charcoal bg-white p-4 sm:p-6">
              <Suspense fallback={<div className="py-8 text-center text-sm text-muted-foreground">Yükleniyor...</div>}>
                <RegisterForm />
              </Suspense>
            </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
