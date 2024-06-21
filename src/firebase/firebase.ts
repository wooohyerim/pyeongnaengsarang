import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "pyeongnaeng-2522d.firebaseapp.com",
  projectId: "pyeongnaeng-2522d",
  storageBucket: "pyeongnaeng-2522d.appspot.com",
  messagingSenderId: "885739183149",
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
