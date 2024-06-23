import { create } from "zustand";

interface UserState {
  user: null;
  setUser: (user: null) => void;
}

const userUserState = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default userUserState;
