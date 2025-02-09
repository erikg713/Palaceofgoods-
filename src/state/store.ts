import create from 'zustand';
import { persist } from 'zustand/middleware';

// ... (interfaces and store creation)

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // ... (state and actions)
    }),
    {
      name: 'palace-of-goods-storage',
      // ... (persistence configuration)
    }
  )
);
import React, { createContext, useContext, useState } from 'react';  

interface User {  
  username: string;  
  token: string;  
}  

interface CartItem {  
  id: string;  
  title: string;  
  price: number;  
}  

interface StoreContextType {  
  user: User | null;  
  setUser: (user: User | null) => void;  
  cart: CartItem[];  
  addToCart: (item: CartItem) => void;  
  removeFromCart: (id: string) => void;  
}  

const StoreContext = createContext<StoreContextType | undefined>(undefined);  

export const StoreProvider: React.FC = ({ children }) => {  
  const [user, setUser] = useState<User | null>(null);  
  const [cart, setCart] = useState<CartItem[]>([]);  

  const addToCart = (item: CartItem) => {  
    setCart([...cart, item]);  
  };  

  const removeFromCart = (id: string) => {  
    setCart(cart.filter((item) => item.id !== id));  
  };  

  return (  
    <StoreContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart }}>  
      {children}  
    </StoreContext.Provider>  
  );  
};  

export const useStore = () => {  
  const context = useContext(StoreContext);  
  if (!context) {  
    throw new Error("useStore must be used within a StoreProvider");  
  }  
  return context;  
};
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
