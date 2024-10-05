import { create } from "zustand";
import { createSelectors } from "../createSelectors";

interface IAccountRecoveryStore {
  email: string;
  setEmail: (email: string) => void;
}

export const useAccountRecoveryStore = createSelectors(
  create<IAccountRecoveryStore>()((set, get) => ({
    email: "",
    setEmail: (email) => {
      set({ email });
    },
  }))
);
