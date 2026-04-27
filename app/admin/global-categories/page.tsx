"use client"

import { useState } from "react"
import { useGetGlobalCategories, GlobalCategory, useDeleteGlobalCategory, useCreateGlobalCategory } from "./_services/queries"
import { Button } from "@/components/ui/button"
import MyCard from "@/components/MyCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/lib/store/useGlobalStore"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"

const createCategorySchema = z.object({
  name: z.string().min(1, "Kategori adı gereklidir"),
  order: z.coerce.number().min(0, "Sıra 0 veya daha büyük olmalıdır"),
})

type CreateCategoryForm = z.infer<typeof createCategorySchema>

function CategoriesTableSkeleton() {
  return (
    <div className="mt-3 space-y-3">
      <Skeleton className="h-10 w-full rounded-xl" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-xl" />
      ))}
    </div>
  )
}

export default function AdminGlobalCategoriesPage() {
  const { data: categoriesData, isLoading } = useGetGlobalCategories()
  const { mutate: deleteCategory, isPending: isDeletePending } = useDeleteGlobalCategory()
  const { mutate: createCategory, isPending: isCreatePending } = useCreateGlobalCategory()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      order: 0,
    },
  })

  const onSubmit = (data: CreateCategoryForm) => {
    createCategory({ body: data }, {
      onSuccess: () => {
        setIsCreateDialogOpen(false)
        form.reset()
      },
    })
  }

  const handleDeleteCategory = (category: GlobalCategory) => {
    Alert({
      AlertTitle: "Kategoriyi Sil",
      AlertDescription: `"${category.name}" kategorisini pasife almak istediğinizden emin misiniz?`,
      ConfirmLabel: "Kaldır",
      CancelLabel: "İptal",
      onConfirm: () => deleteCategory({ params: { path: { categoryId: category.categoryId } } }),
    })
  }

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Global Kategori Yönetimi</h1>
            <p className="mt-1 text-sm">
              Global kategorileri görüntüleyin ve yönetin.
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Yeni Kategori
          </Button>
        </div>

        <MyCard title="Kategoriler">
          {isLoading ? (
            <CategoriesTableSkeleton />
          ) : categoriesData && categoriesData.categories && categoriesData.categories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Adı</TableHead>
                  <TableHead>Sıra</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesData.categories.map((category) => (
                  <TableRow key={category.categoryId}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{category.order}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menüyü aç</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteCategory(category)}
                            disabled={isDeletePending}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            {isDeletePending ? "Siliniyor..." : "Sil"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Kategori bulunamadı.
            </div>
          )}
        </MyCard>
      </div>

      {/* Create Category Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Yeni Kategori Oluştur</DialogTitle>
            <DialogDescription>
              Yeni bir global kategori oluşturun
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              type="text"
              label="Kategori Adı"
              name="name"
              placeholder="Kategorinin adını girin"
              control={form.control}
            />

            <FormInput
              type="number"
              label="Sıra"
              name="order"
              placeholder="Sıra numarasını girin"
              control={form.control}
            />

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                disabled={isCreatePending}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isCreatePending}>
                {isCreatePending ? "Oluşturuluyor..." : "Oluştur"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
