"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateToken } from "@/lib/helpers";
import type { components } from "@/lib/types/api";
import { useLogin } from "../_services/mutations";
import { toast } from "sonner";

type LoginFormState = {
  email: string;
  password: string;
};

const initialState: LoginFormState = {
  email: "",
  password: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLogin();
  const emailFromQuery = searchParams.get("email")?.trim() ?? "";
  const registered = searchParams.get("registered") === "1";
  const [values, setValues] = useState<LoginFormState>(() => ({
    ...initialState,
    email: emailFromQuery,
  }));

  useEffect(() => {
    if (registered) {
      toast.success("Kayıt başarılı. Şimdi giriş yapabilirsiniz.");
    }
  }, [registered]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailPattern.test(values.email)) {
      toast.error("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    if (values.password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    const body: components["schemas"]["CafeMenu.Entity.DTO.LoginRequest"] = {
      email: values.email.trim(),
      password: values.password,
    };

    try {
      const response = await loginMutation.mutateAsync({ body });

      if (!response.token) {
        toast.error("Giriş yanıtında token bulunamadı.");
        return;
      }

      updateToken(response.token);
      router.push("/dash");
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Giriş yapılırken bir hata oluştu.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Link
        href="/"
        className="mb-4 inline-flex rounded-full border border-black/10 bg-[#f2efed] px-3 py-1.5 text-xs font-semibold text-black/70 transition hover:bg-[#ebe6dc]"
      >
        Ana sayfaya dön
      </Link>

      <div className="space-y-1 text-center">
        <h2 className="font-carter text-3xl uppercase text-my-dark-background">
          Tekrar Hoş Geldiniz
        </h2>
        <p className="text-sm text-black/60">Hesabınıza giriş yapın</p>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="login-email" className="text-xs font-semibold tracking-wide uppercase">
            E-posta
          </Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="ornek@eposta.com"
            value={values.email}
            className="h-11 rounded-2xl border border-black/10 bg-[#f2efed]"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password" className="text-xs font-semibold tracking-wide uppercase">
            Şifre
          </Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Şifrenizi girin"
            value={values.password}
            className="h-11 rounded-2xl border border-black/10 bg-[#f2efed]"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            required
          />
        </div>

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
        <Link href="/register" className="font-semibold text-[#7f1148] hover:underline">
          Kayıt Ol
        </Link>
      </p>

      <div className="mt-6 rounded-2xl border border-black/10 bg-[#f2efed] p-3 text-xs text-black/60">
        Menü değişiklikleri panelde anında güncellenir ve müşteriler QR ile en
        güncel halini görür.
      </div>
    </div>
  );
}
