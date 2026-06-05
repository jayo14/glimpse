import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,

            setAccessToken: (token) => set({ accessToken: token }),

            clearAuth: () => set({ accessToken: null }),
        }),
        {
            name: 'glimpse-auth-storage', // Key used in storage
            storage: createJSONStorage(() => sessionStorage), // Uses sessionStorage to survive tabs/reloads safely
        }
    ))