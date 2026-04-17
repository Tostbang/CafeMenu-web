"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Smartphone,
  Monitor,
  MapPin,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useGetAllPackages,
  useGetActivePackage,
  useGetMembershipHistory,
  useInitializeCheckout,
} from "./_services/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MyCard from "@/components/MyCard";
import { PackageFilled, TimeQuarterPassFilled } from "asem-icons";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/lib/store/useGlobalStore";
import { DurationType, DurationTypeLabels } from "@/lib/types";
import { format } from "date-fns";
import { PaymentModal } from "./_components/PaymentModal";
import { toast } from "sonner";
import { tr } from "date-fns/locale";
import { DataTable } from "@/components/data-table";
import { historyColumns } from "./_components/history-columns";

function PackagesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4 rounded-xl border-2 p-6">
          <div>
            <Skeleton className="mb-2 h-7 w-32" />
            <div className="flex items-baseline gap-1">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="space-y-3 py-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          <Skeleton className="h-10 w-full rounded" />
        </div>
      ))}
    </div>
  );
}

function PackagesTableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export default function PackagesPage() {
  const { data: packagesData, isLoading } = useGetAllPackages();
  const { data: activePackage } = useGetActivePackage();
  const initializeCheckout = useInitializeCheckout();
  const membershipHistoryMutation = useGetMembershipHistory();
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [checkoutFormHtml, setCheckoutFormHtml] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { mutate: loadMembershipHistory } = membershipHistoryMutation;

  useEffect(() => {
    loadMembershipHistory({
      body: {
        page: currentPage,
        pageSize,
      },
    });
  }, [currentPage, loadMembershipHistory]);

  const handlePurchase = async (packageId: number) => {
    setSelectedPackageId(packageId);
    try {
      const response = await initializeCheckout.mutateAsync({
        body: {
          packageId,
          callbackUrl: `${window.location.origin}/callback`,
        },
      });
      if (response && response.checkoutFormContent) {
        setCheckoutFormHtml(response.checkoutFormContent);
        setShowPaymentModal(true);
      } else {
        toast.error("Ödeme formu alınamadı");
      }
    } finally {
      setSelectedPackageId(null);
    }
  };

  return (
    <div className="space-y-6 p-2 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">Üyelik Paketleri</h1>
        <p className="mt-1 text-muted-foreground">İşiniz için mükemmel planı seçin</p>
      </div>

      {activePackage && activePackage.packageId && (
        <MyCard title="Aktif Paketiniz" Icon={PackageFilled}>
          <div className="rounded-xl border p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="mb-2 text-xl font-bold">{activePackage.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Monitor className="h-4 w-4" />
                    <span>{activePackage.maxDeviceCount} cihaza kadar</span>
                  </div>
                  {activePackage.allowMobile && (
                    <div className="flex items-center gap-2 text-sm">
                      <Smartphone className="h-4 w-4" />
                      <span>Mobil erişim aktif</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{activePackage.allowedRadiusKm} km yarıçap izni</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-green-500 text-white">Aktif</Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-white/20 pt-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Toplam Süre</p>
                  <p className="font-semibold">{activePackage.totalDays} gün</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Kalan Süre</p>
                  <p className="font-semibold">{activePackage.remainingDays} gün</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Bitiş Tarihi</p>
                  <p className="font-semibold">
                    {activePackage.endsAt &&
                      format(new Date(activePackage.endsAt), "dd MMM yyyy", {
                        locale: tr,
                      })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MyCard>
      )}

      <MyCard title="Mevcut Paketler" Icon={PackageFilled}>
        {isLoading ? (
          <PackagesSkeleton />
        ) : packagesData?.packages && packagesData.packages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packagesData.packages.map((pkg) => {
              const isActive = activePackage?.packageId === pkg.packageId;

              return (
                <div
                  key={pkg.packageId}
                  className={cn(
                    "relative rounded-xl border-2 p-6 transition-all hover:shadow-lg",
                    isActive ? "border-black dark:bg-blue-950" : "border-gray-200 dark:border-gray-700",
                  )}
                >
                  {isActive && (
                    <Badge className="absolute top-3 right-4 bg-black text-white">
                      Mevcut Plan
                    </Badge>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1 text-xl font-bold">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">₺{pkg.price}</span>
                        <span className="text-sm text-muted-foreground">
                          /{pkg.durationValue}{" "}
                          {DurationTypeLabels[pkg.durationType as DurationType]}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 py-4">
                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">
                          <strong>{pkg.maxDeviceCount}</strong> cihaza kadar
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">
                          {pkg.allowMobile ? (
                            <>
                              Mobil erişim <strong>aktif</strong>
                            </>
                          ) : (
                            <>
                              Mobil erişim <strong>pasif</strong>
                            </>
                          )}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">
                          <strong>{pkg.allowedRadiusKm} km</strong> yarıçap kapsamı
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">
                          <strong>
                            {pkg.durationValue}{" "}
                            {DurationTypeLabels[pkg.durationType as DurationType]}
                          </strong>{" "}
                          geçerlilik
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={isActive ? "outline" : "default"}
                      disabled={isActive || initializeCheckout.isPending || selectedPackageId === pkg.packageId}
                      onClick={() =>
                        Alert({
                          AlertTitle: "Paketi Satın Al",
                          AlertDescription: `${pkg.name} ₺${pkg.price}/${pkg.durationValue} ${
                            DurationTypeLabels[pkg.durationType as DurationType]
                          } fiyatla satın almak istediğinizden emin misiniz? Mevcut paketiniz varsa değiştirilecektir.`,
                          CancelLabel: "Vazgeç",
                          ConfirmLabel: "Satın Al",
                          onConfirm: () => {
                            void handlePurchase(pkg.packageId);
                          },
                        })
                      }
                    >
                      {isActive ? "Mevcut Paket" : "Paketi Satın Al"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">Paket bulunamadı</div>
        )}
      </MyCard>

      <MyCard title="Üyelik Satın Alma Geçmişim" Icon={TimeQuarterPassFilled}>
        {membershipHistoryMutation.isPending ? (
          <PackagesTableSkeleton />
        ) : membershipHistoryMutation.data?.items &&
          membershipHistoryMutation.data.items.length > 0 ? (
          <div className="space-y-4">
            <DataTable columns={historyColumns} data={membershipHistoryMutation.data.items} />
            <div className="flex items-center justify-between px-2">
              <div className="text-sm text-muted-foreground">
                Toplam {membershipHistoryMutation.data.totalCount} kayıt
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || membershipHistoryMutation.isPending}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Önceki
                </Button>
                <div className="text-sm">
                  Sayfa {currentPage} /{" "}
                  {Math.max(1, Math.ceil(membershipHistoryMutation.data.totalCount / pageSize))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    currentPage >=
                      Math.ceil(membershipHistoryMutation.data.totalCount / pageSize) ||
                    membershipHistoryMutation.isPending
                  }
                >
                  Sonraki
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            Satın alma geçmişi bulunamadı
          </div>
        )}
      </MyCard>

      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        checkoutFormHtml={checkoutFormHtml}
      />
    </div>
  );
}
