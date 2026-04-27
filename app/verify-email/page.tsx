import { Suspense } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/landing/cta-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { VerifyEmailForm } from "./_components/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-[2.5rem] border-2 border-charcoal bg-cream p-3 shadow-[0_10px_0_0_#313131] md:grid-cols-[1.05fr_0.95fr] md:p-4">
            <section className="relative overflow-hidden rounded-[2rem] border-2 border-charcoal bg-pink p-7 text-charcoal sm:p-10">
              <span className="inline-flex rounded-full border-2 border-charcoal bg-charcoal px-3 py-1 text-xs font-bold uppercase text-cream">
                E-posta Doğrulama
              </span>
              <h1 className="mt-4 max-w-lg text-4xl font-bold leading-tight text-balance sm:text-5xl">
                Son adım: hesabını doğrula.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/80">
                Kayıt sırasında paylaştığın e-postaya gönderilen kodu gir ve
                hesabını hemen aktif et.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-full border-2 border-charcoal bg-cream px-3 py-1 text-xs font-bold">
                  6 Haneli Kod
                </span>
                <span className="rounded-full border-2 border-charcoal bg-lime px-3 py-1 text-xs font-bold">
                  Hızlı Doğrulama
                </span>
                <span className="rounded-full border-2 border-charcoal bg-white px-3 py-1 text-xs font-bold">
                  Tek Tıkla Yeniden Gönder
                </span>
              </div>
              <Link
                href="/register"
                className="mt-8 inline-flex rounded-full border-2 border-charcoal bg-charcoal px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-charcoal/90"
              >
                Bilgileri düzenlemek için kayda dön
              </Link>
            </section>

            <section className="rounded-[2rem] border-2 border-charcoal bg-white p-4 sm:p-6">
              <Suspense>
                <VerifyEmailForm />
              </Suspense>
            </section>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
