import { create } from "zustand";
import { UserState } from "@/types";

// 로그인 유저 저장
export const useUserState = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
}));
