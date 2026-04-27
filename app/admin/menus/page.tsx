"use client"

import { useState } from "react"
import { useGetAdminMenus, AdminMenu, useDeleteAdminMenu, usePublishMenu, useGetMenuDetail } from "./_services/queries"
import { Button } from "@/components/ui/button"
import MyCard from "@/components/MyCard"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/lib/store/useGlobalStore"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { MoreHorizontal, Trash2 } from "lucide-react"
import { GoogleDoc } from "asem-icons"

function MenusTableSkeleton() {
  return (
    <div className="mt-3 space-y-3">
      <Skeleton className="h-10 w-full rounded-xl" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-xl" />
      ))}
    </div>
  )
}

export default function AdminMenusPage() {
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null)
  const [publishFilter, setPublishFilter] = useState<boolean | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { data: menusData, isLoading } = useGetAdminMenus({
    ...(statusFilter !== undefined && { status: statusFilter }),
    ...(publishFilter !== undefined && { isPublished: publishFilter }),
    page: currentPage,
    pageSize: pageSize,
  })
  const { mutate: deleteMenu, isPending: isDeletePending } = useDeleteAdminMenu()
  const { mutate: publishMenu, isPending: isPublishPending } = usePublishMenu()
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const { data: menuDetailData, isLoading: isDetailLoading } = useGetMenuDetail(
    selectedMenuId ?? 0,
    Boolean(selectedMenuId && isDetailsDialogOpen),
  )
  const selectedMenu = menuDetailData?.menu

  const handleViewDetails = (menu: AdminMenu) => {
    setSelectedMenuId(menu.menuId)
    setIsDetailsDialogOpen(true)
  }

  const handleDeleteMenu = (menu: AdminMenu) => {
    Alert({
      AlertTitle: "Menüyü Sil",
      AlertDescription: `"${menu.title}" adlı menüyü pasife almak istediğinizden emin misiniz?`,
      ConfirmLabel: "Pasife Al",
      CancelLabel: "İptal",
      onConfirm: () => deleteMenu({ params: { path: { menuId: menu.menuId } } }),
    })
  }

  const handlePublishToggle = (menu: AdminMenu) => {
    const newStatus = !menu.isPublished
    const action = newStatus ? "yayına almak" : "yayından kaldırmak"
    
    Alert({
      AlertTitle: "Yayın Durumunu Değiştir",
      AlertDescription: `"${menu.title}" menüsünü ${action} istediğinizden emin misiniz?`,
      ConfirmLabel: "Evet",
      CancelLabel: "İptal",
      onConfirm: () => publishMenu({ 
        body: { 
          menuId: menu.menuId, 
          isPublished: newStatus 
        } 
      }),
    })
  }

  const handleStatusFilterChange = (value: string) => {
    setCurrentPage(1)
    if (value === "all") {
      setStatusFilter(null)
    } else if (value === "active") {
      setStatusFilter(true)
    } else {
      setStatusFilter(false)
    }
  }

  const handlePublishFilterChange = (value: string) => {
    setCurrentPage(1)
    if (value === "all") {
      setPublishFilter(null)
    } else if (value === "published") {
      setPublishFilter(true)
    } else {
      setPublishFilter(false)
    }
  }

  const totalPages = menusData?.totalPages || 0

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Menü Yönetimi</h1>
            <p className="mt-1 text-sm">
              Menüleri görüntüleyin, detaylarını kontrol edin ve yönetin.
            </p>
          </div>
        </div>

        <MyCard
          title="Menüler"
          actions={
            <div className="flex gap-2">
              <Select
                value={
                  statusFilter === null
                    ? "all"
                    : statusFilter
                      ? "active"
                      : "inactive"
                }
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Durum Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={
                  publishFilter === null
                    ? "all"
                    : publishFilter
                      ? "published"
                      : "unpublished"
                }
                onValueChange={handlePublishFilterChange}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Yayın Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="published">Yayında</SelectItem>
                  <SelectItem value="unpublished">Yayında Değil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        >
          {isLoading ? (
            <MenusTableSkeleton />
          ) : menusData && menusData.menus && menusData.menus.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Adres</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Yayın</TableHead>
                    <TableHead>Oluşturma Tarihi</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menusData.menus.map((menu) => (
                    <TableRow key={menu.menuId}>
                      <TableCell className="font-medium">{menu.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{menu.slug}</TableCell>
                      <TableCell className="text-sm">{menu.phoneNumber || "-"}</TableCell>
                      <TableCell className="text-sm truncate max-w-xs">{menu.address || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={menu.status ? "default" : "destructive"}>
                          {menu.status ? "Aktif" : "Pasif"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={menu.isPublished ? "default" : "secondary"}>
                          {menu.isPublished ? "Yayında" : "Taslak"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(menu.createdDate), "dd MMM yyyy", { locale: tr })}
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
                            <DropdownMenuItem onClick={() => handleViewDetails(menu)}>
                              <GoogleDoc className="mr-1 h-4 w-4" />
                              Detayları Gör
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePublishToggle(menu)} disabled={isPublishPending}>
                              {isPublishPending ? "Güncelleniyor..." : (menu.isPublished ? "Yayından Kaldır" : "Yayına Al")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteMenu(menu)}
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

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Önceki
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Sayfa {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Sonraki
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Menü bulunamadı.
            </div>
          )}
        </MyCard>
      </div>

      {/* Menu Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Menü Detayları</DialogTitle>
            <DialogDescription>
              Menünün detaylı bilgilerini görüntüleyin
            </DialogDescription>
          </DialogHeader>

          {isDetailLoading && (
            <div className="py-6 text-center text-muted-foreground">Yükleniyor...</div>
          )}

          {!isDetailLoading && selectedMenu && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Başlık:</span>
                <span className="col-span-2">{selectedMenu.title}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Slug:</span>
                <span className="col-span-2 text-sm text-muted-foreground">{selectedMenu.slug}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Açıklama:</span>
                <span className="col-span-2 text-sm">{selectedMenu.description || "-"}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Telefon:</span>
                <span className="col-span-2 text-sm">{selectedMenu.phoneNumber || "-"}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Adres:</span>
                <span className="col-span-2 text-sm">{selectedMenu.address || "-"}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Instagram:</span>
                <span className="col-span-2 text-sm">{selectedMenu.instagramUrl || "-"}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Facebook:</span>
                <span className="col-span-2 text-sm">{selectedMenu.facebookUrl || "-"}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">X (Twitter):</span>
                <span className="col-span-2 text-sm">{selectedMenu.xUrl || "-"}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">WhatsApp:</span>
                <span className="col-span-2 text-sm">{selectedMenu.whatsappPhone || "-"}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Ana Renk:</span>
                <span className="col-span-2">
                  {selectedMenu.primaryColor ? (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border" 
                        style={{ backgroundColor: selectedMenu.primaryColor }}
                      />
                      <span className="text-sm">{selectedMenu.primaryColor}</span>
                    </div>
                  ) : "-"}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">İkincil Renk:</span>
                <span className="col-span-2">
                  {selectedMenu.secondaryColor ? (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border" 
                        style={{ backgroundColor: selectedMenu.secondaryColor }}
                      />
                      <span className="text-sm">{selectedMenu.secondaryColor}</span>
                    </div>
                  ) : "-"}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Aksent Renk:</span>
                <span className="col-span-2">
                  {selectedMenu.accentColor ? (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border" 
                        style={{ backgroundColor: selectedMenu.accentColor }}
                      />
                      <span className="text-sm">{selectedMenu.accentColor}</span>
                    </div>
                  ) : "-"}
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Durum:</span>
                <span className="col-span-2">
                  <Badge variant={selectedMenu.status ? "default" : "destructive"}>
                    {selectedMenu.status ? "Aktif" : "Pasif"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Yayın Durumu:</span>
                <span className="col-span-2">
                  <Badge variant={selectedMenu.isPublished ? "default" : "secondary"}>
                    {selectedMenu.isPublished ? "Yayında" : "Taslak"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Oluşturma:</span>
                <span className="col-span-2 text-sm">
                  {format(new Date(selectedMenu.createdDate), "dd MMM yyyy HH:mm", { locale: tr })}
                </span>
              </div>

              {selectedMenu.modifiedDate && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Güncelleme:</span>
                  <span className="col-span-2 text-sm">
                    {format(new Date(selectedMenu.modifiedDate), "dd MMM yyyy HH:mm", { locale: tr })}
                  </span>
                </div>
              )}

              {selectedMenu.deletedDate && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Silme:</span>
                  <span className="col-span-2 text-sm">
                    {format(new Date(selectedMenu.deletedDate), "dd MMM yyyy HH:mm", { locale: tr })}
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
