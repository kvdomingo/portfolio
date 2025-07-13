import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AppState {
  theme: "auto" | "light" | "dark";
}

export interface AppActions {
  setTheme: (theme: AppState["theme"]) => void;
}

const initialState: AppState = {
  theme: "auto",
};

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set(() => ({ theme })),
    }),
    { name: "appStore" },
  ),
);
