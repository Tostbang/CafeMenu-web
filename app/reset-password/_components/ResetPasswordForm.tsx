"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import type { components } from "@/lib/types/api";
import { toast } from "sonner";
import { useResetPassword } from "../_services/mutations";

const formSchema = z
  .object({
    email: z.string().email("Lütfen geçerli bir e-posta adresi girin."),
    code: z
      .string()
      .trim()
      .regex(/^\d{6}$/, "Lütfen 6 haneli doğrulama kodunu girin."),
    newPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
    confirmNewPassword: z
      .string()
      .min(6, "Şifre tekrar alanı zorunludur."),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmNewPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordMutation = useResetPassword();
  const emailFromQuery = searchParams.get("email")?.trim() ?? "";
  const sent = searchParams.get("sent") === "1";

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailFromQuery,
      code: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    setValue("email", emailFromQuery);
  }, [emailFromQuery, setValue]);

  useEffect(() => {
    if (sent) {
      toast.success("Sıfırlama kodu e-posta adresinize gönderildi.");
    }
  }, [sent]);

  const onSubmit = async (data: FormValues) => {
    const email = data.email.trim();
    const body: components["schemas"]["CafeMenu.Entity.DTO.ResetPasswordRequest"] = {
      email,
      code: data.code.trim(),
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    };

    try {
      await resetPasswordMutation.mutateAsync({ body });
      router.push(`/login?reset=1&email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Şifre sıfırlanırken bir hata oluştu.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md font-sans text-charcoal">
      <Link
        href="/forgot-password"
        className="mb-4 inline-flex rounded-full border-2 border-charcoal bg-cream px-3 py-1.5 text-xs font-semibold text-charcoal transition hover:bg-charcoal hover:text-cream"
      >
        Şifremi unuttum sayfasına dön
      </Link>

      <div className="space-y-1 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-charcoal">
          Şifreyi Sıfırla
        </h2>
        <p className="text-sm text-charcoal/70">
          E-postanıza gelen kod ile yeni şifrenizi belirleyin.
        </p>
      </div>

      <form className="mt-5 space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          name="email"
          label="E-posta"
          control={control}
          autoComplete="email"
          placeholder="ornek@eposta.com"
        />

        <FormInput
          type="pin"
          name="code"
          label="Doğrulama Kodu"
          control={control}
          className="w-full"
        />

        <FormInput
          type="password"
          name="newPassword"
          label="Yeni Şifre"
          control={control}
          autoComplete="new-password"
          placeholder="Yeni şifrenizi girin"
        />

        <FormInput
          type="password"
          name="confirmNewPassword"
          label="Yeni Şifre Tekrar"
          control={control}
          autoComplete="new-password"
          placeholder="Yeni şifrenizi tekrar girin"
        />

        <Button
          type="submit"
          className="h-11 w-full rounded-2xl bg-[#7f1148] text-white hover:bg-[#6c0f3d]"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending
            ? "Şifre güncelleniyor..."
            : "Şifreyi Güncelle"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-black/65">
        Girişe dönmek ister misiniz?{" "}
        <Link href="/login" className="font-semibold text-red hover:underline">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}

