import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import NavBar from "../NavBar";
import { useUserState } from "@/store/useUserState";
import { auth } from "@/firebase/firebase";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsLogin, setUser } = useUserState();
  const navigate = useNavigate();

  // 현재 유저 확인
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log("onAuthStateChanged => ", user);
        setIsLogin(true);
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
        });
      } else {
        console.log("로그아웃");
        setIsLogin(false);
      }
    });
  }, []);

  const onClickLogout = async () => {
    try {
      await auth.signOut();
      alert("로그아웃되어서 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.log("logout 실패", error);
    }
  };

  return (
    <div className="relative bg-[#F8F0E5]">
      <section className="w-[500px] mx-auto my-0 bg-white">
        <Header />
        <NavBar onClickLogout={onClickLogout} />

        {children}
      </section>
    </div>
  );
};

export default MainLayout;
