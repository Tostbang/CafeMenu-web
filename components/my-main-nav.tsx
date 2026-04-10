import Link from "next/link";
import { MyButton } from "./myButtons";

export default function MyMainNav() {
  return (
    <header className="fixed z-50 border-b border-white/10 bg-[#1f1a1d] text-white top-5 inset-x-12 h-18 flex items-center rounded-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 ">
        <nav className="hidden items-center gap-4 text-base font-semibold md:flex ">
          <Link href="#cozum">Ürün</Link>
          <Link href="#menu-panelleri">Paneller</Link>
          <Link href="#haberler">Haberler</Link>
        </nav>
        <Link href="/" className="font-carter text-2xl tracking-wide">
          LOGO
        </Link>
        <div className="space-x-2">
          <MyButton className="bg-white text-black hover:bg-white/85">
            <Link href="/menu">Menüyü Gör</Link>
          </MyButton>
          <MyButton className="bg-transparent text-white border border-my-bright-background">
            <Link href="/menu">Menüyü Gör</Link>
          </MyButton>
        </div>
      </div>
    </header>
  );
}
