"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useLogin } from "../_services/mutations";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const searchParams = useSearchParams();
  const loginMutation = useLogin();
  const emailFromQuery = searchParams.get("email")?.trim() ?? "";
  const registered = searchParams.get("registered") === "1";
  const verified = searchParams.get("verified") === "1";

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailFromQuery,
      password: "",
    },
  });

  useEffect(() => {
    setValue("email", emailFromQuery);
  }, [emailFromQuery, setValue]);

  useEffect(() => {
    if (registered) {
      toast.success("Kayıt başarılı. Şimdi giriş yapabilirsiniz.");
    }
  }, [registered]);

  useEffect(() => {
    if (verified) {
      toast.success("E-posta doğrulandı. Artık giriş yapabilirsiniz.");
    }
  }, [verified]);

  const onSubmit = async (data: FormValues) => {
    loginMutation.mutate({
      body: {
        email: data.email.trim(),
        password: data.password,
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-md font-sans text-charcoal">
      <Link
        href="/"
        className="mb-4 inline-flex rounded-full border-2 border-charcoal bg-cream px-3 py-1.5 text-xs font-semibold text-charcoal transition hover:bg-charcoal hover:text-cream"
      >
        Ana sayfaya dön
      </Link>

      <div className="space-y-1 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-charcoal">
          Tekrar Hoş Geldiniz
        </h2>
        <p className="text-sm text-charcoal/70">Hesabınıza giriş yapın</p>
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
          type="password"
          name="password"
          label="Şifre"
          control={control}
          autoComplete="current-password"
          placeholder="Şifrenizi girin"
        />

        <Button
          type="submit"
          className="h-11 w-full rounded-2xl bg-[#7f1148] text-white hover:bg-[#6c0f3d]"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-black/65">
        Hesabınız yok mu?{" "}
        <Link href="/register" className="font-semibold text-red hover:underline">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
}
