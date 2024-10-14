import { create } from "zustand";
import { createSelectors } from "../createSelectors";

type TAccountRecoveryStore = {
  email: string;
  setEmail: (email: string) => void;
}

export const useAccountRecoveryStore = createSelectors(
  create<TAccountRecoveryStore>()((set, get) => ({
    email: "",
    setEmail: (email) => {
      set({ email });
    },
  }))
);
