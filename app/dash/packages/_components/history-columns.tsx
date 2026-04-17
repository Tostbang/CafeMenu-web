"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { MembershipHistoryItem } from "../_services/queries";

export const historyColumns: ColumnDef<MembershipHistoryItem>[] = [
  {
    accessorKey: "packageName",
    header: "Paket Adı",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("packageName") || "-"}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Fiyat",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(price);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "maxDeviceCount",
    header: "Maks. Cihaz",
    cell: ({ row }) => <div className="text-center">{row.getValue("maxDeviceCount")}</div>,
  },
  {
    accessorKey: "allowMobile",
    header: "Mobil Erişim",
    cell: ({ row }) => {
      const allowMobile = row.getValue("allowMobile") as boolean;
      return <Badge variant={allowMobile ? "default" : "secondary"}>{allowMobile ? "Evet" : "Hayır"}</Badge>;
    },
  },
  {
    accessorKey: "allowedRadiusKm",
    header: "Yarıçap (km)",
    cell: ({ row }) => <div className="text-center">{row.getValue("allowedRadiusKm")}</div>,
  },
  {
    accessorKey: "startsAt",
    header: "Başlangıç Tarihi",
    cell: ({ row }) => (
      <div className="text-sm">
        {format(new Date(row.getValue("startsAt")), "dd MMM yyyy", { locale: tr })}
      </div>
    ),
  },
  {
    accessorKey: "endsAt",
    header: "Bitiş Tarihi",
    cell: ({ row }) => {
      const endsAt = row.getValue("endsAt") as string | null;
      return (
        <div className="text-sm">
          {endsAt ? format(new Date(endsAt), "dd MMM yyyy", { locale: tr }) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Durum",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Aktif" : "Süresi Dolmuş"}</Badge>;
    },
  },
  {
    accessorKey: "createdDate",
    header: "Satın Alma Tarihi",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("createdDate")), "dd MMM yyyy HH:mm", { locale: tr })}
      </div>
    ),
  },
];
