import create from "zustand";

interface AuthState {
  user: string | null;
  token: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (token, user) => set({ token, user }),
  logout: () => set({ user: null, token: null }),
}));
interface AuthState {
  user: string | null;
  token: string | null;
  role: "buyer" | "seller" | "admin" | null;
  login: (token: string, user: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  role: null,
  login: (token, user, role) => set({ token, user, role: role as AuthState["role"] }),
  logout: () => set({ user: null, token: null, role: null }),
}));
