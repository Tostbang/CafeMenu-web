"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, customFetch } from "@/lib/Fetch";

type BaseApi = {
  code: string | null;
  message: string | null;
  errors: string[] | null;
};

export type PackageModel = {
  packageId: number;
  name: string | null;
  price: number;
  durationValue: number;
  durationType: number;
  maxDeviceCount: number;
  allowMobile: boolean;
  allowedRadiusKm: number;
  status?: boolean | null;
};

export type GetAllPackagesResponse = BaseApi & {
  packages: PackageModel[] | null;
};

export type ActivePackageResponse = BaseApi & {
  packageId: number;
  name: string | null;
  maxDeviceCount: number;
  allowMobile: boolean;
  allowedRadiusKm: number;
  totalDays: number;
  remainingDays: number;
  endsAt: string | null;
};

export type InitializeCheckoutResponse = BaseApi & {
  checkoutFormContent: string | null;
};

export type MembershipHistoryItem = {
  userMembershipId: number;
  packageId: number;
  packageName: string | null;
  price: number;
  allowMobile: boolean;
  maxDeviceCount: number;
  allowedRadiusKm: number;
  startsAt: string;
  endsAt: string | null;
  isActive: boolean;
  paymentTransactionId: number;
  createdDate: string;
};

export type MembershipHistoryResponse = BaseApi & {
  items: MembershipHistoryItem[] | null;
  totalCount: number;
};

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await customFetch(`${baseUrl}${path}`, init);
  return (await response.json()) as T;
}

export const useGetAllPackages = () => {
  return useQuery({
    queryKey: ["membership-packages"],
    queryFn: () =>
      apiRequest<GetAllPackagesResponse>("/api/Membership/GetAllPackages"),
  });
};

export const useGetActivePackage = () => {
  return useQuery({
    queryKey: ["active-membership-package"],
    queryFn: () =>
      apiRequest<ActivePackageResponse>("/api/Membership/GetActivePackage"),
  });
};

export function useInitializeCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { body: { packageId: number; callbackUrl: string } }) =>
      apiRequest<InitializeCheckoutResponse>("/api/Payment/start-package-payment", {
        method: "POST",
        body: JSON.stringify(variables.body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active-membership-package"] });
      queryClient.invalidateQueries({ queryKey: ["membership-packages"] });
    },
  });
}

export const useGetMembershipHistory = () => {
  return useMutation({
    mutationFn: (variables: { body: { page: number; pageSize: number } }) =>
      apiRequest<MembershipHistoryResponse>(
        "/api/Membership/GetMyMembershipHistory",
        {
          method: "POST",
          body: JSON.stringify(variables.body),
        },
      ),
  });
};
