import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Button from "@/components/common/Button";
import useUserState from "@/store/useUserState";

type authValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useUserState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<authValues>();

  const goToSignup = () => {
    navigate("/signup");
  };

  const onSubmit = async (data: authValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      setUser(user);
      setIsLogin(true);
      alert("로그인에 성공했습니다.");
      reset();
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-[400px] h-[400px] my-0 mx-auto p-4 "
      >
        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">Email</label>
          <input
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-.]+$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
              required: "이메일을 입력해주세요.",
            })}
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="text"
          />
          {errors.email && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">Password</label>
          <input
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "영문 + 숫자 + 특수문자 8자 이상 입력해주세요.",
              },
              required: "비밀번호를 입력해주세요.",
            })}
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="password"
          />
          {errors.password && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <Button className={""} type={"submit"} title={"로그인"} />
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
