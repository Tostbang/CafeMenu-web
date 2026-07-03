"use client";

import { useState } from "react";
import {
  UserAccount,
  LockKeyFilled,
  Edit02Filled,
  User02,
  Setting01Filled,
  Delete02Filled,
  ShopSign,
} from "asem-icons";
import { useProfileStore } from "@/lib/store/profile-store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { useMutationOP } from "@/lib/Fetch";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "@/lib/store/useGlobalStore";
import { deleteToken } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function ProfileSkeleton() {
  return (
    <section className="w-full rounded-2xl border bg-white/60 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <UserAccount className="size-5" />
        <h2 className="text-lg font-semibold">Kişisel Bilgiler</h2>
      </div>
      <div className="mt-4 flex">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20.5 rounded-2xl" />
            <Skeleton className="h-20.5 rounded-2xl" />
          </div>
          <Skeleton className="h-20.5 rounded-2xl" />
          <Skeleton className="h-20.5 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export default function ProfilePageContent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  // Profile data is fetched once by DashProviders and mirrored into the
  // Zustand store. We deliberately do NOT refetch from here to avoid the
  // duplicate write that races with DashProviders' effect.
  const deleteMutation = useMutationOP("delete", "/api/Auth/DeleteMyAccount");

  const refreshProfile = async () => {
    // Trigger a background refetch via the same query key DashProviders owns.
    await queryClient.refetchQueries({
      queryKey: ["get", "/api/Auth/GetMyProfile"],
    });
  };

  const onDeleteAccount = async () => {
    try {
      await deleteMutation.mutateAsync({});
      deleteToken();
      setProfile(null);
      toast.success("Hesabınız silindi.");
      router.replace("/register");
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error(toErrorMessage(error, "Hesap silinirken bir hata oluştu."));
      }
    }
  };

  const handleDeleteAccount = () => {
    Alert({
      AlertTitle: "Hesabı Sil",
      AlertDescription:
        "Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz?",
      CancelLabel: "Vazgeç",
      ConfirmLabel: deleteMutation.isPending ? "Siliniyor..." : "Hesabı Sil",
      onConfirm: () => {
        void onDeleteAccount();
      },
    });
  };

  return (
    <div className="h-full p-4 md:p-6">
      <div className="mx-auto max-w-6xl rounded-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Profil Ayarları</h1>
          <p className="mt-1 text-sm">Profil bilgilerinizi görüntüleyin ve düzenleyin.</p>
        </div>

        <div className="grid grid-cols-5 gap-x-3">
          <section className="rounded-2xl col-span-2 border bg-white/60 p-4 md:p-6">
            <div className="flex items-center gap-2">
              <Setting01Filled className="size-5" />
              <h2 className="text-lg font-semibold">Ayarlar</h2>
            </div>
            <div className="mt-4">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full border bg-white">
                <User02 className="size-12" />
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-y-2.5">
              <Button
                onClick={() => setResetPasswordModalOpen(true)}
                className="h-11"
                disabled={deleteMutation.isPending}
              >
                <LockKeyFilled className="mr-2 size-4" />
                Şifre Değiştir
              </Button>
              <Button
                onClick={() => setEditModalOpen(true)}
                className="h-11"
                disabled={deleteMutation.isPending}
              >
                <Edit02Filled className="mr-2 size-4" />
                Profili Düzenle
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="h-11"
                disabled={deleteMutation.isPending}
              >
                <Delete02Filled className="mr-2 size-4" />
                Profili Sil
              </Button>
            </div>
          </section>

          {!profile ? (
            <ProfileSkeleton />
          ) : (
            <section className="col-span-3 rounded-2xl border bg-white/60 p-4 md:p-6">
              <div className="flex items-center gap-2">
                <UserAccount className="size-5" />
                <h2 className="text-lg font-semibold">Kişisel Bilgiler</h2>
              </div>
              <div className="mt-4 flex">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border bg-white/50 p-4">
                      <p className="mb-1 text-sm text-muted-foreground">Ad</p>
                      <p className="text-lg font-semibold">{profile.firstName}</p>
                    </div>
                    <div className="rounded-2xl border bg-white/50 p-4">
                      <p className="mb-1 text-sm text-muted-foreground">Soyad</p>
                      <p className="text-lg font-semibold">{profile.lastName}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border bg-white/50 p-4">
                    <p className="mb-1 text-sm text-muted-foreground">Email Adresi</p>
                    <p className="text-lg font-semibold break-all">{profile.email}</p>
                  </div>
                  <div className="rounded-2xl border bg-white/50 p-4">
                    <p className="mb-1 text-sm text-muted-foreground">Kafe Adı</p>
                    <p className="text-lg font-semibold">
                      <ShopSign className="mr-1 inline size-4" />
                      {profile.cafeName || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {profile && (
          <>
            <EditProfileModal
              open={editModalOpen}
              onOpenChange={setEditModalOpen}
              profile={profile}
              onUpdated={refreshProfile}
            />

            <ChangePasswordModal
              open={resetPasswordModalOpen}
              onOpenChange={setResetPasswordModalOpen}
            />
          </>
        )}
      </div>
    </div>
  );
}
