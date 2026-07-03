"use client"

import { useMutationOP, useQueryOP } from "@/lib/Fetch"
import type { components, paths } from "@/lib/types/api"
import { useQueryClient } from "@tanstack/react-query"

// Extract response types from the API
type AdminUsersResponse = paths["/api/Admin/Users/Search"]["post"]["responses"]["200"]["content"]["application/json"]
type AdminUsersRequest = components["schemas"]["CafeMenu.Entity.DTO.AdminGetAllUsersRequest"]

// Export commonly used types for backward compatibility
export type AdminUser = NonNullable<AdminUsersResponse["users"]>[number]

export interface UsersSearchRequest {
  status?: boolean | null
  page?: number
  pageSize?: number
}

export const useGetAdminUsers = (searchParams?: UsersSearchRequest) => {
  const body: AdminUsersRequest = {
    status: searchParams?.status ?? null,
    page: searchParams?.page ?? 1,
    pageSize: searchParams?.pageSize ?? 10,
  }
  return useQueryOP("post", "/api/Admin/Users/Search", {
    body,
  })
}

export const useGetUserDetail = (userId: number, enabled: boolean = true) => {
  return useQueryOP("get", "/api/Admin/Users/{userId}", {
    params: { path: { userId } },
    enabled,
  })
}

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient()
  return useMutationOP("delete", "/api/Admin/Users/{userId}", {
    onSuccess: () => {
      // Invalidate the search/list cache AND any per-user detail caches.
      queryClient.invalidateQueries({ queryKey: ["post", "/api/Admin/Users/Search"] })
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/Users"] })
    },
  })
}
