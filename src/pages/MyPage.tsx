import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/firebase";

import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";

const MyPage = () => {
  // const user = localStorage.getItem("user");
  const user = auth.currentUser;
  const location = useLocation();

  const { nickname } = useParams();
  const displayName = location.state.displayName;

  console.log(user);
  console.log("params => ", nickname);
  console.log("네비게이션으로 넘어온 state => ", displayName);

  return (
    <MainLayout>
      <div className="w-full h-screen">
        <div className="w-[210px] h-[210px] rounded-full">
          <label htmlFor="profile">
            <img src="" alt="" />
          </label>
          <input type="file" id="profile" className="hidden" />
        </div>
        <div>
          <label>Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Nickname</label>
          <input type="text" />
        </div>
        <div>
          <label>Comment</label>
          <input type="text" />
        </div>
        <div>
          <Button type="button" className="" title="돌아가기" />
          <Button type="button" className="" title="수정하기" />
        </div>
      </div>
    </MainLayout>
  );
};

export default MyPage;
