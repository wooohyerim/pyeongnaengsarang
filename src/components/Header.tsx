import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { CiMenuBurger } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  profileUrl: string;
  goToMyPage: () => void;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  profileUrl,
  goToMyPage,
  setIsOpened,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-[500px] h-12 px-3  border border-b-[#B1ABAB]">
      <CiMenuBurger
        size={25}
        style={{ cursor: "pointer" }}
        onClick={() => setIsOpened(true)}
      />
      <h1
        onClick={() => navigate("/main")}
        className="font-BlackHanSans text-[24px] text-[#543310] cursor-pointer"
      >
        ㅍㄴㅅㄹ
      </h1>
      <div className="border-none cursor-pointer">
        <Avatar onClick={goToMyPage}>
          <AvatarImage src={profileUrl} />
          <AvatarFallback>profile</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
