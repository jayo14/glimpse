import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  role?: 'creator' | 'guest' | 'event_host' | 'admin';
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null });
  },
}));
