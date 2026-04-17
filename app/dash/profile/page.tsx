"use client";

import { useEffect, useState } from "react";
import {
  UserAccount,
  LockKeyFilled,
  Edit02Filled,
  User02,
  Setting01Filled,
  Delete02Filled,
  ShopSign,
} from "asem-icons";
import MyCard from "@/components/MyCard";
import { useProfileStore } from "@/lib/store/profile-store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ChangePasswordModal from "./components/ChangePasswordModal";
import EditProfileModal from "./components/EditProfileModal";
import { useMutationOP, useQueryOP } from "@/lib/Fetch";
import { Alert } from "@/lib/store/useGlobalStore";
import { deleteToken } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function toErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function ProfileSkeleton() {
  return (
    <MyCard title="Kişisel Bilgiler" Icon={UserAccount}>
      <div className="flex">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20.5 rounded-[30px]" />
            <Skeleton className="h-20.5 rounded-[30px]" />
          </div>
          <Skeleton className="h-20.5 rounded-[30px]" />
          <Skeleton className="h-20.5 rounded-[30px]" />
        </div>
      </div>
    </MyCard>
  );
}

export default function Page() {
  return <ProfilePage />;
}

export function ProfilePage() {
  const router = useRouter();
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const getProfileQuery = useQueryOP("get", "/api/Auth/GetMyProfile");
  const deleteMutation = useMutationOP("delete", "/api/Auth/DeleteMyAccount");

  useEffect(() => {
    if (getProfileQuery.data?.user) {
      setProfile(getProfileQuery.data.user);
    }
  }, [getProfileQuery.data?.user, setProfile]);

  const refreshProfile = async () => {
    const response = await getProfileQuery.refetch();
    if (response.data?.user) {
      setProfile(response.data.user);
    }
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
    <div className="space-y-3 p-2 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profil Ayarları</h1>
          <p className="mt-1 text-muted-foreground">
            Profil bilgilerinizi görüntüleyin ve düzenleyin
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <MyCard title="Ayarlar" Icon={Setting01Filled} className="w-full md:w-160">
          <div>
            <div className="mx-auto flex size-24 items-center justify-center rounded-full border bg-white">
              <User02 className="size-14" />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-2.5">
            <Button onClick={() => setResetPasswordModalOpen(true)} className="h-11">
              <LockKeyFilled className="mr-2 size-4" />
              Şifre Değiştir
            </Button>
            <Button onClick={() => setEditModalOpen(true)} className="h-11">
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
        </MyCard>

        {!profile ? (
          <ProfileSkeleton />
        ) : (
          <MyCard title="Kişisel Bilgiler" Icon={UserAccount}>
            <div className="flex">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="squircle rounded-[30px] bg-white/50 p-4">
                    <p className="mb-1 text-sm text-muted-foreground">Ad</p>
                    <p className="text-lg font-semibold">{profile.firstName}</p>
                  </div>
                  <div className="squircle rounded-[30px] bg-white/50 p-4">
                    <p className="mb-1 text-sm text-muted-foreground">Soyad</p>
                    <p className="text-lg font-semibold">{profile.lastName}</p>
                  </div>
                </div>
                <div className="squircle rounded-[30px] bg-white/50 p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Email Adresi</p>
                  <p className="text-lg font-semibold break-all">{profile.email}</p>
                </div>
                <div className="squircle rounded-[30px] bg-white/50 p-4">
                  <p className="mb-1 text-sm text-muted-foreground">Kafe Adı</p>
                  <p className="text-lg font-semibold">
                    <ShopSign className="mr-1 inline size-4" />
                    {profile.cafeName || "-"}
                  </p>
                </div>
              </div>
            </div>
          </MyCard>
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
  );
}
