import { components } from "@/lib/types/api";
import { cn } from "@/lib/utils";
import { useMenuProductDrawerStore } from "@/lib/store/menu-product-drawer-store";
import { defaultMenuTheme, MenuTheme, toMenuThemeVars } from "@/lib/menu-theme";
import Image from "next/image";
import { MyButton } from "./myButtons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { BioEnergyFilled, CrownFilled, FirePitFilled, Tag01Filled } from "asem-icons";
import { IconType } from "@/lib/types";

const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export function MenuProduct({
  product,
  interactive = true,
}: {
  product: components["schemas"]["CafeMenu.Entity.DTO.PublicProductModel"];
  interactive?: boolean;
}) {
  const openDrawer = useMenuProductDrawerStore((state) => state.openDrawer);
  const productName = product.name || "Ürün";
  const productDescription = product.description || "Açıklama bulunmuyor.";
  const hasIngredients = Boolean(product.ingredients);
  const hasAllergens = Boolean(product.allergens);
  const calories =
    typeof product.calories === "number" && product.calories > 0
      ? product.calories
      : null;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[25px] flex flex-col border-2 border-charcoal shadow-[0_4px_0_0_#313131] bg-[var(--menu-card)] text-[var(--menu-text)]",
      )}
    >
      <div className="relative h-44 ">
        <div className="overflow-hidden h-full rounded-t-[20px]">
          {product.imageUrl && product.imageUrl.includes("https") && (
            <Image
              src={product.imageUrl}
              alt={productName}
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          )}
          {!product.imageUrl && (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[var(--menu-surface)] text-sm font-medium text-[var(--menu-muted-text)]">
              Görsel yok
            </div>
          )}
        </div>
        {product.isPopular && (
          <span className="absolute right-3 top-3 flex gap-x-1 rounded-full bg-white/85 px-2 py-1 text-xs font-semibold text-[var(--menu-text)]">
            <CrownFilled className="size-4" />
            Popüler
          </span>
        )}
        {hasAllergens && (
          <div className="absolute bottom-0 flex items-center gap-x-1 rounded-tr-lg bg-[var(--menu-card)] pl-1 pr-2 pt-2">
            <MyTag
              Icon={Tag01Filled}
              name={`İçerik: ${product.allergens}`}
              color="bg-[var(--menu-tertiary)] text-[var(--menu-on-tertiary)]"
            />
          </div>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <div className="flex flex-col flex-1">
          <div className="flex-1 font-space pt-1 pb-2">
            <h3 className="h-6 text-xl font-[500]">{productName}</h3>
            <p className="text-sm text-[var(--menu-muted-text)] line-clamp-2">
              {productDescription}
            </p>
          </div>
        </div>
        <div className="mt-1 flex w-full items-center gap-x-1">
          <span
            className={cn(
              "flex h-9 items-center gap-x-1 rounded-full border-2 border-charcoal px-4 py-.75",
              "bg-[var(--menu-secondary)] text-[var(--menu-on-secondary)]",
            )}
          >
            <Tag01Filled className="size-3.5" />
            <span className="max-w-22 overflow-hidden text-ellipsis text-nowrap text-sm font-semibold">
              {priceFormatter.format(product.price)}
            </span>
          </span>
          {calories !== null && (
            <span
              className={cn(
                "flex h-9 items-center gap-x-1 rounded-full border-2 border-charcoal px-3 py-.75",
                "bg-[var(--menu-tertiary)] text-[var(--menu-on-tertiary)]",
              )}
              aria-label={`${calories} kalori`}
            >
              <FirePitFilled className="size-3.5" />
              <span className="text-sm font-semibold">
                {calories} kcal
              </span>
            </span>
          )}
          <MyButton
            className={cn(
              "h-9 flex-1 justify-center border-2 border-charcoal rounded-full text-sm font-semibold shadow-none",
              "bg-[var(--menu-primary)] text-[var(--menu-on-primary)] [&_svg]:text-[var(--menu-on-primary)]",
            )}
            onClick={() => {
              if (interactive) {
                openDrawer(product);
              }
            }}
            disabled={!interactive}
          >
            {hasIngredients ? "İçindekiler" : "Detaylar"}
          </MyButton>
        </div>
      </div>
    </article>
  );
}

