import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { SignUpValues } from "@/types";
import Button from "@/components/common/Button";
import { signUpSubmit } from "@/api/auth";

const SignupForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpValues>();

  const onSubmit = async (data: SignUpValues) => {
    try {
      await signUpSubmit(data);
      alert("가입에 성공했습니다.");
      reset();
      navigate("/login");
    } catch (error: unknown) {
      const err = error as FirebaseError;
      switch (err.code) {
        case "auth/invalid-email":
          alert("이메일을 바르게 입력해주세요.");
          break;
        case "auth/weak-password":
          alert("비밀번호가 너무 쉬워요.");
          break;
        case "auth/email-already-in-use":
          alert("등록된 이메일 입니다.");
          break;
        default:
          console.log("회원가입 실패");
          break;
      }
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-[500px] h-full my-0 mx-auto p-3 bg-[#F8F0E5]">
      <span
        onClick={() => navigate(-1)}
        className="w-[30px] text-[24px] font-bold text-[#543310] cursor-pointer lg:hidden"
      >
        &lt;{" "}
      </span>
      <h1 className=" mb-6 text-center text-[36px] text-[#543310] font-IBMSemibold ">
        회원가입
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[400px] h-full my-0 mx-auto p-4"
      >
        <div className="flex flex-col gap-1 h-[75px]">
          <label htmlFor="image" className="text-[#636363] text-[12px]">
            프로필 이미지 *
          </label>{" "}
          <input
            type={"file"}
            accept=".gif, .jpg, .png, .pdf, .jpeg"
            {...register("image", { required: "이미지를 등록해주세요." })}
            id={"image"}
            className="text-[14px] text-[#636363]"
          />
          {errors.image && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.image.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">이름 *</label>
          <input
            {...register("name", {
              minLength: 2,
              required: "이름을 입력해주세요.",
            })}
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="text"
          />
          {errors.name && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">닉네임 *</label>
          <input
            {...register("nickname", {
              minLength: 2,
              required: "닉네임을 입력해주세요.",
            })}
            className="w-full h-[50px] p-4 border-none bg-white outline-none rounded-xl"
            type="text"
          />
          {errors.nickname && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.nickname.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">이메일 *</label>
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
            placeholder="love@pyeongnaeng.com"
          />
          {errors.email && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 h-[80px]">
          <label className="text-[#636363] text-[12px]">비밀번호 *</label>
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
            placeholder="영문 + 숫자 + 특수문자 8자 이상"
          />
          {errors.password && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 h-[180px] ">
          <label className="text-[#636363] text-[12px]">
            자기소개 & 인사말 *
          </label>
          <textarea
            {...register("bio", {
              minLength: 3,
              required: "자기소개&인사말을 입력해주세요.",
            })}
            className="w-full h-[150px] p-4 border-none  bg-white outline-none rounded-xl"
          ></textarea>
          {errors.bio && (
            <span className="pl-1 text-[#ff0000] text-[12px]">
              {errors.bio.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <Button className={""} type={"submit"} title={"가입하기"} />
          <Button
            className={
              "hidden lg:block w-full h-[55px] p-2 border-none bg-[#543310] outline-none text-white text-lg font-bold rounded-[4px]"
            }
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
