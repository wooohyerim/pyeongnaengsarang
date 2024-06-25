import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../Header";
import NavBar from "../NavBar";
import useUserState from "@/store/useUserState";
import { auth } from "@/firebase/firebase";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsLogin } = useUserState();
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
  }, []);

  const onClickLogout = () => {
    alert("로그인 페이지로 이동합니다.");
    auth.signOut();
    navigate("/login");
  };

  const goToMyPage = () => {
    navigate("/mypage");
  };

  return (
    <div>
      <Header
        profileUrl={profileUrl}
        goToMyPage={goToMyPage}
        setIsOpened={setIsOpened}
      />
      {isOpened === true && (
        <NavBar onClickLogout={onClickLogout} setIsOpened={setIsOpened} />
      )}
      {children}
    </div>
  );
};

export default MainLayout;
