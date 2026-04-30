"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import type { components } from "@/lib/types/api";
import { useRegister } from "../_services/mutations";
import { toast } from "sonner";

const formSchema = z
  .object({
    firstName: z.string().trim().min(2, "Ad en az 2 karakter olmalıdır."),
    lastName: z.string().trim().min(2, "Soyad en az 2 karakter olmalıdır."),
    cafeName: z.string().trim().min(2, "Kafe adı en az 2 karakter olmalıdır."),
    email: z.string().email("Lütfen geçerli bir e-posta adresi girin."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
    confirmPassword: z.string().min(6, "Şifre tekrar alanı zorunludur."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Şifreler eşleşmiyor.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cafeName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const body: components["schemas"]["CafeMenu.Entity.DTO.RegisterUserRequest"] = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      cafeName: data.cafeName.trim(),
      email: data.email.trim(),
      password: data.password,
    };

    try {
      await registerMutation.mutateAsync({ body });
      router.push(`/verify-email?email=${encodeURIComponent(data.email.trim())}`);
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Kayıt yapılırken bir hata oluştu.");
      }
    }
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
          Hesap Oluştur
        </h2>
        <p className="text-sm text-charcoal/70">
          Kafe panelinizi dakikalar içinde kurun
        </p>
      </div>

      <form className="mt-5 space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            type="text"
            name="firstName"
            label="Ad"
            control={control}
            autoComplete="given-name"
            placeholder="Adınız"
          />
          <FormInput
            type="text"
            name="lastName"
            label="Soyad"
            control={control}
            autoComplete="family-name"
            placeholder="Soyadınız"
          />
        </div>

        <FormInput
          type="text"
          name="cafeName"
          label="Kafe Adı"
          control={control}
          placeholder="Kafenizin adı"
        />

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
          autoComplete="new-password"
          placeholder="Şifrenizi girin"
        />

        <FormInput
          type="password"
          name="confirmPassword"
          label="Şifre Tekrar"
          control={control}
          autoComplete="new-password"
          placeholder="Şifrenizi tekrar girin"
        />

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
        <Link href="/login" className="font-semibold text-red hover:underline">
          Giriş Yap
        </Link>
      </p>
      <p className="mt-1 text-center text-sm text-black/65">
        Şifrenizi mi unuttunuz?{" "}
        <Link
          href="/forgot-password"
          className="font-semibold text-red hover:underline"
        >
          Şifreyi Sıfırla
        </Link>
      </p>

    </div>
  );
}
