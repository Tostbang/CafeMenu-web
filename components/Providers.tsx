
"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner';
// import AlertDialogProvider from './AlertDialog';
// import SheetProvider from './CustomSheet';
import { ProgressProvider } from '@bprogress/next/app';
import { TooltipProvider } from './ui/tooltip';
import AlertDialogProvider from './AlertDialog';


export default function Providers({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const queryClient = new QueryClient({
    defaultOptions: {

      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
      mutations: {
        onError: (e) => {
          // keep NEXT_REDIRECT behavior unchanged
          // prefer showing server error message when available, otherwise show a Turkish fallback
          if (e?.message === "NEXT_REDIRECT") return;
          toast.error(e?.message ?? "Bir hata oluştu");
        },
        onSuccess: () => {
          // toast.success("İşlem başarılı.");
        },
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProgressProvider height='3px' color="#025864" shallowRouting={false} options={{ showSpinner: false, easing: "ease-in", positionUsing: "translate" }}  >
          {children}
        </ProgressProvider>
      </TooltipProvider>
      <AlertDialogProvider />
      {/* <SheetProvider /> */}
    </QueryClientProvider>
  )
}
