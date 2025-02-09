import { useState } from 'react';  

export const useStore = () => {  
  const [user, setUser] = useState<string | null>(null);  
  
  return {  
    user,  
    setUser  
  };  
};  import create from 'zustand';
import { User, Product } from '../types';

interface AppState {
  user: User | null;
  products: Product[];
  setUser: (user: User | null) => void;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  products: [],
  setUser: (user) => set({ user }),
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({ 
    products: [...state.products, product] 
  })),
}));
