import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUserState } from "@/store/useUserState";
import Button from "./common/Button";
import { auth } from "@/firebase/firebase";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const { setUser } = useUserState();

  // console.log(currentUser?.photoURL);
  const onClickLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      alert("로그아웃되어서 시작 페이지로 이동합니다.");
      navigate("/");
    } catch (error) {
      console.log("logout 실패", error);
    }
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 flex items-center justify-between w-[498px] h-[50px] bg-white p-3 border border-s-[#dadada] border-x-0 border-t-0 shadow-sm">
      <h1
        onClick={() => navigate("/main")}
        className="font-BlackHanSans text-[28px] text-[#543310] cursor-pointer"
      >
        ㅍㄴㅅㄹ
      </h1>
      <div className="flex gap-4">
        <Avatar>
          {currentUser ? (
            <AvatarImage src={currentUser.photoURL || ""} alt="img" />
          ) : null}
        </Avatar>

        {currentUser === null ? (
          <Button
            title="로그인"
            type="button"
            className=" text-[#543310] text-[12px] font-bold "
            onClick={onClickLogin}
          />
        ) : (
          <Button
            title="로그아웃"
            type="button"
            className=" text-[#543310] text-[12px] font-bold "
            onClick={onClickLogout}
          />
        )}
      </div>
    </header>
  );
};

export default React.memo(Header);
