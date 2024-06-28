import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserState } from "@/store/useUserState";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserState();
  const photoURL = user?.photoURL;

  return (
    <header className="flex items-center justify-between w-full h-12 p-3  border-x-0 border border-b-[#B1ABAB]">
      <h1
        onClick={() => navigate("/main")}
        className="font-BlackHanSans text-[28px] text-[#543310] cursor-pointer"
      >
        ㅍㄴㅅㄹ
      </h1>

      <Avatar>
        {photoURL ? (
          <AvatarImage src={photoURL} />
        ) : (
          <AvatarFallback>profile</AvatarFallback>
        )}
      </Avatar>
    </header>
  );
};

export default Header;
