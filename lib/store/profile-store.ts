import { create } from "zustand";
import { components } from "../types/api";

export type Profile =
  components["schemas"]["CafeMenu.Entity.DTO.UserListModel"];
type ProfileStore = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set(() => ({ profile: profile })),
}));
