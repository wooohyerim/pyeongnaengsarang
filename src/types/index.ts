export interface User {
  uid: string;
  photoURL: string | null;
  email: string | null;
  displayName: string | null;
}

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export interface AuthValues {
  email: string;
  password: string;
}

export interface SignUpValues {
  image: File[];
  name: string;
  nickname: string;
  email: string;
  password: string;
  bio: string;
}

export interface GoogleUser {
  uid: string;
  photoURL: string | null;
  email: string | null;
  nickname: string | null;
  bio?: string | null;
  providerId: string | null;
}
