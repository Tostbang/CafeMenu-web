"use client";

import Image from "next/image";
import { data } from "./_services/data";
import { FacebookFilled, InstagramFilled, WhatsappFilled } from "asem-icons";
import { IconType } from "@/lib/types";
import { MenuProduct } from "@/components/MenuProduct";
import { CategoryImages } from "@/lib/data";
import { CategoryNav } from "@/components/CategoryNav";

export default function Menu() {
  // const { data, error } = useGetMenuById();

  const menu = data.menu;
  return (
    <main className="px-3 py-2 relative">
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
        <div className="flex">
          <div className="h-11 gap-x-2 hidden lg:flex">
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
      <CategoryNav menu={menu}/>
      <div className="space-y-4 mt-4 md:mt-10">
        {menu.categories.map((category) => (
          <div
            key={category.categoryId}
            className="bg-my-menu-background p-4 md:p-8 rounded-3xl"
          >
            <h2 className="font-carter text-3xl  pl-3 pb-2 opacity-70">
              {category.name}
            </h2>
            <div className="grid lg:grid-cols-4 gap-3">
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
