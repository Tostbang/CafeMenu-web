"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { components } from "@/lib/types/api";
import { useRegister } from "../_services/mutations";

type RegisterFormState = {
  firstName: string;
  lastName: string;
  cafeName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: RegisterFormState = {
  firstName: "",
  lastName: "",
  cafeName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const [values, setValues] = useState<RegisterFormState>(initialState);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (values.firstName.trim().length < 2 || values.lastName.trim().length < 2) {
      setFormError("Ad ve soyad en az 2 karakter olmalıdır.");
      return;
    }

    if (values.cafeName.trim().length < 2) {
      setFormError("Kafe adı en az 2 karakter olmalıdır.");
      return;
    }

    if (!emailPattern.test(values.email)) {
      setFormError("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    if (values.password.length < 6) {
      setFormError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setFormError("Şifreler eşleşmiyor.");
      return;
    }

    const body: components["schemas"]["CafeMenu.Entity.DTO.RegisterUserRequest"] = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      cafeName: values.cafeName.trim(),
      email: values.email.trim(),
      password: values.password,
    };

    try {
      await registerMutation.mutateAsync({ body });
      router.push(`/login?registered=1&email=${encodeURIComponent(values.email.trim())}`);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Kayıt yapılırken bir hata oluştu.",
      );
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
          Hesap Oluştur
        </h2>
        <p className="text-sm text-black/60">Kafe panelinizi dakikalar içinde kurun</p>
      </div>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="register-first-name" className="text-xs font-semibold tracking-wide uppercase">
              Ad
            </Label>
            <Input
              id="register-first-name"
              type="text"
              autoComplete="given-name"
              placeholder="Adınız"
              value={values.firstName}
              className="h-11 rounded-2xl border border-black/10 bg-[#f2efed]"
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  firstName: event.target.value,
                }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-last-name" className="text-xs font-semibold tracking-wide uppercase">
              Soyad
            </Label>
            <Input
              id="register-last-name"
              type="text"
              autoComplete="family-name"
              placeholder="Soyadınız"
              value={values.lastName}
              className="h-11 rounded-2xl border border-black/10 bg-[#f2efed]"
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  lastName: event.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-cafe-name" className="text-xs font-semibold tracking-wide uppercase">
            Kafe Adı
          </Label>
          <Input
            id="register-cafe-name"
            type="text"
            placeholder="Kafenizin adı"
            value={values.cafeName}
            className="h-11 rounded-2xl border border-black/10 bg-[#f2efed]"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                cafeName: event.target.value,
              }))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-xs font-semibold tracking-wide uppercase">
            E-posta
          </Label>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="ornek@eposta.com"
            value={values.email}
            className="h-11 rounded-2xl border border-black/10 bg-[#f2efed]"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-xs font-semibold tracking-wide uppercase">
            Şifre
          </Label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
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

        <div className="space-y-2">
          <Label htmlFor="register-confirm-password" className="text-xs font-semibold tracking-wide uppercase">
            Şifre Tekrar
          </Label>
          <Input
            id="register-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Şifrenizi tekrar girin"
            value={values.confirmPassword}
            className="h-11 rounded-2xl border border-black/10 bg-[#f2efed]"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                confirmPassword: event.target.value,
              }))
            }
            required
          />
        </div>

        {formError && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formError}
          </p>
        )}

        <Button
          type="submit"
          className="h-11 w-full rounded-2xl bg-[#7f1148] text-white hover:bg-[#6c0f3d]"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Kayıt yapılıyor..." : "Kayıt Ol"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-black/65">
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className="font-semibold text-[#7f1148] hover:underline">
          Giriş Yap
        </Link>
      </p>

      <div className="mt-6 rounded-2xl border border-black/10 bg-[#f2efed] p-3 text-xs text-black/60">
        Hesabınız açıldıktan sonra ürün, kategori ve fiyatları panelden anlık
        güncelleyebilirsiniz.
      </div>
    </div>
  );
}
