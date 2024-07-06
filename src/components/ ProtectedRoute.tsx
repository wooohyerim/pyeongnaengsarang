import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "@/firebase/firebase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;

  if (!user) {
    // 사용자 인증이 되어 있지 않으면 로그인 페이지로 리디렉션
    alert("로그인 후 이용해 주세요.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
