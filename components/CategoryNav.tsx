import { CategoryImages } from "@/lib/data";
import { components } from "@/lib/types/api";
import Image from "next/image";

export function CategoryNav({
  menu,
}: {
  menu: components["schemas"]["CafeMenu.Entity.DTO.PublicMenuDetailModel"];
}) {
  return (
    <div className="bg-my-dark-background text-my-bright-background w-full sticky top-2 rounded-md h-20 py-2 z-10 mt-2 flex items-center px-4">
      <div className="w-full flex gap-x-2 items-center">
        <div className="flex gap-x-4 items-center">
          <div className="">
            {menu.logoUrl && (
              <Image
                src={menu.logoUrl}
                alt="logo"
                width={50}
                height={50}
                className="size-12 rounded-sm object-cover"
                loading="eager"
              />
            )}
          </div>
          <h2 className="font-bold text-4xl">{menu.title}</h2>
        </div>
        <div className="flex gap-x-2 flex-1 justify-center ">
          {menu?.categories?.map((category, i) => {
            return (
              <div
                key={category.categoryId}
                className="flex items-center gap-x-2"
              >
                <Image
                  src={CategoryImages[i]}
                  alt="category"
                  width={20}
                  height={20}
                ></Image>
                <h2>{category.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
