import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Figtree, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";




const carter = localFont({
  src: "./VeniceBlvd-Black.woff2",
  variable: "--font-carter-one",
  weight: "400",
});
const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["400", "700", "500", "600"],
});

const SpaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  weight: ["300","400", "500", "600", "700"],
});

const degular = localFont({
  variable: "--font-degular",
  src: [
    {
      path: "./Degular-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Degular-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "QR Menü | Kafe ve Restoranlar için Dijital Menü",
    template: "%s | QR Menü",
  },
  description:
    "Kafe ve restoran sahipleri için menü oluşturma, QR kod ile paylaşma ve müşteriye mobil menü deneyimi sunma platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`h-full antialiased font-sans`}
    >
      <body
        className={`min-h-full flex flex-col bright ${figtree.variable} ${degular.className} ${carter.variable} ${SpaceGrotesk.variable}`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
