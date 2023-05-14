import {
  TypedUseSelectorHook,
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useDefaultDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
