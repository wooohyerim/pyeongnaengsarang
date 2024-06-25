import { create } from "zustand";

interface User {
  uid: string;
  photoURL: string | null;
  email: string | null;
  displayName: string | null;
}

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
