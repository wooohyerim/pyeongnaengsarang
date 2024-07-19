import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // const goToLogin = () => {
  //   navigate("/login");
  // };

  const goToMain = () => {
    navigate("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center w-[500px] h-screen my-0 mx-auto gap-6  bg-[#F8F0E5]">
      <h1 className="font-BlackHanSans text-[64px] text-[#543310]">ㅍㄴㅅㄹ</h1>
      <p className="font-IBMLight text-[#D1BB9E]">
        평양냉면을 좋아하는 사람들이 자유롭게 얘기하는 공간
      </p>

      <button
        className="w-[150px] h-[60px] mt-6 rounded-[8px] bg-[#74512D] text-white  font-bold"
        type="button"
        onClick={goToMain}
      >
        시작하기
      </button>
    </div>
  );
};

export default Home;
