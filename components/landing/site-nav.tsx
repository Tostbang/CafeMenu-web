import Link from "next/link";
import Image from "next/image";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-charcoal/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-2">
          {/* <span className="grid h-9 w-9 place-items-center rounded-full bg-charcoal text-cream"> */}
          {/*   <QrCode className="h-5 w-5" aria-hidden="true" /> */}
          {/* </span> */}
          <Image
            src="/logo.svg"
            alt="Kahve, baklava ve dijital menüyü gösteren telefonun yer aldığı kafe masası"
            width={30}
            height={30}
            className=" size-12 object-cover aspect-square"
            priority
          />

          <span className="text-xl font-bold tracking-tight text-charcoal">
	  QR Menü
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal/80">
          <li>
            <a href="#features" className="hover:text-charcoal">
              Özellikler
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="hover:text-charcoal">
              Nasıl çalışır
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-charcoal">
              Fiyatlandırma
            </a>
          </li>
          <li>
            <Link href="/menu" className="hover:text-charcoal">
              Örnek menü
            </Link>
          </li>

          <li>
            <a href="#faq" className="hover:text-charcoal">
              SSS
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-cream hover:bg-charcoal/90"
          >
            Hemen başla
          </Link>
        </div>
      </nav>
    </header>
  );
}
