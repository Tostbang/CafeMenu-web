"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutationOP } from "@/lib/Fetch";
import { Profile } from "@/lib/store/profile-store";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().trim().min(2, "Ad en az 2 karakter olmalıdır."),
  lastName: z.string().trim().min(2, "Soyad en az 2 karakter olmalıdır."),
  cafeName: z.string().trim().min(2, "Kafe adı en az 2 karakter olmalıdır."),
  email: z.string().trim().email("Geçerli bir email adresi giriniz"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile;
  onUpdated: () => Promise<void>;
}

function toNullableString(value: string) {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

export default function EditProfileModal({
  open,
  onOpenChange,
  profile,
  onUpdated,
}: EditProfileModalProps) {
  const mutation = useMutationOP("put", "/api/Auth/UpdateMyProfile");

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      cafeName: profile.cafeName ?? "",
      email: profile.email ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await mutation.mutateAsync({
        body: {
          firstName: toNullableString(data.firstName),
          lastName: toNullableString(data.lastName),
          cafeName: toNullableString(data.cafeName),
          email: toNullableString(data.email),
        },
      });

      await onUpdated();
      toast.success("Profil bilgileri güncellendi");
      onOpenChange(false);
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Profil güncellenemedi");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Profili Düzenle</DialogTitle>
          <DialogDescription>Profil bilgilerinizi güncelleyin</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="text"
              name="firstName"
              label="Ad"
              control={control}
              placeholder="Adınız"
            />
            <FormInput
              type="text"
              name="lastName"
              label="Soyad"
              control={control}
              placeholder="Soyadınız"
            />
          </div>
          <FormInput
            type="text"
            name="cafeName"
            label="Kafe Adı"
            control={control}
            placeholder="Kafenizin adı"
          />
          <FormInput
            type="text"
            name="email"
            label="Email"
            control={control}
            placeholder="ornek@email.com"
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Güncelleniyor..." : "Güncelle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
