import React, { Dispatch, SetStateAction } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  profileUrl: string;
  goToMyPage: () => void;
}

const Header: React.FC<HeaderProps> = ({ profileUrl, goToMyPage }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-[500px] h-12 px-3  border border-b-[#B1ABAB]">
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
