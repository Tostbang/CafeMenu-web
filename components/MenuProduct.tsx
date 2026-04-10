import { components } from "@/lib/types/api";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MyButton } from "./myButtons";

const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

const colors = [
  "bg-my-lavender",
  "bg-my-blue",
  "bg-my-plum",
  "bg-my-turquoise",
  "bg-my-gold",
  "bg-my-brown",
  "bg-my-red",
];

export function MenuProduct({
  product,
  i,
}: {
  product: components["schemas"]["CafeMenu.Entity.DTO.PublicProductModel"];
  i: number;
}) {
  const colorClass = colors[i % colors.length];
  const isDarkCard = colorClass === "bg-my-plum";
  const textClass = isDarkCard ? "text-my-bright-background" : "text-black";
  const productName = product.name || "Product";
  const productDescription = product.description || "No description available.";
  const hasIngredients = Boolean(product.ingredients);
  const hasAllergens = Boolean(product.allergens);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[1.4rem] p-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)]",
        colorClass,
        textClass,
      )}
    >
      <div className="relative">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={productName}
            width={400}
            height={400}
            className="h-52 w-full rounded-2xl object-cover"
          />
        )}
        {!product.imageUrl && (
          <div className="flex h-52 w-full items-center justify-center rounded-2xl bg-my-bright-background/50 text-sm font-medium opacity-75">
            No image
          </div>
        )}
        {product.isPopular && (
          <span
            className={cn(
              "absolute left-2 top-2 rounded-full px-2 py-1 text-xs font-semibold",
              isDarkCard
                ? "bg-my-bright-background/90 text-my-dark-background"
                : "bg-my-dark-background text-my-bright-background",
            )}
          >
            Popular
          </span>
        )}
      </div>

      <div className="mt-3 flex min-h-36 flex-col">
        <div className="flex-1">
          <h3 className="font-carter text-2xl">{productName}</h3>
          <p className="mt-1 text-sm opacity-80">{productDescription}</p>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-base font-semibold">
              {priceFormatter.format(product.price)}
            </p>
            {hasAllergens && (
              <span className="rounded-full bg-my-dark-background/12 px-2 py-1 text-xs font-medium">
                Allergens: {product.allergens}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-xs opacity-75">
              {hasIngredients ? product.ingredients : "Ingredients unavailable"}
            </p>
            <MyButton>{hasIngredients ? "Ingredients" : "Details"}</MyButton>
          </div>
        </div>
      </div>
    </article>
  );
}
