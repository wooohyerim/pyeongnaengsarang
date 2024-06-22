import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";

const LoginForm = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col w-[450px] h-[650px] my-14 mx-auto p-3 ">
      <span
        onClick={() => navigate(-1)}
        className="w-[30px] text-[24px] font-bold text-[#543310] cursor-pointer"
      >
        &lt;{" "}
      </span>
      <h1 className="mb-6 text-center text-[36px] text-[#543310] font-IBMSemibold ">
        Login
      </h1>
      <form className="flex flex-col gap-8 w-[400px] h-[400px] my-0 mx-auto p-4 ">
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
        <div className="flex flex-col gap-4 mt-8">
          <Button className={""} type={"button"} title={"로그인"} />
          <Button className={""} type={"button"} title={"구글"} />
        </div>
      </form>
      <div className=" w-full p-4 gap-4 text-[#D1BB9E] text-center text-[14px]">
        <span> 아직 계정이 없으면 | </span>
        <span
          onClick={goToSignup}
          className="underline cursor-pointer underline-offset-4"
        >
          회원가입
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
