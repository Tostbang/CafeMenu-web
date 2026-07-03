"use client";

import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutFormHtml: string | null;
}

export function PaymentModal({
  open,
  onOpenChange,
  checkoutFormHtml,
}: PaymentModalProps) {
  // Track the injected iyzico script so we can remove it when the modal
  // closes. Without this, every purchase leaks a script element into the
  // DOM and iyzico's global state (`iyziInit`) outlives the dialog, which
  // can break subsequent purchases.
  const injectedScriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (checkoutFormHtml && open) {
      const iziycoScript = checkoutFormHtml.replace(/<script[^>]*>|<\/script>/gi, "");

      const runScript = `
          ${iziycoScript}
          setTimeout(() => {
            iyziInit = undefined;
          }, 1001);
          `;

      const script = document.createElement("script");
      script.id = "iziyco-script" + Math.random().toString(36).substring(7);
      script.type = "text/javascript";
      script.innerHTML = runScript;
      document.body.appendChild(script);
      injectedScriptRef.current = script;
    }

    return () => {
      const script = injectedScriptRef.current;
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
        injectedScriptRef.current = null;
      }
    };
  }, [checkoutFormHtml, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ödeme İşlemi</DialogTitle>
          <DialogDescription>
            Güvenli ödeme sayfasında işleminizi tamamlayın
          </DialogDescription>
        </DialogHeader>

        {checkoutFormHtml ? (
          <div id="iyzipay-checkout-form" className="min-h-[500px]" />
        ) : (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
