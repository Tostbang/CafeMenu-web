"use client";

import { useEffect } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useReturnCheckout } from "../_services/mutations";
import MyCard from "@/components/MyCard";

export default function CallBackCard({ token }: { token: string | undefined }) {
  const callbackMutation = useReturnCheckout();
  const { mutate } = callbackMutation;

  useEffect(() => {
    if (!token) {
      return;
    }

    mutate({
      body: {
        token,
      },
    });
  }, [mutate, token]);

  const data = callbackMutation.data;
  const status: "loading" | "success" | "error" =
    callbackMutation.isPending || !data
    ? "loading"
    : data.code === "200"
      ? "success"
      : "error";
  const message =
    status === "success"
      ? data?.message || "Ödeme başarıyla tamamlandı!"
      : data?.errors?.[0] || "Ödeme işlemi başarısız";

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <MyCard className="w-full max-w-md">
        <div className="-mt-8 text-center">
          {status === "loading" && (
            <>
              <div className="mx-auto mb-4 w-fit">
                <Loader2 className="size-16 animate-spin text-primary" />
              </div>
              <CardTitle>Ödeme Doğrulanıyor</CardTitle>
              <CardDescription>
                Lütfen bekleyin, ödemeniz kontrol ediliyor...
              </CardDescription>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto mb-4 w-fit">
                <CheckCircle2 className="size-16 text-green-600" />
              </div>
              <CardTitle className="text-green-700">Ödeme Başarılı!</CardTitle>
              <CardDescription className="text-gray-700">{message}</CardDescription>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto mb-4 w-fit">
                <XCircle className="size-16 text-red-600" />
              </div>
              <CardTitle className="text-red-700">Ödeme Başarısız</CardTitle>
              <CardDescription className="text-gray-700">{message}</CardDescription>
            </>
          )}
        </div>

        {status !== "loading" && (
          <CardContent className="mt-4 space-y-2 px-0">
            <Link href="/dash" className="block">
              <Button className="w-full">Kontrol Paneline Git</Button>
            </Link>
            {status === "error" && (
              <Link href="/dash/packages" className="block">
                <Button variant="outline" className="w-full">
                  Paketlere Geri Dön
                </Button>
              </Link>
            )}
          </CardContent>
        )}
      </MyCard>
    </div>
  );
}
