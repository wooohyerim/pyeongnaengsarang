import React, { Dispatch, SetStateAction } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Button from "./common/Button";

interface NavBarProps {
  onClickLogout: () => void;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ onClickLogout, setIsOpened }) => {
  // const navigate = useNavigate();
  const NAVIGATE_LIST = [
    { title: "Home", href: "/main" },
    { title: "Users", href: "/user" },
    { title: "Mypage", href: "/mypage" },
  ];

  return (
    <nav className="absolute top-0  flex flex-col gap-6 w-[200px] h-dvh p-4 bg-[#D1BB9E]">
      <div className="w-full">
        <RiCloseFill
          size={30}
          style={{
            color: "#543310",
            cursor: "pointer",
          }}
          onClick={() => setIsOpened(false)}
        />
      </div>
      <ul className="flex flex-col w-full gap-4 py-2">
        {NAVIGATE_LIST.map((item) => {
          return (
            <Link to={item.href} key={item.title}>
              <li
                className="w-full h-[30px] text-[18px] text-[#74512D] border-1 border-b-[#A79277] cursor-pointer hover:text-[#543310] transition"

                // onClick={() => navigate(item.navigate)}
              >
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
      <div>
        <Button
          title="로그아웃"
          type="button"
          className="w-[100px] h-[35px] p-1 border-none bg-[#543310] outline-none text-white  font-bold rounded-[4px]"
          onClick={onClickLogout}
        />
      </div>
    </nav>
  );
};

export default NavBar;
