"use client";

import Image from "next/image";
import { FacebookFilled, InstagramFilled, WhatsappFilled } from "asem-icons";
import { CategoryNav } from "@/components/CategoryNav";
import {
  MenuProduct,
  MenuProductDrawer,
  MyTag,
} from "@/components/MenuProduct";
import { Skeleton } from "@/components/ui/skeleton";
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
    return <PublicMenuViewSkeleton theme={theme} isPreview={isPreview} />;
  }
  const rawCategories = menu.categories ?? [];
  const categories =
    rawCategories.length > 1
      ? [...rawCategories].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        )
      : rawCategories;
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
        categories.length > 0 ? "mt-28" : "mt-24",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-360 px-5 md:px-6 ",
          isPreview && "px-3 py-1",
        )}
      >
        <CategoryNav
          menu={menu}
          categories={categories}
          isPreview={isPreview}
        />
        <section className="relative overflow-hidden  rounded-[2rem] border border-[var(--menu-border)] bg-[var(--menu-surface)] p-4 text-[var(--menu-text)] border-2 border-charcoal p-7 shadow-[0_6px_0_0_#313131] sm:p-6">
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
                  className="size-24 border-3 border-charcoal rounded-[1.25rem]  object-cover shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:size-28"
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
                {menu.address && (
                  <p className="mt-3 max-w-2xl text-sm text-[var(--menu-muted-text)]">
                    {menu.address}
                  </p>
                )}
              </div>
            </div>

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

export function PublicMenuViewSkeleton({
  theme = defaultMenuTheme,
  isPreview = false,
}: {
  theme?: MenuTheme;
  isPreview?: boolean;
}) {
  return (
    <main
      style={toMenuThemeVars(theme)}
      className={cn(
        "relative bg-linear-to-b  from-[var(--menu-bg-start)] via-[var(--menu-bg-middle)] to-[var(--menu-bg-end)] pb-8 font-space",
        isPreview ? "min-h-full bg-scroll pt-2" : "min-h-dvh bg-fixed pt-3",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-360 px-5 md:px-6",
          isPreview && "px-3 py-1",
        )}
      >
        <div className="mb-4 flex flex-wrap gap-2 rounded-2xl border border-[var(--menu-border)] bg-[var(--menu-surface)] p-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-20 rounded-full !bg-white" />
          ))}
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-2 border-charcoal bg-[var(--menu-surface)] p-7 text-[var(--menu-text)] shadow-[0_6px_0_0_#313131] sm:p-6">
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4 sm:flex-row sm:items-center">
              <Skeleton className="size-24 rounded-[1.25rem] border-3 border-charcoal !bg-white sm:size-28" />

              <div className="space-y-3">
                <Skeleton className="h-10 w-52 !bg-white" />
                <Skeleton className="h-5 w-72 !bg-white" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Skeleton className="h-7 w-24 rounded-full !bg-white" />
                  <Skeleton className="h-7 w-20 rounded-full !bg-white" />
                </div>
              </div>
            </div>

            <Skeleton className="h-4 w-56 !bg-white" />

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-9 w-28 rounded-full !bg-white"
                />
              ))}
            </div>
          </div>
        </section>

        <div className="mt-4 space-y-4 md:mt-6">
          {Array.from({ length: 3 }).map((_, categoryIndex) => (
            <section
              key={categoryIndex}
              className="scroll-mt-36 rounded-[1.75rem] bg-transparent"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <Skeleton className="h-8 w-44 !bg-white" />
                <Skeleton className="h-7 w-16 rounded-full !bg-white" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, productIndex) => (
                  <div
                    key={productIndex}
                    className="rounded-[1.5rem] border border-[var(--menu-border)] bg-[var(--menu-card)] p-3"
                  >
                    <Skeleton className="h-40 w-full !bg-white" />
                    <Skeleton className="mt-3 h-6 w-3/4 !bg-white" />
                    <Skeleton className="mt-2 h-4 w-full !bg-white" />
                    <Skeleton className="mt-2 h-4 w-5/6 !bg-white" />
                    <Skeleton className="mt-3 h-7 w-24 rounded-full !bg-white" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
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
