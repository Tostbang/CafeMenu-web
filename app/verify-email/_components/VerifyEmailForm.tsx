"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import type { components } from "@/lib/types/api";
import { toast } from "sonner";
import {
  useResendVerificationCode,
  useVerifyEmail,
} from "../_services/mutations";

const DEFAULT_RESEND_SECONDS = 60;

const formSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Lütfen 6 haneli doğrulama kodunu girin."),
});

type FormValues = z.infer<typeof formSchema>;

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyEmailMutation = useVerifyEmail();
  const resendCodeMutation = useResendVerificationCode();
  const email = searchParams.get("email")?.trim() ?? "";
  const [remainingSeconds, setRemainingSeconds] = useState(
    DEFAULT_RESEND_SECONDS
  );

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [remainingSeconds]);

  const onSubmit = async (data: FormValues) => {
    if (!email) {
      toast.error("Doğrulama için e-posta bilgisi bulunamadı.");
      return;
    }

    const body: components["schemas"]["CafeMenu.Entity.DTO.VerifyEmailRequest"] = {
      email,
      code: data.code.trim(),
    };

    try {
      await verifyEmailMutation.mutateAsync({ body });
      router.push(`/login?verified=1&email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("E-posta doğrulaması sırasında bir hata oluştu.");
      }
    }
  };

  const onResendCode = async () => {
    if (!email) {
      toast.error("Kod göndermek için e-posta bilgisi bulunamadı.");
      return;
    }

    const body: components["schemas"]["CafeMenu.Entity.DTO.ResendVerificationCodeRequest"] = {
      email,
    };

    try {
      const response = await resendCodeMutation.mutateAsync({ body });
      const nextTimer =
        typeof response.remainingSeconds === "number" &&
        response.remainingSeconds > 0
          ? response.remainingSeconds
          : DEFAULT_RESEND_SECONDS;
      setRemainingSeconds(nextTimer);
      reset({ code: "" });
      toast.success(response.message || "Doğrulama kodu yeniden gönderildi.");
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Kod yeniden gönderilirken bir hata oluştu.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md font-sans text-charcoal">
      <Link
        href="/register"
        className="mb-4 inline-flex rounded-full border-2 border-charcoal bg-cream px-3 py-1.5 text-xs font-semibold text-charcoal transition hover:bg-charcoal hover:text-cream"
      >
        Kayıt sayfasına dön
      </Link>

      <div className="space-y-1 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-charcoal">
          E-postanı Doğrula
        </h2>
        <p className="text-sm text-charcoal/70">
          {email
            ? `${email} adresine gelen 6 haneli kodu girin.`
            : "Doğrulama için e-posta bilgisi eksik."}
        </p>
      </div>

      <form className="mt-6 space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="pin"
          name="code"
          label="Doğrulama Kodu"
          control={control}
          className="w-full"
          disabled={verifyEmailMutation.isPending || !email}
        />

        <Button
          type="submit"
          className="h-11 w-full rounded-2xl bg-[#7f1148] text-white hover:bg-[#6c0f3d]"
          disabled={verifyEmailMutation.isPending || !email}
        >
          {verifyEmailMutation.isPending
            ? "Doğrulanıyor..."
            : "E-postayı Doğrula"}
        </Button>
      </form>

      <div className="mt-4 rounded-2xl border border-black/10 bg-[#f2efed] p-3 text-center text-sm text-black/70">
        {remainingSeconds > 0
          ? `Yeni kod gönderimi için ${remainingSeconds} saniye bekleyin.`
          : "Kod gelmediyse tekrar gönderebilirsiniz."}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onResendCode}
        className="mt-3 h-11 w-full rounded-2xl border-2 border-charcoal font-semibold"
        disabled={remainingSeconds > 0 || resendCodeMutation.isPending || !email}
      >
        {resendCodeMutation.isPending
          ? "Kod gönderiliyor..."
          : "Kodu Tekrar Gönder"}
      </Button>

      <p className="mt-4 text-center text-sm text-black/65">
        Doğrulama tamamlandı mı?{" "}
        <Link href="/login" className="font-semibold text-red hover:underline">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}
