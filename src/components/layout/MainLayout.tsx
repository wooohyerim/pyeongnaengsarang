import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import NavBar from "../NavBar";
import useUserState from "@/store/useUserState";
import { auth } from "@/firebase/firebase";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsLogin } = useUserState();
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState("");
  const user = auth.currentUser;

  // 현재 유저 확인
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        setIsLogin(true);
        setProfileUrl(user.photoURL || "");
      } else {
        console.log("로그아웃");
        setIsLogin(false);
        setProfileUrl("");
      }
    });
  }, [user]);

  const onClickLogout = async () => {
    try {
      await auth.signOut();
      alert("로그아웃되어서 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.log("logout 실패", error);
    }
  };

  const goToMyPage = () => {
    navigate("/mypage");
  };

  return (
    <div className="bg-white">
      <section className="w-[500px] mx-auto my-0 bg-[#F8F0E5]">
        <Header profileUrl={profileUrl} goToMyPage={goToMyPage} />
        <NavBar onClickLogout={onClickLogout} user={user} />
        {children}
      </section>
    </div>
  );
};

export default MainLayout;
