
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { StateCreator } from "zustand/vanilla";


const createStore = <T extends object>(
  storeCreator: StateCreator<T, [["zustand/immer", never]], []>,
) => {

  const immerStore = immer(storeCreator);

  return create<T>()(immerStore);
};

export { createStore };
