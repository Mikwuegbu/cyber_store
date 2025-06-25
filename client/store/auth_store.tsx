import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  email: string;
  displayname: string;
} | null;

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  login: () => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => {
        set({ user });
      },
      login: () => {
        set({ isAuthenticated: true });
      },
      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth", // unique name for localStorage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
