import { create } from "zustand";
import { UserState } from "@/types";
import { auth } from "@/firebase/firebase";

// 로그인 유저 저장
export const useUserState = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
}));

// 현재 로그인 한 유저 저장
// export const useAuthState = create<AuthState>((set) => ({
//   user:null,

//   fetchAuthState: () => {
//     set({ isLoading: true });
//     const unsubscribe = auth.onAuthStateChanged(
//       (user) => {
//         unsubscribe();
//         set({ user, isLoading: false });
//         if (user) {
//           localStorage.setItem('user', JSON.stringify(user));
//         } else {
//           localStorage.removeItem('user');
//         }
//       },
//     );
//   },
//   logout: () => {
//     auth.signOut().then(() => {
//       set({ user: null });
//       localStorage.removeItem('user');
//     });
//   }
// }));
