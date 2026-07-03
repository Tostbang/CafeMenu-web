"use client"

import { useMutationOP, useQueryOP } from "@/lib/Fetch"
import type { paths } from "@/lib/types/api"
import { useQueryClient } from "@tanstack/react-query"

// Extract response types from the API
type AdminMenusResponse = paths["/api/Admin/Menus/Search"]["post"]["responses"]["200"]["content"]["application/json"]
type AdminMenuDetailResponse = paths["/api/Admin/Menus/{menuId}"]["get"]["responses"]["200"]["content"]["application/json"]

// Export commonly used types for backward compatibility
export type AdminMenu = NonNullable<AdminMenusResponse["menus"]>[number]
export type AdminMenuDetail = AdminMenuDetailResponse["menu"]

export interface MenusSearchRequest {
  status?: boolean | null
  isPublished?: boolean | null
  page?: number
  pageSize?: number
}

export const useGetAdminMenus = (searchParams?: MenusSearchRequest) => {
  return useQueryOP("post", "/api/Admin/Menus/Search", {
    body: {
      status: searchParams?.status ?? null,
      isPublished: searchParams?.isPublished ?? null,
      page: searchParams?.page ?? 1,
      pageSize: searchParams?.pageSize ?? 10,
    },
  })
}

export const useGetMenuDetail = (menuId: number, enabled: boolean = true) => {
  return useQueryOP("get", "/api/Admin/Menus/{menuId}", {
    params: { path: { menuId } },
    enabled,
  })
}

export const useDeleteAdminMenu = () => {
  const queryClient = useQueryClient()
  return useMutationOP("delete", "/api/Admin/Menus/{menuId}", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", "/api/Admin/Menus/Search"] })
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/Menus"] })
    },
  })
}

export const usePublishMenu = () => {
  const queryClient = useQueryClient()
  return useMutationOP("put", "/api/Admin/Menus/PublishStatus", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", "/api/Admin/Menus/Search"] })
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/Menus"] })
    },
  })
}
