"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
import { useMutationOP, useQueryOP } from "@/lib/Fetch";
import type { components } from "@/lib/types/api";

const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Kategori adı en az 2 karakter olmalıdır.")
    .max(80, "Kategori adı en fazla 80 karakter olabilir."),
  order: z
    .number({ invalid_type_error: "Sıra numarası girin." })
    .int("Sıra numarası tam sayı olmalıdır.")
    .min(1, "Sıra numarası 1 veya daha büyük olmalıdır."),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;
type CategoryModel = components["schemas"]["CafeMenu.Entity.DTO.CategoryModel"];

const defaultValues: CategoryFormValues = {
  name: "",
  order: 1,
};

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function CategoryPage() {
  const getMyMenuQuery = useQueryOP("get", "/api/Menu/GetMyMenu");
  const menuId = getMyMenuQuery.data?.menu?.menuId;

  const categoriesQuery = useQueryOP("get", "/api/Category/MyCategories");

  const createCategoryMutation = useMutationOP("post", "/api/Category/Create");
  const updateCategoryMutation = useMutationOP("put", "/api/Category/Update");
  const deleteCategoryMutation = useMutationOP(
    "delete",
    "/api/Category/{categoryId}",
  );

  const [editingCategory, setEditingCategory] = useState<CategoryModel | null>(
    null,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  const categories = useMemo(
    () =>
      [...(categoriesQuery.data?.categories ?? [])].sort(
        (a, b) => a.order - b.order,
      ),
    [categoriesQuery.data?.categories],
  );

  const isSaving =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  const onSubmit = async (values: CategoryFormValues) => {
    if (!menuId) {
      setFormError("Önce menü sayfasından bir menü oluşturmalısınız.");
      return;
    }

    setFeedback(null);
    setFormError(null);

    try {
      if (editingCategory) {
        const body: components["schemas"]["CafeMenu.Entity.DTO.UpdateCategoryRequest"] =
          {
            categoryId: editingCategory.categoryId,
            name: values.name.trim(),
            order: values.order,
          };
        await updateCategoryMutation.mutateAsync({ body });
        setFeedback("Kategori güncellendi.");
      } else {
        const body: components["schemas"]["CafeMenu.Entity.DTO.CreateCategoryRequest"] =
          {
            name: values.name.trim(),
            order: values.order,
          };
        await createCategoryMutation.mutateAsync({ body });
        setFeedback("Kategori oluşturuldu.");
      }

      await categoriesQuery.refetch();

      if (editingCategory) {
        setIsEditDialogOpen(false);
      } else {
        setIsCreateDialogOpen(false);
      }

      setEditingCategory(null);
      reset(defaultValues);
    } catch (error) {
      setFormError(
        toErrorMessage(error, "Kategori kaydedilirken bir hata oluştu."),
      );
    }
  };

  const onCreateNew = () => {
    setEditingCategory(null);
    setFeedback(null);
    setFormError(null);
    reset(defaultValues);
    setIsCreateDialogOpen(true);
  };

  const onEdit = (category: CategoryModel) => {
    setEditingCategory(category);
    setFeedback(null);
    setFormError(null);
    reset({
      name: category.name ?? "",
      order: category.order,
    });
    setIsEditDialogOpen(true);
  };

  const onDelete = async (categoryId: number) => {
    setFeedback(null);
    setFormError(null);

    try {
      await deleteCategoryMutation.mutateAsync({
        params: { path: { categoryId } },
      });
      await categoriesQuery.refetch();
      setFeedback("Kategori silindi.");

      if (editingCategory?.categoryId === categoryId) {
        setIsEditDialogOpen(false);
        setEditingCategory(null);
        reset(defaultValues);
      }
    } catch (error) {
      setFormError(
        toErrorMessage(error, "Kategori silinirken bir hata oluştu."),
      );
    }
  };

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl rounded-2xl border p-4 md:p-6">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="font-carter text-3xl uppercase">
              Kategori Yönetimi
            </h1>
            <p className="mt-1 text-sm">
              Kategorileri görüntüleyin ve yönetin.
            </p>
          </div>
          <Button type="button" onClick={onCreateNew} disabled={!menuId}>
            Kategori Ekle
          </Button>
        </div>

        {!menuId && (
          <p className="mb-4 rounded-xl border px-4 py-2 text-sm">
            Önce menü sayfasından bir menü oluşturun. Kategoriler menüye bağlı
            çalışır.
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

        <div className="mt-2">
          <h2 className="text-lg font-semibold">Kategoriler</h2>
          {categoriesQuery.isPending && (
            <p className="mt-2 text-sm">Kategoriler yükleniyor...</p>
          )}
          {!categoriesQuery.isPending && categories.length === 0 && (
            <p className="mt-2 text-sm">Henüz kategori yok.</p>
          )}

          {categories.length > 0 && (
            <div className="mt-3 overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Ad</th>
                    <th className="px-3 py-2">Sıra</th>
                    <th className="px-3 py-2">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.categoryId}
                      className="border-b last:border-0"
                    >
                      <td className="px-3 py-2">{category.categoryId}</td>
                      <td className="px-3 py-2">{category.name || "-"}</td>
                      <td className="px-3 py-2">{category.order}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(category)}
                          >
                            Düzenle
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(category.categoryId)}
                            disabled={deleteCategoryMutation.isPending}
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
              setEditingCategory(null);
              reset(defaultValues);
            }
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Yeni Kategori Oluştur</DialogTitle>
              <DialogDescription>
                Kategori bilgilerini doldurup kaydedin.
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                type="text"
                name="name"
                label="Kategori Adı"
                placeholder="Örn: Kahveler"
                control={control}
              />
              <FormInput
                type="number"
                name="order"
                label="Sıra"
                placeholder="1"
                control={control}
                min={1}
              />

              <Button type="submit" disabled={!menuId || isSaving}>
                {isSaving ? "Kaydediliyor..." : "Kategori Oluştur"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) {
              setEditingCategory(null);
              reset(defaultValues);
            }
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Kategori Düzenle</DialogTitle>
              <DialogDescription>
                Kategori bilgilerini güncelleyip kaydedin.
              </DialogDescription>
            </DialogHeader>
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                type="text"
                name="name"
                label="Kategori Adı"
                placeholder="Örn: Kahveler"
                control={control}
              />
              <FormInput
                type="number"
                name="order"
                label="Sıra"
                placeholder="1"
                control={control}
                min={1}
              />

              <Button type="submit" disabled={!menuId || isSaving}>
                {isSaving ? "Kaydediliyor..." : "Kategoriyi Güncelle"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
