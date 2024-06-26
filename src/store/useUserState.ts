import { create } from "zustand";
import { User } from "@/types";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const useUserState = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
}));

export default useUserState;
