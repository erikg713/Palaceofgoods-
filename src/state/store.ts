import create from 'zustand';
import { persist } from 'zustand/middleware'; // Import persist middleware
import { User, Product } from '../types';

interface AppState {
  user: User | null;
  products: Product[];
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void; // Add removeProduct
  clearProducts: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      products: [],
      setUser: (user) => set({ user }),
      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        })),
        clearProducts: () => set({ products: []}),
    }),
    {
      name: 'palace-of-goods-storage', // Unique name for persistence
      // You can also customize the storage (e.g., localStorage, sessionStorage)
    }
  )
);
