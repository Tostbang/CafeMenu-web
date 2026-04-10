"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useMutationOP, useQueryOP } from "@/lib/Fetch";
import type { components } from "@/lib/types/api";

const MAX_INPUT_LENGTH = 300;
const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function optionalUrlIsValid(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return true;
  }

  const normalizedWithScheme = /^https?:\/\//i.test(normalized)
    ? normalized
    : `https://${normalized}`;

  try {
    new URL(normalizedWithScheme);
    return true;
  } catch {
    return false;
  }
}

const menuFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Menü başlığı en az 2 karakter olmalıdır.")
    .max(80, "Menü başlığı en fazla 80 karakter olabilir."),
  description: z
    .string()
    .trim()
    .max(400, "Açıklama en fazla 400 karakter olabilir."),
  logoUrl: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "Logo bağlantısı çok uzun.")
    .refine(optionalUrlIsValid, "Logo için geçerli bir bağlantı girin."),
  backgroundImageUrl: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "Arkaplan bağlantısı çok uzun.")
    .refine(optionalUrlIsValid, "Arkaplan için geçerli bir bağlantı girin."),
  primaryColor: z
    .string()
    .trim()
    .refine(
      (value) => !value || HEX_COLOR_REGEX.test(value),
      "Ana renk HEX formatında olmalıdır. Örn: #7f1148",
    ),
  secondaryColor: z
    .string()
    .trim()
    .refine(
      (value) => !value || HEX_COLOR_REGEX.test(value),
      "İkincil renk HEX formatında olmalıdır. Örn: #f4f0e8",
    ),
  accentColor: z
    .string()
    .trim()
    .refine(
      (value) => !value || HEX_COLOR_REGEX.test(value),
      "Vurgu rengi HEX formatında olmalıdır. Örn: #0ea5e9",
    ),
  phoneNumber: z.string().trim().max(30, "Telefon numarası çok uzun."),
  address: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "Adres en fazla 300 karakter olabilir."),
  instagramUrl: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "Instagram bağlantısı çok uzun.")
    .refine(optionalUrlIsValid, "Instagram için geçerli bir bağlantı girin."),
  facebookUrl: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "Facebook bağlantısı çok uzun.")
    .refine(optionalUrlIsValid, "Facebook için geçerli bir bağlantı girin."),
  xUrl: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "X bağlantısı çok uzun.")
    .refine(optionalUrlIsValid, "X için geçerli bir bağlantı girin."),
  whatsappPhone: z.string().trim().max(30, "WhatsApp numarası çok uzun."),
  isPublished: z.boolean(),
});

type MenuFormValues = z.infer<typeof menuFormSchema>;
type MenuDetailModel =
  components["schemas"]["CafeMenu.Entity.DTO.MenuDetailModel"];

const defaultValues: MenuFormValues = {
  title: "",
  description: "",
  logoUrl: "",
  backgroundImageUrl: "",
  primaryColor: "",
  secondaryColor: "",
  accentColor: "",
  phoneNumber: "",
  address: "",
  instagramUrl: "",
  facebookUrl: "",
  xUrl: "",
  whatsappPhone: "",
  isPublished: false,
};

function toInputValue(value: string | null | undefined) {
  return value ?? "";
}

