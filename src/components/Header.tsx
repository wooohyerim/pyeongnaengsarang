import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  profileUrl: string;
  goToMyPage: () => void;
}

const Header: React.FC<HeaderProps> = ({ profileUrl, goToMyPage }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between w-full h-12 p-3  border-x-0 border border-b-[#B1ABAB]">
      <h1
        onClick={() => navigate("/main")}
        className="font-BlackHanSans text-[28px] text-[#543310] cursor-pointer"
      >
        ㅍㄴㅅㄹ
      </h1>

      <Avatar onClick={goToMyPage}>
        <AvatarImage src={profileUrl} />
        <AvatarFallback>profile</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;
