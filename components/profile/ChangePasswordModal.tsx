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
import { toast } from "sonner";

const formSchema = z
  .object({
    currentPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    newPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmNewPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmNewPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordModal({
  open,
  onOpenChange,
}: ChangePasswordModalProps) {
  const mutation = useMutationOP("post", "/api/Auth/ChangeMyPassword");

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await mutation.mutateAsync({
        body: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        },
      });

      toast.success("Şifreniz güncellendi");
      reset();
      onOpenChange(false);
    } catch (error) {
      if (!(error instanceof Error)) {
        toast.error("Şifre güncellenemedi");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Şifre Değiştir</DialogTitle>
          <DialogDescription>Mevcut şifrenizi ve yeni şifrenizi girin</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            type="password"
            name="currentPassword"
            label="Mevcut Şifre"
            control={control}
            placeholder="Mevcut şifrenizi girin"
          />
          <FormInput
            type="password"
            name="newPassword"
            label="Yeni Şifre"
            control={control}
            placeholder="Yeni şifrenizi girin"
          />
          <FormInput
            type="password"
            name="confirmNewPassword"
            label="Yeni Şifre (Tekrar)"
            control={control}
            placeholder="Yeni şifrenizi tekrar girin"
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              İptal
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Güncelleniyor..." : "Şifreyi Güncelle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
