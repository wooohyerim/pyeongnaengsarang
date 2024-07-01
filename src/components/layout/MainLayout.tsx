import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { useUserState } from "@/store/useUserState";
import { auth } from "@/firebase/firebase";
import Header from "../Header";
import NavBar from "../NavBar";
import { getUserProfile } from "@/hooks/getUserData";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsLogin, setUser } = useUserState();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const { data } = useQuery({
    queryKey: ["users", user?.uid],
    queryFn: () => getUserProfile(user?.uid || ""),
    enabled: !!user?.uid,
  });
  // console.log("query data => ", data);

  // 현재 유저 확인
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // console.log("onAuthStateChanged => ", user);

        // data 정보로 user 업데이트
        await updateProfile(user, {
          photoURL: data?.profileImg,
          displayName: data?.nickname,
        });

        setIsLogin(true);
        setUser({
          uid: user?.uid,
          email: user?.email || "",
          displayName: user?.displayName || "",
          photoURL: user?.photoURL || "",
        });
      } else {
        console.log("로그아웃");
        setIsLogin(false);
      }
    });
  }, [data]);

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
    <div className="">
      <section className=" w-[500px] mx-auto my-0 bg-white border border-s-[#dadada] border-y-0  shadow-inner">
        <Header onClickLogout={onClickLogout} />

        {children}
        <NavBar />
      </section>
    </div>
  );
};

export default MainLayout;
