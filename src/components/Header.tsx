import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserState } from "@/store/useUserState";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserState();
  const photoURL = user?.photoURL;

  return (
    <header className=" flex items-center justify-between w-[498px] h-[50px] bg-white p-3 border border-s-[#dadada] border-x-0 border-t-0 shadow-sm">
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
