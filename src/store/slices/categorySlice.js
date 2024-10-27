export const createCategorySlice = (set) => ({
    category: [], // Initial state
    setCategory: (newCategory) => set((state) => ({ category: [...state.category, ...newCategory] })), 
  });
  