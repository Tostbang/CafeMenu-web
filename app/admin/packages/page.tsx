"use client"

import { useState } from "react"
import { useGetAdminPackages, AdminPackage, useDeletePackage, useCreatePackage, useUpdatePackage } from "./_services/queries"
import { Button } from "@/components/ui/button"
import MyCard from "@/components/MyCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/lib/store/useGlobalStore"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
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
import { MoreHorizontal, Trash2, Plus, Edit2 } from "lucide-react"
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
import type { components } from "@/lib/types/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const createPackageSchema = z.object({
  name: z.string().min(1, "Paket adı gereklidir"),
  price: z.coerce.number().min(0, "Fiyat 0 veya daha büyük olmalıdır"),
  durationValue: z.coerce.number().min(1, "Süre 1 veya daha büyük olmalıdır"),
  durationType: z.coerce.number().refine(val => [1, 2, 3].includes(val), "Geçerli bir süre türü seçin"),
  description: z.string().optional(),
})

const updatePackageSchema = createPackageSchema.extend({
  packageId: z.coerce.number(),
  status: z.boolean(),
})

type CreatePackageForm = z.infer<typeof createPackageSchema>
type UpdatePackageForm = z.infer<typeof updatePackageSchema>
type DurationType = components["schemas"]["CafeMenu.Entity.Enum.DurationType"]

function PackagesTableSkeleton() {
  return (
    <div className="mt-3 space-y-3">
      <Skeleton className="h-10 w-full rounded-xl" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-xl" />
      ))}
    </div>
  )
}

const durationTypeLabels: Record<number, string> = {
  1: "Gün",
  2: "Ay",
  3: "Yıl",
}

