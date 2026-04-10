import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Geist, Montserrat } from "next/font/google";
import Providers from "@/components/Providers";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const carter = localFont({
  src: "./VeniceBlvd-Black.woff2",
  variable: "--font-carter-one",
  weight: "400",
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
      className={`${geist.variable} ${montserratHeading.variable} h-full antialiased font-sans`}
    >
      <body
        className={`min-h-full flex flex-col bright ${degular.className} ${carter.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
