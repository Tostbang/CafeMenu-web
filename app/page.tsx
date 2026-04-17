"use client"
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
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { Benefits } from "@/components/landing/Benefits";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

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
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
}
