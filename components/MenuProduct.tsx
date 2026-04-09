import { components } from "@/lib/types/api";
import { cn } from "@/lib/utils";
import { CheckmarkBadge02Filled } from "asem-icons";
import Image from "next/image";
import { MyButton } from "./myButtons";
import { useEffect, useState } from "react";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";

export const colors = [
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
  const [averageColor, setAverageColor] = useState<null | FastAverageColorResult>(null);

  useEffect(() => {
    const averageColor = new FastAverageColor();
    averageColor.getColorAsync(product.imageUrl).then((color) => {
      setAverageColor(color);
    });
  }, [product.imageUrl]);

  console.log(averageColor)

  return (
    <div
      // style={{backgroundColor: averageColor?.hex, color: averageColor?.isDark ? "white": "black" }}
      className={cn(
        "p-4 rounded-3xl background ",
	colors[i],
        colors[i] === "bg-my-plum" ? "text-my-bright-background" : "text-black",
      )}
    >
      <div>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name ?? "product image"}
            width={400}
            height={400}
            className="w-full rounded-xl h-55 object-cover"
          />
        )}
      </div>
      <div className="mt-2 h-35 flex flex-col">
        <div className="flex items-center gap-x-1">
          <CheckmarkBadge02Filled className="size-4" />
          <p className="font-semibold text-sm">vegan</p>
        </div>
        <div className="flex-1">
          <h2 className="font-carter text-2xl">{product.name}</h2>
          <p className="text-sm mt-0.5">{product.description}</p>
        </div>
        <div className="pl-1">
          <MyButton>View Ingredient</MyButton>
        </div>
      </div>
    </div>
  );
}
