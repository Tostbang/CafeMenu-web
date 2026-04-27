"use client"

import { useMutationOP, useQueryOP } from "@/lib/Fetch"
import type { paths } from "@/lib/types/api"
import { useQueryClient } from "@tanstack/react-query"

// Extract response types from the API
type AdminCategoriesResponse = paths["/api/Admin/GlobalCategories"]["get"]["responses"]["200"]["content"]["application/json"]

// Export commonly used types
export type GlobalCategory = NonNullable<AdminCategoriesResponse["categories"]>[number]

export const useGetGlobalCategories = () => {
  return useQueryOP("get", "/api/Admin/GlobalCategories", {})
}

export const useCreateGlobalCategory = () => {
  const queryClient = useQueryClient()
  return useMutationOP("post", "/api/Admin/GlobalCategories/Create", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/GlobalCategories"] })
    },
  })
}

export const useDeleteGlobalCategory = () => {
  const queryClient = useQueryClient()
  return useMutationOP("delete", "/api/Admin/GlobalCategories/{categoryId}", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "/api/Admin/GlobalCategories"] })
    },
  })
}
