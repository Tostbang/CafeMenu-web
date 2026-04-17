import { CategoryImages } from "@/lib/data";
import { components } from "@/lib/types/api";
import Image from "next/image";

export function CategoryNav({
  menu,
  categories,
  isPreview = false,
}: {
  menu: components["schemas"]["CafeMenu.Entity.DTO.PublicMenuDetailModel"];
  categories: components["schemas"]["CafeMenu.Entity.DTO.PublicCategoryModel"][];
  isPreview?: boolean;
}) {
  const menuTitle = menu.title || "Menü";

  return (
    <div className={`sticky z-20 mt-4 ${isPreview ? "top-2" : "top-0"}`}>
      <div className="rounded-b-[2rem] border border-[var(--menu-border)] bg-[var(--menu-surface)] p-3 text-[var(--menu-text)] shadow-[0_14px_36px_rgba(15,23,42,0.1)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          {menu.logoUrl && (
            <Image
              src={menu.logoUrl}
              alt={`${menuTitle} logosu`}
              width={44}
              height={44}
              className="size-11 rounded-xl border border-[var(--menu-border)] object-cover"
              loading="eager"
            />
          )}
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold tracking-tight sm:text-base">
              {menuTitle}
            </h2>
            <p className="text-xs text-[var(--menu-muted-text)]">
              {categories.length} kategori
            </p>
          </div>
        </div>
        <nav
          aria-label="Menü kategorileri"
          className="custom-scroll mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1"
        >
          {categories.map((category, i) => (
            <a
              key={category.categoryId}
              href={`#category-${category.categoryId}`}
              className="group flex snap-start shrink-0 items-center gap-2 rounded-full border border-[var(--menu-border)] bg-[var(--menu-primary)] px-2 py-1.5 text-sm font-medium text-[var(--menu-on-primary)] transition-all hover:brightness-95 hover:shadow-[0_8px_18px_rgba(0,0,0,0.08)] active:scale-95"
            >
              <span className="flex size-4.5 items-center justify-center rounded-lg">
                <Image
                  src={CategoryImages[i % CategoryImages.length]}
                  alt=""
                  width={16}
                  height={16}
                  className="h-full w-full opacity-70"
                />
              </span>
              <span className="max-w-28 truncate">
                {category.name || "Kategori"}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
