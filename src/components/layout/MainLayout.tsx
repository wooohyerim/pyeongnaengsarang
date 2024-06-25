import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import NavBar from "../NavBar";
import useUserState from "@/store/useUserState";
import { auth } from "@/firebase/firebase";
import { useQuery } from "@tanstack/react-query";

interface AuthData {
  isLogin: boolean;
  profileUrl: string;
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsLogin } = useUserState();
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const user = auth.currentUser;
  // console.log(user);

  // 현재 유저 확인
  const currentData = async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setProfileUrl(user.photoURL || "");
      } else {
        console.log("로그아웃");
        setIsLogin(false);
        setProfileUrl("");
      }
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["authState"],
    queryFn: currentData,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log("상위 레이아웃 data  => ", data);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // console.log(user);
  //       setIsLogin(true);
  //       setProfileUrl(user.photoURL || "");
  //     } else {
  //       console.log("로그아웃");
  //       setIsLogin(false);
  //       setProfileUrl("");
  //     }
  //   });
  // }, [user]);

  const onClickLogout = async () => {
    try {
      await auth.signOut();
      alert("로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      console.log("logout 실패", error);
    }
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
      <div className="p-3">{children}</div>
    </div>
  );
};

export default MainLayout;
