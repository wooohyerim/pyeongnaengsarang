import { create } from "zustand";
import { User } from "@/types";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

// 로그인 유저 저장
export const useUserState = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
}));

// 현재 로그인 한 유저 저장
export const useAuthState = create((set) => ({}));
