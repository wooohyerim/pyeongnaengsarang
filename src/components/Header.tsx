import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserState } from "@/store/useUserState";
import Button from "./common/Button";

interface HeaderProps {
  onClickLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClickLogout }) => {
  const navigate = useNavigate();
  const { user } = useUserState();
  const photoURL = user?.photoURL;

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
          {photoURL ? (
            <AvatarImage src={photoURL} />
          ) : (
            <AvatarFallback>profile</AvatarFallback>
          )}
        </Avatar>
        <Button
          title="로그아웃"
          type="button"
          className=" text-[#543310] text-[12px] font-bold "
          onClick={onClickLogout}
        />
      </div>
    </header>
  );
};

export default Header;
