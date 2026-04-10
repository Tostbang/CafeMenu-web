import { CategoryImages } from "@/lib/data";
import { components } from "@/lib/types/api";
import Image from "next/image";

export function CategoryNav({
  menu,
  categories,
}: {
  menu: components["schemas"]["CafeMenu.Entity.DTO.PublicMenuDetailModel"];
  categories: components["schemas"]["CafeMenu.Entity.DTO.PublicCategoryModel"][];
}) {
  const menuTitle = menu.title || "Menu";

  return (
    <div className="sticky top-2 z-20 mt-3">
      <div className="rounded-[1.6rem] bg-my-dark-background p-3 text-my-bright-background shadow-[0_12px_32px_rgba(17,24,39,0.2)]">
        <div className="flex items-center gap-2">
          {menu.logoUrl && (
            <Image
              src={menu.logoUrl}
              alt={`${menuTitle} logo`}
              width={40}
              height={40}
              className="size-10 rounded-xl border border-my-bright-background/30 object-cover"
              loading="eager"
            />
          )}
          <h2 className="truncate text-base font-semibold">
            {menuTitle}
          </h2>
          <span className="ml-auto rounded-full bg-my-bright-background/12 px-2 py-1 text-xs font-medium text-my-bright-background/80">
            {categories.length} categories
          </span>
        </div>

        <nav
          aria-label="Menu categories"
          className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1"
        >
          {categories.map((category, i) => (
            <a
              key={category.categoryId}
              href={`#category-${category.categoryId}`}
              className="flex snap-start shrink-0 items-center gap-2 rounded-full border border-my-bright-background/20 bg-my-bright-background/10 px-3 py-2 text-sm font-medium text-my-bright-background transition active:scale-95"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-my-bright-background/20">
                <Image
                  src={CategoryImages[i % CategoryImages.length]}
                  alt=""
                  width={16}
                  height={16}
                />
              </span>
              <span className="max-w-28 truncate">{category.name || "Category"}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
