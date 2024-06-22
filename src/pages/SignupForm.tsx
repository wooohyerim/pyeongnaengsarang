import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";

const SignupForm = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-col w-[450px] h-full my-10 mx-auto p-3">
      {/* <span
        onClick={() => navigate(-1)}
        className="w-[30px] text-[24px] font-bold text-[#543310] cursor-pointer"
      >
        &lt;{" "}
      </span> */}
      <h1 className=" mb-6 text-center text-[36px] text-[#543310] font-IBMSemibold ">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4 w-[400px] h-full my-0 mx-auto p-4">
        <div className="flex flex-col items-center">
          <label
            htmlFor="inputFile"
            className=" w-24 h-24 rounded-full pt-8 bg-[#8B8989] cursor-pointer text-center text-white"
          >
            업로드
          </label>{" "}
          <input type="file" id="inputFile" className="hidden" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#636363] text-[12px]">Name</label>
          <input
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#636363] text-[12px]">Nickname</label>
          <input
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#636363] text-[12px]">Email</label>
          <input
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#636363] text-[12px]">Password</label>
          <input
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="password"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#636363] text-[12px]">Comment</label>
          <textarea className="w-full h-[100px] p-4 border-none bg-white outline-none rounded-xl resize-vertical" />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <Button className={""} type={"button"} title={"가입하기"} />
          <Button
            className={""}
            type={"button"}
            title={"돌아가기"}
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
      <div className="w-full p-4 text-[#D1BB9E]  text-center text-[14px]">
        <span> 이미 계정이 있다면 | </span>
        <span
          onClick={goToLogin}
          className="underline cursor-pointer underline-offset-4"
        >
          로그인
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
