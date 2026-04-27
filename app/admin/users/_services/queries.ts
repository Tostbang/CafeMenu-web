"use client"

import { useMutationOP, useQueryOP } from "@/lib/Fetch"
import type { paths } from "@/lib/types/api"
import { useQueryClient } from "@tanstack/react-query"

// Extract response types from the API
type AdminUsersResponse = paths["/api/Admin/Users/Search"]["post"]["responses"]["200"]["content"]["application/json"]

// Export commonly used types for backward compatibility
export type AdminUser = NonNullable<AdminUsersResponse["users"]>[number]

export interface UsersSearchRequest {
  status?: boolean
  page?: number
  pageSize?: number
}

export const useGetAdminUsers = (searchParams?: UsersSearchRequest) => {
  return useQueryOP("post", "/api/Admin/Users/Search", {
    body: searchParams || {} as any,
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
      queryClient.invalidateQueries({ queryKey: ["post", "/api/Admin/Users/Search"] })
    },
  })
}
