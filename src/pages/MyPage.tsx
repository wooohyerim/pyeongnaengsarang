import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const MyPage = () => {
  const location = useLocation();

  const { nickname } = useParams();
  console.log("params => ", nickname);

  const displayName = location.state.displayName;

  console.log("네비게이션으로 넘어온 state => ", displayName);

  // useEffect(() => {
  //   if (nickname === displayName) {
  //   }
  // }, []);

  return (
    <MainLayout>
      <div className="w-full h-screen">MyPage</div>
    </MainLayout>
  );
};

export default MyPage;
