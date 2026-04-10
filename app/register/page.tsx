import { RegisterForm } from "./_components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-dvh bg-[#f2efed] px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-4 rounded-[2rem] bg-[#f4f0e8] p-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)] md:grid-cols-[1.1fr_0.9fr] md:p-4">
        <section className="relative overflow-hidden rounded-[1.75rem] bg-my-dark-background p-6 text-my-bright-background md:p-10">
          <div className="absolute -left-16 top-10 size-36 rounded-full bg-my-blue/20 blur-3xl" />
          <div className="absolute -right-16 bottom-4 size-40 rounded-full bg-my-plum/30 blur-3xl" />

          <div className="relative">
            <p className="inline-flex rounded-full bg-my-bright-background/10 px-3 py-1 text-xs font-semibold uppercase">
              Yeni Hesap
            </p>
            <h1 className="mt-4 font-carter text-4xl leading-tight uppercase sm:text-5xl">
              Kafeni Dijitale
              <br />
              Taşı
            </h1>
            <p className="mt-4 max-w-md text-sm text-my-bright-background/80 sm:text-base">
              Hesabını oluştur, ürünlerini ekle ve müşterilerine QR ile modern
              bir menü deneyimi sun.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full bg-my-bright-background/15 px-3 py-1 text-xs font-semibold">
                Hızlı Kurulum
              </span>
              <span className="rounded-full bg-my-bright-background/15 px-3 py-1 text-xs font-semibold">
                Kategori Yönetimi
              </span>
              <span className="rounded-full bg-my-bright-background/15 px-3 py-1 text-xs font-semibold">
                QR ile Paylaş
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-white p-4 md:p-6">
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
