"use client";

import Image from "next/image";
import { FacebookFilled, InstagramFilled, WhatsappFilled } from "asem-icons";
import { CategoryNav } from "@/components/CategoryNav";
import { MenuProduct } from "@/components/MenuProduct";
import { IconType } from "@/lib/types";
import { components } from "@/lib/types/api";

type PublicMenu = components["schemas"]["CafeMenu.Entity.DTO.PublicMenuDetailModel"];

function normalizeExternalUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function toWhatsAppUrl(phone: string) {
  const normalizedPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}`;
}

export default function PublicMenuView({ menu }: { menu: PublicMenu }) {
  const categories = [...(menu.categories ?? [])].sort((a, b) => a.order - b.order);
  const totalProducts = categories.reduce(
    (count, category) => count + (category.products?.length ?? 0),
    0,
  );
  const menuTitle = menu.title || "Menu";
  const menuDescription = menu.description || "Discover our menu";
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
    <main className="relative min-h-dvh bg-my-bright-background px-3 pb-8 pt-3 md:px-4">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-my-dark-background p-4 text-my-bright-background shadow-[0_16px_40px_rgba(15,23,42,0.18)] sm:p-6">
          {menu.backgroundImageUrl && (
            <Image
              src={menu.backgroundImageUrl}
              alt={menuTitle}
              fill
              className="object-cover opacity-15"
              priority
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-my-dark-background/80 via-my-dark-background/45 to-transparent" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {menu.logoUrl ? (
                <Image
                  src={menu.logoUrl}
                  alt={`${menuTitle} logo`}
                  width={200}
                  height={200}
                  className="size-24 rounded-[1.25rem] border border-my-bright-background/30 object-cover shadow-[0_8px_24px_rgba(15,23,42,0.2)] sm:size-28"
                  loading="eager"
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-[1.25rem] bg-my-menu-background font-carter text-3xl text-my-dark-background">
                  {menuTitle.slice(0, 1)}
                </div>
              )}

              <div>
                <h1 className="font-carter text-3xl uppercase sm:text-4xl">
                  {menuTitle}
                </h1>
                <p className="mt-1 max-w-xl text-sm opacity-90 sm:text-base">
                  {menuDescription}
                </p>
                <p className="mt-2 text-sm opacity-80">
                  {categories.length} categories • {totalProducts} products
                </p>
                {menu.address && (
                  <p className="mt-1 max-w-2xl text-sm opacity-75">
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
        <CategoryNav menu={menu} categories={categories} />

        <div className="mt-4 space-y-4 md:mt-6">
          {categories.map((category) => (
            <section
              id={`category-${category.categoryId}`}
              key={category.categoryId}
              className="scroll-mt-36 rounded-[1.75rem] bg-my-menu-background p-3 shadow-[0_10px_28px_rgba(15,23,42,0.12)] sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="font-carter text-2xl text-my-dark-background/85 sm:text-3xl">
                  {category.name || "Category"}
                </h2>
                <p className="rounded-full bg-my-dark-background/10 px-2.5 py-1 text-xs font-medium text-my-dark-background/75 sm:text-sm">
                  {category.products?.length ?? 0} items
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {(category.products ?? []).map((product, i) => (
                  <MenuProduct product={product} key={product.productId} i={i} />
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
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={name}
      className="inline-flex items-center gap-2 rounded-full border border-my-bright-background/40 bg-my-dark-background/30 px-3 py-1.5 text-sm font-semibold text-my-bright-background transition active:scale-95"
    >
      <span className="flex size-5 items-center justify-center rounded-full bg-my-bright-background text-my-dark-background">
        <Icon className="size-3 text-current" />
      </span>
      <h4>{name}</h4>
    </a>
  );
}
