"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useMutationOP, useQueryOP } from "@/lib/Fetch";
import type { components } from "@/lib/types/api";

const MAX_INPUT_LENGTH = 400;

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

const productFormSchema = z.object({
  categoryId: z
    .number({ invalid_type_error: "Kategori ID girin." })
    .int("Kategori ID tam sayı olmalıdır.")
    .positive("Kategori ID 0'dan büyük olmalıdır."),
  name: z
    .string()
    .trim()
    .min(2, "Ürün adı en az 2 karakter olmalıdır.")
    .max(120, "Ürün adı en fazla 120 karakter olabilir."),
  description: z.string().trim().max(MAX_INPUT_LENGTH, "Açıklama çok uzun."),
  price: z
    .number({ invalid_type_error: "Fiyat girin." })
    .min(0, "Fiyat 0'dan küçük olamaz."),
  imageUrl: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "Görsel bağlantısı çok uzun.")
    .refine(optionalUrlIsValid, "Görsel için geçerli bir bağlantı girin."),
  ingredients: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "İçerik bilgisi çok uzun."),
  allergens: z
    .string()
    .trim()
    .max(MAX_INPUT_LENGTH, "Alerjen bilgisi çok uzun."),
  isAvailable: z.boolean(),
  isPopular: z.boolean(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;
type ProductModel = components["schemas"]["CafeMenu.Entity.DTO.ProductModel"];

const defaultValues: ProductFormValues = {
  categoryId: 0,
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  ingredients: "",
  allergens: "",
  isAvailable: true,
  isPopular: false,
};

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

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function ProductsPage() {
  const getMyMenuQuery = useQueryOP("get", "/api/Menu/GetMyMenu");
  const menuId = getMyMenuQuery.data?.menu?.menuId;

  const categoriesQuery = useQueryOP("get", "/api/Category/MyCategories");

  const createProductMutation = useMutationOP("post", "/api/Product/Create");
  const updateProductMutation = useMutationOP("put", "/api/Product/Update");
  const deleteProductMutation = useMutationOP(
    "delete",
    "/api/Product/{productId}",
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [editingProduct, setEditingProduct] = useState<ProductModel | null>(
    null,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const categories = useMemo(
    () =>
      [...(categoriesQuery.data?.categories ?? [])].sort(
        (a, b) => a.order - b.order,
      ),
    [categoriesQuery.data?.categories],
  );

  const effectiveSelectedCategoryId = useMemo(() => {
    if (!categories.length) {
      return 0;
    }

    const hasSelectedCategory = categories.some(
      (category) => category.categoryId === selectedCategoryId,
    );
    return hasSelectedCategory ? selectedCategoryId : categories[0].categoryId;
  }, [categories, selectedCategoryId]);

  const productsQuery = useQueryOP("get", "/api/Product/MyProducts");

  const products = productsQuery.data?.products ?? [];
  const isSaving =
    createProductMutation.isPending || updateProductMutation.isPending;

  const onSubmit = async (values: ProductFormValues) => {
    setFeedback(null);
    setFormError(null);

    const payloadBase = {
      categoryId: values.categoryId,
      name: toNullableString(values.name),
      description: toNullableString(values.description),
      price: values.price,
      imageUrl: toNullableUrl(values.imageUrl),
      isAvailable: values.isAvailable,
      isPopular: values.isPopular,
      ingredients: toNullableString(values.ingredients),
      allergens: toNullableString(values.allergens),
    };

    try {
      if (editingProduct) {
        const body: components["schemas"]["CafeMenu.Entity.DTO.UpdateProductRequest"] =
          {
            productId: editingProduct.productId,
            ...payloadBase,
          };
        await updateProductMutation.mutateAsync({ body });
        setFeedback("Ürün güncellendi.");
      } else {
        const body: components["schemas"]["CafeMenu.Entity.DTO.CreateProductRequest"] =
          payloadBase;
        await createProductMutation.mutateAsync({ body });
        setFeedback("Ürün oluşturuldu.");
      }

      setSelectedCategoryId(values.categoryId);
      await productsQuery.refetch();
      if (editingProduct) {
        setIsEditDialogOpen(false);
      } else {
        setIsCreateDialogOpen(false);
      }
      setEditingProduct(null);
      reset({
        ...defaultValues,
        categoryId: values.categoryId,
      });
    } catch (error) {
      setFormError(
        toErrorMessage(error, "Ürün kaydedilirken bir hata oluştu."),
      );
    }
  };

  const onCreateNew = () => {
    if (categories.length === 0) {
      return;
    }

    const initialCategoryId =
      effectiveSelectedCategoryId > 0
        ? effectiveSelectedCategoryId
        : categories[0].categoryId;

    setEditingProduct(null);
    setFeedback(null);
    setFormError(null);
    reset({
      ...defaultValues,
      categoryId: initialCategoryId,
    });
    setIsCreateDialogOpen(true);
  };

  const onEdit = (product: ProductModel) => {
    setEditingProduct(product);
    setFeedback(null);
    setFormError(null);

    reset({
      categoryId: product.categoryId,
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price,
      imageUrl: product.imageUrl ?? "",
      ingredients: product.ingredients ?? "",
      allergens: product.allergens ?? "",
      isAvailable: product.isAvailable,
      isPopular: product.isPopular,
    });
    setIsEditDialogOpen(true);
  };

  const onDelete = async (productId: number) => {
    setFeedback(null);
    setFormError(null);

    try {
      await deleteProductMutation.mutateAsync({
        params: {
          path: {
            productId,
          },
        },
      });
      await productsQuery.refetch();
      setFeedback("Ürün silindi.");

      if (editingProduct?.productId === productId) {
        setIsEditDialogOpen(false);
        setEditingProduct(null);
        reset({
          ...defaultValues,
          categoryId: effectiveSelectedCategoryId || 0,
        });
      }
    } catch (error) {
      setFormError(toErrorMessage(error, "Ürün silinirken bir hata oluştu."));
    }
  };

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl rounded-2xl border p-4 md:p-6">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="font-carter text-3xl uppercase">Ürün Yönetimi</h1>
            <p className="mt-1 text-sm">Ürünleri görüntüleyin ve yönetin.</p>
          </div>
          <Button
            type="button"
            onClick={onCreateNew}
            disabled={!menuId || categories.length === 0}
          >
            Ürün Ekle
          </Button>
        </div>

        {!menuId && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">
            Önce menü ve kategori oluşturmalısınız.
          </p>
        )}

        {menuId && categories.length === 0 && !categoriesQuery.isPending && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">
            Ürün eklemek için önce kategori oluşturun.
          </p>
        )}

        {feedback && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">{feedback}</p>
        )}

        {formError && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">
            {formError}
          </p>
        )}

        {categories.length > 0 && (
          <div className="mb-6 flex max-w-sm flex-col gap-2">
            <span className="text-sm font-semibold">Kategori</span>
            <Select
              value={
                effectiveSelectedCategoryId > 0
                  ? effectiveSelectedCategoryId.toString()
                  : undefined
              }
              onValueChange={(value) => {
                setSelectedCategoryId(Number(value));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.categoryId}
                    value={category.categoryId.toString()}
                  >
                    {category.name || `Kategori #${category.categoryId}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mt-2">
          <h2 className="text-lg font-semibold">Ürünler</h2>

          {productsQuery.isPending && (
            <p className="mt-2 text-sm">Ürünler yükleniyor...</p>
          )}

          {!productsQuery.isPending &&
            products.length === 0 &&
            effectiveSelectedCategoryId > 0 && (
              <p className="mt-2 text-sm">Bu kategoride ürün bulunamadı.</p>
            )}

          {products.length > 0 && (
            <div className="mt-3 overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Ad</th>
                    <th className="px-3 py-2">Fiyat</th>
                    <th className="px-3 py-2">Durum</th>
                    <th className="px-3 py-2">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.productId}
                      className="border-b last:border-0"
                    >
                      <td className="px-3 py-2">{product.productId}</td>
                      <td className="px-3 py-2">{product.name || "-"}</td>
                      <td className="px-3 py-2">{product.price}</td>
                      <td className="px-3 py-2">
                        {product.isAvailable ? "Satışta" : "Kapalı"}
                        {product.isPopular ? " / Popüler" : ""}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(product)}
                          >
                            Düzenle
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(product.productId)}
                            disabled={deleteProductMutation.isPending}
                          >
                            Sil
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) {
              reset({
                ...defaultValues,
                categoryId: effectiveSelectedCategoryId || 0,
              });
            }
          }}
        >
          <DialogContent className="sm:max-w-170">
            <DialogHeader>
              <DialogTitle>Yeni Ürün Oluştur</DialogTitle>
              <DialogDescription>
                Ürün bilgilerini doldurup kaydedin.
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                type="select"
                name="categoryId"
                label="Kategori"
                control={control}
              >
                {categories.map((category) => (
                  <SelectItem
                    key={category.categoryId}
                    value={category.categoryId.toString()}
                  >
                    {category.name || `Kategori #${category.categoryId}`}
                  </SelectItem>
                ))}
              </FormInput>
              <FormInput
                type="text"
                name="name"
                label="Ürün Adı"
                placeholder="Örn: Latte"
                control={control}
              />
              <FormInput
                type="number"
                name="price"
                label="Fiyat"
                placeholder="0"
                control={control}
                min={0}
                step="0.01"
              />
              <FormInput
                type="text"
                name="description"
                label="Açıklama"
                placeholder="Ürün açıklaması"
                control={control}
              />
              <FormInput
                type="text"
                name="imageUrl"
                label="Görsel URL"
                placeholder="https://..."
                control={control}
              />
              <FormInput
                type="text"
                name="ingredients"
                label="İçerikler"
                placeholder="Süt, kahve, şurup"
                control={control}
              />
              <FormInput
                type="text"
                name="allergens"
                label="Alerjenler"
                placeholder="Süt ürünleri"
                control={control}
              />

              <Controller
                name="isAvailable"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-xl border px-4 py-3 md:col-span-2">
                    <div>
                      <p className="text-sm font-semibold">Satışta</p>
                      <p className="text-xs">
                        Kapalıysa ürün menüde gösterilmez.
                      </p>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              <Controller
                name="isPopular"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-xl border px-4 py-3 md:col-span-2">
                    <div>
                      <p className="text-sm font-semibold">Popüler</p>
                      <p className="text-xs">Açık olursa ürünü öne çıkarır.</p>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              <Button
                type="submit"
                className="md:col-span-2"
                disabled={!menuId || categories.length === 0 || isSaving}
              >
                {isSaving ? "Kaydediliyor..." : "Ürün Oluştur"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              setEditingProduct(null);
              reset({
                ...defaultValues,
                categoryId: effectiveSelectedCategoryId || 0,
              });
            }
          }}
        >
          <DialogContent className="sm:max-w-170">
            <DialogHeader>
              <DialogTitle>Ürün Düzenle</DialogTitle>
              <DialogDescription>
                Ürün detaylarını güncelleyip kaydedin.
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                type="select"
                name="categoryId"
                label="Kategori"
                control={control}
              >
                {categories.map((category) => (
                  <SelectItem
                    key={category.categoryId}
                    value={category.categoryId.toString()}
                  >
                    {category.name || `Kategori #${category.categoryId}`}
                  </SelectItem>
                ))}
              </FormInput>
              <FormInput
                type="text"
                name="name"
                label="Ürün Adı"
                placeholder="Örn: Latte"
                control={control}
              />
              <FormInput
                type="number"
                name="price"
                label="Fiyat"
                placeholder="0"
                control={control}
                min={0}
                step="0.01"
              />
              <FormInput
                type="text"
                name="description"
                label="Açıklama"
                placeholder="Ürün açıklaması"
                control={control}
              />
              <FormInput
                type="text"
                name="imageUrl"
                label="Görsel URL"
                placeholder="https://..."
                control={control}
              />
              <FormInput
                type="text"
                name="ingredients"
                label="İçerikler"
                placeholder="Süt, kahve, şurup"
                control={control}
              />
              <FormInput
                type="text"
                name="allergens"
                label="Alerjenler"
                placeholder="Süt ürünleri"
                control={control}
              />

              <Controller
                name="isAvailable"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-xl border px-4 py-3 md:col-span-2">
                    <div>
                      <p className="text-sm font-semibold">Satışta</p>
                      <p className="text-xs">
                        Kapalıysa ürün menüde gösterilmez.
                      </p>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              <Controller
                name="isPopular"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-xl border px-4 py-3 md:col-span-2">
                    <div>
                      <p className="text-sm font-semibold">Popüler</p>
                      <p className="text-xs">Açık olursa ürünü öne çıkarır.</p>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />

              <Button
                type="submit"
                className="md:col-span-2"
                disabled={!menuId || categories.length === 0 || isSaving}
              >
                {isSaving ? "Kaydediliyor..." : "Ürünü Güncelle"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
