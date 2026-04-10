"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import {
  Copy,
  Download,
  ExternalLink,
  Printer,
  Share2,
  Smartphone,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useQueryOP } from "@/lib/Fetch";

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function toExternalUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default function QrPage() {
  const getMyMenuQuery = useQueryOP("get", "/api/Menu/GetMyMenu");
  const menu = getMyMenuQuery.data?.menu;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const [feedback, setFeedback] = useState<string | null>(null);

  const menuTitle = menu?.title?.trim() ?? "";
  const menuSlug = menu?.slug?.trim() ?? "";
  const isMenuReady = Boolean(menu?.menuId && menuTitle && menuSlug);

  const publicMenuUrl = useMemo(() => {
    if (!origin || !menuSlug) {
      return "";
    }
    return `${origin}/menu/${menuSlug}`;
  }, [origin, menuSlug]);

  const socialLinks = [
    menu?.instagramUrl
      ? { label: "Instagram", href: toExternalUrl(menu.instagramUrl) }
      : null,
    menu?.facebookUrl
      ? { label: "Facebook", href: toExternalUrl(menu.facebookUrl) }
      : null,
    menu?.xUrl ? { label: "X", href: toExternalUrl(menu.xUrl) } : null,
    menu?.whatsappPhone
      ? {
          label: "WhatsApp",
          href: `https://wa.me/${menu.whatsappPhone.replace(/\D/g, "")}`,
        }
      : null,
  ].filter((entry): entry is { label: string; href: string } => Boolean(entry));

  const qrCodeQuery = useQuery({
    queryKey: ["menu-qr-code", publicMenuUrl],
    queryFn: async () => {
      const [pngDataUrl, svgMarkup] = await Promise.all([
        QRCode.toDataURL(publicMenuUrl, {
          width: 720,
          margin: 2,
          errorCorrectionLevel: "H",
        }),
        QRCode.toString(publicMenuUrl, {
          type: "svg",
          margin: 2,
          errorCorrectionLevel: "H",
        }),
      ]);
      return { pngDataUrl, svgMarkup };
    },
    enabled: isMenuReady && Boolean(publicMenuUrl),
    staleTime: Infinity,
  });

  const qrPngDataUrl = qrCodeQuery.data?.pngDataUrl ?? "";
  const qrSvgMarkup = qrCodeQuery.data?.svgMarkup ?? "";
  const isGeneratingQr = qrCodeQuery.isPending;
  const qrError = qrCodeQuery.isError
    ? toErrorMessage(qrCodeQuery.error, "QR kod oluşturulamadı.")
    : null;

  const encodedMenuUrl = encodeURIComponent(publicMenuUrl);
  const encodedTitle = encodeURIComponent(menuTitle || "Cafe Menu");
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedMenuUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedMenuUrl}`,
    x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedMenuUrl}`,
  };

  const onDownloadSvg = () => {
    if (!qrSvgMarkup) {
      return;
    }

    const blob = new Blob([qrSvgMarkup], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = `${menuSlug || "menu"}-qr.svg`;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  };

  const onCopyMenuLink = async () => {
    if (!publicMenuUrl) {
      return;
    }
    try {
      await navigator.clipboard.writeText(publicMenuUrl);
      setFeedback("Menü bağlantısı kopyalandı.");
    } catch (error) {
      setFeedback(toErrorMessage(error, "Bağlantı kopyalanamadı."));
    }
  };

  const onNativeShare = async () => {
    if (!publicMenuUrl || !navigator.share) {
      return;
    }

    try {
      await navigator.share({
        title: menuTitle || "Cafe Menü",
        text: `${menuTitle || "Cafe Menü"} QR bağlantısı`,
        url: publicMenuUrl,
      });
    } catch {
      // User can cancel share without needing extra UI.
    }
  };

  const onPrint = () => {
    if (!qrPngDataUrl || !publicMenuUrl) {
      return;
    }

    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) {
      setFeedback("Yazdırma penceresi açılamadı.");
      return;
    }

    const escapedTitle = escapeHtml(menuTitle || "Cafe Menü");
    const escapedUrl = escapeHtml(publicMenuUrl);
    const escapedSocial = socialLinks
      .map((item) => `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.href)}</li>`)
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>${escapedTitle} QR</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
            h1 { margin: 0 0 8px; font-size: 24px; }
            p { margin: 0 0 6px; }
            img { width: 280px; height: 280px; border: 1px solid #e5e7eb; padding: 10px; border-radius: 14px; margin: 16px 0; }
            ul { margin: 14px 0 0; padding-left: 18px; }
          </style>
        </head>
        <body>
          <h1>${escapedTitle}</h1>
          <p>Menü Linki: ${escapedUrl}</p>
          <img src="${qrPngDataUrl}" alt="QR Code" />
          ${
            escapedSocial
              ? `<h3>Sosyal Medya</h3><ul>${escapedSocial}</ul>`
              : ""
          }
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl rounded-2xl border p-4 md:p-6">
        <div className="mb-6">
          <h1 className="font-carter text-3xl uppercase">QR Kod</h1>
          <p className="mt-1 text-sm">
            Menü bağlantınızı QR kod olarak indirip paylaşın veya yazdırın.
          </p>
        </div>

        {getMyMenuQuery.isPending && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">
            Menü bilgileri yükleniyor...
          </p>
        )}

        {getMyMenuQuery.isError && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">
            {toErrorMessage(getMyMenuQuery.error, "Menü bilgileri alınamadı.")}
          </p>
        )}

        {feedback && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">{feedback}</p>
        )}

        {!getMyMenuQuery.isPending && !isMenuReady && (
          <div className="rounded-xl border p-4 text-sm">
            <p>
              First add your menu, then you can see your QR code here.
            </p>
            <p className="mt-2">
              Önce menü adınızı ve temel menü bilgilerinizi girin, sonra QR kod
              burada otomatik oluşur.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dash/menu">Menü Bilgilerini Tamamla</Link>
            </Button>
          </div>
        )}

        {!getMyMenuQuery.isPending && isMenuReady && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
            <div className="rounded-xl border p-4">
              <p className="text-sm font-semibold">{menuTitle}</p>
              <p className="mt-1 break-all text-xs text-muted-foreground">
                {publicMenuUrl}
              </p>

              <div className="mt-4 rounded-xl border bg-white p-3">
                {isGeneratingQr && (
                  <p className="py-14 text-center text-sm">QR kod hazırlanıyor...</p>
                )}
                {!isGeneratingQr && qrError && (
                  <p className="py-14 text-center text-sm">{qrError}</p>
                )}
                {!isGeneratingQr && !qrError && qrPngDataUrl && (
                  <Image
                    src={qrPngDataUrl}
                    alt={`${menuTitle} QR`}
                    width={280}
                    height={280}
                    className="mx-auto h-auto w-full max-w-[280px]"
                  />
                )}
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <h2 className="text-lg font-semibold">Paylaş & İndir</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                QR kodu PNG/SVG olarak indirebilir, yazdırabilir veya sosyal
                medyada paylaşabilirsiniz.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    if (!qrPngDataUrl) {
                      return;
                    }
                    const anchor = document.createElement("a");
                    anchor.href = qrPngDataUrl;
                    anchor.download = `${menuSlug}-qr.png`;
                    anchor.click();
                  }}
                  disabled={!qrPngDataUrl}
                >
                  <Download className="mr-1" />
                  PNG İndir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onDownloadSvg}
                  disabled={!qrSvgMarkup}
                >
                  <Download className="mr-1" />
                  SVG İndir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onPrint}
                  disabled={!qrPngDataUrl}
                >
                  <Printer className="mr-1" />
                  Yazdır
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCopyMenuLink}
                  disabled={!publicMenuUrl}
                >
                  <Copy className="mr-1" />
                  Linki Kopyala
                </Button>
                <Button asChild variant="outline" disabled={!publicMenuUrl}>
                  <a href={publicMenuUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-1" />
                    Menüyü Aç
                  </a>
                </Button>
                {typeof navigator !== "undefined" && "share" in navigator && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onNativeShare}
                    disabled={!publicMenuUrl}
                  >
                    <Smartphone className="mr-1" />
                    Cihazda Paylaş
                  </Button>
                )}
              </div>

              <h3 className="mt-6 text-sm font-semibold">Sosyal Paylaşım</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm" disabled={!publicMenuUrl}>
                  <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer">
                    <Share2 className="mr-1" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" disabled={!publicMenuUrl}>
                  <a href={shareLinks.facebook} target="_blank" rel="noreferrer">
                    <Share2 className="mr-1" />
                    Facebook
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" disabled={!publicMenuUrl}>
                  <a href={shareLinks.x} target="_blank" rel="noreferrer">
                    <Share2 className="mr-1" />X
                  </a>
                </Button>
              </div>

              <h3 className="mt-6 text-sm font-semibold">Menü Sosyal Medyası</h3>
              {socialLinks.length === 0 ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Menüde sosyal medya linki bulunmuyor.
                </p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {socialLinks.map((socialLink) => (
                    <Button asChild key={socialLink.label} variant="secondary" size="sm">
                      <a href={socialLink.href} target="_blank" rel="noreferrer">
                        {socialLink.label}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
