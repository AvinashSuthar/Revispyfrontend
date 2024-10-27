import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createCategorySlice } from "./slices/categorySlice";

export const useAppStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createCategorySlice(...a),
}));