function toNullableString(value: string) {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function toNullableUrl(value: string) {
  const normalized = toNullableString(value);

  if (!normalized) {
    return null;
  }

  return /^https?:\/\//i.test(normalized)
    ? normalized
    : `https://${normalized}`;
}

function mapMenuToForm(menu: MenuDetailModel): MenuFormValues {
  return {
    title: toInputValue(menu.title),
    description: toInputValue(menu.description),
    logoUrl: toInputValue(menu.logoUrl),
    backgroundImageUrl: toInputValue(menu.backgroundImageUrl),
    primaryColor: toInputValue(menu.primaryColor),
    secondaryColor: toInputValue(menu.secondaryColor),
    accentColor: toInputValue(menu.accentColor),
    phoneNumber: toInputValue(menu.phoneNumber),
    address: toInputValue(menu.address),
    instagramUrl: toInputValue(menu.instagramUrl),
    facebookUrl: toInputValue(menu.facebookUrl),
    xUrl: toInputValue(menu.xUrl),
    whatsappPhone: toInputValue(menu.whatsappPhone),
    isPublished: menu.isPublished,
  };
}

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function MenuPage() {
  const getMyMenuQuery = useQueryOP("get", "/api/Menu/GetMyMenu");
  const createMenuMutation = useMutationOP("post", "/api/Menu/Create");
  const updateMenuMutation = useMutationOP("put", "/api/Menu/Update");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(menuFormSchema),
    defaultValues,
  });

  const currentMenu = getMyMenuQuery.data?.menu;
  const hasExistingMenu = Boolean(currentMenu?.menuId);
  const isSaving = createMenuMutation.isPending || updateMenuMutation.isPending;

  useEffect(() => {
    if (currentMenu) {
      reset(mapMenuToForm(currentMenu));
    }
  }, [currentMenu, reset]);

  const onSubmit = async (values: MenuFormValues) => {
    setFeedback(null);
    setFormError(null);

    const payloadBase = {
      title: toNullableString(values.title),
      description: toNullableString(values.description),
      logoUrl: toNullableUrl(values.logoUrl),
      backgroundImageUrl: toNullableUrl(values.backgroundImageUrl),
      primaryColor: toNullableString(values.primaryColor),
      secondaryColor: toNullableString(values.secondaryColor),
      accentColor: toNullableString(values.accentColor),
      phoneNumber: toNullableString(values.phoneNumber),
      address: toNullableString(values.address),
      instagramUrl: toNullableUrl(values.instagramUrl),
      facebookUrl: toNullableUrl(values.facebookUrl),
      xUrl: toNullableUrl(values.xUrl),
      whatsappPhone: toNullableString(values.whatsappPhone),
      isPublished: values.isPublished,
    };

    try {
      if (currentMenu?.menuId) {
        await updateMenuMutation.mutateAsync({ body: payloadBase });
        setFeedback("Menünüz başarıyla güncellendi.");
      } else {
        await createMenuMutation.mutateAsync({ body: payloadBase });
        setFeedback("Menünüz başarıyla oluşturuldu.");
      }

      await getMyMenuQuery.refetch();
    } catch (error) {
      setFormError(
        toErrorMessage(error, "Menü kaydedilirken bir hata oluştu."),
      );
    }
  };

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl rounded-2xl border p-4 md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-carter text-3xl uppercase">Menü Düzenleyici</h1>
            <p className="mt-1 text-sm">
              Başlık, renkler ve iletişim bilgilerini tek ekrandan yönetin.
            </p>
          </div>
          <span className="rounded-full border px-3 py-1 text-xs font-semibold">
            {hasExistingMenu ? "Mevcut menü" : "Yeni menü"}
          </span>
        </div>

        {getMyMenuQuery.isPending && (
          <p className="mb-4 rounded-2xl border px-4 py-2 text-sm">
            Menü bilgileri yükleniyor...
          </p>
        )}

        {getMyMenuQuery.isError && (
          <p className="mb-4 rounded-2xl border px-4 py-2 text-sm">
            {toErrorMessage(
              getMyMenuQuery.error,
              "Mevcut menü alınamadı. Yeni bir menü oluşturabilirsiniz.",
            )}
          </p>
        )}

        {feedback && (
          <p className="mb-4 rounded-2xl border px-4 py-2 text-sm">
            {feedback}
          </p>
        )}

        {formError && (
          <p className="mb-4 rounded-2xl border px-4 py-2 text-sm">
            {formError}
          </p>
        )}

        <form
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            type="text"
            name="title"
            label="Menü Başlığı"
            placeholder="Örn: Asem Cafe Menüsü"
            control={control}
          />
          <FormInput
            type="text"
            name="description"
            label="Açıklama"
            placeholder="Menünüz hakkında kısa bir açıklama"
            control={control}
          />
          <FormInput
            type="text"
            name="logoUrl"
            label="Logo URL"
            placeholder="https://..."
            control={control}
          />
          <FormInput
            type="text"
            name="backgroundImageUrl"
            label="Arkaplan Görsel URL"
            placeholder="https://..."
            control={control}
          />
          <FormInput
            type="text"
            name="primaryColor"
            label="Ana Renk"
            placeholder="#7f1148"
            control={control}
          />
          <FormInput
            type="text"
            name="secondaryColor"
            label="İkincil Renk"
            placeholder="#f4f0e8"
            control={control}
          />
          <FormInput
            type="text"
            name="accentColor"
            label="Vurgu Rengi"
            placeholder="#0ea5e9"
            control={control}
          />
          <FormInput
            type="text"
            name="phoneNumber"
            label="Telefon"
            placeholder="+90 5xx xxx xx xx"
            control={control}
          />
          <FormInput
            type="text"
            name="whatsappPhone"
            label="WhatsApp Numarası"
            placeholder="+90 5xx xxx xx xx"
            control={control}
          />
          <FormInput
            type="text"
            name="address"
            label="Adres"
            placeholder="Şube adresi"
            control={control}
          />
          <FormInput
            type="text"
            name="instagramUrl"
            label="Instagram URL"
            placeholder="instagram.com/..."
            control={control}
          />
          <FormInput
            type="text"
            name="facebookUrl"
            label="Facebook URL"
            placeholder="facebook.com/..."
            control={control}
          />
          <FormInput
            type="text"
            name="xUrl"
            label="X URL"
            placeholder="x.com/..."
            control={control}
          />

          <Controller
            name="isPublished"
            control={control}
            render={({ field }) => (
              <div className="mt-3 flex items-center justify-between rounded-2xl border px-4 py-3 md:col-span-2">
                <div>
                  <p className="text-sm font-semibold">Menü Yayında</p>
                  <p className="text-xs">
                    Kapalıysa müşteriler menünüzün güncel halini görmez.
                  </p>
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Menüyü yayına al"
                />
              </div>
            )}
          />

          <div className="md:col-span-2 mt-2 flex items-center gap-3">
            <Button
              type="submit"
              className="h-11 rounded-2xl px-6"
              disabled={isSaving}
            >
              {isSaving
                ? "Kaydediliyor..."
                : hasExistingMenu
                  ? "Menüyü Güncelle"
                  : "Menüyü Oluştur"}
            </Button>
            {!isDirty && <span className="text-xs">Değişiklik yok</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
