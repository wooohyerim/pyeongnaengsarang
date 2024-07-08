import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";
import { getUserProfile } from "@/hooks/getUserData";
import { updateProfile } from "firebase/auth";
import { useUserState } from "@/store/useUserState";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = auth.currentUser;
  const { setUser, setIsLogin } = useUserState();

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
        try {
          await updateProfile(user, {
            photoURL: data?.profileImg,
            displayName: data?.nickname,
          });
          setIsLogin(true);
          setIsAuthenticated(true);
          setUser({
            uid: user?.uid,
            email: user?.email || "",
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || "",
          });
        } catch (error) {
          console.log("update error", error);
        }
      } else {
        console.log("로그아웃");
        setIsAuthenticated(false);
        setIsLogin(false);
      }
    });
  }, [data]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // 인증 상태를 확인 중일 때 로딩 화면을 보여줌
    return <Loading />;
  }

  if (!isAuthenticated) {
    alert("로그인 후 이용해 주세요.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
