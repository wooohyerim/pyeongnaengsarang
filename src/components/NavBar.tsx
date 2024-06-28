import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { useUserState } from "@/store/useUserState";

interface NavBarProps {
  onClickLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onClickLogout }) => {
  // console.log(user);
  const { user } = useUserState();
  const navigate = useNavigate();

  const NAVIGATE_LIST = [
    { title: "Home", navigate: "/main", prams: "" },
    { title: "Users", navigate: "/user", prams: "" },
    {
      title: "Mypage",
      navigate: `/mypage/${user?.displayName}`,
      params: user?.displayName,
    },
  ];

  return (
    <nav className="fixed bottom-0 flex items-center justify-between w-[500px] h-[60px] px-4 bg-[#D1BB9E] ">
      <ul className="flex gap-4 py-2 ">
        {NAVIGATE_LIST.map((item) => {
          return (
            <li
              key={item.title}
              onClick={() => navigate(item.navigate)}
              className="w-full h-[30px] text-[18px] text-[#74512D] border-1 border-b-[#A79277] cursor-pointer hover:text-[#543310] transition"
            >
              {item.title}
            </li>
          );
        })}
      </ul>

      <div>
        <Button
          title="로그아웃"
          type="button"
          className="w-[80px] h-[40px] p-1 border-none bg-[#543310] outline-none text-white  font-bold rounded-[4px]"
          onClick={onClickLogout}
        />
      </div>
    </nav>
  );
};

export default NavBar;
