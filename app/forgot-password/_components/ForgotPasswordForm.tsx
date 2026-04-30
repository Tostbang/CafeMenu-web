"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import type { components } from "@/lib/types/api";
import { toast } from "sonner";
import { useForgotPassword } from "../_services/mutations";

const formSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin."),
});

type FormValues = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const email = data.email.trim();
    const body: components["schemas"]["CafeMenu.Entity.DTO.ForgotPasswordRequest"] = {
      email,
    };

    try {
      await forgotPasswordMutation.mutateAsync({ body });
      router.push(`/reset-password?email=${encodeURIComponent(email)}&sent=1`);
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Kod gönderilirken bir hata oluştu.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md font-sans text-charcoal">
      <Link
        href="/login"
        className="mb-4 inline-flex rounded-full border-2 border-charcoal bg-cream px-3 py-1.5 text-xs font-semibold text-charcoal transition hover:bg-charcoal hover:text-cream"
      >
        Giriş sayfasına dön
      </Link>

      <div className="space-y-1 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-charcoal">
          Şifremi Unuttum
        </h2>
        <p className="text-sm text-charcoal/70">
          E-posta adresinizi girin, size doğrulama kodu gönderelim.
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

        <Button
          type="submit"
          className="h-11 w-full rounded-2xl bg-[#7f1148] text-white hover:bg-[#6c0f3d]"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending
            ? "Kod gönderiliyor..."
            : "Sıfırlama Kodu Gönder"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-black/65">
        Şifrenizi hatırladınız mı?{" "}
        <Link href="/login" className="font-semibold text-red hover:underline">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}

