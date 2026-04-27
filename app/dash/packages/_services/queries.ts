"use client";

import { useMutationOP, useQueryOP } from "@/lib/Fetch";
import type { components } from "@/lib/types/api";

export type PackageModel =
  components["schemas"]["CafeMenu.Entity.DTO.PackageListModel"];
export type GetAllPackagesResponse =
  components["schemas"]["CafeMenu.Entity.DTO.GetAllPackageResponse"];
export type ActivePackageResponse =
  components["schemas"]["CafeMenu.Entity.DTO.GetActivePackageResponse"];
export type StartPackagePaymentResponse =
  components["schemas"]["CafeMenu.Entity.DTO.StartPackagePaymentResponse"];
export type MembershipHistoryItem =
  components["schemas"]["CafeMenu.Entity.DTO.MembershipHistoryListModel"];
export type MembershipHistoryResponse =
  components["schemas"]["CafeMenu.Entity.DTO.GetMyMembershipHistoryResponse"];

export const useGetAllPackages = () => {
  return useQueryOP("get", "/api/Membership/GetAllPackages");
};

export const useGetActivePackage = () => {
  return useQueryOP("get", "/api/Membership/GetActivePackage");
};

export const useInitializeCheckout = () => {
  return useMutationOP("post", "/api/Payment/start-package-payment");
};

export const useGetMembershipHistory = () => {
  return useMutationOP("post", "/api/Membership/GetMyMembershipHistory");
};