export default function AdminPackagesPage() {
  const { data: packagesData, isLoading } = useGetAdminPackages()
  const { mutate: deletePackage, isPending: isDeletePending } = useDeletePackage()
  const { mutate: createPackage, isPending: isCreatePending } = useCreatePackage()
  const { mutate: updatePackage, isPending: isUpdatePending } = useUpdatePackage()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<AdminPackage | null>(null)

  const form = useForm<CreatePackageForm>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: {
      name: "",
      price: 0,
      durationValue: 1,
      durationType: 1,
      description: "",
    },
  })

  const updateForm = useForm<UpdatePackageForm>({
    resolver: zodResolver(updatePackageSchema),
    defaultValues: {
      packageId: 0,
      name: "",
      price: 0,
      durationValue: 1,
      durationType: 1,
      status: true,
      description: "",
    },
  })

  const onCreateSubmit = (data: CreatePackageForm) => {
    createPackage({
      body: {
        name: data.name.trim() || null,
        price: data.price,
        durationValue: data.durationValue,
        durationType: data.durationType as DurationType,
        description: data.description?.trim() || null,
      },
    }, {
      onSuccess: () => {
        setIsCreateDialogOpen(false)
        form.reset()
      },
    })
  }

  const onUpdateSubmit = (data: UpdatePackageForm) => {
    updatePackage({
      body: {
        packageId: data.packageId,
        name: data.name.trim() || null,
        price: data.price,
        status: data.status,
        durationValue: data.durationValue,
        durationType: data.durationType as DurationType,
        description: data.description?.trim() || null,
      },
    }, {
      onSuccess: () => {
        setIsDetailsDialogOpen(false)
        setIsEditMode(false)
        updateForm.reset()
      },
    })
  }

  const handleDeletePackage = (pkg: AdminPackage) => {
    Alert({
      AlertTitle: "Paketi Sil",
      AlertDescription: `"${pkg.name}" paketini pasife almak istediğinizden emin misiniz?`,
      ConfirmLabel: "Pasife Al",
      CancelLabel: "İptal",
      onConfirm: () => deletePackage({ params: { path: { packageId: pkg.packageId } } }),
    })
  }

  const handleEditPackage = (pkg: AdminPackage) => {
    setIsEditMode(true)
    updateForm.reset({
      packageId: pkg.packageId,
      name: pkg.name || "",
      price: pkg.price,
      durationValue: pkg.durationValue,
      durationType: pkg.durationType,
      status: pkg.status,
      description: pkg.description || "",
    })
  }

  const handleViewDetails = (pkg: AdminPackage) => {
    setSelectedPackage(pkg)
    setIsDetailsDialogOpen(true)
    setIsEditMode(false)
  }

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paket Yönetimi</h1>
            <p className="mt-1 text-sm">
              Paketleri görüntüleyin ve yönetin.
            </p>
          </div>
          <Button onClick={() => {
            form.reset()
            setIsCreateDialogOpen(true)
          }} className="gap-2">
            <Plus className="h-4 w-4" />
            Yeni Paket
          </Button>
        </div>

        <MyCard title="Paketler">
          {isLoading ? (
            <PackagesTableSkeleton />
          ) : packagesData && packagesData.packages && packagesData.packages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Adı</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead>Süre</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Oluşturma Tarihi</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packagesData.packages.map((pkg) => (
                  <TableRow key={pkg.packageId}>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">₺{pkg.price.toFixed(2)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {pkg.durationValue} {durationTypeLabels[pkg.durationType]}
                    </TableCell>
                    <TableCell>
                      <Badge variant={pkg.status ? "default" : "destructive"}>
                        {pkg.status ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(pkg.createdDate), "dd MMM yyyy", { locale: tr })}
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
                          <DropdownMenuItem onClick={() => {
                            setSelectedPackage(pkg)
                            setIsDetailsDialogOpen(true)
                            handleEditPackage(pkg)
                          }}>
                            <Edit2 className="mr-1 h-4 w-4" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDetails(pkg)}>
                            <Edit2 className="mr-1 h-4 w-4" />
                            Detayları Gör
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeletePackage(pkg)}
                            disabled={isDeletePending}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            {isDeletePending ? "Siliniyor..." : "Pasife Al"}
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
              Paket bulunamadı.
            </div>
          )}
        </MyCard>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Yeni Paket Oluştur</DialogTitle>
            <DialogDescription>
              Yeni bir paket oluşturun
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onCreateSubmit)} className="space-y-4">
            <FormInput
              type="text"
              label="Paket Adı"
              name="name"
              placeholder="Paket adını girin"
              control={form.control}
            />

            <FormInput
              type="number"
              label="Fiyat (₺)"
              name="price"
              placeholder="Fiyatı girin"
              control={form.control}
              step="0.01"
            />

            <FormInput
              type="number"
              label="Süre Değeri"
              name="durationValue"
              placeholder="Süre değerini girin"
              control={form.control}
            />

            <div>
              <label className="text-sm font-medium block mb-2">Süre Türü</label>
              <Select
                value={form.watch("durationType").toString()}
                onValueChange={(value) => form.setValue("durationType", parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Süre türünü seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Gün</SelectItem>
                  <SelectItem value="2">Ay</SelectItem>
                  <SelectItem value="3">Yıl</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FormInput
              type="text"
              label="Açıklama (Opsiyonel)"
              name="description"
              placeholder="Paket açıklaması"
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

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Paketi Düzenle" : "Paket Detayları"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Paket bilgilerini düzenleyin" : "Paket detaylarını görüntüleyin"}
            </DialogDescription>
          </DialogHeader>

          {isEditMode && selectedPackage ? (
            <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4">
              <FormInput
                type="text"
                label="Paket Adı"
                name="name"
                placeholder="Paket adını girin"
                control={updateForm.control}
              />

              <FormInput
                type="number"
                label="Fiyat (₺)"
                name="price"
                placeholder="Fiyatı girin"
                control={updateForm.control}
                step="0.01"
              />

              <FormInput
                type="number"
                label="Süre Değeri"
                name="durationValue"
                placeholder="Süre değerini girin"
                control={updateForm.control}
              />

              <div>
                <label className="text-sm font-medium block mb-2">Süre Türü</label>
                <Select
                  value={updateForm.watch("durationType").toString()}
                  onValueChange={(value) => updateForm.setValue("durationType", parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Süre türünü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Gün</SelectItem>
                    <SelectItem value="2">Ay</SelectItem>
                    <SelectItem value="3">Yıl</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FormInput
                type="text"
                label="Açıklama"
                name="description"
                placeholder="Paket açıklaması"
                control={updateForm.control}
              />

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditMode(false)}
                  disabled={isUpdatePending}
                >
                  İptal
                </Button>
                <Button type="submit" disabled={isUpdatePending}>
                  {isUpdatePending ? "Güncelleniyor..." : "Güncelle"}
                </Button>
              </div>
            </form>
          ) : (
            selectedPackage && (
              <>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Adı:</span>
                    <span className="col-span-2">{selectedPackage.name}</span>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Fiyat:</span>
                    <span className="col-span-2">₺{selectedPackage.price.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Süre:</span>
                    <span className="col-span-2">
                      {selectedPackage.durationValue} {durationTypeLabels[selectedPackage.durationType]}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Açıklama:</span>
                    <span className="col-span-2 text-sm">{selectedPackage.description || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Durum:</span>
                    <span className="col-span-2">
                      <Badge variant={selectedPackage.status ? "default" : "destructive"}>
                        {selectedPackage.status ? "Aktif" : "Pasif"}
                      </Badge>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-4">
                    <span className="font-medium">Oluşturma:</span>
                    <span className="col-span-2 text-sm">
                      {format(new Date(selectedPackage.createdDate), "dd MMM yyyy HH:mm", { locale: tr })}
                    </span>
                  </div>

                  {selectedPackage.modifiedDate && (
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="font-medium">Güncelleme:</span>
                      <span className="col-span-2 text-sm">
                        {format(new Date(selectedPackage.modifiedDate), "dd MMM yyyy HH:mm", { locale: tr })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsDialogOpen(false)}
                  >
                    Kapat
                  </Button>
                  <Button onClick={() => handleEditPackage(selectedPackage)}>
                    Düzenle
                  </Button>
                </div>
              </>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
