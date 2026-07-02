"use client"

import { useState } from "react"
import { useGetAdminUsers, AdminUser, useDeleteAdminUser } from "./_services/queries"
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

function UsersTableSkeleton() {
  return (
    <div className="mt-3 space-y-3">
      <Skeleton className="h-10 w-full rounded-xl" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-xl" />
      ))}
    </div>
  )
}

export default function AdminUsersPage() {
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { data: usersData, isLoading } = useGetAdminUsers({
    ...(statusFilter !== undefined && { status: statusFilter }),
    page: currentPage,
    pageSize: pageSize,
  })
  const { mutate: deleteUser } = useDeleteAdminUser()
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const handleViewDetails = (user: AdminUser) => {
    setSelectedUser(user)
    setIsDetailsDialogOpen(true)
  }

  const handleDeleteUser = (user: AdminUser) => {
    Alert({
      AlertTitle: "Kullanıcıyı Sil",
      AlertDescription: `${user.firstName} ${user.lastName} adlı kullanıcıyı silmek istediğinizden emin misiniz?`,
      ConfirmLabel: "Sil",
      CancelLabel: "İptal",
      onConfirm: () => deleteUser({ params: { path: { userId: user.userId } } }),
    })
  }

  const handleFilterChange = (value: string) => {
    setCurrentPage(1)
    if (value === "all") {
      setStatusFilter(undefined)
    } else if (value === "active") {
      setStatusFilter(true)
    } else {
      setStatusFilter(false)
    }
  }

  const totalPages = usersData?.totalPages || 0

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h1>
            <p className="mt-1 text-sm">
              Kullanıcıları görüntüleyin, detaylarını kontrol edin ve yönetin.
            </p>
          </div>
        </div>

        <MyCard
          title="Kullanıcılar"
          actions={
            <Select
              value={
                statusFilter === undefined
                  ? "all"
                  : statusFilter
                    ? "active"
                    : "inactive"
              }
              onValueChange={handleFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum Filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          }
        >
        {isLoading ? (
          <UsersTableSkeleton />
        ) : usersData && usersData.users && usersData.users.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Soyad</TableHead>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Onay</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData.users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell className="font-medium">{user.firstName}</TableCell>
                    <TableCell className="font-medium">{user.lastName}</TableCell>
                    <TableCell className="text-sm">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.roleId === 1 ? "default" : "secondary"}>
                        {user.roleId === 1 ? "Admin" : "Kullanıcı"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isApproved ? "default" : "destructive"}>
                        {user.isApproved ? "Onaylı" : "Bekliyor"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status ? "default" : "destructive"}>
                        {user.status ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(user.createdDate), "dd MMM yyyy")}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                            <GoogleDoc className="mr-1 h-4 w-4" />
                            Detayları Gör
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Pasife Al
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
            Kullanıcı bulunamadı.
          </div>
        )}
      </MyCard>
    </div>

      {/* User Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Kullanıcı Detayları</DialogTitle>
            <DialogDescription>
              Kullanıcının detaylı bilgilerini görüntüleyin
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Ad:</span>
                <span className="col-span-2">{selectedUser.firstName}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Soyad:</span>
                <span className="col-span-2">{selectedUser.lastName}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">E-posta:</span>
                <span className="col-span-2 text-sm">{selectedUser.email}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Rol:</span>
                <span className="col-span-2">
                  <Badge variant={selectedUser.roleId === 1 ? "default" : "secondary"}>
                    {selectedUser.roleId === 1 ? "Admin" : "Kullanıcı"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Onay Durumu:</span>
                <span className="col-span-2">
                  <Badge variant={selectedUser.isApproved ? "default" : "destructive"}>
                    {selectedUser.isApproved ? "Onaylı" : "Bekliyor"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Durum:</span>
                <span className="col-span-2">
                  <Badge variant={selectedUser.status ? "default" : "destructive"}>
                    {selectedUser.status ? "Aktif" : "Pasif"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Kayıt Tarihi:</span>
                <span className="col-span-2 text-sm">
                  {format(new Date(selectedUser.createdDate), "dd MMM yyyy HH:mm")}
                </span>
              </div>

              {selectedUser.modifiedDate && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Güncelleme:</span>
                  <span className="col-span-2 text-sm">
                    {format(new Date(selectedUser.modifiedDate), "dd MMM yyyy HH:mm")}
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
