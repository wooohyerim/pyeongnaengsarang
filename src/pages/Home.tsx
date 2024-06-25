import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center bg-[#F8F0E5]">
      <div className="flex flex-col items-center gap-8 mt-48">
        <h1 className="font-BlackHanSans text-[64px] text-[#543310]">
          ㅍㄴㅅㄹ
        </h1>
        <p className="font-IBMLight text-[#D1BB9E]">
          평양냉면을 좋아하는 사람들이 자유롭게 얘기하는 공간
        </p>

        <button
          className="w-[150px] h-[60px] mt-6 rounded-[8px] bg-[#74512D] text-white  font-bold"
          type="button"
          onClick={goToLogin}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Home;
