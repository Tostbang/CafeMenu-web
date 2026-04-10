
import { JSX } from "react";
import { createStore } from "./createStore";

type AlertConfig = {
  AlertTitle?: string;
  AlertDescription?: string;
  ConfirmLabel?: string;
  CancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void;
}

export type SheetConfig = {
  SheetTitle?: string;
  SheetDescription?: string;
  SheetFooter?: JSX.Element
  SheetContent?: JSX.Element
}

type State = {
  alertOpen: boolean;
  sheetOpen: boolean;
  alertConfig: AlertConfig | null
  sheetConfig: SheetConfig | null
}

type Actions = {
  updateAlertConfig: (open: boolean) => void,
  updateSheetConfig: (open: boolean) => void,
  showAlert: (config: AlertConfig) => void,
  showSheet: (config: SheetConfig) => void,
}

type Store = State & Actions


export const useGlobalStore = createStore<Store>((set) => ({
  alertOpen: false,
  sheetOpen: false,
  alertConfig: null,
  sheetConfig: null,
  showAlert: (config) => set((state) => {
    state.alertOpen = true;
    state.alertConfig = config
  }),
  showSheet: (config) => set((state) => {
    state.sheetOpen = true;
    state.sheetConfig = config
  }),
  updateAlertConfig: (open) => set((state) => {
    state.alertOpen = open;
    if (!open) state.alertConfig = null
  }),
  updateSheetConfig: (open) => set((state) => {
    state.sheetOpen = open;
    if (!open) state.sheetConfig = null
  })
}))


export const Alert = (config: AlertConfig) => {
  useGlobalStore.getState().showAlert(config)
}


export const OpenSheet = (config: SheetConfig) => {
  useGlobalStore.getState().showSheet(config)
}
