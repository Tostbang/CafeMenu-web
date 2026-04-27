"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AdminUser } from "./_services/queries"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { GoogleDoc } from "asem-icons"

export const createColumns = (
  onViewDetails: (user: AdminUser) => void,
  onDeleteUser: (user: AdminUser) => void,
): ColumnDef<AdminUser>[] => [
    {
      accessorKey: "firstName",
      header: "Ad",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("firstName")}</div>
      },
    },
    {
      accessorKey: "lastName",
      header: "Soyad",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("lastName")}</div>
      },
    },
    {
      accessorKey: "email",
      header: "E-posta",
      cell: ({ row }) => {
        return <div className="text-sm">{row.getValue("email")}</div>
      },
    },
    {
      accessorKey: "roleId",
      header: "Rol",
      cell: ({ row }) => {
        const roleId = row.getValue("roleId") as number
        const roleName = roleId === 1 ? "Admin" : "Kullanıcı"
        return (
          <Badge variant={roleId === 1 ? "default" : "secondary"}>
            {roleName}
          </Badge>
        )
      },
    },
    {
      accessorKey: "isApproved",
      header: "Onay Durumu",
      cell: ({ row }) => {
        const isApproved = row.getValue("isApproved") as boolean
        return (
          <Badge variant={isApproved ? "default" : "destructive"}>
            {isApproved ? "Onaylı" : "Bekliyor"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => {
        const status = row.getValue("status") as boolean
        return (
          <Badge variant={status ? "default" : "destructive"}>
            {status ? "Aktif" : "Pasif"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdDate",
      header: "Kayıt Tarihi",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {format(new Date(row.getValue("createdDate")), "dd MMM yyyy")}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menüyü aç</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(user)}>
                <GoogleDoc className="mr-1 h-4 w-4" />
                Detayları Gör
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDeleteUser(user)}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Pasife Al
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
