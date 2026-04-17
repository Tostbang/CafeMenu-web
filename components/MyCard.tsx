"use client";

import { IconType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ArrowExpand01RoundFilled } from "asem-icons";
import { VisuallyHidden } from "radix-ui";

export default function MyCard({
  children,
  Icon,
  title,
  actions,
  className,
  expandable = false,
  modalStyle,
  actionsClassName,
}: {
  children: ReactNode;
  Icon?: IconType;
  title?: ReactNode;
  actions?: ReactNode;
  className?: string;
  expandable?: boolean;
  modalStyle?: string;
  actionsClassName?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={cn(
          "relative h-full w-full rounded-[60px] squircle border border-white bg-white/50 p-4 pb-6 backdrop-blur-3xl",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "relative flex min-h-12 w-full items-start justify-between",
              actionsClassName,
            )}
          >
            <div className="flex items-center gap-x-2">
              {Icon && (
                <div className="rounded-full bg-black p-2.5">
                  <Icon className="size-4.5 text-white" />
                </div>
              )}
              <p className="text-base font-medium">{title}</p>
            </div>
            <div className={cn("flex items-center gap-2", expandable && "mr-11")}>
              {actions && <div>{actions}</div>}
            </div>
            {expandable && (
              <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-0.75 right-1.5 rounded-full bg-white/50 p-2"
                aria-label="Genişlet"
              >
                <ArrowExpand01RoundFilled className="size-4 transition-colors hover:bg-white/70" />
              </button>
            )}
          </div>
          <div className="relative flex-1 px-2">{children}</div>
        </div>
      </div>

      {expandable && (
        <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
          <DialogContent className={cn("border-none bg-transparent p-0 shadow-none", modalStyle)}>
            <VisuallyHidden.Root>
              <DialogTitle>modeli genişlet</DialogTitle>
            </VisuallyHidden.Root>
            <div
              className={cn(
                "relative h-full w-full overflow-hidden rounded-[60px] squircle border border-white bg-[#f6f2ea] p-4 pb-6 backdrop-blur-3xl",
                className,
              )}
            >
              <div className="flex h-full flex-col">
                <div
                  className={cn(
                    "flex w-full items-start justify-between",
                    actionsClassName,
                  )}
                >
                  <div className="mb-4 flex items-center gap-x-2">
                    {Icon && (
                      <div className="rounded-full bg-black p-2.5">
                        <Icon className="size-4.5 text-white" />
                      </div>
                    )}
                    <p className="text-base font-medium">{title}</p>
                  </div>
                  {actions && <div className="mr-9">{actions}</div>}
                </div>
                <div className="relative h-full overflow-auto px-2">{children}</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