export function MenuProductDrawer({
  theme = defaultMenuTheme,
}: {
  theme?: MenuTheme;
}) {
  const { isOpen, product, setOpen } = useMenuProductDrawerStore();

  if (!product) {
    return null;
  }

  const productName = product.name || "Ürün";
  const productDescription = product.description || "Açıklama bulunmuyor.";
  const hasIngredients = Boolean(product.ingredients);
  const hasAllergens = Boolean(product.allergens);
  const calories =
    typeof product.calories === "number" && product.calories > 0
      ? product.calories
      : null;

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="p-0" style={toMenuThemeVars(theme)}>
        <div className="mx-auto w-full max-w-xl overflow-y-auto rounded-t-[2rem] text-[var(--menu-text)]">
          <div className="space-y-4 px-5 pb-4">
            <div className="h-52 overflow-hidden rounded-[1.25rem] bg-[var(--menu-card)]">
              {product.imageUrl && product.imageUrl.includes("https") ? (
                <Image
                  src={product.imageUrl}
                  alt={productName}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-medium text-[var(--menu-muted-text)]">
                  Görsel yok
                </div>
              )}
            </div>
            <DrawerHeader className="px-2 py-0 text-left!">
              <DrawerTitle className="font-space text-2xl font-semibold text-[var(--menu-text)]">
                {productName}
              </DrawerTitle>
              <DrawerDescription className="font-space text-sm text-[var(--menu-muted-text)]">
                {productDescription}
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-wrap items-center gap-2 font-space">
              <MyTag
                Icon={Tag01Filled}
                name={priceFormatter.format(product.price)}
                color="bg-[var(--menu-secondary)] text-[var(--menu-on-secondary)]"
              />
              {calories !== null && (
                <MyTag
                  Icon={FirePitFilled}
                  name={`${calories} kcal`}
                  color="bg-[var(--menu-tertiary)] text-[var(--menu-on-tertiary)]"
                />
              )}
              {product.isPopular && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--menu-primary)] px-2.5 py-1 text-xs font-semibold text-[var(--menu-on-primary)]">
                  <CrownFilled className="size-4" />
                  Popüler
                </span>
              )}
            </div>

            <section className="text-[var(--menu-text)]">
              <h4 className="text-xl font-semibold tracking-wide">
                İçindekiler:
              </h4>
              <p className="mt-1 text-sm font-semibold">
                {hasIngredients
                  ? product.ingredients
                  : "İçindekiler bilgisi yok"}
              </p>
            </section>

            <section>
              <h4 className="text-xl font-semibold tracking-wide">
                Alerjenler:
              </h4>
              <p className="mt-1 text-sm font-semibold">
                {hasAllergens ? product.allergens : "Alerjen bilgisi yok"}
              </p>
            </section>

            <section>
              <h4 className="text-xl font-semibold tracking-wide">
                Kalori:
              </h4>
              <p className="mt-1 text-sm font-semibold">
                {calories !== null ? `${calories} kcal` : "Kalori bilgisi yok"}
              </p>
            </section>
          </div>

          <DrawerFooter className="px-5 pb-5 pt-1">
            <DrawerClose asChild>
              <Button className="h-10 rounded-full bg-[var(--menu-primary)] text-[var(--menu-on-primary)] hover:brightness-95">
                Kapat
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function MyTag({
  Icon,
  name,
  color,
}: {
  Icon: IconType;
  name: string;
  color: string;
}) {
  return (
    <span
      className={cn(
        "flex h-6.5 items-center gap-x-1  rounded-full px-2.5 py-.75",
        color,
      )}
    >
      <Icon className="size-3.5" />
      <span className="max-w-24 overflow-hidden text-ellipsis text-nowrap text-sm font-medium">
        {name}
      </span>
    </span>
  );
}
