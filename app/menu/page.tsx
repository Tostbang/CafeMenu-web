"use client";

import Image from "next/image";
import { data } from "./_services/data";
import {
  CheckmarkBadge02Filled,
  FacebookFilled,
  InstagramFilled,
  WhatsappFilled,
} from "asem-icons";
import { IconType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { components } from "@/lib/types/api";

export default function Menu() {
  // const { data, error } = useGetMenuById();

  const menu = data.menu;
  return (
    <main className="px-3 py-2">
      <div className="bg-my-dark-background w-full rounded-3xl p-3 flex gap-x-6 ">
        <div className="">
          <Image
            src={data.menu.logoUrl}
            alt="logo"
            width={200}
            height={200}
            className="size-40 rounded-2xl object-cover"
            loading="eager"
          />
        </div>
        <div className="text-white ">
          <h2 className="font-bold font-carter text-3xl uppercase">
            {menu.title}
          </h2>
          <p>{menu.description}</p>
        </div>
        <div className="flex ">
          <div className="flex h-11 gap-x-2">
            {menu.facebookUrl && (
              <SocialMediaCard
                Icon={FacebookFilled}
                name="Facebook"
                link={menu.facebookUrl}
              />
            )}
            {menu.whatsappPhone && (
              <SocialMediaCard
                Icon={WhatsappFilled}
                name="WhatsApp"
                link={menu.whatsappPhone}
              />
            )}
            {menu.instagramUrl && (
              <SocialMediaCard
                Icon={InstagramFilled}
                name="Instagram"
                link={menu.instagramUrl}
              />
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4 mt-10">
        {menu.categories.map((category) => (
          <div
            key={category.categoryId}
            className="bg-my-menu-background p-8 rounded-3xl"
          >
            <h2 className="font-carter text-3xl  pl-3 pb-2 opacity-70">
              {category.name}
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {category.products.map((product, i) => (
                <MenuProduct product={product} key={product.productId} i={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export const colors = [
  "bg-my-lavender",
  "bg-my-blue",
  "bg-my-plum",
  "bg-my-turquoise",
  "bg-my-gold",
  "bg-my-brown",
  "bg-my-red",
];

export function SocialMediaCard({
  Icon,
  name,
  link,
}: {
  Icon: IconType;
  name: string;
  link: string;
}) {
  return (
    <div className="border rounded-xl px-2 py-1 border-my-bright-background flex gap-x-1">
      <Icon className="text-my-bright-background" />
      <h4 className="text-my-bright-background font-bold">{name}</h4>
    </div>
  );
}

export function MenuProduct({
  product,
  i,
}: {
  product: components["schemas"]["CafeMenu.Entity.DTO.PublicProductModel"];
  i: number;
}) {
  return (
    <div key={product.productId} className={cn("p-4 rounded-3xl", colors[i])}>
      <div>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="w-full rounded-xl h-60 object-cover"
          />
        )}
      </div>
      <div className="mt-2 h-35 flex flex-col">
        <div className="flex items-center gap-x-1">
          <CheckmarkBadge02Filled className="size-4" />
	  <p className="font-semibold text-sm">vegan</p>
        </div>
	<div className="flex-1">
        <h2 className="font-carter text-3xl">{product.name}</h2>
	</div>
      </div>
    </div>
  );
}
