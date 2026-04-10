
"use client"
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useGlobalStore } from '@/lib/store/useGlobalStore'

export default function AlertDialogProvider() {
  const { alertOpen, updateAlertConfig, alertConfig } = useGlobalStore()


  function handleCancel() {
    if (alertConfig?.onCancel) {
      alertConfig.onCancel()
    }
    // updateAlertConfig(false)
  }
  function handleConfirm() {
    if (alertConfig?.onConfirm) {
      alertConfig.onConfirm()
    }
    // updateAlertConfig(false)
  }

  if (!alertConfig) return null;

  return (
    <AlertDialog open={alertOpen} onOpenChange={updateAlertConfig}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertConfig?.AlertTitle || "Confirmation Required"}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertConfig?.AlertDescription || "Are you sure you want to perform this action?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>{alertConfig?.CancelLabel || "Cancel"}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{alertConfig?.ConfirmLabel || "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
