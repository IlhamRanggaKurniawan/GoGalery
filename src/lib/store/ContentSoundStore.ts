import { create } from "zustand";
import { createSelectors } from "../createSelectors";

type TContentSoundStore = {
  isSoundOn: boolean;
  toggleSound: () => void;
}

export const useContentSoundStore = createSelectors(
  create<TContentSoundStore>()((set) => ({
    isSoundOn: false,
    toggleSound: () => {
      set((state) => ({ isSoundOn: !state.isSoundOn }));
    },
  }))
);
