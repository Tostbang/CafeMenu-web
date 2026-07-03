"use client"

import { useMutationOP, useQueryOP } from "@/lib/Fetch"
import type { paths } from "@/lib/types/api"
import { useQueryClient } from "@tanstack/react-query"

// Extract response types from the API
type AdminPackagesResponse = paths["/api/Admin/Packages"]["get"]["responses"]["200"]["content"]["application/json"]
type AdminPackageDetailResponse = paths["/api/Admin/Packages/{packageId}"]["get"]["responses"]["200"]["content"]["application/json"]

// Export commonly used types
export type AdminPackage = NonNullable<AdminPackagesResponse["packages"]>[number]
export type AdminPackageDetail = AdminPackageDetailResponse["package"]

export const useGetAdminPackages = () => {
  return useQueryOP("get", "/api/Admin/Packages", {})
}

export const useGetPackageDetail = (packageId: number, enabled: boolean = true) => {
  return useQueryOP("get", "/api/Admin/Packages/{packageId}", {
    params: { path: { packageId } },
    enabled,
  })
}

export const useCreatePackage = () => {
  const queryClient = useQueryClient()
  return useMutationOP("post", "/api/Admin/Packages/Create", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/Packages"] })
    },
  })
}

export const useUpdatePackage = () => {
  const queryClient = useQueryClient()
  return useMutationOP("put", "/api/Admin/Packages/Update", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/Packages"] })
    },
  })
}

export const useDeletePackage = () => {
  const queryClient = useQueryClient()
  return useMutationOP("delete", "/api/Admin/Packages/{packageId}", {
    onSuccess: () => {
      // Invalidate the list cache AND any per-package detail cache.
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/Packages"] })
    },
  })
}
