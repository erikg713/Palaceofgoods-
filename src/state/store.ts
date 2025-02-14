import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Product, CartItem } from '../types'; // Import all your types

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearProducts: () => void;
  cart: CartItem[]; // Cart state
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({ // Add get for accessing state within actions
      user: null,
      products: [],
      cart: [], // Initialize cart
      setUser: (user) => set({ user }),
      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        })),
      clearProducts: () => set({ products: [] }),
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increment quantity
                : cartItem
            ),
          };
        } else {
          return { cart: [...state.cart, { ...item, quantity: 1 }] }; // Add with quantity 1
        }
      }),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      clearCart: () => set({ cart: [] }),
      updateCartItemQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })),
    }),
    {
      name: 'palace-of-goods-storage',
    }
  )
);

import create from 'zustand';  

interface User {  
  username: string;  
  token: string;  
}  

interface StoreState {  
  user: User | null;  
  login: (username: string, token: string) => void;  
  logout: () => void;  
  cart: CartItem[];  
  addToCart: (item: CartItem) => void;  
  removeFromCart: (id: string) => void;  
}  

interface CartItem {  
  id: string;  
  title: string;  
  price: number;  
}  

export const useStore = create<StoreState>((set) => ({  
  user: null,  
  login: (username, token) => set({ user: { username, token } }),  
  logout: () => set({ user: null }),  
  cart: [],  
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),  
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),  
}));
