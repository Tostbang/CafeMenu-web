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
import { toast } from "sonner";
import MyCard from "@/components/MyCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete02Filled, Edit02Filled } from "asem-icons";
import { MoreHorizontal } from "lucide-react";
import { Alert } from "@/lib/store/useGlobalStore";

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

function CategoryTableSkeleton() {
  return (
    <div className="mt-3 space-y-3">
      <Skeleton className="h-10 w-full rounded-xl" />
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-xl" />
      ))}
    </div>
  );
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
      toast.error("Önce menü sayfasından bir menü oluşturmalısınız.");
      return;
    }

    try {
      if (editingCategory) {
        const body: components["schemas"]["CafeMenu.Entity.DTO.UpdateCategoryRequest"] =
          {
            categoryId: editingCategory.categoryId,
            name: values.name.trim(),
            order: values.order,
          };
        await updateCategoryMutation.mutateAsync({ body });
        toast.success("Kategori güncellendi.");
      } else {
        const body: components["schemas"]["CafeMenu.Entity.DTO.CreateCategoryRequest"] =
          {
            name: values.name.trim(),
            order: values.order,
          };
        await createCategoryMutation.mutateAsync({ body });
        toast.success("Kategori oluşturuldu.");
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
      if (!(error instanceof Error)) {
        toast.error(toErrorMessage(error, "Kategori kaydedilirken bir hata oluştu."));
      }
    }
  };

  const onCreateNew = () => {
    setEditingCategory(null);
    reset(defaultValues);
    setIsCreateDialogOpen(true);
  };

  const onEdit = (category: CategoryModel) => {
    setEditingCategory(category);
    reset({
      name: category.name ?? "",
      order: category.order,
    });
    setIsEditDialogOpen(true);
  };

  const onDelete = async (categoryId: number) => {
    try {
      await deleteCategoryMutation.mutateAsync({
        params: { path: { categoryId } },
      });
      await categoriesQuery.refetch();
      toast.success("Kategori silindi.");

      if (editingCategory?.categoryId === categoryId) {
        setIsEditDialogOpen(false);
        setEditingCategory(null);
        reset(defaultValues);
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error(toErrorMessage(error, "Kategori silinirken bir hata oluştu."));
      }
    }
  };

  const onDeleteConfirm = (categoryId: number) => {
    Alert({
      AlertTitle: "Kategoriyi Sil",
      AlertDescription:
        "Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      CancelLabel: "Vazgeç",
      ConfirmLabel: "Sil",
      onConfirm: () => {
        void onDelete(categoryId);
      },
    });
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

        <MyCard title="Kategoriler" className="mt-2">
          {categoriesQuery.isPending && <CategoryTableSkeleton />}
          {!categoriesQuery.isPending && categories.length === 0 && (
            <p className="mt-2 text-sm">Henüz kategori yok.</p>
          )}

          {categories.length > 0 && (
            <div className="mt-3 rounded-xl border bg-white/60">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Ad</TableHead>
                    <TableHead>Sıra</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.categoryId}>
                      <TableCell>{category.categoryId}</TableCell>
                      <TableCell>{category.name || "-"}</TableCell>
                      <TableCell>{category.order}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button type="button" variant="outline" size="icon-sm">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => onEdit(category)}>
                              <Edit02Filled className="size-4" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => onDeleteConfirm(category.categoryId)}
                              disabled={deleteCategoryMutation.isPending}
                            >
                              <Delete02Filled className="size-4" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </MyCard>

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
