import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "@/store/useUserState";
import { GoHomeFill } from "react-icons/go";
import { IoPeople, IoPerson } from "react-icons/io5";
import { FaPen } from "react-icons/fa";

const NavBar: React.FC = () => {
  // console.log(user);
  const { user } = useUserState();
  const navigate = useNavigate();

  const NAVIGATE_LIST = [
    {
      title: "Home",
      navigate: "/main",
      icon: <GoHomeFill size={20} style={{ color: "#74512D" }} />,
    },
    {
      title: "Users",
      navigate: "/user",
      icon: <IoPeople size={20} style={{ color: "#74512D" }} />,
    },
    {
      title: "Mypage",
      navigate: `/mypage/${user?.uid}`,
      icon: <IoPerson size={20} style={{ color: "#74512D" }} />,
    },
    {
      title: "Post",
      navigate: "/post",
      icon: <FaPen size={20} style={{ color: "#74512D" }} />,
    },
  ];

  return (
    <nav className="sticky bottom-0 w-[500px] h-[55px]  bg-[#D1BB9E] border border-x-[#dadada] border-y-0 pt-[8px] px-4">
      <div className="flex items-center justify-between w-full h-[45px] mx-auto my-0 ">
        {NAVIGATE_LIST.map((item) => {
          return (
            <ul key={item.title} className="flex flex-col items-center gap-1">
              <span>{item.icon}</span>
              <li
                onClick={() => navigate(item.navigate)}
                className="w-full h-[30px] text-[16px] text-[#74512D] border-1 border-b-[#A79277] cursor-pointer hover:text-[#543310] transition"
              >
                {item.title}
              </li>
            </ul>
          );
        })}
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
