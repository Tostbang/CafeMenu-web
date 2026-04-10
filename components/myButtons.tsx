import { ReactNode } from "react";
import { ArrowRight01Sharp } from "asem-icons";
import { cn } from "@/lib/utils";

export function MyButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className={cn("inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm bg-my-bright-background px-3 py-1.5 text-xs font-semibold text-black shadow-[0_8px_18px_rgba(35,31,32,0.2)] transition active:scale-95", props.className)}
    >
      {children}
      <span className="flex size-4 items-center justify-center rounded-full bg-my-dark-background text-my-bright-background">
        <ArrowRight01Sharp className="size-2.5" />
      </span>
    </button>
  );
}
