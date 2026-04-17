import { components } from "@/lib/types/api";
import { createStore } from "./createStore";

type Product = components["schemas"]["CafeMenu.Entity.DTO.PublicProductModel"];

type State = {
  isOpen: boolean;
  product: Product | null;
};

type Actions = {
  openDrawer: (product: Product) => void;
  setOpen: (open: boolean) => void;
};

type Store = State & Actions;

export const useMenuProductDrawerStore = createStore<Store>((set) => ({
  isOpen: false,
  product: null,
  openDrawer: (product) =>
    set((state) => {
      state.product = product;
      state.isOpen = true;
    }),
  setOpen: (open) =>
    set((state) => {
      state.isOpen = open;
      if (!open) {
        state.product = null;
      }
    }),
}));
