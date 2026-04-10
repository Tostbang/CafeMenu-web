
import { ItemLink } from "@/components/my-nav";
// import { AdminLinks, DepartmentUser, ManagerLinks, PurchaserLinks, SupplierLinks } from "@/lib/static";
// import { useProfileStore } from "@/lib/stores/profile-store"
import { useMemo } from "react";
import { useProfileStore } from "@/lib/store/profile-store";
import { Role } from "@/lib/types";
import { adminLinks, userLinks } from "@/lib/static";

export function useLinks(layout: "dash" | "admin") {

  return useMemo(() => {
    if (layout === "dash") {
      return userLinks;
    }
    else if (layout === "admin") {
      return adminLinks;
    } else {
      return []
    }
  }, []) as ItemLink[]
}
