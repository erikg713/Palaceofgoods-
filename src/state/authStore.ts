import create from 'zustand';

interface AuthState {
  user: string | null;
  token: string | null;
  role: 'buyer' | 'seller' | 'admin' | null;
  login: (token: string, user: string, role: 'buyer' | 'seller' | 'admin') => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  role: null,
  login: (token, user, role) => set({ token, user, role }),
  logout: () => set({ user: null, token: null, role: null }),
}));

export default useAuthStore;
