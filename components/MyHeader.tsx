import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MyHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={cn("text-4xl leading-18 font-bold font-carter tracking-tight text-black uppercase md:text-8xl", className)}>{children}</h2>;
}
