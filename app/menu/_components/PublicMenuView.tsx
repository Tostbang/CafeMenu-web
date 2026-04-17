"use client";

import Image from "next/image";
import { FacebookFilled, InstagramFilled, WhatsappFilled } from "asem-icons";
import { CategoryNav } from "@/components/CategoryNav";
import {
  MenuProduct,
  MenuProductDrawer,
  MyTag,
} from "@/components/MenuProduct";
import { defaultMenuTheme, MenuTheme, toMenuThemeVars } from "@/lib/menu-theme";
import { IconType } from "@/lib/types";
import { components } from "@/lib/types/api";
import { cn } from "@/lib/utils";

type PublicMenu =
  components["schemas"]["CafeMenu.Entity.DTO.PublicMenuDetailModel"];

function normalizeExternalUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function toWhatsAppUrl(phone: string) {
  const normalizedPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}`;
}

export default function PublicMenuView({
  menu,
  theme = defaultMenuTheme,
  isPreview = false,
}: {
  menu: PublicMenu;
  theme?: MenuTheme;
  isPreview?: boolean;
}) {
  if (!menu) {
    return;
  }
  const categories = [...(menu.categories ?? [])].sort((a, b) => a.order - b.order);
  const totalProducts = categories.reduce(
    (count, category) => count + (category.products?.length ?? 0),
    0,
  );

  const menuTitle = menu.title || "Menü";
  const menuDescription = menu.description || "Menümüzü keşfedin";
  const socialLinks = [
    menu.facebookUrl
      ? {
          Icon: FacebookFilled,
          name: "Facebook",
          link: normalizeExternalUrl(menu.facebookUrl),
        }
      : null,
    menu.instagramUrl
      ? {
          Icon: InstagramFilled,
          name: "Instagram",
          link: normalizeExternalUrl(menu.instagramUrl),
        }
      : null,
    menu.whatsappPhone
      ? {
          Icon: WhatsappFilled,
          name: "WhatsApp",
          link: toWhatsAppUrl(menu.whatsappPhone),
        }
      : null,
  ].filter((item): item is { Icon: IconType; name: string; link: string } =>
    Boolean(item),
  );

  return (
    <main
      style={toMenuThemeVars(theme)}
      className={cn(
        "relative bg-linear-to-b from-[var(--menu-bg-start)] via-[var(--menu-bg-middle)] to-[var(--menu-bg-end)] pb-8 font-space",
        isPreview ? "min-h-full bg-scroll pt-2" : "min-h-dvh bg-fixed pt-3",
      )}
    >
      <div className={cn("mx-auto max-w-360 px-5 md:px-6", isPreview && "px-3 py-1")}>
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--menu-border)] bg-[var(--menu-surface)] p-4 text-[var(--menu-text)] shadow-[0_14px_36px_rgba(15,23,42,0.1)] sm:p-6">
          {menu.backgroundImageUrl && (
            <Image
              src={menu.backgroundImageUrl}
              alt={menuTitle}
              fill
              className="object-cover opacity-10"
              priority
            />
          )}

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4 sm:flex-row sm:items-center">
              {menu.logoUrl ? (
                <Image
                  src={menu.logoUrl}
                  alt={`${menuTitle} logosu`}
                  width={200}
                  height={200}
                  className="size-24 rounded-[1.25rem] border border-[var(--menu-border)] object-cover shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:size-28"
                  loading="eager"
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-[1.25rem] border border-[var(--menu-border)] bg-[var(--menu-card)] text-3xl text-[var(--menu-text)] sm:size-28">
                  {menuTitle.slice(0, 1)}
                </div>
              )}

              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {menuTitle}
                </h1>
                <p className="mt-1 max-w-xl text-sm text-[var(--menu-muted-text)] sm:text-base">
                  {menuDescription}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <p className="rounded-full border border-[var(--menu-border)] bg-[var(--menu-secondary)] px-3 py-1 text-xs font-semibold text-[var(--menu-on-secondary)] sm:text-sm">
                    {categories.length} kategori
                  </p>
                  <p className="rounded-full border border-[var(--menu-border)] bg-[var(--menu-tertiary)] px-3 py-1 text-xs font-semibold text-[var(--menu-on-tertiary)] sm:text-sm">
                    {totalProducts} ürün
                  </p>
                </div>
              </div>
            </div>
            {menu.address && (
              <p className="mt-2 max-w-2xl text-sm text-[var(--menu-muted-text)]">
                {menu.address}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((socialLink) => (
                <SocialMediaCard
                  key={socialLink.name}
                  Icon={socialLink.Icon}
                  name={socialLink.name}
                  link={socialLink.link}
                />
              ))}
            </div>
          </div>
        </section>
        <CategoryNav menu={menu} categories={categories} isPreview={isPreview} />

        <div className="mt-4 space-y-4 md:mt-6">
          {categories.map((category) => (
            <section
              id={`category-${category.categoryId}`}
              key={category.categoryId}
              className="scroll-mt-36 rounded-[1.75rem] bg-transparent"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="px-2 text-2xl font-bold text-[var(--menu-text)] sm:text-3xl">
                  {category.name || "Kategori"}
                </h2>
                <p className="rounded-full border border-[var(--menu-border)] bg-[var(--menu-surface)] px-2.5 py-1 text-xs font-medium text-[var(--menu-muted-text)] sm:text-sm">
                  {category.products?.length ?? 0} adet
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {(category.products ?? []).map((product) => (
                  <MenuProduct
                    product={product}
                    key={product.productId}
                    interactive={!isPreview}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      {!isPreview && <MenuProductDrawer theme={theme} />}
    </main>
  );
}

function SocialMediaCard({
  Icon,
  name,
  link,
}: {
  Icon: IconType;
  name: string;
  link: string;
}) {
  return (
    <a href={link} target="_blank" rel="noreferrer" aria-label={name}>
      <MyTag
        Icon={Icon}
        name={name}
        color="bg-[var(--menu-primary)] text-[var(--menu-on-primary)]"
      />
    </a>
  );
}
